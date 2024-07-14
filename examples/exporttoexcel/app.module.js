import { Gantt, ProjectModel, Toast } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const project = new ProjectModel({
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
    appendTo : 'container',

    project,

    dependencyIdField : 'sequenceNumber',

    features : {
        excelExporter : {
            // Choose the date format for date fields
            dateFormat : 'YYYY-MM-DD HH:mm'
        }
    },

    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },

    columns : [
        { type : 'wbs' },
        { type : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'duration' },
        { type : 'effort' },
        { type : 'resourceassignment' },
        { type : 'percentdone', width : 70 },
        {
            type  : 'predecessor',
            width : 112
        },
        {
            type  : 'successor',
            width : 112
        },
        { type : 'schedulingmodecolumn' },
        { type : 'calendar' },
        { type : 'constrainttype' },
        { type : 'constraintdate' },
        { type : 'addnew' }
    ],

    tbar : [
        {
            type     : 'button',
            text     : 'Export as xlsx',
            ref      : 'excelExportBtn',
            icon     : 'b-fa-file-export',
            onAction : () => {
                const filename = gantt.project.taskStore.first?.name;
                if (filename) {
                    gantt.features.excelExporter.export({
                        filename
                    });
                }
            }
        },
        {
            type     : 'button',
            text     : 'Export as CSV',
            ref      : 'csvExportBtn',
            icon     : 'b-fa-file-csv',
            onAction : () => {
                const filename = gantt.project.taskStore.first?.name;
                if (filename) {
                    gantt.features.excelExporter.export({
                        filename,
                        csv : {
                            delimiter : ','
                        }
                    });
                }
            }
        }
    ]
});

project.load();


Toast.show({
    html : `<p>This demo uses the <b>zipcelx</b> library to show how to export to Excel (<a href="https://github.com/egeriis/zipcelx/">GitHub</a>, 
            <a href="https://github.com/egeriis/zipcelx/blob/master/LICENSE">MIT License</a>).</p> 
            <p>It is a separately licensed 3rd party library not part of the Bryntum product.</p>`,
    timeout : 10000
});
