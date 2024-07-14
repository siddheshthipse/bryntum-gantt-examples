/**
 * Application config file
 */
import { GanttConfig, ProjectModelConfig, GridConfig, StringHelper, TaskModel, Model } from '@bryntum/gantt';

export const projectConfig: Partial<ProjectModelConfig> = {
    calendar     : 'general',
    startDate    : '2019-01-14',
    hoursPerDay  : 24,
    daysPerWeek  : 5,
    daysPerMonth : 20

};

export const ganttConfig: Partial<GanttConfig> = {
    project : {
        // no data
    },

    flex              : 4,
    dependencyIdField : 'sequenceNumber',
    subGridConfigs    : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },

    columns : [
        { type : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'duration' }
    ],

    features : {
        timeRanges : {
            showCurrentTimeLine : true
        }
    }
};

export const gridConfig: Partial<GridConfig> = {
    rowHeight : 50,
    cls       : 'unplannedTasks',
    flex      : 1,
    minWidth  : 195,
    features  : {
        stripe : true,
        sort   : 'name'
    },
    store : {
        modelClass : TaskModel
    },
    columns : [
        {
            text       : 'Unscheduled tasks',
            flex       : 2,
            minWidth   : 195,
            field      : 'name',
            htmlEncode : false,
            renderer   : (
                { record } :
                { record: Partial<Model & { iconCls : string; name: string }>}
            ) => StringHelper.xss`<i class="unplanned-icon ${record.iconCls}"></i>${record.name}`
        },
        {
            type  : 'duration',
            flex  : 1,
            align : 'right'
        }
    ]
};
