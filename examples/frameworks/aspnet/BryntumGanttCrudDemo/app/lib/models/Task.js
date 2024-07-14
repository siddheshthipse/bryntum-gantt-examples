import { TaskModel } from '@bryntum/gantt';

// here you can extend our default Task class with your additional fields, methods and logic
export default class Task extends TaskModel {
    static get fields() {
        return [
            { name : 'Id' },
            { name : 'calendar', dataSource : 'CalendarId', serialize : calendar => calendar && calendar.id },
            { name : 'name', dataSource : 'Name' },
            { name : 'startDate', dataSource : 'StartDate', type : 'date' },
            { name : 'endDate', dataSource : 'EndDate', type : 'date' },
            { name : 'duration', dataSource : 'Duration', type : 'number' },
            { name : 'durationUnit', dataSource : 'DurationUnit' },
            { name : 'percentDone', dataSource : 'PercentDone', type : 'number' },
            { name : 'schedulingMode', dataSource : 'SchedulingMode' },
            { name : 'cls', dataSource : 'Cls' },
            { name : 'effort', dataSource : 'Effort' },
            // https://github.com/bryntum/support/issues/2234
            {
                name       : 'effortUnit',
                dataSource : 'EffortUnit',
                convert(value) {
                    return value || 'hour';
                }
            },
            { name : 'note', dataSource : 'Note' },
            { name : 'constraintType', dataSource : 'ConstraintType' },
            { name : 'constraintDate', dataSource : 'ConstraintDate', type : 'date' },
            { name : 'manuallyScheduled', dataSource : 'ManuallyScheduled' },
            { name : 'draggable', dataSource : 'Draggable' },
            { name : 'resizable', dataSource : 'Resizable' },
            { name : 'rollup', dataSource : 'Rollup' },
            { name : 'showInTimeline', dataSource : 'ShowInTimeline' },
            { name : 'deadlineDate', dataSource : 'DeadlineDate', type : 'date' }
        ];
    }
}

Task.idField = 'Id';
