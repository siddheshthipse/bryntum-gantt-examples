import { Gantt, StringHelper, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const
    prioTextMap = { 1 : 'High', 2 : 'Medium', 3 : 'Low' },
    project     = new ProjectModel({
        loadUrl : '../_datasets/launch-saas.json',

        taskStore : {
            fields : ['priority', 'cost']
        }
    });

const gantt = new Gantt({
    appendTo : 'container',

    features : {
        treeGroup : {
            hideGroupedColumns : true,
            levels             : [
                'priority'
            ],
            parentRenderer({ field, value, column, record }) {
                // Do not html encode priority columns value, it uses custom markup
                if (column.field === 'priority') {
                    return `<div>${StringHelper.encodeHtml(column.text)}:</div>${value}`;
                }
                // For generated group parent, prefix with the grouped column text
                return StringHelper.xss`<div>${column.text}: ${value}</div>`;
            }
        }
    },

    project,

    tbar : [
        'Drag columns here to group',
        { type : 'groupbar' }
    ],
    columns : [
        {
            type       : 'name',
            flex       : 1,
            minWidth   : 300,
            htmlEncode : false,
            renderer   : ({ value }) => StringHelper.xss`<div>${value}</div>`
        },
        { field : 'cost', text : 'Cost', width : 150 },
        {
            field    : 'priority',
            text     : 'Priority',
            width    : 120,
            type     : 'template',
            template : ({ value = '' }) => `<div class="b-prio b-prio-${StringHelper.encodeHtml(value)}">${prioTextMap[value] || ''}</div>`
        },
        { type : 'startdate' },
        { type : 'duration', width : 150 }
    ]
});

project.load();
