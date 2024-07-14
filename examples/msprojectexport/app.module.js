import { Gantt, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const project = new ProjectModel({
    transport : {
        load : {
            url : 'data/launch-saas.json'
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
        mspExport : true // enable the feature Microsoft Project export
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
        { type : 'predecessor' },
        { type : 'successor' },
        { type : 'schedulingmodecolumn' },
        { type : 'calendar' },
        { type : 'constrainttype' },
        { type : 'constraintdate' },
        { type : 'addnew' }
    ],

    tbar : [
        {
            type : 'button',
            text : 'Export to MSP',
            ref  : 'mspExportBtn',
            icon : 'b-fa-file-export',
            onAction() {
                // give a filename based on task name
                const filename = gantt.project.taskStore.first && `${gantt.project.taskStore.first.name}.xml`;

                // call the export to download the XML file
                gantt.features.mspExport.export({
                    filename
                });
            }
        }
    ]
});

project.load();
