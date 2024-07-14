var {
    DateHelper,
    Gantt
} = bryntum.gantt;
const constraintTypes = {
    finishnoearlierthan : 'FNET',
    finishnolaterthan   : 'FNLT',
    startnolaterthan    : 'SNLT',
    startnoearlierthan  : 'SNET',
    mustfinishon        : 'MFO',
    muststarton         : 'MSO'
};
new Gantt({
    appendTo : 'container',
    project  : {
        autoLoad : true,
        loadUrl  : '../_datasets/constraints.json'
    },
    columns : [{
        type  : 'name',
        width : 250
    }, {
        text         : 'Scheduled',
        collapsible  : true,
        collapseMode : 'toggleAll',
        collapsed    : true,
        children     : [{
            type : 'startdate'
        }, {
            type : 'duration'
        }, {
            type : 'enddate'
        },
        // Column that is shown when the header is collapsed
        {
            field      : 'startDate',
            hidden     : true,
            text       : 'Dates',
            width      : 140,
            editor     : false,
            htmlEncode : false,
            renderer({
                record
            }) {
                return `
                            <div class="calendar">
                                <div class="date">${DateHelper.format(record.startDate, 'D')}</div>
                                <div class="month">${DateHelper.format(record.startDate, 'MMM')}</div>
                            </div>
                            ${record.duration ?? 0} ${DateHelper.getLocalizedNameOfUnit(record.durationUnit, record.duration !== 1)}
                        `;
            }
        }]
    }, {
        type        : 'resourceassignment',
        width       : 120,
        showAvatars : true
    }, {
        type       : 'percentdone',
        showCircle : true,
        width      : 70
    }, {
        text        : 'Dependencies',
        collapsible : true,
        children    : [{
            type  : 'predecessor',
            width : 130
        }, {
            type  : 'successor',
            width : 130
        }]
    }, {
        text         : 'Constraints',
        collapsible  : true,
        collapseMode : 'toggleAll',
        collapsed    : true,
        children     : [{
            type : 'constrainttype'
        }, {
            type : 'constraintdate'
        }, {
            text   : 'Summary',
            hidden : true,
            width  : 160,
            renderer({
                record
            }) {
                if (!record.constraintDate) {
                    return '';
                }
                return `${constraintTypes[record.constraintType]} ${DateHelper.format(record.constraintDate, 'L')}`;
            }
        }]
    }],
    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 1
        }
    }
});
