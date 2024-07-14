var {
    StringHelper,
    Grid,
    List,
    Gantt,
    ProjectModel,
    TaskModel
} = bryntum.gantt;

/**
 * @module FilesTab
 */

/**
 * @internal
 */
class FilesTab extends Grid {
    // Factoryable type name
    static get type() {
        return 'filestab';
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
                template : data => StringHelper.xss`<i class="b-fa b-fa-fw b-fa-${data.record.data.icon}"></i>${data.record.data.name}`
            }]
        };
    }

    loadEvent(eventRecord) {
        const files = [];
        for (let i = 0; i < Math.random() * 10; i++) {
            const nbr = Math.round(Math.random() * 5);
            switch (nbr) {
                case 1:
                    files.push({
                        name : `Image${nbr}.pdf`,
                        icon : 'image'
                    });
                    break;
                case 2:
                    files.push({
                        name : `Charts${nbr}.pdf`,
                        icon : 'chart-pie'
                    });
                    break;
                case 3:
                    files.push({
                        name : `Spreadsheet${nbr}.pdf`,
                        icon : 'file-excel'
                    });
                    break;
                case 4:
                    files.push({
                        name : `Document${nbr}.pdf`,
                        icon : 'file-word'
                    });
                    break;
                case 5:
                    files.push({
                        name : `Report${nbr}.pdf`,
                        icon : 'chart-line'
                    });
                    break;
            }
        }
        this.store.data = files;
    }
}

// Register this widget type with its Factory
FilesTab.initClass();

/**
 * @module ResourceList
 */

/**
 * @internal
 */
class ResourceList extends List {
    // Factoryable type name
    static get type() {
        return 'resourcelist';
    }

    static get configurable() {
        return {
            title   : 'Resources',
            cls     : 'b-inline-list',
            items   : [],
            itemTpl : resource => {
                return StringHelper.xss`
                    <img src="../_shared/images/users/${resource.name.toLowerCase()}.jpg">
                    <div class="b-resource-detail">
                        <div class="b-resource-name">${resource.name}</div>
                        <div class="b-resource-city">
                            ${resource.city}
                            <i data-btip="Deassign resource" class="b-icon b-icon-trash"></i>
                        </div>
                    </div>
                `;
            }
        };
    }

    // Called by the owning TaskEditor whenever a task is loaded
    loadEvent(taskRecord) {
        this.taskRecord = taskRecord;
        this.store.data = taskRecord.resources;
    }

    // Called on item click
    onItem({
        event,
        record
    }) {
        if (event.target.matches('.b-icon-trash')) {
            // Unassign the clicked resource record from the currehtly loaded task
            this.taskRecord.unassign(record);

            // Update our store with the new assignment set
            this.store.data = this.taskRecord.resources;
        }
    }
}

// Register this widget type with its Factory
ResourceList.initClass();
class MyModel extends TaskModel {
    static get fields() {
        return [{
            name : 'deadline',
            type : 'date'
        }];
    }
}
const project = window.project = new ProjectModel({
    taskModelClass : MyModel,
    transport      : {
        load : {
            url : '../_datasets/launch-saas-colors.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
const gantt = new Gantt({
    appendTo             : 'container',
    // Shows a color field in the task editor and a color picker in the task menu.
    // Both lets the user select the Task bar's background color
    showTaskColorPickers : true,
    features             : {
        taskEdit : {
            items : {
                generalTab : {
                    // change title of General tab
                    title : 'Common',
                    items : {
                        customDivider : {
                            html    : '',
                            dataset : {
                                text : 'Custom fields'
                            },
                            cls  : 'b-divider',
                            flex : '1 0 100%'
                        },
                        deadlineField : {
                            type  : 'datefield',
                            name  : 'deadline',
                            label : 'Deadline',
                            flex  : '1 0 50%',
                            cls   : 'b-inline'
                        },
                        priority : {
                            type       : 'radiogroup',
                            name       : 'priority',
                            label      : 'Priority',
                            flex       : '1 0 100%',
                            labelWidth : '6.5em',
                            options    : {
                                high : 'High',
                                med  : 'Medium',
                                low  : 'Low'
                            }
                        }
                    }
                },
                // remove Notes tab
                notesTab : false,
                // add custom Files tab to the second position
                filesTab : {
                    type   : 'filestab',
                    weight : 110
                },
                // add custom Resources tab to the third position
                resourcesTab : {
                    type   : 'resourcelist',
                    weight : 120,
                    title  : 'Resources'
                },
                // customize the predecessors grid
                predecessorsTab : {
                    items : {
                        grid : {
                            columns : {
                                data : {
                                    // Our definition of the name column
                                    // is merged into the existing one.
                                    // We just add some configurations.
                                    name : {
                                        // Grid cell values are rendered with extra info.
                                        renderer({
                                            record: dependency
                                        }) {
                                            const predecessorTask = dependency.fromTask;
                                            if (predecessorTask) {
                                                return StringHelper.xss`${predecessorTask.name} (${predecessorTask.id})`;
                                            }
                                            return '';
                                        },
                                        // The cell editor, and its dropdown list
                                        // also have this extra info.
                                        editor : {
                                            displayValueRenderer(taskRecord) {
                                                return taskRecord ? StringHelper.xss`${taskRecord.name} (${taskRecord.id})` : '';
                                            },
                                            listItemTpl(taskRecord) {
                                                return StringHelper.xss`${taskRecord.name} (${taskRecord.id})`;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    columns : [{
        type  : 'name',
        field : 'name',
        text  : 'Name',
        width : 350
    }, {
        type  : 'date',
        field : 'deadline',
        text  : 'Deadline'
    }, {
        type : 'eventcolor',
        text : 'Color'
    }],
    project,
    dependencyIdField : 'sequenceNumber'
});
project.load();
