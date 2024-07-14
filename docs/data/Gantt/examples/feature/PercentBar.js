targetElement.innerHTML = [
    '<p>A basic gantt with no extra configuration, this what you get straight out of the box</p>',
    '<p>Put the mouse cursor over <b>Preparation work</b> task and notice the 50% completion percent bar and drag handler at the bottom of the task.</b>'
].join('');

// Gantt with basic configuration
const gantt = new Gantt({
    appendTo : targetElement,

    // makes Gantt as high as it needs to be to fit rows
    autoHeight : true,

    columns : [
        { type : 'name', field : 'name', text : 'Name' }
    ],

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
                    id          : 11,
                    name        : 'Preparation work',
                    startDate   : '2019-02-04',
                    percentDone : 50,
                    duration    : 5
                }
            ]
        }
    ]
});
