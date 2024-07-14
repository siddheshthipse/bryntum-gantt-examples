import { DateHelper } from '@bryntum/gantt';

const startDate = DateHelper.add(DateHelper.clearTime(new Date()), -7, 'day');

/**
 * Application configuration
 */
export const ganttConfig = {
    columns : [
        { type : 'name', width : 360 }
    ],
    timeRangesFeature : {
        showHeaderElements  : true,
        showCurrentTimeLine : true
    },
    viewPreset : 'weekAndDayLetter'
};

export const projectConfig = {
    calendar     : 'general',
    startDate,
    hoursPerDay  : 24,
    daysPerWeek  : 5,
    daysPerMonth : 20
};

export const sliderConfig = {
    text        : 'Set Bar Margin',
    min         : 0,
    max         : 15,
    width       : '14em',
    showTooltip : false
};
