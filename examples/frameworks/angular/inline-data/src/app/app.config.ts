import { DateHelper, GanttConfig, ProjectModelConfig } from '@bryntum/gantt';

const startDate = DateHelper.add(DateHelper.clearTime(new Date()), -7, 'day');

export const projectConfig: Partial<ProjectModelConfig> = {
    calendar     : 'general',
    startDate,
    hoursPerDay  : 24,
    daysPerWeek  : 5,
    daysPerMonth : 20

};

export const ganttConfig: Partial<GanttConfig> = {

    columns : [
        { type : 'name', width : 360 }
    ],

    features : {
        timeRanges : {
            showHeaderElements  : true,
            showCurrentTimeLine : true
        }
    },

    viewPreset : 'weekAndDayLetter'
};
