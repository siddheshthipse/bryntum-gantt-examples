/**
 * Application configuration
 */
const ganttConfig = {
    project: {
        autoLoad  : true,
        transport : {
            load: {
                url : "data/tasks.json"
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },

    columns : [{ type: "wbs" }, { type: "name" }],

    subGridConfigs: {
        locked: {
            flex : 1
        },
        normal: {
            flex : 2
        }
    },

    viewPreset : "monthAndYear",

    // Allow extra space for rollups
    rowHeight : 50,
    barMargin : 7,

    columnLines    : true,
    rollupsFeature : true
};

export { ganttConfig };
