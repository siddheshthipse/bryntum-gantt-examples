const project = new ProjectModel({
    startDate : new Date(2020, 0, 1),

    calendarsData : [
        {
            id        : 'general',
            name      : '24 hour calendar',
            intervals : [
                {
                    recurrentStartDate : 'on Sat at 0:00',
                    recurrentEndDate   : 'on Mon at 0:00',
                    isWorking          : false
                }
            ],
            expanded : true,
            children : [
                {
                    id        : 'business',
                    name      : 'Business hours',
                    intervals : [
                        {
                            recurrentStartDate : 'every weekday at 12:00',
                            recurrentEndDate   : 'every weekday at 13:00',
                            isWorking          : false
                        },
                        {
                            recurrentStartDate : 'every weekday at 17:00',
                            recurrentEndDate   : 'every weekday at 08:00',
                            isWorking          : false
                        }
                    ]
                },
                {
                    id        : 'night',
                    name      : 'Night shift',
                    intervals : [
                        {
                            recurrentStartDate : 'every weekday at 6:00',
                            recurrentEndDate   : 'every weekday at 22:00',
                            isWorking          : false
                        }
                    ]
                }
            ]
        }
    ]
});

new CalendarPicker({
    appendTo : targetElement,
    label    : 'Choose a calendar',
    store    : {
        data : project.calendarManagerStore.getRange().map(c => {
            return {
                id   : c.id,
                text : c.name
            };
        })
    }
});
