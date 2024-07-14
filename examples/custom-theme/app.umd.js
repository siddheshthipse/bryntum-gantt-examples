var {
    ProjectModel,
    Gantt
} = bryntum.gantt;
const project = window.project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/custom-theme.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
new Gantt({
    appendTo          : 'container',
    project,
    dependencyIdField : 'wbsCode',
    flex              : 1,
    startDate         : '2024-01-06',
    columns           : [{
        type : 'wbs'
    }, {
        type : 'name'
    }],
    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },
    features : {
        cellEdit       : false,
        taskEdit       : false,
        taskMenu       : false,
        taskDrag       : false,
        taskResize     : false,
        taskDragCreate : false,
        columnLines    : false,
        filter         : true,
        timeRanges     : true,
        labels         : {
            left : {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    }
});
project.load();
