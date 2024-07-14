import { Gantt, ProjectModel, TaskModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

class MyTaskModel extends TaskModel {
    static get fields() {
        return [
            { name : 'cost', type : 'number' }
        ];
    }
}

const
    project = new ProjectModel({
        taskModelClass : MyTaskModel,
        loadUrl        : '../_datasets/launch-saas.json'
    }),

    gantt = new Gantt({
        appendTo : 'container',
        project,

        dependencyIdField : 'sequenceNumber',

        columns : [
            { type : 'sequence' },
            { type : 'name', field : 'name', width : 250 },
            { type : 'startdate' },
            { type : 'duration' },
            {
                type                 : 'aggregate',
                text                 : 'Cost<br><span style="font-size:0.8em">(aggregated)</span>',
                field                : 'cost',
                width                : 100,
                htmlEncode           : false,
                htmlEncodeHeaderText : false,
                renderer             : ({ record, value }) => record.isLeaf ? `$${value || 0}` : `<b>$${value || 0}</b>`
            }
        ],
        features : {
            taskEdit : {
                items : {
                    generalTab : {
                        items : {
                            costGroup : {
                                html    : '',
                                dataset : {
                                    text : 'Cost'
                                },
                                cls  : 'b-divider',
                                flex : '1 0 100%'
                            },
                            costField : {
                                type  : 'number',
                                name  : 'cost',
                                label : 'Cost',
                                flex  : '.5 0',
                                cls   : 'b-inline'
                            }
                        }
                    }
                }
            },
            taskCopyPaste : { useNativeClipboard : true }
        },
        listeners : {
            // Disable Cost editing for parent tasks
            beforeTaskEdit : ({ taskRecord }) => {
                gantt.taskEdit.editor.widgetMap.costField.disabled = !taskRecord.isLeaf;
            }
        }
    });

project.load();
