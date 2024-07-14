var {
    Gantt
} = bryntum.gantt;
const gantt = new Gantt({
    appendTo : 'container',
    project  : {
    // includeAsapAlapAsConstraints : false,
        autoLoad  : true,
        transport : {
            load : {
                url : '../_datasets/launch-saas.json'
            }
        }
    },
    features : {
        cellTooltip : true
    },
    columns : [{
        type  : 'name',
        width : 250
    }, {
        type  : 'constrainttype',
        width : 150
    }, {
        type   : 'schedulingdirection',
        width  : 150,
        hidden : true
    }]
});
const project = gantt.project;
project.on('load', () => {
    project.getEventById(14).direction = 'Backward';
});
