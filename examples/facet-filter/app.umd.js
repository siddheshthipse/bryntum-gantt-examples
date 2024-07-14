

var {
  ArrayHelper,
  StringHelper,
  Panel,
  Widget,
  TaskModel,
  Container,
  Gantt,
  WalkHelper
} = bryntum.gantt;

/**
 * Simple widget which shows checklist of filter options, given a Gantt and a single field name from the Task model
 */
class GanttTaskFacetFilter extends Panel {
  // The $name static class property is needed due to class name compression by the code minifier.
  // This should match what would normally be returned by the name property of the constructor.
  static $name = 'GanttTaskFacetFilter';

  // The static configurable property is used for class-level properties
  // The properties provided in the object will be tracked for changes
  static configurable = {
    layout: 'vbox',
    ui: 'toolbar',
    collapsible: {
      direction: 'up'
    },
    gantt: null,
    fieldName: null
  };

  // The type property specifies the short name for the widget.
  // It is used when creating an instance from a config object
  static type = 'gantttaskfacetfilter';
  static getFieldValues(dataStore, fieldName) {
    const emptyString = '',
      field = dataStore.modelClass.getFieldDefinition(fieldName),
      uniqueValues = dataStore.getDistinctValues(fieldName, true),
      toString = x => x == undefined ? emptyString : String(x);
    if (field.type === 'number') {
      uniqueValues.sort((a, b) => a - b);
    } else if (field.type === 'boolean') {
      return [true, false];
    } else {
      uniqueValues.sort((a, b) => toString(a).localeCompare(toString(b)));
    }
    return uniqueValues;
  }
  refreshOptions() {
    var _this$items;
    const {
        fieldName,
        gantt: {
          taskStore,
          columns
        }
      } = this,
      column = columns.get(fieldName),
      values = GanttTaskFacetFilter.getFieldValues(taskStore, fieldName),
      fieldType = taskStore.modelClass.getFieldDefinition(fieldName).type,
      useStringValues = !['number', 'boolean'].includes(fieldType),
      checked = new Set(((_this$items = this.items) === null || _this$items === void 0 ? void 0 : _this$items.filter(item => item.checked).map(item => item.checkedValue)) ?? []),
      hasIds = Array.isArray(values === null || values === void 0 ? void 0 : values[0]);
    this.title = StringHelper.encodeHtml(column.text);
    this.items = values.map(value => {
      let checkedValue = hasIds ? value[0] : value;
      if (useStringValues) {
        checkedValue = StringHelper.encodeHtml(checkedValue);
      }
      return {
        type: 'checkbox',
        checkedValue,
        text: StringHelper.capitalize(StringHelper.encodeHtml(String(hasIds ? value[1] : value))),
        fieldName,
        checked: checked.has(checkedValue),
        listeners: {
          change: 'up.onCheckboxChange'
        }
      };
    });
  }

  // Triggered when changing "gantt" config
  updateGantt(gantt) {
    this.refreshOptions();
    gantt.taskStore.on({
      add: 'refreshOptions',
      update: 'refreshOptions',
      remove: 'refreshOptions',
      load: 'refreshOptions',
      thisObj: this
    });
  }
  onCheckboxChange({
    source
  }) {
    // Apply style to checkbox based of state
    source.cls = {
      [`b-${this.type}-item-active`]: source.checked
    };
    const filters = {},
      {
        taskStore
      } = this.gantt;

    // Collect filters from checked checkboxes with existing fieldName
    for (const checkBox of Widget.queryAll('checkbox').filter(checkBox => checkBox.checked && checkBox.fieldName)) {
      filters[checkBox.fieldName] = [...(filters[checkBox.fieldName] ?? []), checkBox.checkedValue];
    }

    // Clean existing filters
    taskStore.clearFilters();
    // Apply active filters
    for (const fieldName in filters) {
      taskStore.filter({
        id: fieldName,
        property: fieldName,
        operator: 'isIncludedIn',
        value: filters[fieldName]
      });
    }
  }
}

// Register this widget type with its Factory
GanttTaskFacetFilter.initClass();

// here you can extend our default Task class with your additional fields, methods and logic
class Task extends TaskModel {
  static $name = 'Task';
  static fields = ['status', {
    name: 'priority',
    defaultValue: 'Medium'
  }, {
    name: 'eventColor',
    defaultValue: 'green'
  }];
  get isLate() {
    return Boolean(!this.isCompleted && this.deadlineDate && Date.now() > this.deadlineDate);
  }
  get status() {
    let status = 'Not started';
    if (this.isCompleted) {
      status = 'Completed';
    } else if (this.isLate) {
      status = 'Late';
    } else if (this.isStarted) {
      status = 'Started';
    }
    return status;
  }
}
const gantt = new Gantt({
    appendTo: 'container',
    dependencyIdField: 'sequenceNumber',
    flex: 1,
    project: {
      autoLoad: true,
      taskModelClass: Task,
      loadUrl: '../_datasets/constraints.json',
      listeners: {
        beforeLoadApply: ({
          response
        }) => {
          WalkHelper.preWalk(response.tasks.rows[0], n => n.children, task => {
            task.eventColor = ['orange', 'lime', 'gray', 'violet'][Math.floor(Math.random() * 4)];
            task.priority = ['High', 'Low', 'Medium'][Math.floor(Math.random() * 3)];
          });
        }
      }
    },
    columns: [{
      type: 'name',
      width: 250
    }, {
      type: 'eventcolor',
      width: 100,
      text: 'Color',
      field: 'eventColor'
    }, {
      type: 'check',
      width: 100,
      text: 'Critical',
      field: 'critical'
    }, {
      width: 100,
      text: 'Status',
      field: 'status',
      readOnly: true
    }, {
      field: 'priority',
      text: 'Priority',
      type: 'template',
      width: 120,
      template: ({
        value = ''
      }) => StringHelper.xss`
                    <div class="b-prio b-prio-${value.toLowerCase()}">${value}</div>`,
      editor: {
        type: 'dropdown',
        items: ['Low', 'Medium', 'High']
      }
    }],
    tbar: [{
      icon: 'b-fa-bars',
      tooltip: 'Expand/collapse filter panel',
      onClick() {
        container.widgetMap.facetFilters.toggleCollapsed();
      }
    }]
  }),
  container = new Container({
    appendTo: 'container',
    layout: 'box',
    items: {
      facetFilters: {
        type: 'panel',
        layout: 'vbox',
        cls: 'filters-panel',
        collapsible: true,
        header: false,
        width: '15em',
        defaults: {
          type: 'gantttaskfacetfilter',
          gantt
        },
        items: [{
          fieldName: 'status'
        }, {
          fieldName: 'critical'
        }, {
          fieldName: 'priority'
        }, {
          fieldName: 'eventColor'
        }]
      },
      splitter: {
        type: 'splitter'
      },
      gantt
    }
  });