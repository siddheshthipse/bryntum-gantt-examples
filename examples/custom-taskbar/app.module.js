import { TaskModel, DateHelper, Editor, Gantt, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

/**
 * A custom task model class adding a `hoursWorked` field where you can enter worked hours/day (or the time unit you use)
 */
class MyTask extends TaskModel {
    static fields = [
        'totalHoursWorked',
        { name : 'hoursWorked', type : 'array' }
    ];

    get workedHoursByDay() {
        const
            me                                         = this,
            { startDate, endDate, isParent, duration } = me;

        // With Gantt using early rendering we can get here before dates are normalized, if so bail out to not cache
        // invalid values below
        if (!startDate || !endDate || !duration) {
            return [];
        }

        if (!isParent && me._workedHoursByDay?.duration === duration && me._workedHoursByDay.startDateMs === startDate.getTime()) {
            return me._workedHoursByDay;
        }

        const
            durationInDays   = DateHelper.getDurationInUnit(startDate, endDate, 'd', false),
            workedHoursByDay = Array(durationInDays || 0).fill(0),
            calendar         = me.project.calendar,
            hoursWorked      = me.hoursWorked || [];

        let index = 0;

        // Rollup values from parent task's immediate children
        for (let i = 0; i < durationInDays; i++) {
            const
                intervalStart = DateHelper.add(startDate, i, 'd'),
                intervalEnd   = DateHelper.add(intervalStart, 1, 'd');

            if (calendar.isWorkingTime(intervalStart, intervalEnd)) {
                if (isParent) {
                    workedHoursByDay[i] = me.children.reduce((total, child) => {
                        if (DateHelper.intersectSpans(child.startDate, child.endDate, intervalStart, intervalEnd)) {
                            const startDiff = DateHelper.getDurationInUnit(startDate, child.startDate, 'd');
                            return total += (child.workedHoursByDay[i - startDiff] || 0);
                        }
                        else {
                            return total;
                        }
                    }, 0);
                }
                else {
                    workedHoursByDay[i] = hoursWorked[index];
                }
                index++;
            }
        }

        // Cache by start + duration
        workedHoursByDay.startDateMs = startDate.getTime();
        workedHoursByDay.duration = duration;

        me._workedHoursByDay = workedHoursByDay;

        return workedHoursByDay;
    }

    setHoursWorked(dayIndex, hours) {
        const newValue = this._workedHoursByDay.slice();
        newValue[dayIndex] = hours;
        this._workedHoursByDay = null;
        this.hoursWorked = newValue;
    }

    get totalHoursWorked() {
        return this.workedHoursByDay.reduce((total, value) => {
            return total + (value || 0);
        }, 0);
    }
}

/**
 * A custom Editor letting you edit the worked hours/day cells of leaf tasks
 */
class HourEditor extends Editor {
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

const project = new ProjectModel({
    taskModelClass : MyTask,
    autoLoad       : true,
    transport      : {
        load : {
            url : '../_datasets/tasks-workedhours.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const gantt = new Gantt({
    project,

    appendTo          : 'container',
    dependencyIdField : 'sequenceNumber',
    rowHeight         : 70,
    resourceMargin    : 4,
    startDate         : new Date(2021, 2, 22),
    endDate           : new Date(2021, 4, 22),
    rowLines          : false,
    columns           : [
        { type : 'name', width : 250 }
    ],

    viewPreset : {
        base      : 'weekAndDayLetter',
        tickWidth : 40
    },

    features : {
        dependencies : {
            // Round the corners of the dependency lines
            radius : 10
        },
        labels : {
            top : {
                renderer({ taskRecord }) {
                    return {
                        tag     : 'div',
                        dataset : {
                            btip : `${taskRecord.totalHoursWorked} hours worked total`
                        },
                        children : [
                            taskRecord.name,
                            { tag : 'i', class : 'b-fa b-fa-clock' },
                            String(taskRecord.totalHoursWorked) + 'h'
                        ]
                    };
                }
            },
            bottom : {
                renderer({ taskRecord }) {
                    const workedHoursByDay = taskRecord.workedHoursByDay || [];
                    return {
                        tag      : 'div',
                        class    : 'hoursWorked',
                        children : workedHoursByDay.map(workedHours => {
                            return {
                                class : 'b-day-hours',
                                text  : workedHours
                            };
                        })
                    };
                }
            }
        }
    },

    taskRenderer({ taskRecord }) {
        if (!taskRecord.isMilestone && !gantt.widgetMap.showWorkedHours.checked) {
            const workedHoursByDay = taskRecord.workedHoursByDay || [];
            // For leaf tasks we return some custom elements, described as DomSync config objects.
            // Please see https://bryntum.com/products/gantt/docs/api/Core/helper/DomHelper#function-createElement-static for more information.
            return [
                {
                    tag   : 'div',
                    class : 'b-name',
                    text  : taskRecord.name
                }
            ];
        }
    },

    tbar : [
        {
            type    : 'slidetoggle',
            ref     : 'showWorkedHours',
            label   : 'Show worked hours',
            checked : true,
            onChange({ value }) {
                gantt.suspendRefresh();
                gantt.features.labels.disabled = !value;
                gantt.resourceMargin = value ? 4 : 8;
                gantt.rowHeight = value ? 70 : 40;
                gantt.resumeRefresh(true);
            }
        }
    ],

    listeners : {
        async scheduleClick({ taskRecord, event }) {
            if (taskRecord.isLeaf && event.target.matches('.b-day-hours')) {
                editor.onHourCellClick(taskRecord, event.target);
            }
        }
    }
});

const editor = new HourEditor({
    owner     : gantt,
    listeners : {
        complete() {
            gantt.refreshRows();
        }
    }
});
