import { DragHelper } from '@bryntum/gantt';

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

    onDragStart() {
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

export { Drag };
