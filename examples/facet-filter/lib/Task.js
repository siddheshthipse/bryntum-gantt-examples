import TaskModel from '../../../lib/Gantt/model/TaskModel.js';

// here you can extend our default Task class with your additional fields, methods and logic
export default class Task extends TaskModel {

    static $name = 'Task';

    static fields = [
        'status',
        { name : 'priority', defaultValue : 'Medium' },
        { name : 'eventColor', defaultValue : 'green' }
    ];

    get isLate() {
        return Boolean(!this.isCompleted && this.deadlineDate && Date.now() > this.deadlineDate);
    }

    get status() {
        let status = 'Not started';

        if (this.isCompleted) {
            status = 'Completed';
        }
        else if (this.isLate) {
            status = 'Late';
        }
        else if (this.isStarted) {
            status = 'Started';
        }

        return status;
    }
}
