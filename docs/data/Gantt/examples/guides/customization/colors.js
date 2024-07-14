const gantt = new Gantt({
    appendTo : targetElement,

    rowHeight  : 30,
    autoHeight : true,

    startDate : new Date(2023, 4, 3),
    endDate   : new Date(2023, 4, 20),

    features : { projectLines : false },

    showTaskColorPickers : true,

    columns : [
        { type : 'name', width : 240 }
    ],

    subGridConfigs : { locked : { collapsed : true } },

    tasks : [
        {
            startDate : '2023-05-02',
            name      : 'red - pink - purple',
            segments  : [
                { startDate : '2023-05-02', duration : 2, name : 'red', eventColor : 'red' },
                { startDate : '2023-05-09', duration : 2, name : 'pink', eventColor : 'pink' },
                { startDate : '2023-05-16', duration : 2, name : 'purple', eventColor : 'purple' }
            ]
        }, {
            startDate : '2023-05-02',
            name      : 'magenta - violet - indigo',
            segments  : [
                { startDate : '2023-05-02', duration : 2, name : 'magenta', eventColor : 'magenta' },
                { startDate : '2023-05-09', duration : 2, name : 'violet', eventColor : 'violet' },
                { startDate : '2023-05-16', duration : 2, name : 'indigo', eventColor : 'indigo' }
            ]
        }, {
            startDate : '2023-05-02',
            name      : 'blue - cyan - teal',
            segments  : [
                { startDate : '2023-05-02', duration : 2, name : 'blue', eventColor : 'cyan' },
                { startDate : '2023-05-09', duration : 2, name : 'cyan', eventColor : 'cyan' },
                { startDate : '2023-05-16', duration : 2, name : 'teal', eventColor : 'teal' }
            ]
        }, {
            startDate : '2023-05-02',
            name      : 'green - gantt-green - lime',
            segments  : [
                { startDate : '2023-05-02', duration : 2, name : 'green', eventColor : 'green' },
                { startDate : '2023-05-09', duration : 2, name : 'gantt-green', eventColor : 'gantt-green' },
                { startDate : '2023-05-16', duration : 2, name : 'lime', eventColor : 'lime' }
            ]
        }, {
            startDate : '2023-05-02',
            name      : 'yellow - orange - deep-orange',
            segments  : [
                { startDate : '2023-05-02', duration : 2, name : 'yellow', eventColor : 'yellow' },
                { startDate : '2023-05-09', duration : 2, name : 'orange', eventColor : 'orange' },
                { startDate : '2023-05-16', duration : 2, name : 'deep-orange', eventColor : 'deep-orange' }
            ]
        }, {
            startDate : '2023-05-02',
            name      : 'gray - light-gray',
            segments  : [
                { startDate : '2023-05-02', duration : 2, name : 'gray', eventColor : 'gray' },
                { startDate : '2023-05-09', duration : 2, name : 'light-gray', eventColor : 'light-gray' }
            ]
        }
    ]
});
