const project = new ProjectModel({
    startDate : new Date(2017, 0, 1),

    tasksData : [
        {
            id       : 1,
            name     : 'Write docs',
            expanded : true,
            custom   : 'Parent custom field value',
            children : [
                // 'custom' field is auto exposed to Task model, then its name is used in TaskEditor to get/set values
                {
                    id        : 2,
                    name      : 'Proof-read docs',
                    startDate : '2017-01-02',
                    endDate   : '2017-01-05',
                    custom    : 'Proof-read custom value'
                },
                {
                    id        : 3,
                    name      : 'Release docs',
                    startDate : '2017-01-09',
                    endDate   : '2017-01-10',
                    custom    : 'Release custom value'
                }
            ]
        }
    ],

    dependenciesData : [
        { fromTask : 2, toTask : 3 }
    ]
});

// May be registered in case this example is run again
if (!Widget.factoryable.registry.custom_filestab) {
    // Custom FilesTab class (the last item of tabsConfig)
    class FilesTab extends Grid {

        // Factoryable type name
        static get type() {
            return 'custom_filestab';
        }

        static get defaultConfig() {
            return {
                title    : 'Files',
                defaults : {
                    labelWidth : 200
                },
                columns : [{
                    text     : 'Files attached to task',
                    field    : 'name',
                    type     : 'template',
                    template : data => `<i class="b-fa b-fa-fw b-fa-${data.record.data.icon}"></i>${data.record.data.name}`
                }]
            };
        } // eo getter defaultConfig

        loadEvent(eventRecord) {
            let files = [];

            // prepare dummy files data
            switch (eventRecord.data.id) {
                case 1:
                    files = [
                        { name : 'Image1.png', icon : 'image' },
                        { name : 'Chart2.pdf', icon : 'chart-pie' },
                        { name : 'Spreadsheet3.pdf', icon : 'file-excel' },
                        { name : 'Document4.pdf', icon : 'file-word' },
                        { name : 'Report5.pdf', icon : 'user-chart' }
                    ];
                    break;
                case 2:
                    files = [
                        { name : 'Chart11.pdf', icon : 'chart-pie' },
                        { name : 'Spreadsheet13.pdf', icon : 'file-excel' },
                        { name : 'Document14.pdf', icon : 'file-word' }
                    ];
                    break;
                case 3:
                    files = [
                        { name : 'Image21.png', icon : 'image' },
                        { name : 'Spreadsheet23.pdf', icon : 'file-excel' },
                        { name : 'Document24.pdf', icon : 'file-word' },
                        { name : 'Report25.pdf', icon : 'user-chart' }
                    ];
                    break;
            } // eo switch

            this.store.data = files;
        } // eo function loadEvent
    } // eo class FilesTab

    // register 'filestab' type with its Factory
    FilesTab.initClass();
}

const gantt = new Gantt({
    appendTo : targetElement,
    flex     : '1 0 100%',
    height   : 200,

    project, // Gantt needs project to get schedule data from
    startDate : new Date(2016, 11, 31),
    endDate   : new Date(2017, 0, 11),

    columns : [
        { type : 'name', field : 'name', text : 'Name' }
    ],

    features : {
        taskEdit : {
            items : {
                generalTab : {
                    // Change title of General tab
                    title : 'Common',
                    items : {
                        // Add new field
                        newCustomField : {
                            type   : 'textfield',
                            weight : 710,
                            label  : 'Custom (New Field)',
                            name   : 'custom' // Name of the field matches data field name, so value is loaded/saved automatically
                        }
                    }
                },
                // Remove Notes tab
                notesTab : false,
                // Add custom Files tab to the second position
                filesTab : {
                    type   : 'custom_filestab',
                    weight : 110
                }
            },
            editorConfig : {
                // Custom height of the Task Editor
                height : '35em'
            }
        } // eo taskEdit
    } // eo features
});
