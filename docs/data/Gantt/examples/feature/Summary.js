const gantt = new Gantt({
    appendTo  : targetElement,
    height    : 350,
    startDate : '2019-07-07',
    endDate   : '2019-07-29',
    tickSize  : 50,
    columns   : [
        { type : 'name', width : 250, sum : 'count', summaryRenderer : ({ sum }) => 'Summary' }
    ],
    features : {
        projectLines : false,
        summary      : {
            renderer : ({ taskStore, startDate, endDate }) => {
                // Find all intersecting task and render the count in each cell
                const intersectingTasks = taskStore.query(task =>
                    task.isScheduled &&
                    DateHelper.intersectSpans(task.startDate, task.endDate, startDate, endDate)
                );

                return intersectingTasks.length;
            }
        }
    },

    project : new ProjectModel({
        startDate  : '2019-07-07',
        duration   : 30,
        eventsData : [
            {
                id       : 1,
                name     : 'Project A',
                duration : 30,
                expanded : true,
                children : [
                    {
                        id       : 11,
                        name     : 'Plan project',
                        duration : 2,
                        leaf     : true,
                        cls      : 'child1'
                    },
                    {
                        id       : 12,
                        name     : 'Execute',
                        duration : 5,
                        leaf     : true,
                        cls      : 'child1'
                    },
                    {
                        id       : 13,
                        name     : 'Summarize project',
                        duration : 1,
                        leaf     : true,
                        cls      : 'child1'
                    }
                ]
            }
        ],
        dependenciesData : [
            {
                id        : 1,
                lag       : 1,
                fromEvent : 11,
                toEvent   : 12
            },
            {
                id        : 2,
                lag       : 1,
                fromEvent : 12,
                toEvent   : 13
            }
        ]
    })
});
