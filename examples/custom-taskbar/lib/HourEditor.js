import Editor from '../../../lib/Core/widget/Editor.js';

/**
 * A custom Editor letting you edit the worked hours/day cells of leaf tasks
 */
export default class HourEditor extends Editor {
    static configurable = {
        hideTarget           : true,
        appendToTargetParent : true,
        cls                  : 'b-hour-editor',
        inputField           : {
            type       : 'numberfield',
            autoSelect : true,
            // Not showing up/down arrow icons
            triggers   : null,
            // Hard to work less than 0 hours per day
            min        : 0,
            minWidth   : 0
        }
    };

    onHourCellClick(taskRecord, target) {
        if (target.matches('.b-day-hours')) {
            const me = this;
            me.completeEdit();
            me._taskRecord = taskRecord;
            me._hourIndex = Array.from(target.parentElement.children).indexOf(target);
            me._target = target;

            me.startEdit({
                target,
                value : target.innerText
            });
        }
    }

    async onKeyDown({ event }) {
        if (event.key === 'Tab') {
            const
                me            = this,
                { target }    = event,
                gantt         = me.owner,
                { taskStore } = gantt,
                task          = me._taskRecord,
                newIndex      = me._hourIndex + (event.shiftKey ? -1 : 1),
                targetCell    = me._target.parentElement.querySelector(`.b-day-hours:nth-child(${newIndex + 1})`);

            event.preventDefault();
            event.stopImmediatePropagation();

            if (targetCell) {
                me.onHourCellClick(task, targetCell);
            }
            else if (newIndex < 0) {
                // Get previous leaf task
                const previous = taskStore.getPrev(task, false, task => task.isParent);
                if (previous) {
                    await gantt.scrollTaskIntoView(previous);

                    const taskEl = gantt.getElementFromTaskRecord(previous, false);
                    if (taskEl) {
                        me.onHourCellClick(previous, taskEl.querySelector('.b-day-hours:last-child'));
                    }
                }
            }
            else {
                // Find next leaf task
                const next = taskStore.getNext(task, false, task => task.isParent);
                if (next) {
                    await gantt.scrollTaskIntoView(next);

                    const taskEl = gantt.getElementFromTaskRecord(next, false);

                    if (taskEl) {
                        me.onHourCellClick(next, taskEl.querySelector('.b-day-hours'));
                    }
                }
            }
        }
    }

    onComplete({ value }) {
        this._taskRecord.setHoursWorked(this._hourIndex, value);
    }
};
