const project = new ProjectModel({
    startDate : new Date(2020, 0, 1),

    eventsData : [
        {
            id       : 1,
            name     : 'Infinite scroll',
            expanded : true,
            children : [
                { id : 2, name : 'Scroll forever ➔', startDate : '2020-01-02', endDate : '2020-01-05' }
            ]
        }
    ]
});

const gantt = new Gantt({
    appendTo : targetElement,

    project,

    startDate : new Date(2019, 11, 31),
    endDate   : new Date(2020, 0, 11),

    infiniteScroll : true,

    height : 220,

    columns : [
        { type : 'name', field : 'name', text : 'Name' }
    ]
});
