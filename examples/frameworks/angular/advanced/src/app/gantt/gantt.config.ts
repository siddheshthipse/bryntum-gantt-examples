/**
 * Gantt configuration file
 */

import '../lib/GanttToolbar.js';
import '../lib/StatusColumn.js';
import Task from '../lib/Task.js';

const ganttConfig = {
    dependencyIdField : 'wbsCode',

    project : {
        // Let the Project know we want to use our own Task model with custom fields / methods
        taskModelClass : Task,
        transport      : {
            load : {
                url : 'assets/data/launch-saas.json'
            }
        },
        autoLoad : true,

        // The State TrackingManager which the UndoRedo widget in the toolbar uses
        stm : {
            autoRecord : true
        },

        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },

    startDate               : '2019-01-12',
    endDate                 : '2019-03-24',
    resourceImageFolderPath : 'assets/users/',
    columns                 : [
        { type : 'wbs' },
        { type : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'duration' },
        { type : 'resourceassignment', width : 120, showAvatars : true },
        { type : 'percentdone', showCircle : true, width : 70 },
        {
            type  : 'predecessor',
            width : 112
        },
        {
            type  : 'successor',
            width : 112
        },
        { type : 'schedulingmodecolumn' },
        { type : 'calendar' },
        { type : 'constrainttype' },
        { type : 'constraintdate' },
        { type : 'statuscolumn' },
        {
            type  : 'date',
            text  : 'Deadline',
            field : 'deadline'
        },
        { type : 'addnew' }
    ],

    subGridConfigs : {
        locked : {
            flex : 3
        },
        normal : {
            flex : 4
        }
    },

    columnLines : false,

    features : {
        rollups : {
            disabled : true
        },
        baselines : {
            disabled : true
        },
        progressLine : {
            disabled   : true,
            statusDate : new Date(2019, 0, 25)
        },
        filter         : true,
        dependencyEdit : true,
        timeRanges     : {
            showCurrentTimeLine : true
        },
        labels : {
            left : {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    },

    tbar : {
        type : 'gantttoolbar'
    }
};

export default ganttConfig;
