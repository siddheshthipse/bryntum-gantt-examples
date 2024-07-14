

var {
  Toolbar,
  Toast,
  DateHelper,
  CSSHelper,
  Column,
  ColumnStore,
  Combo,
  TaskModel,
  Gantt
} = bryntum.gantt;

/**
 * @module GanttToolbar
 */

/**
 * @extends Core/widget/Toolbar
 */
class GanttToolbar extends Toolbar {
  // Factoryable type name
  static get type() {
    return 'gantttoolbar';
  }
  static get $name() {
    return 'GanttToolbar';
  }
  static get configurable() {
    return {
      items: {
        addTaskButton: {
          color: 'b-green',
          icon: 'b-fa b-fa-plus',
          text: 'Create',
          tooltip: 'Create new task',
          onAction: 'up.onAddTaskClick'
        },
        undoRedo: {
          type: 'undoredo',
          items: {
            transactionsCombo: null
          }
        },
        toggleButtons: {
          type: 'buttonGroup',
          items: {
            expandAllButton: {
              icon: 'b-fa b-fa-angle-double-down',
              tooltip: 'Expand all',
              onAction: 'up.onExpandAllClick'
            },
            collapseAllButton: {
              icon: 'b-fa b-fa-angle-double-up',
              tooltip: 'Collapse all',
              onAction: 'up.onCollapseAllClick'
            }
          }
        },
        zoomButtons: {
          type: 'buttonGroup',
          items: {
            zoomInButton: {
              icon: 'b-fa b-fa-search-plus',
              tooltip: 'Zoom in',
              onAction: 'up.onZoomInClick'
            },
            zoomOutButton: {
              icon: 'b-fa b-fa-search-minus',
              tooltip: 'Zoom out',
              onAction: 'up.onZoomOutClick'
            },
            zoomToFitButton: {
              icon: 'b-fa b-fa-compress-arrows-alt',
              tooltip: 'Zoom to fit',
              onAction: 'up.onZoomToFitClick'
            },
            previousButton: {
              icon: 'b-fa b-fa-angle-left',
              tooltip: 'Previous time span',
              onAction: 'up.onShiftPreviousClick'
            },
            nextButton: {
              icon: 'b-fa b-fa-angle-right',
              tooltip: 'Next time span',
              onAction: 'up.onShiftNextClick'
            }
          }
        },
        startDateField: {
          type: 'datefield',
          label: 'Project start',
          // required  : true, (done on load)
          flex: '0 0 18em',
          listeners: {
            change: 'up.onStartDateChange'
          }
        },
        projectSelector: {
          type: 'combo',
          label: 'Choose project',
          editable: false,
          width: '25em',
          displayField: 'name',
          value: 1,
          store: {
            data: [{
              id: 1,
              name: 'Launch SaaS',
              url: '../_datasets/launch-saas.json'
            }, {
              id: 2,
              name: 'Build web app for customer',
              url: '../_datasets/tasks-workedhours.json'
            }]
          },
          listeners: {
            select: 'up.onProjectSelected'
          }
        },
        spacer: '->',
        filterByName: {
          type: 'textfield',
          cls: 'filter-by-name',
          flex: '0 0 13.5em',
          // Label used for material, hidden in other themes
          label: 'Find tasks by name',
          // Placeholder for others
          placeholder: 'Find tasks by name',
          clearable: true,
          keyStrokeChangeDelay: 100,
          triggers: {
            filter: {
              align: 'end',
              cls: 'b-fa b-fa-filter'
            }
          },
          onChange: 'up.onFilterChange'
        },
        featuresButton: {
          type: 'button',
          icon: 'b-fa b-fa-tasks',
          text: 'Settings',
          tooltip: 'Toggle features',
          menu: {
            onItem: 'up.onFeaturesClick',
            onBeforeShow: 'up.onFeaturesShow',
            // "checked" is set to a boolean value to display a checkbox for menu items. No matter if it is true or false.
            // The real value is set dynamically depending on the "disabled" config of the feature it is bound to.
            items: {
              settings: {
                text: 'UI settings',
                icon: 'b-fa-sliders-h',
                menu: {
                  cls: 'settings-menu',
                  layoutStyle: {
                    flexDirection: 'column'
                  },
                  onBeforeShow: 'up.onSettingsShow',
                  defaults: {
                    type: 'slider',
                    showValue: true
                  },
                  items: [{
                    ref: 'rowHeight',
                    text: 'Row height',
                    min: 30,
                    max: 70,
                    onInput: 'up.onRowHeightChange'
                  }, {
                    ref: 'barMargin',
                    text: 'Bar margin',
                    min: 0,
                    max: 10,
                    onInput: 'up.onBarMarginChange'
                  }, {
                    ref: 'duration',
                    text: 'Animation duration',
                    min: 0,
                    max: 2000,
                    step: 100,
                    onInput: 'up.onAnimationDurationChange'
                  }, {
                    ref: 'radius',
                    text: 'Dependency radius',
                    min: 0,
                    max: 10,
                    onInput: 'up.onDependencyRadiusChange'
                  }]
                }
              },
              drawDeps: {
                text: 'Draw dependencies',
                feature: 'dependencies',
                checked: false
              },
              taskLabels: {
                text: 'Task labels',
                feature: 'labels',
                checked: false
              },
              criticalPaths: {
                text: 'Critical paths',
                feature: 'criticalPaths',
                tooltip: 'Highlight critical paths',
                checked: false
              },
              projectLines: {
                text: 'Project lines',
                feature: 'projectLines',
                checked: false
              },
              nonWorkingTime: {
                text: 'Highlight non-working time',
                feature: 'nonWorkingTime',
                checked: false
              },
              cellEdit: {
                text: 'Enable cell editing',
                feature: 'cellEdit',
                checked: false
              },
              autoEdit: {
                text: 'Auto edit',
                checked: false,
                onItem: 'up.onAutoEditToggle'
              },
              columnLines: {
                text: 'Show column lines',
                feature: 'columnLines',
                checked: true
              },
              baselines: {
                text: 'Show baselines',
                feature: 'baselines',
                checked: false
              },
              rollups: {
                text: 'Show rollups',
                feature: 'rollups',
                checked: false
              },
              progressLine: {
                text: 'Show progress line',
                feature: 'progressLine',
                checked: false
              },
              parentArea: {
                text: 'Show parent area',
                feature: 'parentArea',
                checked: false
              },
              fillTicks: {
                text: 'Stretch tasks to fill ticks',
                toggleConfig: 'fillTicks',
                checked: false
              },
              hideSchedule: {
                text: 'Hide schedule',
                cls: 'b-separator',
                subGrid: 'normal',
                checked: false
              }
            }
          }
        }
      }
    };
  }
  construct() {
    super.construct(...arguments);
    this.gantt = this.parent;
    this.gantt.project.on({
      load: 'updateStartDateField',
      refresh: 'updateStartDateField',
      thisObj: this
    });
    this.styleNode = document.createElement('style');
    document.head.appendChild(this.styleNode);
  }
  setAnimationDuration(value) {
    const me = this,
      cssText = `.b-animating .b-gantt-task-wrap { transition-duration: ${value / 1000}s !important; }`;
    me.gantt.transitionDuration = value;
    if (me.transitionRule) {
      me.transitionRule.cssText = cssText;
    } else {
      me.transitionRule = CSSHelper.insertRule(cssText);
    }
  }
  updateStartDateField() {
    const {
      startDateField
    } = this.widgetMap;
    startDateField.value = this.gantt.project.startDate;

    // This handler is called on project.load/propagationComplete, so now we have the
    // initial start date. Prior to this time, the empty (default) value would be
    // flagged as invalid.
    startDateField.required = true;
  }

