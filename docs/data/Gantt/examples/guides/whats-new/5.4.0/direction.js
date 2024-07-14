const gantt = new Gantt({
    appendTo : targetElement,

    autoHeight : true,

    columns : [
        { type : 'name', field : 'name', text : 'Name' },
        { type : 'schedulingdirection' }
    ],

    startDate : new Date(2024, 5, 1),
    endDate   : new Date(2024, 5, 11),

    project : {
        startDate : '2024-06-01',

        tasksData : [
            {
                id       : 1,
                name     : 'Project A',
                expanded : true,
                children : [
                    {
                        id       : 11,
                        name     : 'Task 1',
                        duration : 10
                    },
                    {
                        id        : 12,
                        name      : 'Task 2',
                        duration  : 3,
                        direction : 'Backward'
                    },
                    {
                        id       : 13,
                        name     : 'Task 3',
                        duration : 0
                    }
                ]
            }
        ],

        dependenciesData : [
            {
                id       : 1,
                fromTask : 11,
                toTask   : 13
            },
            {
                id       : 2,
                fromTask : 12,
                toTask   : 13
            }
        ]
    }
});
