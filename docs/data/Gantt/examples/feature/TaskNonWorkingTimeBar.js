const gantt = new Gantt({
    appendTo : targetElement,

    // makes the Gantt chart as tall as it needs to be to fit all rows
    autoHeight : true,

    columns : [
        { type : 'name', width : 150 },
        { type : 'calendar' }
    ],

    features : {
        taskNonWorkingTime : {
            mode : 'bar'
        }
    },

    project : {
        startDate : new Date(2022, 7, 4),

        tasksData : [
            { id : 1, name : 'Task 1', calendar : 'mon-thu', duration : 5 },
            { id : 2, name : 'Task 2', calendar : 'break', duration : 5 }
        ],
        calendarsData : [
            {
                id        : 'general',
                name      : 'General',
                intervals : [
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    }
                ]
            },
            {
                id        : 'mon-thu',
                name      : 'Mon-Thu',
                intervals : [
                    {
                        recurrentStartDate : 'on Fri at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    }
                ]
            },
            {
                id        : 'break',
                name      : 'Breaks',
                intervals : [
                    {
                        startDate : '2022-08-07',
                        endDate   : '2022-08-11',
                        isWorking : false
                    },
                    {
                        startDate : '2022-08-18',
                        endDate   : '2022-08-20',
                        isWorking : false
                    }
                ]
            }
        ]
    }
});
