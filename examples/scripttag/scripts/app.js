const { Gantt, ProjectModel, Button } = bryntum.gantt;

const project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    }
});

new Gantt({
    appendTo : 'container',

    project,

    dependencyIdField : 'sequenceNumber',

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 250 }
    ],

    height : 385
});


new Button({
    appendTo : 'download-trial',
    id       : 'trial-button',
    text     : 'Download Trial',
    href     : 'https://bryntum.com/download/?product=gantt',
    cls      : 'b-green b-raised'

});


project.load();
