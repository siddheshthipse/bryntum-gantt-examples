const grid = new Grid({
    appendTo : targetElement,

    // makes grid as high as it needs to be to fit rows
    autoHeight : true,

    features : {
        rowResize : true
    },

    data : DataGenerator.generateData(5),

    columns : [
        { field : 'firstName', text : 'First name', flex : 1 },
        { field : 'surName', text : 'Surname', flex : 1 },
        { type : 'date', field : 'start', text : 'Start', flex : 1 },
        { type : 'date', field : 'finish', text : 'Finish', flex : 1 }
    ]
});
