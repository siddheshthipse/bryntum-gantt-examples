import { Gantt, ProjectModel, DateHelper } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/constraints.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const gantt = new Gantt({
    appendTo : 'container',

    dependencyIdField : 'sequenceNumber',

    features : {
        // Enabling and configuring the Indicators feature
        indicators : {
            items : {
                // Early start/end dates indicator disabled
                earlyDates : false,

                // Custom indicator added
                beer : taskRecord =>  taskRecord.name.startsWith('C') ? {
                    startDate : DateHelper.add(taskRecord.endDate, 2, 'day'),
                    cls       : 'beer',
                    iconCls   : 'b-fa b-fa-beer',
                    name      : 'Post-task celebration beer'
                } : null
            }
        }
    },

    // Higher row and some more margin to accommodate the indicators
    rowHeight      : 50,
    resourceMargin : 15,

    // Initial width for the locked region
    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },

    // Columns relevant to the indicators
    columns : [
        { type : 'name' },
        { type : 'constraintdate', width : 100 },
        { type : 'constrainttype' },
        { type : 'deadlinedate' }
    ],

    project,

    tbar : [
        // Button showing a menu, to toggle indicators
        {
            type : 'button',
            icon : 'b-fa-bars',
            text : 'L{Indicators.Indicators}',
            menu : [
                { ref : 'earlyDates', text : 'L{Indicators.earlyDates}', checked : false, onToggle },
                { ref : 'lateDates', text : 'L{Indicators.lateDates}', checked : true, onToggle },
                { ref : 'deadlineDate', text : 'L{Indicators.deadlineDate}', checked : true, onToggle },
                { ref : 'constraintDate', text : 'L{Indicators.constraintDate}', checked : true, onToggle },
                { ref : 'beer', text : 'Beer', checked : true, onToggle }
            ]
        }
    ]
});

// Handles toggling indicators
function onToggle({ item, checked }) {
    gantt.features.indicators.items[item.ref] = checked;
}

project.load();
