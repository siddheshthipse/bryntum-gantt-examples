import TaskModel from '../../../lib/Gantt/model/TaskModel.js';
import colorStore from './ColorStore.js';

// here you can extend our default Task class with your additional fields, methods and logic
export default class Task extends TaskModel {

    static $name = 'Task';

    static fields = [
        { name : 'colorId', type : 'number' }
    ];

    static relations = {
        color : {
            foreignKey   : 'colorId',
            foreignStore : colorStore
        }
    };
}

Task.exposeRelations();
