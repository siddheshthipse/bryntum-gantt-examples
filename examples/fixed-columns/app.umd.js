var {
    Gantt,
    StringHelper
} = bryntum.gantt;
new Gantt({
    appendTo          : 'container',
    dependencyIdField : 'sequenceNumber',
    project           : {
        autoLoad  : true,
        transport : {
            load : {
                url : '../_datasets/launch-saas.json'
            }
        }
    },
    subGridConfigs : {
        fixed : {
            // No resizing of the fixed column region
            resizable : false,
            // Set a lower weight than the built-in "locked" section to have it appear to the left
            weight    : 1
        },
        locked : {
            // A scrollable section with the main columns
            width  : 400,
            weight : 2
        }
    },
    columns : [{
        type   : 'wbs',
        region : 'fixed'
    }, {
        type  : 'name',
        width : 250
    }, {
        type : 'startdate'
    }, {
        type : 'duration'
    }, {
        type       : 'percentdone',
        showCircle : true,
        width      : 70
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
