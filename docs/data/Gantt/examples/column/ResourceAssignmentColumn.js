const gantt = new Gantt({
    appendTo : targetElement,
    height   : 250,

    subGridConfigs : {
        locked : { flex : 1 },
        normal : { collapsed : true }
    },

    project : {
        startDate : new Date(2020, 0, 1),

        eventsData : [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    { id : 2, name : 'Proof-read docs', startDate : '2020-01-02', endDate : '2020-01-05', effort : 0 },
                    { id : 3, name : 'Release docs', startDate : '2020-01-09', endDate : '2020-01-10', effort : 0 }
                ]
            }
        ],

        resourcesData : [
            { id : 1, name : 'John Johnson' },
            { id : 2, name : 'Janet Janetson' },
            { id : 3, name : 'Kermit the Frog' },
            { id : 4, name : 'Kermit the Frog Jr.' }
        ],

        assignmentsData : [
            { resource : 1, event : 2, units : 50 },
            { resource : 3, event : 2 }
        ],

        dependenciesData : [
            { fromEvent : 2, toEvent : 3 }
        ]
    },

    columns : [
        {
            type   : 'resourceassignment',
            width  : 120,
            editor : {
                chipView : {
                    // This template is used when editing the value
                    itemTpl : assignment => assignment.resourceName
                }
            },
            // This template is used by the column
            itemTpl : assignment => assignment.resourceName
        }
    ]
});
