/**
* Application configuration
*
* Please note that this example uses the Bryntum Scheduler Pro, which is licensed separately.
*/
import { ProjectModel } from '@bryntum/gantt';

// project instance common to both Gantt and Scheduler Pro
const project = new ProjectModel({
    startDate : '2019-01-16',
    endDate   : '2019-02-13',

    // General calendar is used by default
    calendar : 'general',

    transport : {
        load : {
            url : './data/launch-saas.json'
        }
    },

    autoLoad : true,

    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

// Gantt configuration
const ganttConfig = {
    project,

    resourceImageFolderPath : './users/',
    flex                    : 1,

    labelsFeature : {
        left : {
            field  : 'name',
            editor : {
                type : 'textfield'
            }
        }
    },

    viewPreset  : 'weekAndDayLetter',
    columnLines : true,

    subGridConfigs : {
        locked : {
            flex : 5
        },
        normal : {
            flex : 8
        }
    },

    columns : [
        { type : 'sequence', minWidth : 50, width : 50, text : '', align : 'right', resizable : false },
        { type : 'name', width : 280 },
        { type : 'percent', text : '% Completed', field : 'percentDone', showValue : false, width : 120 },
        { type : 'resourceassignment', text : 'Assigned Resources', showAvatars : true, width : 160 }
    ],

    startDate : '2019-01-11',

    listeners : {
        beforeCellEditStart : ({ editorContext }) => editorContext.column.field !== 'percentDone' || editorContext.record.isLeaf
    }
};

// Please note that this example uses the Bryntum Scheduler Pro, which is licensed separately.
// Scheduler Pro configuration
const schedulerConfig = {
    project,

    flex                : 1,
    rowHeight           : 45,
    eventColor          : 'gantt-green',
    useInitialAnimation : false,

    resourceImagePath : './users/',

    dependenciesFeature : true,
    percentBarFeature   : true,

    columns : [
        {
            type           : 'resourceInfo',
            field          : 'name',
            text           : 'Resource',
            showEventCount : false,
            width          : 330
        },
        {
            text     : 'Assigned tasks',
            field    : 'events.length',
            width    : 120,
            editor   : false,
            align    : 'right',
            renderer : ({ value }) => `${value} task${value !== 1 ? 's' : ''}`
        },
        {
            text     : 'Assigned work days',
            width    : 160,
            editor   : false,
            align    : 'right',
            renderer : ({ record }) =>
                record.events
                    .map(task => task.duration)
                    .reduce((total, current) => {
                        return total + current;
                    }, 0) + ' days'
        }
    ]
};

export { ganttConfig, schedulerConfig };
