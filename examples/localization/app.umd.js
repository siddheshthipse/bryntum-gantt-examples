var {
    Gantt,
    ProjectModel,
    LocaleManager,
    Localizable
} = bryntum.gantt;
// Importing custom locales

// Enable missing localization Error throwing here to show how it can be used in end-user apps
// All non-localized strings which are in `L{foo}` format will throw runtime error
LocaleManager.throwOnMissingLocale = true;
const project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

/**
 * Updates localizable properties after locale change
 */
function updateLocalization() {
    const title = Localizable().L('L{App.Localization demo}');
    document.querySelector('#title').innerHTML = `<h1>${title}</h1>`;
    document.title = title;
}

// Add listener to update contents when locale changes
LocaleManager.on('locale', updateLocalization);
new Gantt({
    appendTo          : 'container',
    project,
    dependencyIdField : 'wbsCode',
    columns           : [{
        type : 'wbs'
    }, {
        type  : 'name',
        field : 'name',
        width : 250
    }, {
        type : 'startdate'
    }, {
        type : 'enddate'
    }, {
        type : 'duration'
    }]
});
project.load();
updateLocalization();
