var {
    Gantt
} = bryntum.gantt;
new Gantt({
    appendTo : 'container',
    project  : {
        autoLoad  : true,
        transport : {
            load : {
                url : '../_datasets/inactive-tasks.json'
            }
        },
        // This config enables responses validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },
    columns : [{
        type  : 'name',
        width : 250
    }, {
        type : 'startdate'
    }, {
        type : 'inactive'
    }]
});
