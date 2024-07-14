/**
 * Application configuration
 */
import { DateHelper } from '@bryntum/gantt';

const startDate = DateHelper.add(DateHelper.clearTime(new Date()), -7, 'day');

export const projectConfig = {
    calendar     : 'general',
    startDate,
    hoursPerDay  : 24,
    daysPerWeek  : 5,
    daysPerMonth : 20
};

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
