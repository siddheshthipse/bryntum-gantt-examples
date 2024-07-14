CSSHelper.insertRule(`.b-sch-dependency {
  stroke       : #000; /* Black lines */
  stroke-width : 2; /* Slightly thicker */
}
`);

CSSHelper.insertRule(`.b-sch-dependency-marker {
  fill : #000; /* Black arrows too */
}
`);

const gantt = new Gantt({
    appendTo : targetElement,

    height  : 300,
    columns : [
        { type : 'name' }
    ],

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
    ]
});
