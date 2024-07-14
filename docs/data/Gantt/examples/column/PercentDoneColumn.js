CSSHelper.insertRule('.b-percentdone-circle.b-over { background-image: conic-gradient(red 0 var(--gantt-percentdone-angle), transparent var(--gantt-percentdone-angle) 1turn); }');

const gantt = new Gantt({
    appendTo : targetElement,
    height   : 350,

    subGridConfigs : {
        locked : { flex : 1 },
        normal : { collapsed : true }
    },

    project : {
        startDate  : new Date(2020, 0, 1),
        eventsData : [
            { id : 1, name : 'Half done task', startDate : '2020-01-02', endDate : '2020-01-05', percentDone : 50 },
            { id : 2, name : 'Finalized task', startDate : '2020-01-09', endDate : '2020-01-10', percentDone : 100 },
            { id : 3, name : 'Way more work than needed', startDate : '2020-01-09', endDate : '2020-01-10', percentDone : 200 }
        ]
    },

    columns : [
        { type : 'name', flex : 1 },
        { type : 'percentdone', showCircle : true, flex : 1 }
    ]
});
