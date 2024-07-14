import { Gantt } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

new Gantt({
    appendTo          : 'container',
    dependencyIdField : 'sequenceNumber',

    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : '../_datasets/launch-saas.json'
            }
        }
    },

    columns : [
        { type : 'name', width : 250 }
    ],

    // Custom task content, display task name on child tasks
    taskRenderer({ taskRecord }) {
        if (taskRecord.isLeaf && !taskRecord.isMilestone) {
            return taskRecord.name;
        }
    }
});
