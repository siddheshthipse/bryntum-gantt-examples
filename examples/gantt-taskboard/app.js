import '../_shared/shared.module.thin.js';
import { Container } from '../../build/thin/core.module.thin.js';
import { ProjectModel } from '../../build/thin/gantt.module.thin.js';
import '../../build/thin/taskboard.module.thin.js';
import './lib/GanttChart.js';
import './lib/Kanban.js';

// Project that will be shared by Gantt & TaskBoard
const project = new ProjectModel({
    startDate : '2022-01-09',
    endDate   : '2022-02-01',

    // General calendar is used by default
    calendar : 'general',

    transport : {
        load : {
            url : 'data/project.json'
        }
    },

    // Add custom fields to tasks
    taskStore : {
        // TaskBoard uses status to determine column and weight to determine order
        fields    : ['status', 'weight'],
        listeners : {
            // Change percentDone when changing status
            update({ record : task, changes }) {
                if (changes.status) {
                    switch (task.status) {
                        case 'todo':
                            task.percentDone = 0;
                            break;
                        case 'wip':
                            task.percentDone = 50;
                            break;
                        case 'review':
                            task.percentDone = 90;
                            break;
                        case 'done':
                            task.percentDone = 100;
                            break;
                    }
                }
            }
        }
    },

    autoLoad : true,

    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const container = new Container({
    appendTo : 'container',
    layout   : 'vbox',
    items    : {
        // Gantt chart defined in lib/GanttChart.js
        gantt : {
            type : 'ganttchart',

            // Hook up the shared project
            project
        },
        splitter : {
            type : 'splitter'
        },
        // Kanban chart defined in lib/Kanban.js
        taskBoard : {
            type : 'kanban',

            // Hook up the shared project
            project
        }
    }
});

const { gantt, taskBoard } = container.widgetMap;

// Link TaskBoard to Gantt, expected by Gantt's taskRenderer etc
gantt.taskBoard = taskBoard;
// And vice versa
taskBoard.gantt = gantt;
