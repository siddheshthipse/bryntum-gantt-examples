import { DateHelper, TimeZoneHelper, Gantt } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

// For a better view range, all dates are calculated as UTC.
const
    dayStartHour = 4,
    startDay     = new Date(2023, 2, 1, dayStartHour),
    timeZones    = ['America/Caracas', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
        'America/New_York', 'America/Sao_Paulo', 'America/St_Johns', 'Asia/Bangkok', 'Asia/Dhaka', 'Asia/Hong_Kong',
        'Asia/Tokyo', 'Australia/Adelaide', 'Australia/Melbourne', 'Europe/London', 'Europe/Helsinki', 'Europe/Moscow',
        'Europe/Stockholm', 'Indian/Maldives', 'Indian/Mahe', 'Pacific/Auckland', 'Pacific/Honolulu'];

let currentDay = startDay;

const gantt = new Gantt({
    appendTo : 'container',

    features : {
        timeRanges : {
            showCurrentTimeLine : true
        },
        baselines : true,
        labels    : {
            before : 'name'
        }
    },

    columns : [
        { type : 'name', field : 'name', width : '20em' }
    ],

    startDate  : startDay,
    endDate    : DateHelper.add(currentDay, 1, 'day'),
    viewPreset : 'hourAndDay',

    project : {
        startDate : startDay,
        autoLoad  : true,
        calendar  : '8h5d',
        loadUrl   : './data/data.json'
    },

    tbar : [
        'Current timezone:',
        {
            type           : 'combo',
            filterOperator : '*',
            // Options in the-drop down menu is those available for the native Intl.DateTimeFormat. The actual
            // time zone conversion uses toLocaleString('locale', { timeZone: chosenTimeZone }) and then parses it into
            // a local system date.
            items          : Intl.supportedValuesOf?.('timeZone') || timeZones,
            value          : new Intl.DateTimeFormat().resolvedOptions().timeZone, // Start value is local system timezone
            onSelect       : ({ record }) => {
                gantt.timeZone = record.text;
            }
        },
        '->',
        {
            type : 'button',
            text : 'Set baseline',
            onAction() {
                gantt.taskStore.setBaseline(1);
            }
        },
        {
            type  : 'buttongroup',
            items : [
                {
                    type    : 'button',
                    icon    : 'b-icon-previous',
                    tooltip : 'View previous day',
                    onAction() {
                        currentDay = DateHelper.add(currentDay, -1, 'day');
                        gantt.startDate = gantt.project.startDate = TimeZoneHelper.toTimeZone(currentDay, gantt.timeZone);
                    }
                },
                {
                    type    : 'button',
                    ref     : 'todayButton',
                    text    : 'Today',
                    tooltip : 'View today, to see the current time line',
                    onAction() {
                        currentDay = DateHelper.set(new Date(), 'hour', dayStartHour);
                        gantt.startDate = gantt.project.startDate = TimeZoneHelper.toTimeZone(currentDay, gantt.timeZone);
                    }
                },
                {
                    type    : 'button',
                    icon    : 'b-icon-next',
                    tooltip : 'View next day',
                    onAction() {
                        currentDay = DateHelper.add(currentDay, 1, 'day');
                        gantt.startDate = gantt.project.startDate = TimeZoneHelper.toTimeZone(currentDay, gantt.timeZone);
                    }
                }
            ]
        }
    ]
});
