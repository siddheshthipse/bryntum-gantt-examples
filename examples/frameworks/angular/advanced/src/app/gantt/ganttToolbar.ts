/**
 * Toolbar instance export
 */

import { DateHelper, Gantt, Menu, Popup, Toast, Toolbar } from '@bryntum/gantt';

const toolBar = (gantt: Gantt) => {

    const
        stm = gantt.project.stm,
        toolbar = new Toolbar(getDefaultConfig(gantt)),
        updateUndoRedoButtons = () => {
            const
                // @ts-ignore
                { undoBtn, redoBtn } = toolbar.widgetMap,
                redoCount = stm.length - stm.position;
            undoBtn.badge = stm.position || '';
            redoBtn.badge = redoCount || '';
            undoBtn.disabled = !stm.canUndo;
            redoBtn.disabled = !stm.canRedo;
        };

    stm.on({
        recordingstop : updateUndoRedoButtons,
        restoringstop : updateUndoRedoButtons
    });

    return toolbar;
};

export default toolBar;

const getDefaultConfig = gantt => {
    return {
        owner : gantt,
        gantt,
        items : [
            {
                type  : 'buttonGroup',
                items : [
                    {
                        type     : 'button',
                        color    : 'b-green',
                        ref      : 'addTaskButton',
                        icon     : 'b-fa b-fa-plus',
                        text     : 'Create',
                        tooltip  : 'Create new task',
                        onAction : 'up.onAddTaskClick'
                    }
                ]
            },
            {
                type  : 'buttonGroup',
                items : [
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'editTaskButton',
                        icon     : 'b-fa b-fa-pen',
                        text     : 'Edit',
                        tooltip  : 'Edit selected task',
                        onAction : 'up.onEditTaskClick'
                    },
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'undoBtn',
                        icon     : 'b-icon b-fa b-fa-undo',
                        tooltip  : 'Undo',
                        disabled : true,
                        width    : '2em',
                        onAction : 'up.onUndoClick'
                    },
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'redoBtn',
                        icon     : 'b-icon b-fa b-fa-redo',
                        tooltip  : 'Redo',
                        disabled : true,
                        width    : '2em',
                        onAction : 'up.onRedoClick'
                    }
                ]
            },
            {
                type  : 'buttonGroup',
                items : [
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'expandAllButton',
                        icon     : 'b-fa b-fa-angle-double-down',
                        tooltip  : 'Expand all',
                        onAction : 'up.onExpandAllClick'
                    },
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'collapseAllButton',
                        icon     : 'b-fa b-fa-angle-double-up',
                        tooltip  : 'Collapse all',
                        onAction : 'up.onCollapseAllClick'
                    }
                ]
            },
            {
                type  : 'buttonGroup',
                items : [
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'zoomInButton',
                        icon     : 'b-fa b-fa-search-plus',
                        tooltip  : 'Zoom in',
                        onAction : 'up.onZoomInClick'
                    },
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'zoomOutButton',
                        icon     : 'b-fa b-fa-search-minus',
                        tooltip  : 'Zoom out',
                        onAction : 'up.onZoomOutClick'
                    },
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'zoomToFitButton',
                        icon     : 'b-fa b-fa-compress-arrows-alt',
                        tooltip  : 'Zoom to fit',
                        onAction : 'up.onZoomToFitClick'
                    },
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'previousButton',
                        icon     : 'b-fa b-fa-angle-left',
                        tooltip  : 'Previous time span',
                        onAction : 'up.onShiftPreviousClick'
                    },
                    {
                        type     : 'button',
                        color    : 'b-blue',
                        ref      : 'nextButton',
                        icon     : 'b-fa b-fa-angle-right',
                        tooltip  : 'Next time span',
                        onAction : 'up.onShiftNextClick'
                    }
                ]
            },
            {
                type  : 'buttonGroup',
                items : [
                    {
                        type       : 'button',
                        color      : 'b-blue',
                        ref        : 'featuresButton',
                        icon       : 'b-fa b-fa-tasks',
                        text       : 'Features',
                        tooltip    : 'Toggle features',
                        toggleable : true,
                        onAction   : 'up.onFeaturesClick'
                    },
                    {
                        type       : 'button',
                        color      : 'b-blue',
                        ref        : 'settingsButton',
                        icon       : 'b-fa b-fa-cogs',
                        text       : 'Settings',
                        tooltip    : 'Adjust settings',
                        toggleable : true,
                        onAction   : 'up.onSettingsClick'
                    }
                ]
            },
            {
                type     : 'datefield',
                ref      : 'startDateField',
                label    : 'Project start',
                width    : '17em',
                required : true,
                // @todo: listeners defined this way should work (@Nige)
                // listeners : {
                //     change : 'up.onStartDateChange'
                // }
                onChange : 'up.onStartDateChange'
            },
            {
                type                 : 'textfield',
                ref                  : 'filterByName',
                width                : '13em',
                placeholder          : 'Find tasks by name',
                clearable            : true,
                keyStrokeChangeDelay : 100,
                triggers             : {
                    filter : {
                        align : 'start',
                        cls   : 'b-fa b-fa-filter'
                    }
                },
                onChange : 'up.onFilterChange'
            }
        ],

        // region controller methods
        async onAddTaskClick() {
            const
                gantt = this.gantt,
                added = gantt.taskStore.rootNode.appendChild({
                    name     : 'New task',
                    duration : 1
                })
            ;
            // run propagation to calculate new task fields
            await gantt.project.propagateAsync();

            // scroll to the added task
            await gantt.scrollRowIntoView(added);

            gantt.features.cellEdit.startEditing({
                record : added,
                field  : 'name'
            });

        },

        onEditTaskClick() {
            const gantt = this.gantt;
            if (gantt.selectedRecord) {
                gantt.editTask(gantt.selectedRecord);
            }
            else {
                Toast.show('First select the task you want to edit');
            }
        },

        onExpandAllClick() {
            this.gantt.expandAll();
        },

        onCollapseAllClick() {
            this.gantt.collapseAll();
        },

        onZoomInClick() {
            this.gantt.zoomIn();
        },

        onZoomOutClick() {
            this.gantt.zoomOut();
        },

        onZoomToFitClick() {
            this.gantt.zoomToFit({
                leftMargin  : 50,
                rightMargin : 50
            });
        },

        onShiftPreviousClick() {
            this.gantt.shiftPrevious();
        },

        onShiftNextClick() {
            this.gantt.shiftNext();
        },

        onStartDateChange({ value }) {
            this.gantt.startDate = DateHelper.add(value, -1, 'week');

            this.gantt.project.setStartDate(value);
        },

        onFilterChange({ value }) {
            if (value === '') {
                this.gantt.taskStore.clearFilters();
            }
            else {
                value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                this.gantt.taskStore.filter(task => task.name && task.name.match(new RegExp(value, 'i')));
            }
        },

        onFeaturesClick({ source }) {
            const
                gantt = this.gantt,
                features = gantt.features;
            new Menu({
                forElement  : source.element,
                closeAction : 'destroy',
                items       : [
                    {
                        text     : 'Draw dependencies',
                        checked  : !features.dependencies.disabled,
                        onToggle : () => features.dependencies.disabled = !features.dependencies.disabled
                    },
                    {
                        text     : 'Task labels',
                        checked  : !features.labels.disabled,
                        onToggle : () => features.labels.disabled = !features.labels.disabled
                    },
                    {
                        text     : 'Project lines',
                        checked  : !features.projectLines.disabled,
                        onToggle : () => features.projectLines.disabled = !features.projectLines.disabled
                    },
                    {
                        text     : 'Highlight non-working time',
                        checked  : !features.nonWorkingTime.disabled,
                        onToggle : () => features.nonWorkingTime.disabled = !features.nonWorkingTime.disabled
                    },
                    {
                        text     : 'Enable cell editing',
                        checked  : !features.cellEdit.disabled,
                        onToggle : () => features.cellEdit.disabled = !features.cellEdit.disabled
                    },
                    {
                        text     : 'Hide schedule',
                        cls      : 'b-separator',
                        checked  : gantt.subGrids.normal.collapsed,
                        onToggle : () => gantt.subGrids.normal.collapsed = !gantt.subGrids.normal.collapsed
                    }
                ],
                listeners : {
                    destroy() {
                        source.pressed = false;
                    }
                }
            });
        },

        onSettingsClick({ source }) {
            const
                gantt = this.gantt,
                popup = new Popup({
                    forElement  : source.element,
                    closeAction : 'destroy',
                    anchor      : true,
                    layoutStyle : {
                        flexDirection : 'column'
                    },
                    items : [
                        {
                            type      : 'slider',
                            ref       : 'rowHeight',
                            text      : 'Row height',
                            width     : '10em',
                            showValue : true,
                            value     : gantt.rowHeight,
                            min       : 30,
                            max       : 70,
                            style     : 'margin-bottom: .5em',
                            onInput({ value }) {
                                gantt.rowHeight = value;
                                popup.widgetMap['barMargin'].max = (value / 2) - 5;
                            }
                        },
                        {
                            type      : 'slider',
                            ref       : 'barMargin',
                            text      : 'Bar margin',
                            width     : '10em',
                            showValue : true,
                            value     : gantt.barMargin,
                            min       : 0,
                            max       : (gantt.rowHeight / 2) - 5,
                            onInput   : ({ value }) => gantt.barMargin = value
                        }
                    ],
                    listeners : {
                        destroy() {
                            source.pressed = false;
                        }
                    }
                });
        },

        onUndoClick() {
            if (this.gantt.project.stm.canUndo) {
                this.gantt.project.stm.undo();
            }
        },

        onRedoClick() {
            if (this.gantt.project.stm.canRedo) {
                this.gantt.project.stm.redo();
            }
        }

    };

};
