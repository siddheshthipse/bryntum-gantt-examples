var {
    Gantt,
    ProjectModel,
    Timeline
} = bryntum.gantt;
const setTimelineHeight = ({
    source: button
}) => {
    timeline.element.style.height = '';
    ['large', 'medium', 'small'].forEach(cls => timeline.element.classList.remove(cls));
    timeline.element.classList.add(button.text.toLowerCase());
};
const project = new ProjectModel({
    autoLoad  : true,
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
const timeline = window.timeline = new Timeline({
    appendTo : 'container',
    height   : '',
    // Override default to let it be controlled by CSS

    eventStyle        : 'plain',
    eventColor        : 'gantt-green',
    project,
    dependencyIdField : 'sequenceNumber',
    tbar              : ['Timeline size', {
        type        : 'buttonGroup',
        toggleGroup : true,
        items       : [{
            text : 'Small'
        }, {
            text    : 'Medium',
            pressed : true
        }, {
            text : 'Large'
        }],
        onAction : setTimelineHeight
    }]
});
const gantt = new Gantt({
    appendTo : 'container',
    project,
    columns  : [{
        type  : 'name',
        width : 250
    }, {
        type  : 'showintimeline',
        width : 150
    }]
});
