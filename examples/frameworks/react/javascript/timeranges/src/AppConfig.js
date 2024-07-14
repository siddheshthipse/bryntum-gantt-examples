/**
 * Application configuration
 */
const ganttConfig = {
    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : 'data/timeranges.json'
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },

    flex    : '1 1 auto',
    columns : [
        {
            type  : 'name',
            field : 'name',
            width : 250
        }
    ],
    timeRangesFeature : {
        enableResizing      : true,
        showCurrentTimeLine : false,
        showHeaderElements  : true
    }
};

const gridConfig = {
    stripeFeature : true,
    sortFeature   : 'startDate',

    flex    : '0 0 350px',
    layout  : 'fit',
    cls     : 'timeranges-grid',
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
            renderer      : data => `${data.record.duration} d`
        }
    ]
};

export { ganttConfig, gridConfig };
