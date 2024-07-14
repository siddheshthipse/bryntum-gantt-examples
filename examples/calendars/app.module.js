import { Gantt, DateHelper, Toast } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const gantt = new Gantt({
    appendTo : 'container',

    project : {
        loadUrl  : '../_datasets/calendars.json',
        autoLoad : true
    },

    tickSize : 50,

    columns : [
        { type : 'name', width : 250 },
        { type : 'calendar', width : 200 }
    ],

    features : {
        taskNonWorkingTime : {
            tooltipTemplate({ name, startDate, endDate, iconCls }) {
                return `                   
                    <p class="b-nonworkingtime-tip-title">${iconCls ? `<i class="${iconCls}"></i>` : ''}${name || 'Non-working time'}</p>
                    ${DateHelper.format(startDate, 'L')} - ${DateHelper.format(endDate, 'L')}
                `;
            }
        },
        nonWorkingTime : {
            disabled : true
        },
        percentBar : false
    },

    tbar : [
        {
            text       : 'Highlight project non-working time',
            toggleable : true,
            pressed    : false,
            onToggle({ pressed }) {
                gantt.features.nonWorkingTime.disabled = !pressed;
            }
        },
        {
            text       : 'Highlight task non-working time',
            pressed    : true,
            toggleable : true,
            onToggle({ pressed }) {
                gantt.features.taskNonWorkingTime.disabled = !pressed;
                gantt.widgetMap.custom.disabled            = !pressed;
                gantt.widgetMap.mode.disabled              = !pressed;
            }
        },
        {
            ref        : 'mode',
            type       : 'combo',
            label      : 'Display mode',
            value      : 'row',
            inputWidth : '5em',
            editable   : false,
            items      : [
                ['row', 'Row'],
                ['bar', 'Bar'],
                ['both', 'Both']
            ],
            onChange({ value }) {
                gantt.features.taskNonWorkingTime.mode = value;
            }
        },
        {
            ref        : 'custom',
            text       : 'Custom styling',
            toggleable : true,
            onToggle() {
                gantt.element.classList.toggle('b-custom-nonworkingtime');
            }
        }
    ],
    listeners : {
        nonWorkingTimeClick       : 'onNonWorkingTimeElementInteraction',
        nonWorkingTimeContextMenu : 'onNonWorkingTimeElementInteraction',
        nonWorkingTimeDoubleClick : 'onNonWorkingTimeElementInteraction'
    },

    onNonWorkingTimeElementInteraction({ type, name, startDate, endDate, domEvent }) {
        const action = domEvent.type === 'contextmenu' ? 'rightclick' : domEvent.type;
        Toast.show(`You ${action}ed ${name || 'a non working range'}, starting: ${DateHelper.format(startDate, 'll')}`);
    }
});
