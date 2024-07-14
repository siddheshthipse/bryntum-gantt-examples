var {
    Gantt,
    ProjectModel
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
const statusDate = new Date(2019, 0, 27);
const gantt = new Gantt({
    appendTo          : 'container',
    startDate         : '2019-01-08',
    endDate           : '2019-04-01',
    project,
    dependencyIdField : 'sequenceNumber',
    features          : {
        progressLine : {
            statusDate
        }
    },
    columns : [{
        type  : 'name',
        width : 250
    }],
    viewPreset : 'weekAndDayLetter',
    tbar       : [{
        type      : 'checkbox',
        label     : 'Show project line',
        checked   : true,
        listeners : {
            change : ({
                checked
            }) => gantt.features.progressLine.disabled = !checked
        }
    }, {
        type       : 'datefield',
        label      : 'Project status date',
        value      : statusDate,
        step       : '1d',
        inputWidth : '7.1em',
        listeners  : {
            change : ({
                value
            }) => gantt.features.progressLine.statusDate = value
        }
    }, '->', {
        icon : 'b-fa-caret-left',
        onAction() {
            this.up('gantt').shiftPrevious();
        }
    }, {
        type : 'viewpresetcombo'
    }, {
        icon : 'b-fa-caret-right',
        onAction() {
            this.up('gantt').shiftNext();
        }
    }]
});
project.load();
