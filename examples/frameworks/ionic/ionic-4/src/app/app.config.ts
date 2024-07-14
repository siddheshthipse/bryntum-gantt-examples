/**
 * Application config file
 */

const ganttConfig = {

    project : {
        // Let the Project know we want to use our own Task model with custom fields / methods
        transport : {
            load : {
                url : 'assets/data/launch-saas.json'
            }
        },
        autoLoad : true
    },

    startDate               : '2019-01-12',
    endDate                 : '2019-03-24',
    resourceImageFolderPath : 'assets/users/',
    columns                 : [
        { type : 'wbs' },
        { type : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'duration' },
        { type : 'resourceassignment', width : 120, showAvatars : true },
        { type : 'percentdone', showCircle : true, width : 70 }
    ]

};

export default ganttConfig;
