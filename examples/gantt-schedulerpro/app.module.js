import { Splitter, WidgetHelper, Gantt, SchedulerPro, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

// Project that will be shared by Gantt & SchedulerPro
const project = window.project = new ProjectModel({
    startDate : '2019-01-16',
    endDate   : '2019-02-13',

    // General calendar is used by default
    calendar : 'general',

    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    autoLoad : true,

    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const gantt = new Gantt({
    project,

    tbar : [
        {
            type : 'widget',
            html : 'Zoom:'
        },
        {
            ref      : 'zoomInButton',
            icon     : 'b-icon-search-plus',
            tooltip  : 'Zoom in',
            onAction : () => gantt.zoomIn()
        },
        {
            ref      : 'zoomOutButton',
            icon     : 'b-icon-search-minus',
            tooltip  : 'Zoom out',
            onAction : () => gantt.zoomOut()
        }
    ],

    resourceImageFolderPath : '../_shared/images/users/',
    appendTo                : 'container',
    flex                    : 1,
    features                : {
        labels : {
            left : {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    },

    viewPreset  : 'weekAndDayLetter',
    columnLines : true,

    columns : [
        { type : 'sequence', minWidth : 50, width : 50, text : '', align : 'right', resizable : false },
        { type : 'name', width : 280 },
        { type : 'percent', text : '% Completed', field : 'percentDone', showValue : false, width : 160 },
        { type : 'resourceassignment', text : 'Assigned Resources', showAvatars : true, width : 160 }
    ],

    startDate : '2019-01-11',

    listeners : {
        beforeCellEditStart : ({ editorContext }) => editorContext.column.field !== 'percentDone' || editorContext.record.isLeaf
    }
});

new Splitter({
    appendTo : 'container'
});

const scheduler = new SchedulerPro({
    project,

    appendTo            : 'container',
    minHeight           : '20em',
    flex                : 1,
    partner             : gantt,
    rowHeight           : 45,
    eventColor          : 'gantt-green',
    useInitialAnimation : false,

    resourceImagePath : '../_shared/images/users/',

    features : {
        dependencies : true,
        percentBar   : true
    },

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
            width    : 160,
            editor   : false,
            align    : 'right',
            renderer : ({ value }) => `${value} task${value !== 1 ? 's' : ''}`
        },
        {
            text     : 'Assigned work days',
            width    : 160,
            editor   : false,
            align    : 'right',
            renderer : ({ record }) => record.events.map(task => task.duration).reduce((total, current) => {
                return total + current;
            }, 0) + ' days'
        }
    ]
});
