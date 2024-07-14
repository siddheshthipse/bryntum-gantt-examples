/* global Ext */

Ext.define('App.view.MainController', {
    extend   : 'Ext.app.ViewController',
    alias    : 'controller.main',
    requires : [
        'Bryntum.GanttPanel'
    ],

    addTask : async function(startDate, resourceRecord) {
        const
            gantt = this.lookupReference('ganttPanel').getGantt(),
            task = new bryntum.gantt.TaskModel({
                name      : 'New Task',
                duration  : 1,
                effort    : 0,
                startDate : gantt.project.startDate
            });

        gantt.project.appendChild(task);

        // wait for immediate commit to calculate new task fields
        await gantt.project.commitAsync();

        await gantt.scrollTaskIntoView(task);

        gantt.features.taskEdit.editTask(task);
    }
});
