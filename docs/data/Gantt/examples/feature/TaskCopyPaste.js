targetElement.innerHTML = '<p>Copy/cut and paste rows using keyboard shortcuts or context menu:</p>';

// Gantt with basic configuration
const gantt = new Gantt({
    appendTo   : targetElement,
    // makes Gantt as high as it needs to be to fit rows
    autoHeight : true,
    columns    : [
        { type : 'name', field : 'name', text : 'Name' }
    ],
    startDate : new Date(2021, 1, 4),
    endDate   : new Date(2021, 1, 11),
    tasks     : [
        {
            id        : 1,
            name      : 'Project A',
            startDate : '2021-02-04',
            duration  : 5,
            expanded  : true,
            children  : [
                {
                    id          : 11,
                    name        : 'Preparation work A',
                    startDate   : '2021-02-04',
                    percentDone : 50,
                    duration    : 2
                },
                {
                    id        : 111,
                    name      : 'Start work A',
                    startDate : '2021-02-06',
                    duration  : 2
                }
            ]
        },
        {
            id        : 2,
            name      : 'Project B',
            startDate : '2021-02-06',
            duration  : 5,
            expanded  : true,
            children  : [
                {
                    id          : 22,
                    name        : 'Preparation work B',
                    startDate   : '2021-02-06',
                    percentDone : 50,
                    duration    : 2
                },
                {
                    id        : 222,
                    name      : 'Start work B',
                    startDate : '2021-02-08',
                    duration  : 2
                }
            ]
        }
    ]
});
