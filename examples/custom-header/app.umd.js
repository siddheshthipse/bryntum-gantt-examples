var {
    DateHelper,
    Gantt,
    ProjectModel
} = bryntum.gantt;
const project = new ProjectModel({
    loadUrl  : '../_datasets/launch-saas.json',
    autoLoad : true
});
const gantt = new Gantt({
    project,
    appendTo          : 'container',
    dependencyIdField : 'sequenceNumber',
    resourceImagePath : '../_shared/images/users/',
    columns           : [{
        type  : 'name',
        width : '25em'
    }],
    viewPreset : {
        columnLinesFor : 2,
        timeResolution : {
            unit      : 'day',
            increment : 1
        },
        headers : [{
            unit       : 'month',
            dateFormat : 'MMM YYYY',
            align      : 'start'
        }, {
            unit     : 'week',
            renderer : (startDate, endDate) => `Week ${DateHelper.format(startDate, 'WW')}`
        }, {
            unit       : 'day',
            dateFormat : 'dd'
        }, {
            unit       : 'day',
            dateFormat : 'DD'
        }, {
            unit     : 'day',
            // Show a number indicating number of tasks starting on each day
            renderer : (startDate, endDate, headerConfig, index, gantt) => {
                let tasksStarting = 0;
                gantt.taskStore.forEach(task => {
                    if (task.startDate - startDate === 0) {
                        tasksStarting++;
                    }
                });
                return tasksStarting || '';
            }
        }]
    }
});
gantt.project.on('haschanges', () => gantt.timeAxisColumn.refreshHeader());
