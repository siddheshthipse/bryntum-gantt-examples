import { Gantt, ProjectModel, DomHelper, Point } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';
/* global $ */

const project = window.project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const gantt = new Gantt({
    appendTo : 'container',

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 250 }
    ],

    project,

    dependencyIdField : 'sequenceNumber',

    listeners : {
        // Listener called before the built-in task menu is shown
        taskMenuBeforeShow({ taskRecord, event }) {
            const menuEl = document.getElementById('customTaskMenu');

            // Hide all visible context menus
            $('.dropdown-menu:visible').hide();

            // Set data, set position, and show custom task menu
            $('#customTaskMenu').data({
                taskId : taskRecord.id
            }).show();

            // Show at the click point but constrain into the viewport
            DomHelper.alignTo(menuEl, new Point(event.x, event.y), {
                align            : 't0-b0',
                constrainTo      : document.body,
                constrainPadding : 10
            });

            // Prevent built-in task menu
            return false;
        }
    }
});

project.load();

// Hide all visible context menus by global click
$(document).on('click', () => {
    $('.dropdown-menu:visible').hide();
});

// Task menu handlers
$('#customTaskMenu button').on('click', function() {
    const
        taskId     = $(this).parent().data('taskId'),
        taskRecord = gantt.taskStore.getById(taskId),
        ref        = $(this).data('ref');

    switch (ref) {
        // "1 day ahead" menu item implementation
        case 'move':
            taskRecord.shift(1, 'day');
            break;

        // "Edit" menu item implementation
        case 'edit':
            gantt.editTask(taskRecord);
            break;

        // "Remove" menu item implementation
        case 'remove':
            gantt.taskStore.remove(taskId);
            break;
    }
});
