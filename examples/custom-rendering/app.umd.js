

var {
  TaskModel,
  InstancePlugin,
  GridFeatureManager,
  DateHelper,
  DomHelper,
  EventHelper,
  StringHelper,
  Gantt
} = bryntum.gantt;

/**
 * A custom task model class implementing task color inheritance from parent task.
 */
class Task extends TaskModel {
  // Add a stable class name that survives code minification
  static $name = 'Task';
  static get fields() {
    return [
      // Add your own custom fields here
    ];
  }

  // For this demo, tasks are styled based on the first-level parent nodes (unless defined on task level)
  get eventColor() {
    if (!this.get('eventColor')) {
      return this.parent.eventColor;
    }
    return super.eventColor;
  }
}

/**
 * A custom demo feature that shows buttons used to scroll the time axis easily
 */
class TimelineScrollButtons extends InstancePlugin {
  // Add a stable class name that survives code minification
  static $name = 'TimelineScrollButtons';
  scrollAmount = 4;
  construct(client, config) {
    super.construct(client, config);

    // Use the headerRenderer method to inject our buttons
    client.columns.last.headerRenderer = this.timeAxisHeaderRender.bind(this);
  }
  timeAxisHeaderRender({
    headerElement
  }) {
    const parent = headerElement.closest('.b-schedulerheader');
    if (parent.querySelector('.b-scroll-button')) {
      return;
    }
    DomHelper.createElement({
      parent,
      className: 'b-scroll-button b-scroll-button-previous b-fa b-fa-chevron-left'
    });
    DomHelper.createElement({
      parent,
      className: 'b-scroll-button b-scroll-button-next b-fa b-fa-chevron-right'
    });

    // Set up the click listener
    EventHelper.on({
      element: parent,
      click: this.onClick,
      thisObj: this,
      delegate: '.b-scroll-button'
    });
  }

