var {
    Gantt,
    StringHelper
} = bryntum.gantt;
new Gantt({
    appendTo          : 'container',
    dependencyIdField : 'sequenceNumber',
    rowHeight         : 45,
    tickSize          : 45,
    barMargin         : 8,
    project           : {
        autoLoad  : true,
        transport : {
            load : {
                url : '../_datasets/launch-saas.json'
            }
        }
    },
    columns : [{
        type  : 'name',
        width : 250
    }],
    // Custom task content, display task name on child tasks
    taskRenderer({
        taskRecord
    }) {
        if (taskRecord.isLeaf && !taskRecord.isMilestone) {
            return StringHelper.encodeHtml(taskRecord.name);
        }
    }
});