  // region controller methods

  async onAddTaskClick() {
    const {
        gantt
      } = this,
      added = gantt.taskStore.rootNode.appendChild({
        name: this.L('New task'),
        duration: 1
      });

    // run propagation to calculate new task fields
    await gantt.project.commitAsync();

    // scroll to the added task
    await gantt.scrollRowIntoView(added);
    gantt.features.cellEdit.startEditing({
      record: added,
      field: 'name'
    });
  }
  onEditTaskClick() {
    const {
      gantt
    } = this;
    if (gantt.selectedRecord) {
      gantt.editTask(gantt.selectedRecord);
    } else {
      Toast.show(this.L('First select the task you want to edit'));
    }
  }
  onExpandAllClick() {
    this.gantt.expandAll();
  }
  onCollapseAllClick() {
    this.gantt.collapseAll();
  }
  onZoomInClick() {
    this.gantt.zoomIn();
  }
  onZoomOutClick() {
    this.gantt.zoomOut();
  }
  onZoomToFitClick() {
    this.gantt.zoomToFit({
      leftMargin: 50,
      rightMargin: 50
    });
  }
  onShiftPreviousClick() {
    this.gantt.shiftPrevious();
  }
  onShiftNextClick() {
    this.gantt.shiftNext();
  }
  onAutoEditToggle({
    item
  }) {
    this.gantt.features.cellEdit.autoEdit = item.checked;
  }
  onStartDateChange({
    value,
    userAction
  }) {
    // Scroll to date only when user changes the date, not for the initial set
    if (value && userAction) {
      this.gantt.scrollToDate(DateHelper.add(value, -1, 'week'), {
        block: 'start'
      });
      this.gantt.project.setStartDate(value);
    }
  }
  onProjectSelected({
    record
  }) {
    this.gantt.project.load(record.url);
  }
  onFilterChange({
    value
  }) {
    if (value === '') {
      this.gantt.taskStore.clearFilters();
    } else {
      value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      this.gantt.taskStore.filter({
        filters: task => task.name && task.name.match(new RegExp(value, 'i')),
        replace: true
      });
    }
  }
  onFeaturesClick({
    source: item
  }) {
    const {
      gantt
    } = this;
    if (item.feature) {
      const feature = gantt.features[item.feature];
      feature.disabled = !feature.disabled;
    } else if (item.subGrid) {
      const subGrid = gantt.subGrids[item.subGrid];
      subGrid.collapsed = !subGrid.collapsed;
    } else if (item.toggleConfig) {
      gantt[item.toggleConfig] = item.checked;
    }
  }
  onFeaturesShow({
    source: menu
  }) {
    const {
      gantt
    } = this;
    menu.items.map(item => {
      const {
        feature
      } = item;
      if (feature) {
        // a feature might be not presented in the gantt
        // (the code is shared between "advanced" and "php" demos which use a bit different set of features)
        if (gantt.features[feature]) {
          item.checked = !gantt.features[feature].disabled;
        }
        // hide not existing features
        else {
          item.hide();
        }
      } else if (item.subGrid) {
        item.checked = gantt.subGrids[item.subGrid].collapsed;
      }
    });
  }
  onSettingsShow({
    source: menu
  }) {
    const {
        gantt
      } = this,
      {
        rowHeight,
        barMargin,
        duration,
        radius
      } = menu.widgetMap;
    rowHeight.value = gantt.rowHeight;
    barMargin.value = gantt.barMargin;
    barMargin.max = gantt.rowHeight / 2 - 5;
    duration.value = gantt.transitionDuration;
    radius.value = gantt.features.dependencies.radius ?? 0;
  }
  onRowHeightChange({
    value,
    source
  }) {
    this.gantt.rowHeight = value;
    source.owner.widgetMap.barMargin.max = value / 2 - 5;
  }
  onBarMarginChange({
    value
  }) {
    this.gantt.barMargin = value;
  }
  onAnimationDurationChange({
    value
  }) {
    this.gantt.transitionDuration = value;
    this.styleNode.innerHTML = `.b-animating .b-gantt-task-wrap { transition-duration: ${value / 1000}s !important; }`;
  }
  onDependencyRadiusChange({
    value
  }) {
    this.gantt.features.dependencies.radius = value;
  }
  onCriticalPathsClick({
    source
  }) {
    this.gantt.features.criticalPaths.disabled = !source.pressed;
  }

