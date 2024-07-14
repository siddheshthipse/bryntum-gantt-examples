const gantt = new Gantt({
    appendTo  : targetElement,
    height    : 200,
    startDate : '2022-07-25',
    endDate   : '2022-08-01',
    rowHeight : 60,
    project   : new ProjectModel({
        startDate  : '2022-07-25',
        eventsData : [
            {
                id        : 1,
                name      : 'Task A',
                startDate : '2022-07-25',
                duration  : 3,
                segments  : [
                    {
                        startDate : '2022-07-25',
                        duration  : 2
                    },
                    {
                        startDate : '2022-07-28',
                        duration  : 1
                    }
                ]
            },
            {
                id        : 2,
                name      : 'Task B',
                startDate : '2022-07-25',
                duration  : 3,
                segments  : [
                    {
                        startDate : '2022-07-25',
                        duration  : 1
                    },
                    {
                        startDate : '2022-07-27',
                        duration  : 2
                    },
                    {
                        startDate : '2022-07-30',
                        duration  : 1
                    }
                ]
            }
        ]
    })
});
