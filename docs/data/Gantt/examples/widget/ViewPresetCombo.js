const gantt = new Gantt({
    appendTo   : targetElement,
    autoHeight : true,

    project : {
        startDate : new Date(2022, 5, 5),

        eventsData : [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    { id : 2, name : 'Proof-read docs', startDate : '2022-06-05', endDate : '2022-06-07', effort : 0 },
                    { id : 3, name : 'Release docs', startDate : '2022-06-08', endDate : '2022-06-10', effort : 0 }
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

    tbar : [
        { type : 'viewpresetcombo' }
    ]
});
