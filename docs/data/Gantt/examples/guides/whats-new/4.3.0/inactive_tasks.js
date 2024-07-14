const project = new ProjectModel({
    startDate : '2020-01-02',

    eventsData : [
        {
            id       : 1,
            name     : 'Setup web-server',
            inactive : false,
            expanded : true,
            children : [
                { id : 2, name : 'Install Apache', startDate : '2020-01-02', duration : 2, inactive : true },
                { id : 3, name : 'Configure firewall', startDate : '2020-01-09', duration : 3, inactive : false },
                { id : 4, name : 'Setup load balancer', startDate : '2020-01-02', duration : 3, inactive : true },
                { id : 5, name : 'Configure ports', startDate : '2020-01-02', duration : 2, inactive : true },
                { id : 6, name : 'Run tests', startDate : '2020-01-09', duration : 2, inactive : false }
            ]
        }
    ],
    dependenciesData : [
        { id : 2, from : 2, to : 6 },
        { id : 3, from : 3, to : 6 },
        { id : 4, from : 4, to : 6 },
        { id : 5, from : 5, to : 6 }
    ]
});

const gantt = new Gantt({
    appendTo : targetElement,

    project,

    startDate : new Date(2019, 11, 31),
    endDate   : new Date(2020, 0, 11),

    height : 360,

    columns : [
        { type : 'name' },
        { type : 'startdate' },
        { type : 'inactive' }
    ]
});
