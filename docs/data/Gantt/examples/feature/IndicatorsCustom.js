// Project contains all the data and is responsible for correct scheduling
const project = new ProjectModel({
    startDate : '2020-02-20',
    tasksData : [
        {
            id       : 1,
            name     : 'Write docs',
            expanded : true,
            children : [
                {
                    id          : 2,
                    name        : 'Proof-read docs',
                    startDate   : '2020-02-24',
                    duration    : 4,
                    endDate     : '2020-02-28',
                    percentDone : 60
                },
                {
                    id        : 3,
                    name      : 'Release docs',
                    startDate : '2020-02-24',
                    duration  : 4,
                    endDate   : '2020-02-28'
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
        indicators : {
            items : {
                earlyDates        : false,
                lateDates         : false,
                // A custom indicator
                myCustomIndicator : taskRecord => taskRecord.percentDone > 50 ? {
                    startDate : DateHelper.add(taskRecord.endDate, 2, 'days'),
                    name      : 'Custom indicator',
                    iconCls   : 'b-fa b-fa-book'
                } : null
            }
        },
        projectLines : false
    },
    appendTo  : targetElement,
    project, // Gantt needs project to get schedule data from
    startDate : '2020-02-16',
    endDate   : '2020-03-07',
    height    : 240,
    rowHeight : 50,
    barMargin : 15,
    columns   : [
        { type : 'name', field : 'name', text : 'Name' }
    ]
});
