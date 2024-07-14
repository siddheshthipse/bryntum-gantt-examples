const gantt = new Gantt({
    appendTo : targetElement,

    autoHeight : true,

    columns : [
        { type : 'name', field : 'name', text : 'Name' }
    ],

    fillTicks : true,
    startDate : new Date(2022, 1, 4),
    endDate   : new Date(2022, 1, 11),

    project : {
        startDate : '2022-02-01T10:00',

        tasksData : [
            {
                id       : 1,
                name     : 'Project A',
                expanded : true,
                children : [
                    {
                        id       : 11,
                        name     : 'Task 1',
                        duration : 5
                    },
                    {
                        id       : 12,
                        name     : 'Task 2',
                        duration : 4
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
            text        : 'Fill ticks',
            pressed     : true,
            toggleable  : true,
            icon        : 'b-fa-square',
            pressedIcon : 'b-fa-check-square',
            onToggle({ pressed }) {
                gantt.fillTicks = pressed;
            }
        }
    ]
});
