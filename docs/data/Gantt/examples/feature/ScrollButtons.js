const gantt = new Gantt({
    appendTo  : targetElement,
    height    : 350,
    startDate : '2023-01-01',
    endDate   : '2024-01-01',
    tickSize  : 30,
    features  : {
        scrollButtons : true,
        projectLines  : false
    },
    project : {
        startDate  : '2023-01-08',
        duration   : 30,
        eventsData : [
            {
                id        : 1,
                name      : 'Project A',
                startDate : '2023-01-01',
                duration  : 30,
                expanded  : true,
                children  : [
                    {
                        id                : 11,
                        name              : 'Early task',
                        startDate         : '2023-01-08',
                        duration          : 1,
                        leaf              : true,
                        manuallyScheduled : true
                    },
                    {
                        id        : 12,
                        name      : 'Early task #2',
                        startDate : '2023-01-08',
                        duration  : 1,
                        leaf      : true
                    },
                    {
                        id                : 13,
                        name              : 'Late task',
                        startDate         : '2023-07-08',
                        duration          : 3,
                        leaf              : true,
                        manuallyScheduled : true
                    },
                    {
                        id                : 14,
                        name              : 'Really late task',
                        duration          : 0,
                        startDate         : '2023-11-08',
                        leaf              : true,
                        manuallyScheduled : true
                    }
                ]
            }
        ],
        dependenciesData : [{
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
        }]
    }
});
