var {
    Grid,
    Gantt,
    ProjectModel,
    Splitter
} = bryntum.gantt;
class TimeRangesGrid extends Grid {
    // Factoryable type name
    static get type() {
        return 'timerangesgrid';
    }

    static get defaultConfig() {
        return {
            cls      : 'time-ranges-grid',
            features : {
                stripe : true,
                sort   : 'startDate'
            },
            columns : [{
                text  : 'Time ranges',
                flex  : 1,
                field : 'name'
            }, {
                type  : 'date',
                text  : 'Start Date',
                width : 110,
                align : 'right',
                field : 'startDate'
            }, {
                type          : 'number',
                text          : 'Duration',
                width         : 100,
                field         : 'duration',
                min           : 0,
                instantUpdate : true,
                renderer      : ({
                    record
                }) => typeof record.duration === 'number' ? `${record.duration} d` : ''
            }]
        };
    }

    construct(config) {
        super.construct(config);
    }
}
;

// Register this widget type with its Factory
TimeRangesGrid.initClass();
const project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/timeranges.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
const gantt = new Gantt({
    flex              : '1 1 auto',
    appendTo          : 'main',
    project,
    dependencyIdField : 'sequenceNumber',
    columns           : [{
        type  : 'name',
        field : 'name',
        width : 250
    }],
    features : {
        timeRanges : {
            enableResizing      : true,
            showCurrentTimeLine : false,
            showHeaderElements  : true
        }
    },
    tbar : [{
        type        : 'button',
        toggleable  : true,
        icon        : 'b-fa-square',
        pressedIcon : 'b-fa-check-square',
        text        : 'Show header elements',
        tooltip     : 'Toggles the rendering of time range header elements',
        pressed     : true,
        onClick({
            source: button
        }) {
            gantt.features.timeRanges.showHeaderElements = button.pressed;
        }
    }]
});
project.load();
const timeRangeStore = gantt.features.timeRanges.store;
new Splitter({
    appendTo : 'main'
});
new TimeRangesGrid({
    appendTo : 'main',
    flex     : '0 0 350px',
    store    : timeRangeStore,
    tbar     : [{
        type  : 'button',
        text  : 'Add time range',
        icon  : 'b-fa-plus',
        color : 'b-blue',
        onClick() {
            timeRangeStore.add({
                name      : 'New range',
                startDate : new Date(2019, 1, 27),
                duration  : 5
            });
        }
    }]
});
