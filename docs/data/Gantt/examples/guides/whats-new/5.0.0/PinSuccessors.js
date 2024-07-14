const gantt = new Gantt({
    appendTo : targetElement,

    // makes the Gantt chart as tall as it needs to be to fit all rows
    autoHeight : true,

    columns : [
        { type : 'name', field : 'name', text : 'Name' }
    ],

    features : {
        taskDrag : {
            pinSuccessors : true
        },
        taskResize : {
            pinSuccessors : true
        }
    },

    startDate : new Date(2022, 0, 9),
    endDate   : new Date(2022, 0, 23),

    project : {
        tasksData : [
            {
                id          : 1,
                name        : 'Setup web server',
                percentDone : 50,
                duration    : 10,
                expanded    : true,
                children    : [
                    {
                        id          : 11,
                        name        : 'Install Apache',
                        percentDone : 50,
                        startDate   : '2022-01-10',
                        duration    : 3,
                        color       : 'teal'
                    },
                    {
                        id          : 12,
                        name        : 'Configure firewall',
                        percentDone : 50,
                        duration    : 3
                    },
                    {
                        id          : 13,
                        name        : 'Setup load balancer',
                        percentDone : 50,
                        duration    : 3
                    },
                    {
                        id          : 14,
                        name        : 'Configure ports',
                        percentDone : 50,
                        duration    : 2
                    },
                    {
                        id          : 15,
                        name        : 'Run tests',
                        percentDone : 0,
                        duration    : 2
                    }
                ]
            }
        ],

        dependenciesData : [
            {
                id       : 1,
                fromTask : 11,
                toTask   : 15,
                lag      : 2
            },
            {
                id       : 2,
                fromTask : 12,
                toTask   : 15
            },
            {
                id       : 3,
                fromTask : 13,
                toTask   : 15
            },
            {
                id       : 4,
                fromTask : 14,
                toTask   : 15
            }
        ]
    }
});
