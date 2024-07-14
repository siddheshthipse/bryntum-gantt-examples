targetElement.innerHTML = '<p>A basic grid with no extra configuration, this what you get straight out of the box</p>';

const gantt = new Gantt({
    appendTo : targetElement,

    // makes the Gantt chart as tall as it needs to be to fit all rows
    autoHeight : true,

    columns : [
        { type : 'name', field : 'name', text : 'Name' }
    ],

    features : {
        taskMenu : true
    },

    startDate : new Date(2019, 1, 4),
    endDate   : new Date(2019, 1, 11),

    tasks : [
        {
            id        : 1,
            name      : 'Project A',
            startDate : '2019-02-04',
            duration  : 5,
            expanded  : true,
            children  : [
                {
                    id        : 11,
                    name      : 'Preparation work',
                    startDate : '2019-02-04',
                    duration  : 5
                }
            ]
        }
    ]
});
