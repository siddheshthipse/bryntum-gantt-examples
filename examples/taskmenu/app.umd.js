var {
    Gantt,
    Toast,
    ProjectModel
} = bryntum.gantt;
const project = window.project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
const gantt = new Gantt({
    appendTo             : 'container',
    // Shows a color picker in the task context menu, and also shows a color field in the task editor. Both which lets
    // the user select the Event bar's background color.
    showTaskColorPickers : true,
    features             : {
        taskMenu : {
            items : {
                // Add extra menu items available on all tasks
                moveToNextDay : {
                    icon : 'b-fa b-fa-calendar',
                    text : 'Move to next day',
                    cls  : 'b-separator',
                    onItem({
                        taskRecord
                    }) {
                        taskRecord.shift(1, 'day');
                    }
                },
                milestoneAction : {
                    icon : 'b-fa b-fa-hippo',
                    text : 'Milestone action',
                    onItem() {
                        Toast.show('Performed milestone action');
                    }
                },
                // Customize the built-in "Edit task" item
                editTask : {
                    icon : 'b-fa b-fa-edit'
                }
            },
            // Customize items dynamically
            processItems({
                taskRecord,
                items
            }) {
                // Hide "Delete task" for parents
                if (taskRecord.isParent) {
                    items.deleteTask = false;
                }

                // Hide custom "Milestone action" if not a milestone
                if (!taskRecord.isMilestone) {
                    items.milestoneAction = false;
                }
            }
        }
    },
    columns : [{
        type  : 'name',
        field : 'name',
        text  : 'Name',
        width : 250
    }],
    project,
    dependencyIdField : 'sequenceNumber'
});
project.load();
