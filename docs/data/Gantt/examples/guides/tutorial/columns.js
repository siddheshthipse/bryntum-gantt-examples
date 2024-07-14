const gantt = new Gantt({
    // Where to render to, accepts an element or an element id
    appendTo : targetElement,

    // Normally sizing would be handled by CSS, but for simplicity
    // we use fixed with and height for the tutorial
    // (commented out since docs browser handle sizing)
    // width : 800,
    height : 250,

    // Dates that the time axis will span
    startDate : '2023-04-16',
    endDate   : '2023-05-15',

    // Columns in the grid part
    columns : [
        {
            type  : 'name',
            width : 200
        },
        {
            type  : 'resourceassignment',
            width : 170
        }
    ],

    // The project handles data loading (and syncing, but not in this example)
    project : {
        loadUrl   : 'data/Gantt/examples/guides/tutorial/data.json',
        autoLoad  : true,
        listeners : {
            // Listener for the `hasChanges` event, triggered when any store
            // handled by the project has changes
            hasChanges() {
                console.log(gantt.project.changes);

                // In a real app you would send the changes to the server here.
                // Then you would call `gantt.project.acceptChanges()` to
                // clear local changes.
            }
        }
    }
});
