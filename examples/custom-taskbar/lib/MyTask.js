import TaskModel from '../../../lib/Gantt/model/TaskModel.js';
import DateHelper from '../../../lib/Core/helper/DateHelper.js';

/**
 * A custom task model class adding a `hoursWorked` field where you can enter worked hours/day (or the time unit you use)
 */
export default class MyTask extends TaskModel {
    static fields = [
        'totalHoursWorked',
        { name : 'hoursWorked', type : 'array' }
    ];

    get workedHoursByDay() {
        const
            me                                         = this,
            { startDate, endDate, isParent, duration } = me;

        // With Gantt using early rendering we can get here before dates are normalized, if so bail out to not cache
        // invalid values below
        if (!startDate || !endDate || !duration) {
            return [];
        }

        if (!isParent && me._workedHoursByDay?.duration === duration && me._workedHoursByDay.startDateMs === startDate.getTime()) {
            return me._workedHoursByDay;
        }

        const
            durationInDays   = DateHelper.getDurationInUnit(startDate, endDate, 'd', false),
            workedHoursByDay = Array(durationInDays || 0).fill(0),
            calendar         = me.project.calendar,
            hoursWorked      = me.hoursWorked || [];

        let index = 0;

        // Rollup values from parent task's immediate children
        for (let i = 0; i < durationInDays; i++) {
            const
                intervalStart = DateHelper.add(startDate, i, 'd'),
                intervalEnd   = DateHelper.add(intervalStart, 1, 'd');

            if (calendar.isWorkingTime(intervalStart, intervalEnd)) {
                if (isParent) {
                    workedHoursByDay[i] = me.children.reduce((total, child) => {
                        if (DateHelper.intersectSpans(child.startDate, child.endDate, intervalStart, intervalEnd)) {
                            const startDiff = DateHelper.getDurationInUnit(startDate, child.startDate, 'd');
                            return total += (child.workedHoursByDay[i - startDiff] || 0);
                        }
                        else {
                            return total;
                        }
                    }, 0);
                }
                else {
                    workedHoursByDay[i] = hoursWorked[index];
                }
                index++;
            }
        }

        // Cache by start + duration
        workedHoursByDay.startDateMs = startDate.getTime();
        workedHoursByDay.duration = duration;

        me._workedHoursByDay = workedHoursByDay;

        return workedHoursByDay;
    }

    setHoursWorked(dayIndex, hours) {
        const newValue = this._workedHoursByDay.slice();
        newValue[dayIndex] = hours;
        this._workedHoursByDay = null;
        this.hoursWorked = newValue;
    }

    get totalHoursWorked() {
        return this.workedHoursByDay.reduce((total, value) => {
            return total + (value || 0);
        }, 0);
    }
}