  // endregion
}
;

// Register this widget type with its Factory
GanttToolbar.initClass();

/**
 * @module StatusColumn
 */

/**
 * A column showing the status of a task
 *
 * @extends Gantt/column/Column
 * @classtype statuscolumn
 */
class StatusColumn extends Column {
  static get $name() {
    return 'StatusColumn';
  }
  static get type() {
    return 'statuscolumn';
  }
  static get isGanttColumn() {
    return true;
  }
  static get defaults() {
    return {
      // Set your default instance config properties here
      field: 'status',
      text: 'Status',
      editor: false,
      readOnly: true,
      // For FillHandle etc.
      cellCls: 'b-status-column-cell',
      htmlEncode: false,
      filterable: {
        filterField: {
          type: 'combo',
          items: ['Not Started', 'Started', 'Completed', 'Late']
        }
      }
    };
  }

  //endregion

  renderer({
    record
  }) {
    const status = record.status;
    return status ? [{
      tag: 'i',
      className: `b-fa b-fa-circle ${status}`
    }, status] : '';
  }

  // * reactiveRenderer() {
  //     const
  //         percentDone = yield this.record.$.percentDone;
  //         //endDate     = yield this.record.$.endDate;
  //
  //     let status;
  //
  //     if (percentDone >= 100) {
  //         status = 'Completed';
  //     }
  //     // else if (endDate < Date.now()) {
  //     //     status = 'Late';
  //     // }
  //     else if (percentDone > 0) {
  //         status = 'Started';
  //     }
  //
  //     return status ? {
  //         tag       : 'i',
  //         className : `b-fa b-fa-circle ${status}`,
  //         html      : status
  //     } : '';
  // }
}
ColumnStore.registerColumnType(StatusColumn);
class ComplexityCombo extends Combo {
  static type = 'complexitycombo';
  static defaultConfig = {
    items: [{
      value: 0,
      text: 'Easy'
    }, {
      value: 1,
      text: 'Normal'
    }, {
      value: 2,
      text: 'Hard'
    }, {
      value: 3,
      text: 'Impossible'
    }],
    picker: {
      minWidth: '8em'
    },
    listItemTpl: ({
      text
    }) => `
            <div>
                <i style="margin-inline-end: 0.5em" class="b-fa b-fa-square ${text}"></i>
                <small>${text}</small>
            </div>
        `
  };
  syncInputFieldValue(...args) {
    var _this$store$getById;
    const complexity = (_this$store$getById = this.store.getById(this.value)) === null || _this$store$getById === void 0 ? void 0 : _this$store$getById.text;
    this.icon.className = `b-fa b-fa-square ${complexity}`;
    super.syncInputFieldValue(...args);
  }
  get innerElements() {
    return [{
      reference: 'icon',
      tag: 'i',
      style: {
        marginInlineStart: '.8em',
        marginInlineEnd: '-.3em'
      }
    }, ...super.innerElements];
  }
}

