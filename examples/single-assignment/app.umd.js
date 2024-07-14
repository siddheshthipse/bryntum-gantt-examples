var {
    Gantt
} = bryntum.gantt;
const assignmentPickerConfig = {
    // path to images need to be set in picker directly
    resourceImagePath : '../_shared/images/users/',
    selectionMode     : {
        multiSelect  : false,
        // enable single selection in a picker assignmentGrid
        showCheckAll : false
    }
};
new Gantt({
    appendTo                : 'container',
    dependencyIdField       : 'sequenceNumber',
    resourceImageFolderPath : '../_shared/images/users/',
    project                 : {
        autoLoad : true,
        loadUrl  : './data/project.json'
    },
    columns : [{
        type  : 'name',
        width : 280
    }, {
        type        : 'resourceassignment',
        width       : 180,
        showAvatars : false,
        editor      : {
            picker : assignmentPickerConfig
        }
    }],
    features : {
        taskEdit : {
            items : {
                // hide default resources tab with grid for multi assignment
                resourcesTab : false,
                generalTab   : {
                    items : {
                        // add new field for single assignment
                        assignmentField : {
                            type   : 'assignmentfield',
                            label  : 'Resource',
                            weight : 350,
                            // put it after effort field
                            flex   : 1,
                            picker : assignmentPickerConfig
                        }
                    }
                }
            }
        }
    },
    listeners : {
        beforeTaskEditShow({
            editor,
            taskRecord
        }) {
            // set initial value for new added field, it requires full record for initialization
            editor.widgetMap.assignmentField.projectEvent = taskRecord;
        },
        beforeTaskSave({
            editor,
            taskRecord
        }) {
            const {
                    assignmentField
                } = editor.widgetMap,
                resourceId = assignmentField.value.length ? assignmentField.value[0].resource.id : null;

            // pass true to replace existed assignment (if any) with a new one to prevent multi-assignment
            this.assignmentStore.assignEventToResource(taskRecord, this.resourceStore.getById(resourceId), null, true);
        }
    }
});
