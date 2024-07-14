package bryntum.gantt.projectreader;

import java.text.SimpleDateFormat;
import java.util.Properties;

import org.json.JSONObject;

import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.ProjectProperties;
import net.sf.mpxj.ScheduleFrom;

public class MainJSONBuilder implements JSONBuilder<JSONObject> {

    Properties properties;
    SimpleDateFormat dateFormat;
    SimpleDateFormat timeFormat;
    boolean isMpx;

    public MainJSONBuilder(Properties properties, SimpleDateFormat dateFormat, SimpleDateFormat timeFormat, boolean isMpx) {
        this.properties = properties;
        this.dateFormat = dateFormat;
        this.timeFormat = timeFormat;
        this.isMpx      = isMpx;
    }

    /**
     * Extracts the provided MPP file contents into a JSON object.
     *
     * @param projectFile MPP file to process
     * @return A JSON object containing the project data (tasks, dependencies,
     *         resources, assignments).
     */
    public JSONObject buildJSON(ProjectFile projectFile) {
        ProjectProperties projectProperties = projectFile.getProjectProperties();

        // put all the data into a single object
        JSONObject result = new JSONObject();

        // if we need to provide project model fields into a separate container
        if (Boolean.parseBoolean(properties.getProperty("use.project.container"))) {
            JSONObject projectJSON = new JSONObject();

            // calculate unit conversion ratios
            projectJSON.put(properties.getProperty("project.DAYS_PER_WEEK"), projectProperties.getMinutesPerWeek().intValue() / projectProperties.getMinutesPerDay().intValue());
            projectJSON.put(properties.getProperty("project.DAYS_PER_MONTH"), projectProperties.getMinutesPerMonth().intValue() / projectProperties.getMinutesPerDay().intValue());
            projectJSON.put(properties.getProperty("project.HOURS_PER_DAY"), projectProperties.getMinutesPerDay().intValue() / 60);

            projectJSON.put(properties.getProperty("project.CALENDAR"), projectFile.getDefaultCalendar().getUniqueID());

            // depending on the project scheduling direction return either project start or end date
            if (projectProperties.getScheduleFrom() == ScheduleFrom.START) {
                projectJSON.put(properties.getProperty("project.START"), dateFormat.format(projectProperties.getStartDate()));
                projectJSON.put(properties.getProperty("project.DIRECTION"), "Forward");
            } else {
                projectJSON.put(properties.getProperty("project.FINISH"), dateFormat.format(projectProperties.getFinishDate()));
                projectJSON.put(properties.getProperty("project.DIRECTION"), "Backward");
            }

            result.put("project", projectJSON);
        }

        if (Boolean.parseBoolean(properties.getProperty("use.vanilla.calendars"))) {
            result.put("calendars", new VanillaCalendarsJSONBuilder(properties, dateFormat, timeFormat).buildJSON(projectFile));
        }
        else {
            result.put("calendars", new ExtCalendarsJSONBuilder(properties, dateFormat, timeFormat).buildJSON(projectFile));
        }

        result.put("tasks", new TasksJSONBuilder(properties, dateFormat, isMpx).buildJSON(projectFile));
        result.put("dependencies", new DependenciesJSONBuilder(properties).buildJSON(projectFile));
        result.put("assignments", new AssignmentsJSONBuilder(properties).buildJSON(projectFile));
        result.put("resources", new ResourcesJSONBuilder(properties).buildJSON(projectFile));
        result.put("columns", new ColumnsJSONBuilder(properties).buildJSON(projectFile));

        return result;
    }

}
