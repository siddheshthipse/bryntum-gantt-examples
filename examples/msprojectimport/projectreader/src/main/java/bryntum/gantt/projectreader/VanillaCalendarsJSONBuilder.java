package bryntum.gantt.projectreader;

import java.text.SimpleDateFormat;
import java.time.Month;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONObject;

import net.sf.mpxj.DateRange;
import net.sf.mpxj.Day;
import net.sf.mpxj.DayType;
import net.sf.mpxj.ProjectCalendar;
import net.sf.mpxj.ProjectCalendarContainer;
import net.sf.mpxj.ProjectCalendarDays;
import net.sf.mpxj.ProjectCalendarException;
import net.sf.mpxj.ProjectCalendarHours;
import net.sf.mpxj.ProjectCalendarWeek;
import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.RecurrenceType;
import net.sf.mpxj.RecurringData;
import net.sf.mpxj.common.DateHelper;

public class VanillaCalendarsJSONBuilder implements JSONBuilder<JSONObject> {

    Properties properties;
    SimpleDateFormat dateFormat;
    SimpleDateFormat timeFormat;

    String nameProperty;
    String priorityProperty;
    String startProperty;
    String finishProperty;
    String isWorkingProperty;
    String recurrentStartDateProperty;
    String recurrentEndDateProperty;

    public VanillaCalendarsJSONBuilder(Properties properties, SimpleDateFormat dateFormat, SimpleDateFormat timeFormat) {
        this.properties = properties;
        this.dateFormat = dateFormat;
        this.timeFormat = timeFormat;

        // read JSON field names
        this.nameProperty               = properties.getProperty("calendarDay.NAME");
        this.priorityProperty           = properties.getProperty("calendarDay.PRIORITY");
        this.startProperty              = properties.getProperty("calendarDay.START");
        this.finishProperty             = properties.getProperty("calendarDay.FINISH");
        this.isWorkingProperty          = properties.getProperty("calendarDay.IS_WORKING_DAY");
        this.recurrentStartDateProperty = properties.getProperty("calendarDay.RECURRENT_START_DATE");
        this.recurrentEndDateProperty   = properties.getProperty("calendarDay.RECURRENT_END_DATE");
    }

    /**
     * Indicates if the provided hours collections are identical.
     * @param hours1
     * @param hours2
     * @return
     */
    private boolean isHoursEqual(ProjectCalendarHours hours1, ProjectCalendarHours hours2) {
        if ((hours1 == null && hours2 != null) || (hours1 != null && hours2 == null)) return false;

        if (hours1.size() != hours2.size()) return false;

        for (int i = 1; i <= hours1.size(); i++) {
            // if any ranges do not match
            if (!hours1.get(i).equals(hours2.get(i))) return false;
        }

        return true;
    }

    private String getDateRangeRule(DateRange range) {
        String rule = "";

        if (range != null) {
            if (range.getStart() != null) rule += " after " + dateFormat.format(range.getStart());

            Date endDate = range.getEnd();
            if (endDate != null) {
                // End date extracted by MPXJ is -1 second.
                // Adjusting it here the way the Gantt expects it.
                Calendar calendar = DateHelper.popCalendar(endDate);
                calendar.add(Calendar.SECOND, 1);
                endDate = calendar.getTime();

                rule += " before " + dateFormat.format(endDate);
            }
        }

        return rule;
    }

