import { Gantt } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const gantt = new Gantt({
    appendTo             : 'container',
    startDate            : '2023-05-15',
    endDate              : '2023-07-15',
    tickSize             : 70,
    // Shows a color picker in the task context menu, and also shows a color field in the task editor. Both which lets
    // the user select the Task bar's background color.
    showTaskColorPickers : true,

    tasks : [
        { id : 1, startDate : '2023-05-15', duration : 5, name : 'Welding 1', eventColor : 'red' },
        { id : 2, duration : 10, name : 'Welding 2', eventColor : 'pink', percentDone : 60 },
        { id : 3, duration : 0, name : 'Welding 3', eventColor : 'purple' },
        {
            id         : 4,
            name       : 'Floor',
            eventColor : 'violet',
            expanded   : true,
            children   : [
                { id : 5, duration : 5, name : 'Foundation', eventColor : 'indigo' },
                { id : 6, duration : 15, name : 'Paint', eventColor : 'blue', percentDone : 25 },
                { id : 7, duration : 2.5, name : 'Drying', eventColor : 'cyan' }
            ]
        },

        {
            id        : 8,
            name      : 'Walls',
            startDate : '2023-05-15',
            segments  : [
                { startDate : '2023-05-15', duration : 3, name : 'Build scaffold', eventColor : 'magenta' },
                { startDate : '2023-05-19', duration : 4.5, name : 'Climb scaffold', eventColor : 'teal' },
                { startDate : '2023-05-24', duration : 4, name : 'Stabilize', eventColor : 'green' }
            ]
        },
        {
            id             : 9,
            name           : 'Kitchen',
            eventColor     : 'lime',
            expanded       : true,
            constraintType : 'startnoearlierthan',
            constraintDate : '2023-05-16',
            children       : [
                { id : 10, duration : 1, name : 'Install fridge', eventColor : 'yellow', percentDone : 92 },
                { id : 11, duration : 0, name : 'Install micro wave', eventColor : 'orange' },
                { id : 12, duration : 4.5, name : 'Install ice maker', eventColor : 'deep-orange', percentDone : 15 },
                { id : 13, duration : 0, name : 'Kitchen island', eventColor : 'gray', percentDone : 73 },
                { id : 14, duration : 2.5, name : 'Lighting', eventColor : 'light-gray' },
                { id : 15, duration : 0, name : 'Power outlets', eventColor : 'gantt-green' }
            ]
        },
        {
            id         : 16,
            name       : 'Bathrooms',
            expanded   : true,
            eventColor : '#000',
            children   : [
                { id : 18, name : 'Plumbing', duration : 3, eventColor : '#8B4513', percentDone : 40 },
                { id : 19, name : 'Fix leak', duration : 0.5, eventColor : '#F5F5F5', percentDone : 75 },
                { id : 20, name : 'Faucet', duration : 3.5, eventColor : 'rgba(255, 0, 0, 0.14)' },
                { id : 21, name : 'Mirror', duration : 0, eventColor : 'rgb(96, 125, 139)' },
                { id : 22, name : 'Bidet with wifi', duration : 3.5, eventColor : 'rgba(112, 113, 114)', percentDone : 12 }
            ]
        }
    ],

    dependencies : [
        { from : 1, to : 2 },
        { from : 2, to : 3 },
        { from : 5, to : 6 },
        { from : 6, to : 7 },
        { from : 10, to : 11 },
        { from : 11, to : 12 },
        { from : 12, to : 13 },
        { from : 13, to : 14 },
        { from : 14, to : 15 },
        { from : 18, to : 19 },
        { from : 19, to : 20 },
        { from : 20, to : 21 },
        { from : 21, to : 22 }
    ],

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 250 },
        { field : 'eventColor', text : 'Task color', width : 150 }
    ]
});
