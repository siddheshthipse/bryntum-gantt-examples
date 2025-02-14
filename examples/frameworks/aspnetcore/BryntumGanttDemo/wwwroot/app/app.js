import { Gantt, Panel, ProjectModel, Toast } from '@bryntum/gantt';

import Task from './lib/models/Task.js';
import Dependency from './lib/models/Dependency.js';
import Calendar from './lib/models/Calendar.js';
import Resource from './lib/models/Resource.js';
import Assignment from './lib/models/Assignment.js';
import GanttToolbar from './lib/GanttToolbar.js';
import BackendTools from './lib/BackendTools.js';

const project = window.project = new ProjectModel({
    taskModelClass       : Task,
    dependencyModelClass : Dependency,
    resourceModelClass   : Resource,
    assignmentModelClass : Assignment,
    calendarModelClass   : Calendar,

    transport : {
        load : {
            url       : 'ganttcrud/load',
            paramName : 'q'
        },
        sync : {
            url : 'ganttcrud/sync'
        }
    },

    listeners : {
        syncfail : ({ response, responseText }) => {
            if (!response || !response.success) {
                backendTools.serverError('Could not sync the data with the server.', responseText);
            }
        }
    },

    autoLoad : false,
    autoSync : false,

    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const gantt = window.gantt = new Gantt({
    project,

    dependencyIdField : 'sequenceNumber',

    weekStartDay : 1,
    startDate    : '2012-08-28',
    endDate      : '2012-11-05',
    columns      : [
        { type : 'wbs' },
        { type : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'duration' },
        { type : 'percentdone', width : 70 },
        { type : 'resourceassignment', width : 120 },
        {
            type  : 'predecessor',
            width : 112
        },
        {
            type  : 'successor',
            width : 112
        },
        { type : 'schedulingmodecolumn' },
        { type : 'calendar' },
        { type : 'percentdone', showCircle : true, text : '%', width : 70 },
        { type : 'constrainttype' },
        { type : 'constraintdate' },
        { type : 'deadlinedate' },
        { type : 'addnew' }
    ],

    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },

    columnLines : false,

    features : {
        indicators : {
            items : {
                deadline       : true,
                earlyDates     : false,
                lateDates      : false,
                constraintDate : false
            }
        },
        rollups : {
            disabled : true
        },
        progressLine : {
            disabled   : true,
            statusDate : new Date(2019, 1, 10)
        },
        taskMenu : {
            // Our items is merged with the provided defaultItems
            // So we add the provided convertToMilestone option.
            items : {
                convertToMilestone : true
            },
            processItems({ taskRecord, items }) {
                if (taskRecord.isMilestone) {
                    items.convertToMilestone = false;
                }
            }
        },
        filter         : true,
        dependencyEdit : true,
        timeRanges     : {
            showCurrentTimeLine : true
        },
        labels : {
            left : {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    }
});

// Add Save / Load / Reset buttons toolbar and server data load/sync handlers
const backendTools = new BackendTools(gantt);

new Panel({
    appendTo : 'container',
    layout   : 'fit',
    items    : [
        gantt
    ],
    tbar : new GanttToolbar({ gantt })
});

// console.time("load data");
project.load().then(() => {
    // console.timeEnd("load data");
    const stm = gantt.project.stm;

    stm.enable();
    stm.autoRecord = true;

}).catch(({ response, responseText }) => {

    if (response && response.message) {
        Toast.show({
            html : `${response.message}<br>
                    <b>Please make sure that you've read readme.md file carefully
                    and setup the database connection accordingly.</b>`,
            color   : 'b-red',
            style   : 'color:white',
            timeout : 0
        });
    }
});
