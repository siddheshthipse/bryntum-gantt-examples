const gantt = new Gantt({
    appendTo   : targetElement,
    autoHeight : true,
    forceFit   : true,

    project : {
        tasksData : [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    {
                        id        : 2,
                        name      : 'Proof-read docs',
                        startDate : '2022-06-02',
                        endDate   : '2022-06-05'
                    },
                    {
                        id        : 3,
                        name      : 'Release docs',
                        startDate : '2022-06-05',
                        endDate   : '2022-06-10'
                    }
                ]
            },

            {
                id       : 4,
                name     : 'Discuss with client',
                expanded : true,
                children : [
                    {
                        id        : 5,
                        name      : 'C-level discussion',
                        startDate : '2022-06-10',
                        endDate   : '2022-06-15'
                    },
                    {
                        id        : 6,
                        name      : 'UX team issues',
                        startDate : '2022-06-15',
                        duration  : 0
                    }
                ]
            }
        ],

        dependenciesData : [
            { from : 2, to : 3 },
            { from : 3, to : 4 },
            { from : 5, to : 6 }
        ]
    },

    columns : [
        { type : 'name', width : 250 }
    ],

    features : {
        projectLines : false,
        parentArea   : true
    }
});