    private void addDayIntervals(JSONArray intervalsJSON, List<String> days, ProjectCalendarHours hours, DateRange dateRange, Map<String, Object> props) {
        JSONObject intervalJSON;

        // If the days are non working we represent them as "1st day 00:00 till last day + 1 00:00" solid range
        boolean useSolidRange = hours.size() == 0;

        // We also use the same approach if each day is working for 24hrs
        if (hours.size() == 1) {
            DateRange hoursRange = hours.get(0);
            Calendar startCalendar = DateHelper.popCalendar(hoursRange.getStart());
            Calendar endCalendar = DateHelper.popCalendar(hoursRange.getEnd());

            useSolidRange = startCalendar.get(Calendar.HOUR) == 0 &&
                startCalendar.get(Calendar.MINUTE) == 0 &&
                startCalendar.get(Calendar.SECOND) == 0 &&
                endCalendar.get(Calendar.HOUR) == 0 &&
                endCalendar.get(Calendar.MINUTE) == 0 &&
                endCalendar.get(Calendar.SECOND) == 0;
        }

        // If we have a solid working or non working range taking N days
        if (useSolidRange) {
            intervalJSON = new JSONObject();

            for (String key : props.keySet()) {
                intervalJSON.put(key, props.get(key));
            }

            intervalJSON.put(this.isWorkingProperty, hours.size() > 0);
            intervalJSON.put(this.recurrentStartDateProperty, "on " + days.get(0) + " at 00:00" + getDateRangeRule(dateRange));
            intervalJSON.put(this.recurrentEndDateProperty, "on " + Day.valueOf(days.get(days.size() - 1)).getNextDay() + " at 00:00" + getDateRangeRule(dateRange));

            intervalsJSON.put(intervalJSON);
        }
        // otherwise us "on Mon,Tue,Wed at XX:XX" rules
        else {
            for (DateRange hoursRange : hours) {
                intervalJSON = new JSONObject();

                for (String key : props.keySet()) {
                    intervalJSON.put(key, props.get(key));
                }

                intervalJSON.put(this.isWorkingProperty, true);
                intervalJSON.put(this.recurrentStartDateProperty, "on " + String.join(",", days) + " at " + timeFormat.format(hoursRange.getStart()) + getDateRangeRule(dateRange));
                intervalJSON.put(this.recurrentEndDateProperty, "on " + String.join(",", days) + " at " + timeFormat.format(hoursRange.getEnd()) + getDateRangeRule(dateRange));

                intervalsJSON.put(intervalJSON);
            }
        }
    }

    private void fillWeekOverrideIntervalsJSON(JSONArray intervalsJSON, ProjectCalendar calendar, ProjectCalendarWeek week) {
        Map<String, Object> commonProps = new HashMap<String, Object>();

        commonProps.put(this.priorityProperty, 25);

        fillWeekIntervalsJSON(intervalsJSON, calendar, week, week.getDateRange(), commonProps);
    }


    private void fillDefaultWeekIntervalsJSON(JSONArray intervalsJSON, ProjectCalendar calendar) {
        fillWeekIntervalsJSON(intervalsJSON, calendar, calendar, null, null);
    }

    private void fillWeekIntervalsJSON(JSONArray intervalsJSON, ProjectCalendar calendar, ProjectCalendarDays week, DateRange dateRange, Map<String, Object> commonProps) {

        if (commonProps == null) {
            commonProps = new HashMap<String, Object>();
        }

        if (commonProps.get(this.priorityProperty) == null) {
            commonProps.put(this.priorityProperty, 20);
        }

        ProjectCalendar parentCalendar = calendar.getParent();

        Day day = Day.MONDAY;
        ProjectCalendarHours prevDayHours = null;
        Integer daysProcessed = 0;

        List<String> days = new ArrayList<String>();
        DayType dayType = week.getCalendarDayType(day);

        // If that's NOT a default working time inherited from parent calendar or default week
        // or it's marked as default but we have nowhere to inherit it from
        if (dayType != DayType.DEFAULT || (parentCalendar == null && dateRange == null)) {
            // if that's default working time - calendar should report its ranges, otherwise it's set on the week
            prevDayHours = dayType == DayType.DEFAULT ? calendar.getCalendarHours(day) : week.getCalendarHours(day);
            days.add(day.toString());
        }

        // start iterating from Tue
        day = Day.TUESDAY;

        // iterate over the week
        while (daysProcessed < 6) {
            dayType = week.getCalendarDayType(day);

            ProjectCalendarHours dayHours = dayType == DayType.DEFAULT ? calendar.getCalendarHours(day) : week.getCalendarHours(day);

            // if the day setting are inherited from parent
            if ((parentCalendar != null || dateRange != null) && dayType == DayType.DEFAULT) {
                // finish open "days" sequence
                if (prevDayHours != null) addDayIntervals(intervalsJSON, days, prevDayHours, dateRange, commonProps);
                days.clear();
                prevDayHours = null;
            }
            else {

                if (prevDayHours != null && isHoursEqual(dayHours, prevDayHours)) {
                    days.add(day.toString());
                }
                else {
                    if (prevDayHours != null) addDayIntervals(intervalsJSON, days, prevDayHours, dateRange, commonProps);

                    // start new days sequence
                    days.clear();
                    days.add(day.toString());
                }

                prevDayHours = dayHours;
            }

            day = day.getNextDay();
            daysProcessed++;
        }

        if (days.size() > 0) {
            addDayIntervals(intervalsJSON, days, prevDayHours, dateRange, commonProps);
        }
    }

