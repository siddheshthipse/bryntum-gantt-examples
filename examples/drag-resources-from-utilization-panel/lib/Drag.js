import DragHelper from '../../../lib/Core/helper/DragHelper.js';
import Toast from '../../../lib/Core/widget/Toast.js';

export default class Drag extends DragHelper {
    static get configurable() {
        return {
            callOnFunctions      : true,
            // Don't drag the actual row element, we clone an image instead
            cloneTarget          : true,
            // We size the cloned element using CSS
            autoSizeClonedTarget : false,
            // Stack all dragged DOM nodes together
            unifiedProxy         : true,
            // Only allow drops on gantt task bars
            dropTargetSelector   : '.b-gantt-task-wrap,.b-gantt .b-grid-row',
            // Allow drag of row elements inside the resource grid
            targetSelector       : '.b-grid-subgrid-locked .b-resource-row',
            // Drag just the avatar, not the full row
            proxySelector        : '.b-resource-avatar',
            gantt                : null,
            grid                 : null
        };
    }

    onDragStart({ context }) {
        const
            { grid, gantt } = this,
            { grabbed }     = context;

        // save a reference to the resource so we can access it later
        context.resourceRecord = grid.getRecordFromElement(grabbed).origin;
        // context.relatedElements = grid.selectedRecords.map(rec => rec !== context.resourceRecord && grid.rowManager.getRowFor(rec).element).filter(el => el);

        gantt.enableScrollingCloseToEdges(gantt.timeAxisSubGrid);

        // To enable a hover effect on the grid rows while moving the mouse
        gantt.element.classList.add('b-dragging-resource');
    }

    onDrag({ context, event }) {
        const targetTask = context.taskRecord = this.gantt.resolveTaskRecord(event.target);

        context.valid = Boolean(targetTask && !targetTask.resources.includes(context.resourceRecord));
    }

    // Drop callback after a mouse up. If drop is valid, the element is animated to its final position before the data transfer
    async onDrop({ context }) {
        const
            { gantt, grid }                = this,
            { taskRecord, resourceRecord } = context;

        if (context.valid) {
            // Valid drop, provide a point to animate the proxy to before finishing the operation
            const
                resourceAssignmentCell = gantt.getCell({
                    column : gantt.columns.get('assignments'),
                    record : taskRecord
                }),
                avatarContainer        = resourceAssignmentCell.querySelector('.b-resource-avatar-container');

            // Before we finalize the drop and update the task record, transition the element to the target point
            if (avatarContainer) {
                await this.animateProxyTo(avatarContainer, {
                    align : 'l0-r0'
                });
            }

            grid.selectedRecords.forEach(({ origin : resourceRecord }) => {
                if (!taskRecord.resources.includes(resourceRecord)) {
                    taskRecord.assign(resourceRecord);
                }
            });
        }
        else if (taskRecord?.resources.includes(resourceRecord)) {
            Toast.show(`Task is already assigned to ${resourceRecord.name}`);
        }

        gantt.element.classList.remove('b-dragging-resource');
        gantt.disableScrollingCloseToEdges(gantt.timeAxisSubGrid);
    }

    updateGantt(gantt) {
        // Configure DragHelper with gantt's scrollManager to allow scrolling while dragging
        this.scrollManager = gantt.scrollManager;

        this.outerElement = this.grid.element;
    }
}
