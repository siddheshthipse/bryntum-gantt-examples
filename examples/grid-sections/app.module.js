import { Gantt, ProjectModel, TaskModel, Toast } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

class Task extends TaskModel {

    static $name = 'Task';

    static get fields() {
        return [
            'status' // For status column
        ];
    }

    get isLate() {
        return !this.isCompleted && this.deadlineDate && Date.now() > this.deadlineDate;
    }

    get status() {
        let status = 'Not started';

        if (this.isCompleted) {
            status = 'Completed';
        }
        else if (this.isLate) {
            status = 'Late';
        }
        else if (this.isStarted) {
            status = 'Started';
        }

        return status;
    }
}

const project = new ProjectModel({
    taskModelClass : Task,
    transport      : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

new Gantt({
    appendTo : 'container',

    project,

    dependencyIdField : 'sequenceNumber',

    columns : [
        { type : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'duration' },
        {
            type    : 'action',
            text    : 'Actions',
            width   : 100,
            align   : 'center',
            region  : 'right',
            actions : [{
                cls     : 'b-fa b-fa-fw b-fa-trash-alt',
                tooltip : 'Remove',
                onClick : async({ record }) => {
                    record.remove();
                }
            }, {
                cls     : 'b-fa b-fa-fw b-fa-copy',
                tooltip : 'Duplicate',
                onClick : ({ record }) => {
                    record.parent.insertChild(record.copy({
                        name : record.name + ' (copy)'
                    }), record.nextSibling);
                }
            }, {
                cls     : 'b-fa b-fa-fw b-fa-cog',
                tooltip : 'Settings',
                onClick : ({ record }) => Toast.show('TODO: Show a cool settings dialog')
            }]
        },
        {
            field   : 'status',
            text    : 'Status',
            editor  : false,
            region  : 'right',
            cellCls : 'b-status-column-cell',
            renderer({ record }) {
                const status = record.status;

                return status ? [{
                    tag       : 'i',
                    className : `b-fa b-fa-circle ${status}`
                }, status] : '';
            }
        }
    ],

    // Regions, each holding its own set of columns with its own horizontal scroller.
    // The regions are sorted alphabetically by name
    subGridConfigs : {
        // Left-most region, fixed width
        locked : {
            width : 350
        },
        // Timeline region, flex width = will fill available width
        normal : {
            flex : 1
        },
        // Third region, also fixed width
        right : {
            width : 200
        }
    }
});

project.load();
