import TaskModel from '../../../lib/Gantt/model/TaskModel.js';

/**
 * A custom task model class implementing task color inheritance from parent task.
 */
export default class Task extends TaskModel {
    // Add a stable class name that survives code minification
    static $name = 'Task';

    static get fields() {
        return [
            // Add your own custom fields here
        ];
    }

    // For this demo, tasks are styled based on the first-level parent nodes (unless defined on task level)
    get eventColor() {
        if (!this.get('eventColor')) {
            return this.parent.eventColor;
        }
        return super.eventColor;
    }
}
