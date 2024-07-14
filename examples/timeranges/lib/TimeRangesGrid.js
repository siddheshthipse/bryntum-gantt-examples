import Grid from '../../../lib/Grid/view/Grid.js';
import '../../../lib/Grid/column/DateColumn.js';

export default class TimeRangesGrid extends Grid {
    // Factoryable type name
    static get type() {
        return 'timerangesgrid';
    }

    static get defaultConfig() {
        return {
            cls : 'time-ranges-grid',

            features : {
                stripe : true,
                sort   : 'startDate'
            },

            columns : [
                {
                    text  : 'Time ranges',
                    flex  : 1,
                    field : 'name'
                },
                {
                    type  : 'date',
                    text  : 'Start Date',
                    width : 110,
                    align : 'right',
                    field : 'startDate'
                },
                {
                    type          : 'number',
                    text          : 'Duration',
                    width         : 100,
                    field         : 'duration',
                    min           : 0,
                    instantUpdate : true,
                    renderer      : ({ record }) => typeof record.duration === 'number' ? `${record.duration} d` : ''
                }]
        };
    }

    construct(config) {
        super.construct(config);

    }
};

// Register this widget type with its Factory
TimeRangesGrid.initClass();
