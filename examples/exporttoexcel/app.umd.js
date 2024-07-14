

var {
  Gantt,
  ProjectModel,
  Toast
} = bryntum.gantt;
const project = new ProjectModel({
  transport: {
    load: {
      url: '../_datasets/launch-saas.json'
    }
  },
  // This config enables response validation and dumping of found errors to the browser console.
  // It's meant to be used as a development stage helper only so please set it to false for production systems.
  validateResponse: true
});
const gantt = new Gantt({
  appendTo: 'container',
  project,
  dependencyIdField: 'sequenceNumber',
  features: {
    excelExporter: {
      // Choose the date format for date fields
      dateFormat: 'YYYY-MM-DD HH:mm'
    }
  },
  subGridConfigs: {
    locked: {
      flex: 1
    },
    normal: {
      flex: 2
    }
  },
  columns: [{
    type: 'wbs'
  }, {
    type: 'name',
    width: 250
  }, {
    type: 'startdate'
  }, {
    type: 'duration'
  }, {
    type: 'effort'
  }, {
    type: 'resourceassignment'
  }, {
    type: 'percentdone',
    width: 70
  }, {
    type: 'predecessor',
    width: 112
  }, {
    type: 'successor',
    width: 112
  }, {
    type: 'schedulingmodecolumn'
  }, {
    type: 'calendar'
  }, {
    type: 'constrainttype'
  }, {
    type: 'constraintdate'
  }, {
    type: 'addnew'
  }],
  tbar: [{
    type: 'button',
    text: 'Export as xlsx',
    ref: 'excelExportBtn',
    icon: 'b-fa-file-export',
    onAction: () => {
      var _gantt$project$taskSt;
      const filename = (_gantt$project$taskSt = gantt.project.taskStore.first) === null || _gantt$project$taskSt === void 0 ? void 0 : _gantt$project$taskSt.name;
      if (filename) {
        gantt.features.excelExporter.export({
          filename
        });
      }
    }
  }, {
    type: 'button',
    text: 'Export as CSV',
    ref: 'csvExportBtn',
    icon: 'b-fa-file-csv',
    onAction: () => {
      var _gantt$project$taskSt2;
      const filename = (_gantt$project$taskSt2 = gantt.project.taskStore.first) === null || _gantt$project$taskSt2 === void 0 ? void 0 : _gantt$project$taskSt2.name;
      if (filename) {
        gantt.features.excelExporter.export({
          filename,
          csv: {
            delimiter: ','
          }
        });
      }
    }
  }]
});
project.load();


Toast.show({
  html: `<p>This demo uses the <b>zipcelx</b> library to show how to export to Excel (<a href="https://github.com/egeriis/zipcelx/">GitHub</a>, 
            <a href="https://github.com/egeriis/zipcelx/blob/master/LICENSE">MIT License</a>).</p> 
            <p>It is a separately licensed 3rd party library not part of the Bryntum product.</p>`,
  timeout: 10000
});