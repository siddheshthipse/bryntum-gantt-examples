import { type BryntumGanttProps, type BryntumTreeGridProps } from '@bryntum/gantt-react';

export const ganttConfig : BryntumGanttProps = {
    enableUndoRedoKeys : true,
    flex               : '1 1 auto',
    dependencyIdField  : 'wbsCode',

    project : {
        transport : {
            load : {
                url : './data/launch-saas.json'
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

    columns : [
        { type : 'wbs' },
        { type : 'name', field : 'name', text : 'Name', width : 250 },
        { type : 'startdate', text : 'Start date' },
        { type : 'duration', text : 'Duration' },
        { text : 'Predecessors', type : 'predecessor', width : 112 },
        { text : 'Successors', type : 'successor', width : 112 },
        { type : 'addnew' }
    ],

    subGridConfigs : {
        locked : {
            width : 420
        }
    },

    loadMask : 'Loading tasks...',

    tbar : [
        'Gantt view',
        '->',
        {
            ref   : 'undoredoTool',
            type  : 'undoredo',
            text  : true,
            items : {
                transactionsCombo : null
            }
        }
    ]
};

export const treeGridConfig : BryntumTreeGridProps = {
    flex : '0 0 30em',

    tbar : ['Actions view'],

    readOnly : true,

    cellEditFeature : false,

    store : {
        tree   : true,
        fields : ['idx', 'title', 'changes'],
        data   : [{
            id      : -1,
            idx     : 0,
            title   : 'Initial state',
            changes : ''
        }]
    },

    columns : [
        { text : '#', field : 'idx', width : '1em', sortable : false },
        { text : 'Action', field : 'title', flex : 0.4, type : 'tree', sortable : false },
        { text : 'Changes', field : 'changes', flex : 0.6, sortable : false }
    ]
};
