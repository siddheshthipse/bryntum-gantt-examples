import { TaskModel, Gantt, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

// Extend default Task model class to provide additional CSS class
class Task extends TaskModel {

    static $name = 'Task';

    get cls() {
        // adds 'b-critical' CSS class to critical tasks
        return Object.assign(super.cls, { 'b-critical' : this.critical });
    }

}

const project = window.project = new ProjectModel({
    taskModelClass : Task,
    transport      : {
        load : {
            url : '../_datasets/criticalpaths.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const gantt = new Gantt({
    appendTo : 'container',

    project,

    dependencyIdField : 'sequenceNumber',

    columns : [
        { type : 'name' },
        { type : 'earlystartdate' },
        { type : 'earlyenddate' },
        { type : 'latestartdate' },
        { type : 'lateenddate' },
        { type : 'totalslack' }
    ],

    features : {
        // Critical paths features is always included, but starts disabled by default
        criticalPaths : {
            disabled : false
        }
    },

    tbar : [
        {
            type        : 'button',
            color       : 'b-red',
            icon        : 'b-fa-square',
            pressedIcon : 'b-fa-check-square',
            ref         : 'criticalPathsButton',
            text        : 'Highlight Critical Paths',
            toggleable  : true,
            pressed     : true,
            onToggle({ pressed }) {
                // toggle critical paths feature disabled/enabled state
                gantt.features.criticalPaths.disabled = !pressed;
            }
        }
    ]
});

project.load();