// Register class to be able to create widget by type
ComplexityCombo.initClass();

/**
 * @module ComplexityColumn
 */

/**
 * A column showing the complexity of a task
 *
 * @extends Gantt/column/Column
 * @classtype complexitycolumn
 */
class ComplexityColumn extends Column {
  static $name = 'ComplexityColumn';
  static type = 'complexitycolumn';
  static isGanttColumn = true;
  static defaults = {
    // Set your default instance config properties here
    field: 'complexity',
    text: 'Complexity',
    cellCls: 'b-complexity-column-cell',
    editor: {
      type: 'complexitycombo'
    }
  };

  //endregion

  renderer({
    column,
    value
  }) {
    var _store$getById;
    const {
        store
      } = column.editor,
      complexity = (_store$getById = store.getById(value)) === null || _store$getById === void 0 ? void 0 : _store$getById.text;
    return complexity ? [{
      tag: 'i',
      className: `b-fa b-fa-square ${complexity}`
    }, complexity] : '';
  }
}
ColumnStore.registerColumnType(ComplexityColumn);

// here you can extend our default Task class with your additional fields, methods and logic
class Task extends TaskModel {
  static $name = 'Task';
  static get fields() {
    return [
    // enable project border constraint check
    {
      name: 'projectConstraintResolution',
      defaultValue: 'conflict'
    }, 'status',
    // For status column
    {
      name: 'complexity',
      type: 'number'
    } // For complexity column
    ];
  }
  get isLate() {
    return !this.isCompleted && this.deadlineDate && Date.now() > this.deadlineDate;
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
  dependencyIdField: 'wbsCode',
  selectionMode: {
    cell: true,
    dragSelect: true,
    rowNumber: true
  },
  project: {
    // Let the Project know we want to use our own Task model with custom fields / methods
    taskModelClass: Task,
    transport: {
      load: {
        url: '../_datasets/launch-saas.json'
      }
    },
    autoLoad: true,
    taskStore: {
      wbsMode: 'auto'
    },
    // The State TrackingManager which the UndoRedo widget in the toolbar uses
    stm: {
      autoRecord: true
    },
    // Reset Undo / Redo after each load
    resetUndoRedoQueuesAfterLoad: true
  },
  // For best initial performance, configure startDate & endDate to determine the date range that needs to be
  // rendered initially
  startDate: '2019-01-12',
  endDate: '2019-03-24',
  resourceImageFolderPath: '../_shared/images/users/',
  scrollTaskIntoViewOnCellClick: true,
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
    type: 'resourceassignment',
    width: 120,
    showAvatars: true
  }, {
    type: 'percentdone',
    showCircle: true,
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
    type: 'statuscolumn'
  }, {
    type: 'complexitycolumn'
  }, {
    type: 'deadlinedate'
  }, {
    type: 'addnew'
  }],
  subGridConfigs: {
    locked: {
      flex: 3
    },
    normal: {
      flex: 4
    }
  },
  columnLines: false,
  // Shows a color field in the task editor and a color picker in the task menu.
  // Both lets the user select the Task bar's background color
  showTaskColorPickers: true,
  features: {
    baselines: {
      disabled: true
    },
    dependencies: {
      showLagInTooltip: true,
      // Soften up dependency line corners
      radius: 3,
      // Make dependencies easier to reach using the mouse
      clickWidth: 5
    },
    dependencyEdit: true,
    filter: true,
    labels: {
      left: {
        field: 'name',
        editor: {
          type: 'textfield'
        }
      }
    },
    parentArea: {
      disabled: true
    },
    progressLine: {
      disabled: true,
      statusDate: new Date(2019, 0, 25)
    },
    rollups: {
      disabled: true
    },
    rowResize: {
      cellSelector: '.b-rownumber-cell'
    },
    rowReorder: {
      showGrip: true,
      preserveSorters: true
    },
    timeRanges: {
      showCurrentTimeLine: true
    },
    fillHandle: true,
    cellCopyPaste: true,
    taskCopyPaste: {
      useNativeClipboard: true
    }
  },
  tbar: {
    type: 'gantttoolbar'
  }
});