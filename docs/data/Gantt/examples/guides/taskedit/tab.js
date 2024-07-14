new Gantt({
    appendTo : targetElement,

    autoHeight : true,
    rowHeight  : 40,
    barMargin  : 4,

    tasks : [
        {
            id        : 1,
            name      : 'Math course',
            expanded  : true,
            startDate : '2019-01-07',
            endDate   : '2019-01-12',
            children  : [
                {
                    id        : 2,
                    name      : 'Module 1',
                    startDate : '2019-01-07',
                    duration  : 2
                },
                {
                    id        : 3,
                    name      : 'Module 2',
                    startDate : '2019-01-09',
                    duration  : 2
                },
                {
                    id        : 4,
                    name      : 'Exams',
                    startDate : '2019-01-11',
                    duration  : 0
                }
            ]
        }
    ],

    dependencies : [
        {
            id        : 1,
            fromEvent : 2,
            toEvent   : 3
        },
        {
            id        : 2,
            fromEvent : 3,
            toEvent   : 4,
            lag       : 1
        }
    ],

    startDate : new Date(2019, 0, 6),
    endDate   : new Date(2019, 0, 10),

    features : {
        taskEdit : {
            items : {
                generalTab : {
                    items : {
                        // Add new field to the last position
                        newGeneralField : {
                            type   : 'textfield',
                            weight : 710,
                            label  : 'New field in General Tab',
                            // Name of the field matches data field name, so value is loaded/saved automatically
                            name   : 'custom'
                        }
                    }
                },
                // Add a custom tab to the first position
                newTab : {
                    // Tab is a FormTab by default
                    title  : 'New tab',
                    weight : 90,
                    items  : {
                        newTabField : {
                            type   : 'textfield',
                            weight : 710,
                            label  : 'New field in New Tab',
                            // Name of the field matches data field name, so value is loaded/saved automatically.
                            // In this case it is equal to the Task "name" field.
                            name   : 'name'
                        }
                    }
                }
            }
        }
    }
});
