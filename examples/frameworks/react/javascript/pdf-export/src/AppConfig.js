/**
 * Application configuration
 */
const ganttConfig = {
    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : 'data/launch-saas.json'
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },
    pdfExportFeature : {
        exportServer            : 'http://localhost:8080',
        // Development config
        translateURLsToAbsolute : 'http://localhost:3000',
        clientURL               : 'http://localhost:3000',
        // For production replace with this one. See README.md for explanation
        // translateURLsToAbsolute : 'http://localhost:8080/resources/', // Trailing slash is important

        keepPathName : false
    },
    viewPreset : 'weekAndDayLetter',
    barMargin  : 10
};

export { ganttConfig };
