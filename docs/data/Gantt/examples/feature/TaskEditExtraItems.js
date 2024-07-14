// Project contains all the data and is responsible for correct scheduling
const project = new ProjectModel({
    startDate : new Date(2017, 0, 1),

    tasksData : [
        {
            id       : 1,
            name     : 'Write docs',
            expanded : true,
            children : [
                { id : 2, name : 'Proof-read docs', startDate : '2017-01-02', endDate : '2017-01-05', effort : 0 },
                { id : 3, name : 'Release docs', startDate : '2017-01-09', endDate : '2017-01-10', effort : 0 }
            ]
        }
    ],

    dependenciesData : [
        { fromTask : 2, toTask : 3 }
    ]
});

const gantt = new Gantt({
    appendTo : targetElement,
    flex     : '1 0 100%',
    height   : 190,

    project, // Gantt needs project to get schedule data from
    startDate : new Date(2016, 11, 31),
    endDate   : new Date(2017, 0, 11),

    columns : [
        { type : 'name', field : 'name', text : 'Name' }
    ],

    features : {
        taskEdit : {
            items : {
                // Add two widgets to the bottom of general tab
                generalTab : {
                    items : {
                        newTextField : {
                            type     : 'text',
                            weight   : 710,
                            readOnly : true,
                            editable : false,
                            label    : 'Milestone (New Field)',
                            name     : 'milestone',
                            flex     : '1 0 50%'
                        },
                        newButton : {
                            type   : 'button',
                            weight : 711,
                            text   : 'New Button',
                            flex   : '1 0 50%'
                        }
                    }
                }
            }
        }
    }
});
