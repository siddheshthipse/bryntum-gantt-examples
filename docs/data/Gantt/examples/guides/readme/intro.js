const gantt = new Gantt({
    project : {
        transport : {
            load : {
                url : 'data/Gantt/examples/guides/readme/intro.json'
            }
        },
        autoLoad : true
    },
    style     : 'font-size:0.85em',
    appendTo  : targetElement,
    height    : 500,
    rowHeight : 40,
    columns   : [
        { type : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'duration' },
        { type : 'percentdone', width : 70 },
        {
            type  : 'predecessor',
            width : 112
        },
        { type : 'addnew' }
    ],

    subGridConfigs : {
        locked : {
            width : 220
        },
        normal : {
            flex : 2
        }
    },

    startDate : '2017-01-09',
    endDate   : '2017-02-13',

    tbar : {
        items : [
            {
                color   : 'b-green',
                icon    : 'b-fa b-fa-plus',
                text    : 'Create',
                tooltip : 'Create new task',
                style   : 'margin-right: .5em',
                async onAction() {
                    const added = gantt.taskStore.rootNode.appendChild({ name : 'New task', duration : 1 });

                    // run propagation to calculate new task fields
                    await gantt.project.commitAsync();

                    // scroll to the added task. Smoothly.
                    await gantt.scrollRowIntoView(added, {
                        animate : true
                    });

                    gantt.features.cellEdit.startEditing({
                        record : added,
                        field  : 'name'
                    });
                }
            },
            {
                color   : 'b-green',
                icon    : 'b-fa b-fa-pen',
                text    : 'Edit',
                tooltip : 'Edit selected task',
                onAction() {
                    if (gantt.selectedRecord) {
                        gantt.editTask(gantt.selectedRecord);
                    }
                    else {
                        Toast.show('First select the task you want to edit');
                    }
                }
            }
        ]
    }
});
