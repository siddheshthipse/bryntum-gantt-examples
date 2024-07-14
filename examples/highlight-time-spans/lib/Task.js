import TaskModel from '../../../lib/Gantt/model/TaskModel.js';

export default class Task extends TaskModel {

    static $name = 'Task';

    get minStartDate() {
        return this.project.startDate;
    }

    get maxEndDate() {
        return this.project.endDate;
    }
}
