const scheduler = new Scheduler({
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

    // CrudManager handles data loading and syncing
    crudManager : {
        loadUrl   : 'data/Scheduler/examples/guides/tutorial/data.json',
        autoLoad  : true,
        // New code ↓
        listeners : {
            // Listener for the `hasChanges` event, triggered when any store handled
            // by the crud manager has changes
            hasChanges() {
                console.log(scheduler.crudManager.changes);
            }
        }
    }
});
