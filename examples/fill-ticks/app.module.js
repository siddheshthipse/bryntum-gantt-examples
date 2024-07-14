import { Gantt, DateHelper, StringHelper } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const gantt = new Gantt({
    appendTo : 'container',

    project : {
        autoLoad : true,
        loadUrl  : '../_datasets/fill-ticks.json'
    },

    columns : [
        { type : 'name', width : 250 }
    ],

    // Config that stretches the tasks to fill whole ticks
    fillTicks : true,

    // Make tasks snap when resizing / dragging. When combined with fillTicks it automatically snaps to full ticks
    snap : true,

    features : {
        // The NonWorkingTime feature also respects the fillTicks setting
        nonWorkingTime : true,
        // Custom task tooltip contents
        taskTooltip    : {
            template({ taskRecord }) {
                return `
                    <div class="b-gantt-task-title">${StringHelper.encodeHtml(taskRecord.name)}</div>
                    <div>${DateHelper.format(taskRecord.startDate, 'llll')}</div>
                    <div>${DateHelper.format(taskRecord.endDate, 'llll')}</div>
                `;
            }
        }
    },

    tbar : [
        {
            ref         : 'fillTicks',
            text        : 'Fill ticks',
            toggleable  : true,
            pressed     : true,
            icon        : 'b-fa-square',
            pressedIcon : 'b-fa-check-square',
            onToggle({ pressed }) {
                gantt.fillTicks = pressed;
            }
        },
        {
            ref         : 'snap',
            text        : 'Snap',
            toggleable  : true,
            pressed     : true,
            icon        : 'b-fa-square',
            pressedIcon : 'b-fa-check-square',
            onToggle({ pressed }) {
                gantt.snap = pressed;
            }
        }
    ]
});
