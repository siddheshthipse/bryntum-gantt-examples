import { TaskModel, Gantt, ProjectModel, ResourceUtilization, Splitter, DateHelper, StringHelper, AvatarRendering, Store } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

// Subclass standard TaskModel to add an extra field
// indicating special tasks representing projects
class Task extends TaskModel {

    static $name = 'Task';

    static fields = [
        { name : 'isProjectTask', type : 'boolean' }
    ];

    // Returns the project the task belongs to
    get projectTask() {
        let result = null;

        // proceed the task hierarchy to the root
        this.bubbleWhile(task => {
            // if current task is a project
            if (task.isProjectTask) {
                result = task;
            }

            // stop when project is found or we got to the root
            return !result && task.parent && !task.parent.isRoot;
        });

        return result;
    }
}

const project = new ProjectModel({
    taskModelClass : Task,

    loadUrl  : 'data/load.json',
    autoLoad : true,

    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const gantt = new Gantt({
    project,
    dependencyIdField       : 'sequenceNumber',
    resourceImageFolderPath : '../_shared/images/users/',
    appendTo                : 'container',
    viewPreset              : 'weekAndDayLetter',
    tickSize                : 40,
    columnLines             : true,
    startDate               : '2024-01-16',
    columns                 : [
        { type : 'name', width : 280 },
        { type : 'resourceassignment', showAvatars : true, width : 170 }
    ]
});

new Splitter({
    appendTo : 'container'
});

// prepare array of functions we are going to group the view store by
// (we make a constant since we are going to use it in few places)
const resourceNProjectGroupFns = [
    // group by resource
    ({ origin }) => {
        // If record is a resource means it has no assignments ..since this function is called for leaves only.
        // So further grouping makes no sense for this record - stop grouping.
        if (origin.isResourceModel) {
            return Store.StopBranch;
        }

        return origin.resource;
    },
    // group by the task project
    ({ origin }) => {
        // If record is a resource means it has no assignments since this function is called for leaves only.
        // So further grouping makes no sense for this record - stop grouping.
        if (origin.isResourceModel) {
            return Store.StopBranch;
        }

        return origin.event?.projectTask || 'No Project';
    }
];

const resourceUtilization = new ResourceUtilization({
    appendTo                : 'container',
    project,
    partner                 : gantt,
    rowHeight               : 40,
    showBarTip              : true,
    resourceImageFolderPath : '../_shared/images/users/',
    features                : {
        treeGroup : {
            levels : resourceNProjectGroupFns
        }
    },

    // Display either allocated time (default) or time left in bars
    getBarText({ effort, maxEffort }, index, series, renderData) {
        const view = this.owner;

        // default text
        let result = view.getBarTextDefault(...arguments);

        // If we have "Show time left" checked
        // and both spent and max time are provided
        if (view.widgetMap.showTimeLeft.checked && maxEffort && effort) {

            const unit = view.getBarTextEffortUnit();

            // display available time left
            result = view.getEffortText(Math.max(maxEffort - effort, 0), unit);
        }

        return result;
    },

    listeners : {
        // Let's scroll Gantt to the corresponding task
        // when clicking a row representing an assignment or a project
        cellClick({ grid, record }) {
            record = grid.resolveRecordToOrigin(record);

            const task = record.isAssignmentModel ? record.event : record.key?.isProjectTask ? record.key : null;

            if (task) {
                gantt.scrollTaskIntoView(task, {
                    highlight : true,
                    animate   : {
                        easing   : 'easeFromTo',
                        duration : 2000
                    }
                });
            }
        }
    },

    columns : [
        {
            type  : 'tree',
            field : 'name',
            width : 280,
            text  : 'Resource / Task',
            renderer({ record, grid }) {
                // Unwrap record to its origin - resource or assignment
                record = grid.resolveRecordToOrigin(record);

                if (record.key?.isResourceModel) {
                    record = record.key;
                }

                // If that's a resource row
                if (record.isResourceModel) {
                    if (!this.avatarRendering) {
                        this.avatarRendering = new AvatarRendering({
                            element : grid.element
                        });
                    }

                    return {
                        class    : 'b-resource-info',
                        children : [
                            this.avatarRendering.getResourceAvatar({
                                initials : record.initials,
                                color    : record.eventColor,
                                iconCls  : record.iconCls,
                                imageUrl : record.image ? `${grid.resourceImageFolderPath}${record.image}` : null
                            }),
                            record.name
                        ]
                    };
                }
                // If that's an assignment row
                else if (record.isAssignmentModel) {
                    return StringHelper.encodeHtml(record.event?.name);
                }

                // Otherwise record represents a group
                // so record.key might have: resource, event or city
                return record.key?.name || record.key;
            }
        },
        {
            cellCls : 'taskDateRange',
            renderer({ record, grid }) {
                record = grid.resolveRecordToOrigin(record);

                // Show event start/end for assignment row
                if (record.isAssignmentModel) {
                    const task = record.event;

                    return DateHelper.format(task.startDate, 'MMM Do') + ' - ' + DateHelper.format(task.endDate, 'MMM Do');
                }

                return '';
            }
        }
    ],

    tbar : {
        cls   : 'utilization-toolbar',
        items : [
            {
                type     : 'checkbox',
                ref      : 'showBarTip',
                text     : 'Enable bar tooltip',
                tooltip  : 'Check to show tooltips when moving mouse over bars',
                checked  : true,
                onAction : 'up.onShowBarTipToggle'
            },
            {
                ref      : 'showTimeLeft',
                type     : 'checkbox',
                text     : 'Show time left',
                tooltip  : 'Check to show time left in bars',
                onAction : 'up.onShowTimeLeftToggle'
            },
            '->',
            {
                type : 'label',
                text : 'Group by'
            },
            {
                type        : 'buttongroup',
                toggleGroup : true,
                cls         : 'group-buttons',
                items       : [
                    {
                        text                 : 'Resource, Project',
                        tooltip              : 'Click to toggle Resource→Project to Project→Resource grouping',
                        icon                 : 'b-fa b-fa-arrow-down',
                        pressed              : true,
                        supportsPressedClick : true,
                        onAction() {
                            // toggle group direction for this button
                            this._groupDirection = !this._groupDirection;

                            if (this._groupDirection) {
                                this.icon = 'b-fa b-fa-arrow-up';

                                // group in backward order - first by Project and then by Resource
                                resourceUtilization.group([...resourceNProjectGroupFns].reverse());
                            }
                            else {
                                this.icon = 'b-fa b-fa-arrow-down';

                                resourceUtilization.group(resourceNProjectGroupFns);
                            }
                        }
                    },
                    {
                        text    : 'City, Resource',
                        tooltip : 'Group by City and Resource',
                        onAction() {
                            resourceUtilization.group([
                                // by city
                                ({ origin }) => origin.isResourceModel ? origin.city : origin.resource.city,
                                // Second group by resource ..if that's an unassigned resource just stop grouping
                                ({ origin }) => origin.isResourceModel ? Store.StopBranch : origin.resource
                            ]);
                        }
                    },
                    {
                        text    : 'Default',
                        tooltip : 'Reset grouping to the default state',
                        onAction() {
                            // reset grouping feature - back to default view
                            resourceUtilization.clearGroups();
                        }
                    }
                ]
            }
        ]
    },

    onShowBarTipToggle({ source }) {
        resourceUtilization.showBarTip = source.checked;
    },

    onShowTimeLeftToggle({ source }) {
        resourceUtilization.showLeftTime = source.checked;

        // schedule the view refresh
        resourceUtilization.scheduleRefreshRows();
    }
});
