const gantt = new Gantt({
    appendTo : targetElement,

    autoHeight : true,

    features : {
        taskCopyPaste : {
            useNativeClipboard : true
        }
    },

    columns : [
        { type : 'name' },
        { type : 'startdate' },
        { type : 'enddate' }
    ],

    startDate : new Date(2024, 4, 27),
    endDate   : new Date(2024, 5, 5),

    project : {
        startDate : '2024-05-27',

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
                        id       : 12,
                        name     : 'Task 2',
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
            }
        ]
    }
});