    /**
     * Build recurrence rule in Later JS format.
     * @param recurringData
     * @return Recurrence rule.
     */
    public String getRecurrenceRule(RecurringData recurringData) {
        Integer frequency = recurringData.getFrequency() != null ? recurringData.getFrequency() : 1;

        String recurrenceRule = "every " + frequency;

        RecurrenceType recurrenceType = recurringData.getRecurrenceType();

        Integer dayNumber;
        boolean relative;

        String trailingPart = " after " + dateFormat.format(recurringData.getStartDate());

        // stop condition
//        if (recurringData.getUseEndDate()) {
            trailingPart += " before " + dateFormat.format(recurringData.getFinishDate());
// TODO add support of limiting by occurrences number (commented since causes an exception
//        }
//        else {
//            trailingPart += " before " + recurringData.getOccurrences();
//        }

        switch (recurrenceType) {
            case DAILY :
                recurrenceRule += " day ";
                break;

            case WEEKLY :
                recurrenceRule += " week on ";

                for (int i = 1; i <= 7; i++) {

                    String delimiter = "";
                    Day day = Day.getInstance(i);

                    if (recurringData.getWeeklyDay(day)) {
                        recurrenceRule += delimiter + day;
                        delimiter = ", ";
                    }
                }

                recurrenceRule += " ";

                break;

            case MONTHLY :
                recurrenceRule += " month ";

                dayNumber = recurringData.getDayNumber();
                relative = recurringData.getRelative();

                if (relative) {
                    // every 1 month on Mon on the 3 day instance
                    recurrenceRule += "on " + recurringData.getDayOfWeek() + " on the " + (dayNumber == 5 ? "last" : dayNumber) + " day instance ";
                } else {
                    recurrenceRule += "on the " + dayNumber + " day ";
                }

                break;

            case YEARLY :
                recurrenceRule += " year ";

                dayNumber = recurringData.getDayNumber();
                relative = recurringData.getRelative();
                Month month = Month.of(recurringData.getMonthNumber());

                if (relative) {
                    // every 1 year on Mon on the 3 day instance of March; 7
                    recurrenceRule += "on " + recurringData.getDayOfWeek() + " on the " + (dayNumber == 5 ? "last" : dayNumber) + " day instance of " + month;
                } else {
                    recurrenceRule += "on the " + dayNumber + " day of " + month;
                }

                break;
        }

        return recurrenceRule + trailingPart;
    }


