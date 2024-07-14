import { Gantt, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const project = window.project = new ProjectModel({
    autoLoad : true,
    loadUrl  : '../_datasets/launch-saas.json'
});

new Gantt({
    appendTo          : 'container',
    dependencyIdField : 'sequenceNumber',

    project,

    columns : [
        { type : 'wbs' },  // adds WBSColumn to the gantt
        { type : 'name', width : 320 }
    ],

    features : {
        taskMenu : {
            items : {
                add : {
                    menu : {
                        subtask : {
                            // New sub-tasks will be the last child of the parent task
                            at : 'end'
                        }
                    }
                }
            }
        }
    },

    tbar : [
        {
            type    : 'checkbox',
            label   : 'Auto update WBS',
            checked : false,
            tooltip : 'Automatically update WBS values when adding or removing tasks, or when the tree is sorted',
            onAction({ checked }) {
                project.taskStore.wbsMode = checked ? 'auto' : 'manual';
            }
        },
        {
            type    : 'checkbox',
            label   : 'Use ordered tree to calculate WBS',
            checked : true,
            tooltip : 'When checked, the project tree maintains its original order. Sorting is only done for display',
            onAction({ checked }) {
                project.taskStore.useOrderedTreeForWbs = checked;
            }
        }
    ]
});
