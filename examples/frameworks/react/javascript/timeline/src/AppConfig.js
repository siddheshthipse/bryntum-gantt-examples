/**
 * Application configuration
 */
const ganttConfig = {
    columns : [
        { type : 'name', width : 250 },
        { type : 'showintimeline', width : 150 }
    ]
};

const timelineConfig = {
    eventStyle : 'plain',
    eventColor : 'gantt-green',

    height : '', // Override default to let it be controlled by CSS

    dependencyIdField : 'sequenceNumber'
};

export { ganttConfig, timelineConfig };
