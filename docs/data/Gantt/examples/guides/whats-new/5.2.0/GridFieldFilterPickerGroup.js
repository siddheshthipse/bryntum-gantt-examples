const gantt = new Gantt({
    autoHeight : true,

    columns : [
        { type : 'name', field : 'name', text : 'Name' },
        { type : 'date', field : 'startDate', text : 'Start Date' }
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
                        name     : 'Design website',
                        duration : 5
                    },
                    {
                        id       : 12,
                        name     : 'Lease office space',
                        duration : 4
                    },
                    {
                        id       : 13,
                        name     : 'Buy coffee machine',
                        duration : 3
                    },
                    {
                        id       : 14,
                        name     : 'Hire designer',
                        duration : 3
                    },
                    {
                        id       : 15,
                        name     : 'Write design handbook',
                        duration : 3
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
            },
            {
                id       : 3,
                fromTask : 14,
                toTask   : 15
            }
        ],

        listeners : {
            load : ({ source : project }) => project.taskStore.filter()
        }
    },

    features : {
        filter : true
    }

});

const demo = new Container({
    appendTo : targetElement,
    layout   : 'vbox',
    items    : {
        gantt,
        filtersPanel : {
            type     : 'panel',
            title    : 'Filters',
            maxWidth : '30em',
            style    : { marginBlockStart : '1em' },
            items    : {
                filters : {
                    type    : 'gridfieldfilterpickergroup',
                    grid    : gantt,
                    filters : [{
                        property      : 'name',
                        operator      : 'includes',
                        value         : 'design',
                        caseSensitive : false,
                        disabled      : true
                    }, {
                        property : 'startDate',
                        operator : '>',
                        value    : new Date(2022, 1, 4)
                    }]
                }
            }
        }
    }
});
