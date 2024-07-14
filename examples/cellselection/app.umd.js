var {
    Gantt
} = bryntum.gantt;
new Gantt({
    appendTo                : 'container',
    dependencyIdField       : 'sequenceNumber',
    resourceImageFolderPath : '../_shared/images/users/',
    selectionMode           : {
    // This enables selection of individual cells
        cell       : true,
        // This enables selection of a column of cells by clicking column header
        column     : true,
        // This enables drag to select
        dragSelect : true,
        // This adds a row number column which upon click, selects row
        rowNumber  : true
    },
    features : {
        cellEdit : {
            autoEdit  : true,
            // Feature that starts editing when typing with a focused cell
            multiEdit : true // Feature that enables editing of multiple cells at the same time
        },
        // This enables a cell range to extend its values by grabbing the fill handle
        fillHandle    : true,
        // This allows for simple cell copy and pasting, native clipboard api is on by default in this feature
        cellCopyPaste : true,
        taskCopyPaste : {
            useNativeClipboard : true
        },
        rowReorder : false
    },
    project : {
        autoLoad : true,
        loadUrl  : '../_datasets/launch-saas.json'
    },
    columns : [{
        type  : 'name',
        width : 350
    }, {
        type : 'startdate'
    }, {
        type : 'duration'
    }, {
        type        : 'resourceassignment',
        width       : 120,
        showAvatars : true
    }, {
        type : 'schedulingmodecolumn'
    }]
});
