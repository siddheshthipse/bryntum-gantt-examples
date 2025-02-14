targetElement.innerHTML = '<p>This demo shows the baselines feature, hover the baselines to see details:</p>';
// Project contains all the data and is responsible for correct scheduling
const project = new ProjectModel({
    startDate : new Date(2017, 0, 1),

    tasksData : [
        {
            id       : 1,
            name     : 'Write docs',
            expanded : true,
            children : [
                {
                    id        : 2,
                    name      : 'Proof-read docs',
                    startDate : '2017-01-02',
                    endDate   : '2017-01-05',
                    baselines : [{
                        startDate : '2017-01-01',
                        endDate   : '2017-01-04'
                    }]
                },
                {
                    id        : 3,
                    name      : 'Release docs',
                    startDate : '2017-01-09',
                    endDate   : '2017-01-10',
                    baselines : [{
                        startDate : '2017-01-04',
                        endDate   : '2017-01-09'
                    }]
                }
            ]
        }
    ],

    dependenciesData : [
        { fromTask : 2, toTask : 3 }
    ]
});

const gantt = new Gantt({
    features : {
        baselines : true
    },
    appendTo  : targetElement,
    project, // Gantt needs project to get schedule data from
    startDate : new Date(2016, 11, 31),
    endDate   : new Date(2017, 0, 11),
    height    : 300,
    columns   : [
        { type : 'name', field : 'name', text : 'Name' }
    ]
});