    public void fillCalendarExceptionIntervalsJSON(JSONArray intervalsJSON, ProjectCalendarException exception) {

        // get exception data
        String name                 = exception.getName();
        String start                = dateFormat.format(exception.getFromDate());

        Date toDate                 = new Date(exception.getToDate().getTime());
        // End date extracted by MPXJ is -1 second.
        // Adjusting it here the way the Gantt expects it.
        Calendar calendar           = DateHelper.popCalendar(toDate);
        calendar.add(Calendar.SECOND, 1);
        toDate                      = calendar.getTime();

        String finish               = dateFormat.format(toDate);
        boolean isWorking           = exception.getWorking();
        RecurringData recurringData = exception.getRecurring();

        JSONObject exceptionJSON;

        // Daily recurrence of non-working time ends up as a simple fixed startDate and endDate interval

        if (recurringData == null || recurringData.getRecurrenceType() == RecurrenceType.DAILY && !isWorking && (recurringData.getFrequency() == 1 || recurringData.getFrequency() == null)) {
            exceptionJSON = new JSONObject();

            exceptionJSON.put(this.nameProperty, name);
            exceptionJSON.put(this.priorityProperty, 30);
            exceptionJSON.put(this.startProperty, start);
            exceptionJSON.put(this.finishProperty, finish);
            exceptionJSON.put(this.isWorkingProperty, isWorking);

            intervalsJSON.put(exceptionJSON);
        }
        else {
            // build Later JS recurrence rule
            String recurrenceRule = getRecurrenceRule(recurringData);

            if (exception.size() > 0) {
                for (DateRange range : exception) {
                    exceptionJSON = new JSONObject();

                    exceptionJSON.put(this.nameProperty, name);
                    exceptionJSON.put(this.priorityProperty, 30);
                    exceptionJSON.put(this.isWorkingProperty, isWorking);
                    exceptionJSON.put(this.recurrentStartDateProperty, recurrenceRule + " at " + timeFormat.format(range.getStart()));
                    exceptionJSON.put(this.recurrentEndDateProperty, recurrenceRule + " at " + timeFormat.format(range.getEnd()));

                    intervalsJSON.put(exceptionJSON);
                }
            }
            else {
                exceptionJSON = new JSONObject();

                exceptionJSON.put(this.nameProperty, name);
                exceptionJSON.put(this.priorityProperty, 30);
                exceptionJSON.put(this.isWorkingProperty, isWorking);
                exceptionJSON.put(this.recurrentStartDateProperty, recurrenceRule + " at 00:00");
                exceptionJSON.put(this.recurrentEndDateProperty, "EOD");

                intervalsJSON.put(exceptionJSON);
            }
        }
    }


    public JSONObject getCalendarJSON(ProjectCalendar calendar) {
        JSONObject calendarJSON = new JSONObject();

        calendarJSON.put(properties.getProperty("calendar.UNIQUE_ID"), calendar.getUniqueID());
        calendarJSON.put(properties.getProperty("calendar.NAME"), calendar.getName());

        ProjectCalendar parentCalendar = calendar.getParent();

        if (parentCalendar != null) {
            calendarJSON.put(properties.getProperty("calendar.PARENT_ID"), parentCalendar.getUniqueID());
        }

        JSONArray intervalsJSON = new JSONArray();

        // collect default weekdays availability
        fillDefaultWeekIntervalsJSON(intervalsJSON, calendar);

        // collect week overrides
        for (ProjectCalendarWeek week : calendar.getWorkWeeks()) {
            fillWeekOverrideIntervalsJSON(intervalsJSON, calendar, week);
        }

        // collect calendar exceptions
        for (ProjectCalendarException exception : calendar.getCalendarExceptions()) {
            fillCalendarExceptionIntervalsJSON(intervalsJSON, exception);
        }

        calendarJSON.put(properties.getProperty("calendar.DAYS"), intervalsJSON);
        calendarJSON.put(properties.getProperty("calendar.UNSPECIFIED_TIME_IS_WORKING"), false);

        // let's build JSON for the children
        JSONArray childrenJSON = new JSONArray();

        for (ProjectCalendar child : calendar.getDerivedCalendars()) {
            childrenJSON.put(getCalendarJSON(child));
        }

        // if the calendar has children
        if (childrenJSON.length() > 0) {
            calendarJSON.put(properties.getProperty("calendar.CHILDREN"), childrenJSON);
            calendarJSON.put(properties.getProperty("calendar.EXPANDED"), true);
        }

        return calendarJSON;
    }

    public JSONObject buildJSON(ProjectFile projectFile) {
        JSONObject calendarsJSON = new JSONObject();

        ProjectCalendarContainer calendars = projectFile.getCalendars();

        // now let's loop and start building JSON from root nodes
        JSONArray calendarListJSON = new JSONArray();
        for (ProjectCalendar calendar : calendars) {
            // if it's a root node
            if (!calendar.isDerived()) {
                calendarListJSON.put(getCalendarJSON(calendar));
            }
        }

        calendarsJSON.put(properties.getProperty("calendar.CHILDREN"), calendarListJSON);

        return calendarsJSON;

    }

}
