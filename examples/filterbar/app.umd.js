var {
    Gantt
} = bryntum.gantt;
new Gantt({
    appendTo                : 'container',
    dependencyIdField       : 'sequenceNumber',
    resourceImageFolderPath : '../_shared/images/users/',
    features                : {
        filterBar : {
            keyStrokeFilterDelay : 100
        }
    },
    subGridConfigs : {
        locked : {
            flex : 3
        },
        normal : {
            flex : 5
        }
    },
    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : '../_datasets/launch-saas.json'
            }
        }
    },
    columns : [{
        type : 'wbs'
    }, {
        type  : 'name',
        width : 250
    }, {
        type  : 'startdate',
        width : 170
    }, {
        type  : 'duration',
        align : 'center'
    }, {
        type        : 'resourceassignment',
        width       : 120,
        showAvatars : true
    }, {
        type       : 'percentdone',
        showCircle : true,
        width      : 100
    }, {
        type  : 'predecessor',
        width : 112
    }]
});
