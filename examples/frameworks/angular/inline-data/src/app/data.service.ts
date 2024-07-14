import { DateHelper } from '@bryntum/gantt';
import * as initialData from './initialData';

export class DataService {
    private dataSet = 0;
    getData() {
        const data:any = {};

        if (this.dataSet === 1) {
            data.tasks = [
                {
                    id       : 1,
                    name     : 'Task 1',
                    expanded : true,
                    children : [
                        { id : 11, name : 'Subtask 11', percentDone : 30, duration : 10 },
                        { id : 12, name : 'Subtask 12', percentDone : 67, duration : 5 }
                    ]
                },
                {
                    id       : 2,
                    name     : 'Task 2',
                    expanded : true,
                    children : [
                        { id : 21, name : 'Subtask 21', percentDone : 14, duration : 3 },
                        { id : 22, name : 'Subtask 22', percentDone : 94, duration : 7 },
                        { id : 23, name : 'Subtask 23', percentDone : 7, duration : 8 }
                    ]
                }
            ];
            data.dependencies = [
                { id : 1, from : 11, to : 12 },
                { id : 2, from : 1, to : 21 },
                { id : 3, from : 21, to : 22 },
                { id : 4, from : 21, to : 23 }
            ];
            data.timeRanges = [
                {
                    id           : 1,
                    name         : 'Important date',
                    startDate    : DateHelper.add(DateHelper.clearTime(new Date()), 15, 'day'),
                    duration     : 0,
                    durationUnit : 'd',
                    cls          : 'b-fa b-fa-diamond'
                }
            ];

            this.dataSet = 0;
        }
        else {
            Object.assign(data, initialData);
            this.dataSet = 1;
        }

        return data;
    }
}
