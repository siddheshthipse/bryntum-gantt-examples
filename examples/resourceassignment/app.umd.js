var {
    Gantt,
    AjaxHelper,
    ProjectModel,
    StringHelper,
    WidgetHelper,
    AssignmentField
} = bryntum.gantt;
const project = window.project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
const gantt = new Gantt({
    appendTo                : 'container',
    resourceImageFolderPath : '../_shared/images/users/',
    columns                 : [{
        type  : 'name',
        field : 'name',
        text  : 'Name',
        width : 250
    }, {
        type        : 'resourceassignment',
        width       : 250,
        showAvatars : true,
        editor      : {
            type   : AssignmentField.type,
            picker : {
                height   : 350,
                width    : 450,
                features : {
                    filterBar  : true,
                    group      : 'resource.city',
                    headerMenu : false,
                    cellMenu   : false
                },
                // The extra columns are concatenated onto the base column set.
                columns : [{
                    text       : 'Calendar',
                    // Read a nested property (name) from the resource calendar
                    field      : 'resource.calendar.name',
                    filterable : false,
                    editor     : false,
                    width      : 85
                }]
            }
        }
    }],
    project,
    dependencyIdField : 'sequenceNumber'
});
project.load();
