import { Gantt } from '../../../build/thin/gantt.module.thin.js';

class GanttChart extends Gantt {
    static type = 'ganttchart';

    static configurable = {
        resourceImageFolderPath : '../_shared/images/users/',
        flex                    : 1,
        viewPreset              : 'weekAndDayLetter',

        columns : [
            { type : 'name', width : 280 },
            { type : 'resourceassignment', width : 120, showAvatars : true },
            // Custom column that renders a "status tag"
            {
                text   : 'Status',
                field  : 'status',
                width  : 120,
                editor : {
                    type       : 'combo',
                    editable   : false,
                    autoExpand : true,
                    items      : [
                        ['todo', 'Todo'],
                        ['wip', 'In progress'],
                        ['review', 'Review'],
                        ['done', 'Finished']
                    ]
                },
                renderer({ value }) {
                    // Get the TaskBoard column that the task is displayed in
                    const taskBoardColumn = value && this.grid.taskBoard.columns.getById(value);
                    if (taskBoardColumn) {
                        // Return a DomConfig to create a custom "status tag"
                        return {
                            className : {
                                'status-tag'                                   : true,
                                // Match color used for the TaskBoard column
                                [`b-taskboard-color-${taskBoardColumn.color}`] : true
                            },
                            children : [
                                // And use that columns text
                                { text : taskBoardColumn.text }
                            ]
                        };
                    }
                }
            }
        ],

        features : {
            taskEdit : {
                editorConfig : {
                    // Center the task editor instead of aligning it to a task, to look better when used from
                    // the TaskBoard
                    centered : true
                },
                items : {
                    generalTab : {
                        items : {
                            // Add a field to edit task status to the general tab
                            status : {
                                type  : 'combo',
                                label : 'Status',
                                name  : 'status',
                                flex  : 0.5,
                                items : [
                                    ['todo', 'Todo'],
                                    ['wip', 'In progress'],
                                    ['review', 'Review'],
                                    ['done', 'Finished']
                                ]
                            }
                        }
                    }
                }
            }
        },

        startDate : '2022-01-09',

        // A custom task renderer, that adds a small circular icon showing task's status
        taskRenderer({ taskRecord }) {
            const taskBoardColumn = this.taskBoard.columns.getById(taskRecord.status);
            if (taskBoardColumn && !taskRecord.isMilestone) {
                return {
                    className : {
                        status                                         : true,
                        [`b-taskboard-color-${taskBoardColumn.color}`] : true,
                        [taskRecord.status]                            : true
                    }
                };
            }
        },

        listeners : {
            // Scroll task into view on the TaskBoard when selecting in Gantt
            selectionChange({ selected }) {
                if (selected.length) {
                    this.taskBoard.scrollToTask(selected[0]);
                }
            }
        }
    };
}

GanttChart.initClass();
