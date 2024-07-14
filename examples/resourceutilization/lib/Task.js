import TaskModel from '../../../lib/Gantt/model/TaskModel.js';

// Subclass standard TaskModel to add an extra field
// indicating special tasks representing projects
export default class Task extends TaskModel {

    static $name = 'Task';

    static fields = [
        { name : 'isProjectTask', type : 'boolean' }
    ];

    // Returns the project the task belongs to
    get projectTask() {
        let result = null;

        // proceed the task hierarchy to the root
        this.bubbleWhile(task => {
            // if current task is a project
            if (task.isProjectTask) {
                result = task;
            }

            // stop when project is found or we got to the root
            return !result && task.parent && !task.parent.isRoot;
        });

        return result;
    }
}
