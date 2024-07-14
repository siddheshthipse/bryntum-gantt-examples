import { Gantt, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

new Gantt({
    appendTo : 'container',

    project,

    dependencyIdField : 'sequenceNumber',

    tbar : {
        items : {
            textLabel : {
                type : 'label',
                text : 'Press Ctrl (Win) or Cmd (Mac) to pin successors after drag-drop'
            }
        }
    },

    columns : [
        { type : 'name', width : 250 }
    ],

    features : {
        taskDrag : {
            // Enable pinSuccessors - when predecessor is dropped with CTRL key pressed lag on the outgoing
            // dependencies will be recalculated to not move successors
            pinSuccessors : true
        },
        taskResize : {
            pinSuccessors : true
        }
    }
});

project.load();
