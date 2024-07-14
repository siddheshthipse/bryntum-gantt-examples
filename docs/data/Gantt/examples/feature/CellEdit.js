targetElement.innerHTML = '<p>This demo shows the cell edit feature, double-click <b>Name</b> column cells or click the <b>Edit</b> button to start editing:</p>';

// Project contains all the data and is responsible for correct scheduling
const project = new ProjectModel({
    startDate : new Date(2017, 0, 1),

    tasksData : [
        {
            id       : 1,
            name     : 'Write docs',
            expanded : true,
            children : [
                { id : 2, name : 'Proof-read docs', startDate : '2017-01-02', endDate : '2017-01-05' },
                { id : 3, name : 'Release docs', startDate : '2017-01-09', endDate : '2017-01-10' }
            ]
        }
    ],

    dependenciesData : [
        { fromTask : 2, toTask : 3 }
    ]
});

const gantt = new Gantt({
    appendTo : targetElement,

    layoutConfig : {
        alignItems   : 'stretch',
        alignContent : 'stretch'
    },

    tbar : [{
        type    : 'button',
        text    : 'Edit',
        onClick : ({ source }) => {
            gantt.startEditing({
                field  : 'name',
                record : gantt.selectedRecords.length && gantt.selectedRecords[0] || gantt.taskStore.first
            });
        }
    }],

    ref       : 'gantt', // reference is used to easily obtain Gantt reference in it's parent container (see Edit button click handler)
    flex      : '1 0 100%',
    project, // Gantt needs project to get schedule data from
    startDate : new Date(2016, 11, 31),
    endDate   : new Date(2017, 0, 11),
    height    : 300,
    columns   : [
        { type : 'name', field : 'name', text : 'Name' }
    ]
});
