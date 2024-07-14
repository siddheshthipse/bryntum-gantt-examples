targetElement.innerHTML = '<p>Open editor to change setup / cleanup:</p>';
const schedulerPro = new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    startDate  : new Date(2022, 4, 6, 9),
    endDate    : new Date(2022, 4, 6, 17),
    viewPreset : 'hourAndDay',
    barMargin  : 12,

    columns : [
        { type : 'resourceInfo', field : 'name', text : 'Meeting Rooms', showEventCount : false, showMeta : record => `Car: ${record.car}`, width : 150 }
    ],

    features : {
        eventBuffer : {
            renderer({ eventRecord, preambleConfig, postambleConfig }) {
                if (eventRecord.preamble) {
                    preambleConfig.icon = 'b-fa b-fa-car';
                    preambleConfig.cls  = 'travel-before';
                    preambleConfig.text = eventRecord.preamble.toString(true);
                }

                if (eventRecord.postamble) {
                    postambleConfig.icon = 'b-fa b-fa-car';
                    postambleConfig.cls  = 'travel-after';
                    postambleConfig.text = eventRecord.postamble.toString(true);
                }
            }
        }
    },

    project : {
        resourcesData : [
            { id : 1, name : 'John', car : 'Tesla', image : false, iconCls : 'b-icon b-fa-user' },
            { id : 2, name : 'Eva', car : 'Honda', image : false, iconCls : 'b-icon b-fa-user' },
            { id : 3, name : 'Dan', car : 'Buick', image : false, iconCls : 'b-icon b-fa-user' }
        ],

        eventsData : [
            { id : 1, resourceId : 1, name : 'UN Meeting', startDate : '2022-05-06T10:00:00', duration : 3, durationUnit : 'h', preamble : '1 hour', postamble : '30 minute' },
            { id : 2, resourceId : 2, name : 'Board meeting', startDate : '2022-05-06T11:00:00', duration : 2, durationUnit : 'h', preamble : '20 minute', postamble : '25 minute', resizable : false, eventColor : 'red' },
            { id : 3, resourceId : 3, name : 'Starbucks meeting', startDate : '2022-05-06T13:00:00', duration : 3, durationUnit : 'h', preamble : '25 minute', postamble : '15 minute', resizable : false, eventColor : 'red' }
        ],

        calendarsData : [
            {
                id        : 'general',
                name      : 'General',
                intervals : [
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    }
                ]
            }
        ],

        calendar : 'general'
    }
});
