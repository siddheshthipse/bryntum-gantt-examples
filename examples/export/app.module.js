import { Gantt, ProjectModel, DateHelper } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const project = new ProjectModel({
    autoLoad  : true,
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const headerTpl = ({ currentPage, totalPages }) => `
    <img alt="Company logo" src="resources/bryntum.svg"/>
    <dl>
        <dt>Date: ${DateHelper.format(new Date(), 'll LT')}</dt>
        <dd>${totalPages ? `Page: ${currentPage + 1}/${totalPages}` : ''}</dd>
    </dl>
    `;

const footerTpl = () => `<h3>© ${new Date().getFullYear()} Bryntum AB</h3></div>`;

const gantt = new Gantt({
    // We don't need to export demo header
    appendTo          : 'container',
    project,
    dependencyIdField : 'sequenceNumber',

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 200 },
        { type : 'startdate', text : 'Start date' },
        { type : 'duration', text : 'Duration' }
    ],

    columnLines : false,

    features : {
        pdfExport : {
            exportServer            : 'http://localhost:8080/',
            // Required for font-awesome icons to display correctly
            translateURLsToAbsolute : 'http://localhost:8080/resources/',
            headerTpl,
            footerTpl
        }
    },

    tbar : [
        {
            type : 'button',
            ref  : 'exportButton',
            icon : 'b-fa-file-export',
            text : 'Export to PDF',
            onClick() {
                gantt.features.pdfExport.showExportDialog();
            }
        }
    ]
});
