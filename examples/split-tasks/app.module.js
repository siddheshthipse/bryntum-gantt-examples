import { Gantt, StringHelper } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const gantt = new Gantt({
    appendTo : 'container',

    cls : 'custom-styling',

    project : {
        autoLoad : true,
        loadUrl  : '../_datasets/split-tasks.json'
    },

    columns : [
        { type : 'name', width : 250 }
    ],

    features : {
        nonWorkingTime : {
            disabled : true
        },
        percentBar : {
            disabled : true
        }
    },

    tickSize : 70,

    // Custom task content
    taskRenderer({ taskRecord }) {
        // Display segment names
        if (taskRecord.isEventSegment) {
            return StringHelper.encodeHtml(taskRecord.name);
        }

        return '';
    },

    tbar : [
        {
            text        : 'Custom styling',
            icon        : 'b-fa-square',
            pressedIcon : 'b-fa-check-square',
            toggleable  : true,
            pressed     : true,
            onToggle({ pressed }) {
                gantt.element.classList.toggle('custom-styling', pressed);
                gantt.features.nonWorkingTime.disabled = pressed;
                gantt.features.percentBar.disabled = pressed;
            }
        }
    ]
});
