import { TaskBoard } from '../../../build/thin/taskboard.module.thin.js';
import { DateHelper } from '../../../build/thin/core.module.thin.js';

class Kanban extends TaskBoard {
    static type = 'kanban';

    static configurable = {
        // Experimental, transition moving cards using the editor
        useDomTransition  : true,
        resourceImagePath : '../_shared/images/users/',
        flex              : 1,
        // Force sorting by weight, independent of how Gantt sorts the tasks
        taskSorterFn      : true,

        // TaskBoard columns, text and color also used above in Gantt's status column and on the tasks
        columns : [
            { id : 'todo', text : 'Todo', color : 'gantt-blue' },
            { id : 'wip', text : 'In progress', color : 'pale-amber' },
            { id : 'review', text : 'Review', color : 'pale-teal' },
            { id : 'done', text : 'Finished', color : 'gantt-green' }
        ],

        columnField : 'status',

        features : {
            taskEdit : {
                // Prevent TaskBoard's task editor from showing and display Gantt's instead
                processItems({ taskRecord }) {
                    this.client.gantt.editTask(taskRecord);

                    return false;
                }
            }
        },

        // Move the resource avatars task item to the card header
        headerItems : {
            resources : { type : 'resourceAvatars' }
        },

        // Add some more content to the task body
        bodyItems : {
            // Task startDate, with 2020-02-27 format
            startDate : {
                type     : 'template',
                template : ({ value }) => `<div>Start date:</div>${DateHelper.format(value, 'YYYY-MM-DD')}`
            },
            // Task duration + localized duration unit
            duration : {
                type     : 'template',
                template : ({ value, taskRecord }) => `<div>Duration:</div> ${value} ${DateHelper.getLocalizedNameOfUnit(taskRecord.durationUnit, value !== 1)}`
            },
            // Progress bar, 0 - 100, to show task's percent done
            progress : { type : 'progress', max : 100, field : 'percentDone' }
        },

        // Remove resource avatars task item from the card footer (displayed in the header above)
        footerItems : {
            resourceAvatars : false
        },

        listeners : {
            // Scroll task into view in Gantt when selecting a card on the TaskBoard
            async selectionChange({ select }) {
                if (select.length) {
                    this.gantt.scrollTaskIntoView(select[0], { animate : true, highlight : true });
                }
            }
        }
    };
}

Kanban.initClass();
