const project = new ProjectModel({
    startDate : '2020-01-02',

    eventsData : [
        {
            id       : 1,
            name     : 'Website design',
            inactive : false,
            expanded : true,
            children : [
                { id : 2, name : 'Contact designers', startDate : '2020-01-02', duration : 2, inactive : false },
                { id : 3, name : 'Create shortlist of three designers', startDate : '2020-01-09', duration : 3, inactive : false },
                { id : 4, name : 'Select & review final design', startDate : '2020-01-02', duration : 3, inactive : true },
                { id : 5, name : 'Inform management', startDate : '2020-01-02', duration : 2, inactive : false },
                { id : 6, name : 'Apply design to website', startDate : '2020-01-09', duration : 2, inactive : false }
            ]
        }
    ],
    dependenciesData : [
        { id : 2, from : 2, to : 3 },
        { id : 3, from : 3, to : 4 },
        { id : 4, from : 4, to : 5 },
        { id : 5, from : 5, to : 6 }
    ]
});

const gantt = new Gantt({
    appendTo : targetElement,

    project,

    startDate : new Date(2019, 11, 31),
    endDate   : new Date(2020, 0, 11),

    height : 360,

    features : {
        // Enable critical paths feature
        criticalPaths : {
            disabled : false
        }
    },

    columns : [
        { type : 'name' },
        { type : 'startdate' },
        { type : 'inactive' }
    ]
});