  // Handling when a button is clicked
  onClick({
    target
  }) {
    const {
        client
      } = this,
      {
        visibleDateRange
      } = client,
      unit = client.viewPreset.headers[0].unit;
    let date;
    if (target.matches('.b-scroll-button-next')) {
      date = DateHelper.add(visibleDateRange.endDate, this.scrollAmount, unit);
    } else {
      date = DateHelper.add(visibleDateRange.startDate, -this.scrollAmount, unit);
    }
    client.scrollToDate(date, {
      animate: {
        duration: 600,
        easing: 'easeInOutSine'
      }
    });
  }
}
GridFeatureManager.registerFeature(TimelineScrollButtons, false, 'Gantt');
const getResourceImage = resource => gantt.resourceImagePath + (resource.image !== false ? StringHelper.encodeHtml(resource.name.toLowerCase() + '.jpg') : 'none.png'),
  gantt = new Gantt({
    project: {
      taskModelClass: Task,
      autoLoad: true,
      loadUrl: '../_datasets/launch-saas-colors2.json'
    },
    appendTo: 'container',
    dependencyIdField: 'sequenceNumber',
    rowHeight: 50,
    tickSize: 40,
    barMargin: 10,
    resourceImagePath: '../_shared/images/users/',
    columnLines: false,
    // Default task bar color
    eventColor: 'blue',
    startDate: new Date(2023, 0, 9),
    transitionDuration: 400,
    zoomOnMouseWheel: false,
    infiniteScroll: true,
    features: {
      projectLines: false,
      // A custom demo feature adding scroll buttons to the time axis header, see ./lib folder for sources
      timelineScrollButtons: true,
      taskMenu: {
        clickTriggerSelector: '.menu'
      },
      dependencies: {
        // Rounded line joints
        radius: 10
      },
      timeRanges: true,
      nonWorkingTime: {
        showHeaderElements: false
      },
      taskTooltip: {
        textContent: false,
        template({
          taskRecord
        }) {
          var _taskRecord$parent;
          return `<div class="field"><label>Task</label><span>${StringHelper.encodeHtml(taskRecord.name)}</span></div>
                        <div class="field"><label>Module</label><span>${StringHelper.encodeHtml((_taskRecord$parent = taskRecord.parent) === null || _taskRecord$parent === void 0 ? void 0 : _taskRecord$parent.name) || ''}</span></div>
                        <div class="field"><label>Critical</label><span>${taskRecord.critical ? this.L('Yes') : this.L('No')}</span></div>
                        <div class="field"><label>Start</label><span>${DateHelper.format(taskRecord.startDate, 'MMM DD')}</span></div>
                        <div class="field"><label>Duration</label><span>${taskRecord.fullDuration}</span></div>
                        <div class="field"><label>Assigned to</label>
                        <div class="b-avatar-container">${taskRecord.resources.map(resourceRecord => `<img class="b-resource-avatar b-resource-image"  alt="${StringHelper.encodeHtml(resourceRecord.name)}" src="${getResourceImage(resourceRecord)}"/>`).join('')}</div>
                    `;
        }
      }
    },
    viewPreset: {
      base: 'weekAndDayLetter',
      columnLinesFor: 1,
      headers: [{
        unit: 'week',
        align: 'start',
        dateFormat: '{W}W MMM YYYY'
      }, {
        unit: 'day',
        dateFormat: 'DD'
      }, {
        unit: 'day',
        dateFormat: 'ddd'
      }]
    },
    columns: [{
      type: 'name',
      text: 'Customized Name Column',
      width: 320,
      renderer: ({
        record
      }) => {
        var _record$children;
        return {
          // Return a DomConfig object describing our custom markup with the task name and a child count badge
          // See https://bryntum.com/products/grid/docs/api/Core/helper/DomHelper#typedef-DomConfig for more information.
          children: [{
            tag: 'span',
            text: record.name
          }, ((_record$children = record.children) === null || _record$children === void 0 ? void 0 : _record$children.length) > 0 ? {
            class: 'b-child-count',
            text: record.children.length
          } : null]
        };
      }
    }, {
      type: 'percentdone',
      showCircle: true,
      width: 100,
      align: 'center'
    }, {
      type: 'duration'
    }, {
      type: 'action',
      width: 45,
      actions: [{
        tag: 'i',
        cls: 'menu b-fa b-fa-fw b-fa-ellipsis-h',
        tooltip: 'Task menu'
      }]
    }],
    // Custom task contents, showing avatars of the assigned resources
    taskRenderer({
      taskRecord,
      renderData
    }) {
      if (taskRecord.isLeaf && !taskRecord.isMilestone) {
        // For leaf tasks we return some custom elements, described as DomConfig objects.
        // Please see https://bryntum.com/products/grid/docs/api/Core/helper/DomHelper#typedef-DomConfig for more information.
        return [{
          tag: 'div',
          class: 'taskName',
          html: StringHelper.encodeHtml(taskRecord.name)
        }, {
          class: 'b-avatar-container',
          children: taskRecord.resources.map(resource => ({
            tag: 'img',
            src: getResourceImage(resource),
            dataset: {
              resourceId: resource.id
            }
          }))
        }];
      }
    },
    tbar: [{
      type: 'datefield',
      label: 'Date',
      width: 180,
      value: new Date(2023, 0, 15),
      onChange: 'up.onDateChange'
    }, '->', {
      type: 'button',
      cls: 'b-transparent b-fa b-fa-bars',
      onClick: 'up.onToggleButtonClick'
    }],
    onDateChange({
      value
    }) {
      this.scrollToDate(value, {
        animate: 300,
        block: 'start'
      });
    },
    onShowAvatarsChange({
      checked
    }) {
      this.element.classList.toggle('b-show-avatars-in-task', checked);
      this.widgetMap.rowHeightSlider.readOnly = checked;
      this.widgetMap.rowHeightSlider.value = this.rowHeight = checked ? 80 : 50;
    },
    onToggleButtonClick() {
      this.widgetMap.right.toggleCollapsed();
    },
    onRowHeightInput({
      value
    }) {
      this.rowHeight = value;
    },
    onBorderRadiusInput({
      value
    }) {
      this.element.style.setProperty('--task-border-radius', `${value}px`);
    },
    onGridColumnLinesChange({
      value
    }) {
      this.columnLines = value;
    },
    onScheduleTickLinesChange({
      value
    }) {
      this.features.columnLines.disabled = !value;
    },
    onNonworkingTimeChange({
      value
    }) {
      this.features.nonWorkingTime.disabled = !value;
    },
    onHideWeekendsChange({
      value
    }) {
      const {
          timeAxis
        } = this,
        date = this.visibleDateRange.startDate;
      this.element.classList.toggle('b-hide-weekends', value);
      this.runWithTransition(() => {
        if (value) {
          timeAxis.filterBy(tick => timeAxis.unit !== 'day' || tick.startDate.getDay() !== 6 && tick.startDate.getDay() !== 0);
        } else {
          timeAxis.clearFilters();
        }
      });

      // Maintain visible date
      this.visibleDate = {
        date,
        block: 'start'
      };
    },
    strips: {
      right: {
        type: 'panel',
        dock: 'right',
        collapsible: true,
        width: '20em',
        header: false,
        cls: 'b-sidebar',
        scrollable: {
          overflowY: true
        },
        collapsed: true,
        defaults: {
          labelPosition: 'above',
          width: '15em'
        },
        items: [{
          tag: 'h2',
          html: 'Settings'
        }, {
          type: 'slidetoggle',
          label: 'Show avatars',
          onChange: 'up.onShowAvatarsChange'
        }, {
          type: 'slidetoggle',
          label: 'Grid column lines',
          onChange: 'up.onGridColumnLinesChange'
        }, {
          type: 'slidetoggle',
          label: 'Schedule tick lines',
          onChange: 'up.onScheduleTickLinesChange',
          checked: true
        }, {
          type: 'slidetoggle',
          label: 'Highlight non-working time',
          onChange: 'up.onNonworkingTimeChange',
          checked: true
        }, {
          type: 'slidetoggle',
          label: 'Hide weekends',
          onChange: 'up.onHideWeekendsChange'
        }, {
          ref: 'rowHeightSlider',
          type: 'slider',
          text: 'Row height',
          min: 40,
          max: 80,
          showValue: false,
          showTooltip: true,
          onInput: 'up.onRowHeightInput'
        }, {
          ref: 'borderRadiusSlider',
          type: 'slider',
          text: 'Task border radius',
          min: 0,
          value: 5,
          max: 15,
          showValue: false,
          showTooltip: true,
          onInput: 'up.onBorderRadiusInput'
        }]
      }
    }
  });