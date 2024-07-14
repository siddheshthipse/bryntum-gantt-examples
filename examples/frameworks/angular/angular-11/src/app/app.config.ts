/**
 * Application config file
 */

import { DateHelper, GanttConfig, ProjectModelConfig } from '@bryntum/gantt';

export const projectConfig: Partial<ProjectModelConfig> = {
    calendar     : 'general',
    startDate    : DateHelper.add(DateHelper.clearTime(new Date()), -7, 'day'),
    hoursPerDay  : 24,
    daysPerWeek  : 5,
    daysPerMonth : 20

};
export const ganttConfig: Partial<GanttConfig> = {
    project : {
        // no data
    },

    columns : [
        { type : 'wbs' },
        { type : 'name' }
    ],

    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },

    features : {
        timeRanges : {
            showCurrentTimeLine : true
        }
    },

    viewPreset : 'weekAndDayLetter',

    columnLines : true
};
