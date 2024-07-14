const gantt = new Gantt({
    appendTo : targetElement,

    // makes the Gantt chart as tall as it needs to be to fit all rows
    autoHeight : true,

    columns : [
        { type : 'name', field : 'name', text : 'Name' }
    ],

    features : {
        treeGroup : {
            levels : ['prio']
        }
    },

    startDate : new Date(2022, 1, 4),
    endDate   : new Date(2022, 1, 11),

    project : {
        taskStore : {
            fields : ['prio', 'category']
        },

        tasksData : [
            {
                id        : 1,
                name      : 'Project A',
                startDate : '2022-02-01',
                expanded  : true,
                children  : [
                    {
                        id        : 11,
                        name      : 'Task 1',
                        startDate : '2022-02-01',
                        duration  : 5,
                        prio      : 'High',
                        category  : 'In house'
                    },
                    {
                        id        : 12,
                        name      : 'Task 2',
                        startDate : '2022-02-01',
                        duration  : 5,
                        prio      : 'Low',
                        category  : 'In house'
                    },
                    {
                        id        : 13,
                        name      : 'Task 3',
                        startDate : '2022-02-01',
                        duration  : 4,
                        prio      : 'High',
                        category  : 'In house'
                    },
                    {
                        id        : 14,
                        name      : 'Task 4',
                        startDate : '2022-02-01',
                        duration  : 5,
                        prio      : 'High',
                        category  : 'External'
                    },
                    {
                        id        : 15,
                        name      : 'Task 5',
                        startDate : '2022-02-01',
                        duration  : 5,
                        prio      : 'Low',
                        category  : 'External'
                    }
                ]
            }
        ],

        dependenciesData : [
            {
                id       : 1,
                fromTask : 11,
                toTask   : 12
            },
            {
                id       : 2,
                fromTask : 13,
                toTask   : 14
            }
        ]
    },

    tbar : [
        {
            type        : 'buttongroup',
            toggleGroup : true,
            items       : [
                {
                    text    : 'Prio',
                    pressed : true,
                    onToggle({ pressed }) {
                        pressed && gantt.group(['prio']);
                    }
                },
                {
                    text : 'Category',
                    onToggle({ pressed }) {
                        pressed && gantt.group(['category']);
                    }
                },
                {
                    text : 'Prio + Category',
                    onToggle({ pressed }) {
                        pressed && gantt.group(['prio', 'category']);
                    }
                },
                {
                    text : 'none',
                    onToggle({ pressed }) {
                        pressed && gantt.clearGroups();
                    }
                }
            ]
        }
    ]
});
