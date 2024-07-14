import { Gantt } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const gantt = new Gantt({
    appendTo : 'container',

    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : '../_datasets/constraints.json'
            }
        }
    },

    features : {
        indicators : {
            items : {
                deadlineDate   : false,
                earlyDates     : false,
                lateDates      : false,
                // display constraint indicators
                constraintDate : true
            }
        },
        dependencyEdit : true
    },

    tbar : {
        cls   : 'b-demo-toolbar',
        items : [
            {
                text : 'Add invalid dependency',
                icon : 'b-fa b-fa-bug',
                cls  : 'b-invalid-dependency-button',
                onClick() {
                    // Here we add an invalid dependency linking "Install Apache" task to itself.
                    // This action triggers task rescheduling which then detects the invalid
                    // dependency, and informs the user about it.

                    gantt.dependencyStore.add({ fromTask : 11, toTask : 11 });
                }
            },
            {
                text : 'Add dependency cycle',
                icon : 'b-fa b-fa-bug',
                cls  : 'b-cyclic-dependency-button',
                onClick() {
                    // Here we add a dependency from "Run tests" task to "Configure ports" which
                    // already has a dependency in the opposite direction.
                    // This action triggers task rescheduling which then detects the cycle and
                    // informs user about it.

                    gantt.dependencyStore.add({ fromTask : 15, toTask : 14 });
                }
            },
            {
                text : 'Add all conflicts',
                icon : 'b-fa b-fa-bug',
                cls  : 'b-all-conflicts-button',
                onClick() {
                    // Here we add all three forms of conflict at the same time. The user will be
                    // prompted to resolve each one in succession.
                    const
                        task = gantt.taskStore.getById(11),
                        date = new Date(task.startDate);

                    date.setDate(date.getDate() + 2);
                    // Change the startDate of "Install Apache" which creates a conflict with a
                    // constraint set by "Create shortlist of three designers"
                    task.startDate = date;
                    gantt.dependencyStore.add({ fromTask : 11, toTask : 11 });
                    gantt.dependencyStore.add({ fromTask : 15, toTask : 14 });
                }
            },
            {
                text : 'Use invalid calendar',
                icon : 'b-fa b-fa-bug',
                cls  : 'b-invalid-calendar-button',
                onClick() {
                    // Here we add an invalid calendar and assign it to "Install Apache" task.
                    // The calendar has no working intervals and thus cannot be used for scheduling,
                    // Assigning of the calendar triggers task rescheduling which then detects the issue
                    // and informs user about it.

                    const [calendar] = gantt.calendarManagerStore.add({
                        name                     : 'My Calendar',
                        // we set a global not working interval on the calendar but
                        // not provide any single working one so the calendar has zero working periods
                        unspecifiedTimeIsWorking : false
                    });

                    gantt.taskStore.getById(11).calendar = calendar;
                }
            }
        ]
    }
});
