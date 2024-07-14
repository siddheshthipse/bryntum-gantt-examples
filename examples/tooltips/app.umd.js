

var {
  Gantt,
  ProjectModel,
  TaskTooltip,
  DateHelper,
  StringHelper
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
  features: {
    taskTooltip: {
      textContent: false,
      template({
        taskRecord
      }) {
        var _taskRecord$parent;
        const me = this;
        return `<div class="field"><label>Task</label><span>${StringHelper.encodeHtml(taskRecord.name)}</span></div>
                        <div class="field"><label>Module</label><span>${StringHelper.encodeHtml((_taskRecord$parent = taskRecord.parent) === null || _taskRecord$parent === void 0 ? void 0 : _taskRecord$parent.name) || ''}</span></div>
                        <div class="field"><label>Critical</label><span>${taskRecord.critical ? me.L('Yes') : me.L('No')}</span></div>
                        <div class="field"><label>Start</label><span>${DateHelper.format(taskRecord.startDate, 'MMM DD')}</span></div>
                        <div class="field"><label>Duration</label><span>${taskRecord.fullDuration}</span></div>
                        <div class="field"><label>Assigned to</label>
                        <div class="b-avatar-container">${taskRecord.resources.map(resourceRecord => `
                            <img class="b-resource-avatar b-resource-image"  
                                alt="${StringHelper.encodeHtml(resourceRecord.name)}" 
                                src="${gantt.resourceImageFolderPath + (resourceRecord.image || 'none.png')}"
                            />
                            `).join('')}
                        </div>
                    `;
      }
    },
    taskDrag: {
      // Custom tooltip for when a task is dragged
      tooltipTemplate({
        taskRecord,
        startDate
      }) {
        return StringHelper.xss`<h4 style="margin:0 0 1em 0">Custom drag drop tooltip</h4>${taskRecord.name}: ${DateHelper.format(startDate, 'MMM D')}`;
      }
    },
    taskResize: {
      // A minimal end date tooltip
      tooltipTemplate({
        record,
        endDate
      }) {
        return DateHelper.format(endDate, 'MMM D');
      }
    }
  },
  project,
  dependencyIdField: 'sequenceNumber',
  resourceImageFolderPath: '../_shared/images/users/',
  columns: [{
    type: 'name',
    field: 'name',
    width: 250
  }, {
    type: 'resourceassignment',
    width: 220,
    showAvatars: true,
    avatarTooltipTemplate({
      resourceRecord,
      assignmentRecord,
      overflowCount
    }) {
      return `
                    <strong>${resourceRecord.name}</strong>
                    <img class="b-resource-avatar b-resource-image" src="${gantt.resourceImageFolderPath}${resourceRecord.image}"/>   
                    <div class="data">
                        <div><i class="b-fa b-fa-fw b-fa-map-marker"></i>${resourceRecord.city}</div>
                        <div><i class="b-fa b-fa-fw b-fa-bars-progress"></i>${assignmentRecord.units} %</div>  
                    </div>
                    ${overflowCount > 0 ? `<div class="overflow">+${overflowCount} more</div>` : ''}                
                `;
    }
  }]
});
project.load();