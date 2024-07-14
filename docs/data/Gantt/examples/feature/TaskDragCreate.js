targetElement.innerHTML = '<p>This demo shows the task drag create feature, start dragging on Gantt rows to create (schedule) a task:</p>';

// Project contains all the data and is responsible for correct scheduling
const project = new ProjectModel({
    startDate : new Date(2017, 0, 1),

    tasksData : [
        {
            id       : 1,
            name     : 'Write docs',
            expanded : true,
            children : [
                { id : 2, name : 'Proof-read docs' },
                { id : 3, name : 'Release docs' }
            ]
        }
    ]
});

const gantt = new Gantt({
    appendTo : targetElement,

    ref       : 'gantt', // reference is used to easily obtain Gantt reference in it's parent container (see Edit button click handler)
    flex      : '1 0 100%',
    project, // Gantt needs project to get schedule data from
    startDate : new Date(2016, 11, 31),
    endDate   : new Date(2017, 0, 11),
    height    : 300,
    columns   : [
        { type : 'name', field : 'name', text : 'Name' }
    ]
});
