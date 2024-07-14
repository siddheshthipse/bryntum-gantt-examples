import { DragHelper, Grid, StringHelper, Container, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

class Drag extends DragHelper {
    static get configurable() {
        return {
            // Don't drag the actual row element, clone it
            cloneTarget        : true,
            // Only allow drops on the gantt area
            dropTargetSelector : '.b-gantt .b-grid-subgrid',
            // Only allow drag of row elements inside on the unplanned grid
            targetSelector     : '.b-grid-row:not(.b-group-row)',
            callOnFunctions    : true,
            gantt              : null,
            grid               : null
        };
    }

    afterConstruct() {
        // Configure DragHelper with gantt's scrollManager to allow scrolling while dragging
        this.scrollManager = this.gantt.scrollManager;
    }

    onDragStart({ context }) {
        const { grid, gantt } = this;

        // Stop any ongoing cell editing
        grid.features.cellEdit.finishEditing();

        gantt.enableScrollingCloseToEdges(gantt.subGrids.locked);

        // Prevent tooltips from showing while dragging
        gantt.features.taskTooltip.disabled = true;
    }

    onDrag({ event, context }) {
        const
            me        = this,
            { gantt } = me,
            overRow   = context.valid && context.target && gantt.getRowFromElement(context.target);

        context.highlightRow?.removeCls('drag-from-grid-target-task-before');

        if (!context.valid) {
            return;
        }

        if (overRow) {
            const
                verticalMiddle = overRow.getRectangle('normal').center.y,
                dataIndex      = overRow.dataIndex,
                // Drop after row below if mouse is in bottom half of hovered row
                after          = event.clientY > verticalMiddle,
                overTask       = gantt.taskStore.getAt(dataIndex);

            context.insertBefore = after ? gantt.taskStore.getAt(dataIndex + 1) : overTask;
            context.parent       = (context.insertBefore || overTask).parent;

            if (context.insertBefore) {
                const highlightRow = context.highlightRow = gantt.rowManager.getRowFor(context.insertBefore);
                highlightRow.addCls('drag-from-grid-target-task-before');
            }
        }
        else {
            context.parent = gantt.taskStore.rootNode;
        }
    }

    // Drop callback after a mouse up, take action and transfer the unplanned task to the real EventStore (if it's valid)
    onDrop({ context }) {
        const
            { gantt, grid }                                        = this,
            { valid, highlightRow, parent, insertBefore, grabbed } = context;

        // If drop was done in a valid location, add the task to Gantt's task store
        if (valid) {
            const unplannedTask = grid.getRecordFromElement(grabbed);

            // Remove unplanned task from its current store
            grid.store.remove(unplannedTask);

            // Insert it to Gantt's task store
            parent.insertChild(unplannedTask, insertBefore);
        }

        gantt.disableScrollingCloseToEdges(gantt.timeAxisSubGrid);

        highlightRow?.removeCls('drag-from-grid-target-task-before');
        gantt.features.taskTooltip.disabled = false;
    }
}

class UnplannedGrid extends Grid {
    // Original class name getter. See Widget.$name docs for the details.
    static get $name() {
        return 'UnplannedGrid';
    }

    // Factoryable type name
    static get type() {
        return 'unplannedgrid';
    }

    static get configurable() {
        return {
            rowHeight : 50,
            cls       : 'unplannedTasks',
            flex      : 1,
            minWidth  : 195,
            features  : {
                stripe : true,
                sort   : 'name'
            },

            columns : [
                {
                    text       : 'Unscheduled tasks',
                    flex       : 2,
                    minWidth   : 195,
                    field      : 'name',
                    htmlEncode : false,
                    renderer   : ({ record }) => StringHelper.xss`<i class="unplanned-icon ${record.iconCls}"></i>${record.name}`
                },
                {
                    type  : 'duration',
                    flex  : 1,
                    align : 'right'
                }
            ]
        };
    }
};

// Register this widget type with its Factory
UnplannedGrid.initClass();

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

const container = new Container({
    appendTo : 'container',
    layout   : 'hbox',
    items    : [
        {
            type              : 'gantt',
            ref               : 'gantt',
            project,
            flex              : 4,
            dependencyIdField : 'sequenceNumber',
            subGridConfigs    : {
                locked : {
                    flex : 1
                },
                normal : {
                    flex : 2
                }
            },
            columns : [
                { type : 'name', width : 250 },
                { type : 'startdate' },
                { type : 'duration' }
            ]
        },
        { type : 'splitter' },
        {
            // The type is defined in the ./lib/UnplannedGrid.js class
            type  : 'unplannedgrid',
            ref   : 'unplannedGrid',
            store : {
                // Use the same data model as the Gantt task store
                modelClass : project.taskStore.modelClass,
                readUrl    : 'data/unplanned.json',
                autoLoad   : true
            }
        }
    ]
});

const
    { gantt, unplannedGrid } = container.widgetMap,
    drag                     = new Drag({
        grid          : unplannedGrid,
        gantt,
        scrollManager : gantt.scrollManager,
        outerElement  : unplannedGrid.element
    });
