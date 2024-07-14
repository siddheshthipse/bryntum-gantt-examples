import Grid from '../../../lib/Grid/view/Grid.js';
import StringHelper from '../../../lib/Core/helper/StringHelper.js';

export default class UnplannedGrid extends Grid {
    // Original class name getter. See Widget.$name docs for the details.
    static get $name() {
        return 'UnplannedGrid';
    }

    // Factoryable type name
    static get type() {
        return 'unplannedgrid';
    }

    static get configurable() {
        return {
            rowHeight : 50,
            cls       : 'unplannedTasks',
            flex      : 1,
            minWidth  : 195,
            features  : {
                stripe : true,
                sort   : 'name'
            },

            columns : [
                {
                    text       : 'Unscheduled tasks',
                    flex       : 2,
                    minWidth   : 195,
                    field      : 'name',
                    htmlEncode : false,
                    renderer   : ({ record }) => StringHelper.xss`<i class="unplanned-icon ${record.iconCls}"></i>${record.name}`
                },
                {
                    type  : 'duration',
                    flex  : 1,
                    align : 'right'
                }
            ]
        };
    }
};

// Register this widget type with its Factory
UnplannedGrid.initClass();
