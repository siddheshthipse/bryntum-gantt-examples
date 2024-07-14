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

const gantt = new Gantt({
    appendTo : 'container',

    project,

    dependencyIdField : 'sequenceNumber',

    startDate : new Date(2019, 0, 6),

    columns : [
        {
            type  : 'name',
            field : 'name',
            width : 250
        },
        {
            type             : 'startdate',
            responsiveLevels : {
                small  : { hidden : true },
                medium : { hidden : true },
                large  : { hidden : false }
            }
        }
    ],

    features : {
        labels : {
            left : {
                field : 'name'
            }
        }
    },

    // Breakpoints at which configs should change
    responsiveLevels : {
        small : {
            // When below 500 px wide, apply "small"
            levelWidth : 500,
            // With these configs
            tickSize   : 15,
            rowHeight  : 40,

            collapsed : {
                locked : true
            }
        },
        medium : {
            // When below 800 px wide, apply "medium"
            levelWidth : 800,
            // With these configs
            tickSize   : 20,
            rowHeight  : 40,

            collapsed : {
                locked : false
            }
        },
        large : {
            // For any larger width, apply "large"
            levelWidth : '*',
            // With these configs
            tickSize   : 25,
            rowHeight  : 50,

            collapsed : {
                locked : false
            }
        }
    },

    listeners : {
        // Function called when reaching a responsive breakpoint (level)
        responsive({ source : gantt, level }) {
            gantt.tbar.items[3].html = `Responsive level: <b style="margin-left : .5em">${level}</b>`;
        }
    },

    tbar : [
        'Force',
        {
            type        : 'buttongroup',
            toggleGroup : true,
            items       : [
                {
                    text          : 'Small',
                    ganttMaxWidth : 499
                },
                {
                    text          : 'Medium',
                    ganttMaxWidth : 750
                },
                {
                    text          : 'Large',
                    ganttMaxWidth : 900
                },
                {
                    text          : 'None',
                    pressed       : true,
                    ganttMaxWidth : null,
                    tooltip       : 'Level is decided by browser window width'
                }
            ],
            onClick({ source : button }) {
                gantt.maxWidth = button.ganttMaxWidth;
            }
        },
        '->',
        'Responsive level:'
    ]
});

project.load();
