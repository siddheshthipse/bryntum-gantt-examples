var {
    Gantt,
    ProjectModel,
    DateHelper
} = bryntum.gantt;
const project = new ProjectModel({
    autoLoad         : true,
    loadUrl          : '../_datasets/launch-saas.json',
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
const headerTpl = ({
    currentPage,
    totalPages
}) => `
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
    columns           : [{
        type  : 'name',
        field : 'name',
        text  : 'Name',
        width : 200
    }, {
        type : 'startdate',
        text : 'Start date'
    }, {
        type : 'duration',
        text : 'Duration'
    }],
    columnLines : false,
    features    : {
        print : {
            headerTpl,
            footerTpl
        }
    },
    tbar : [{
        type : 'button',
        ref  : 'printButton',
        icon : 'b-fa-print',
        text : 'Print',
        onClick() {
            gantt.features.print.showPrintDialog();
        }
    }]
});


