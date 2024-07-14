/**
 * Application configuration
 */
import { ProjectModel } from '@bryntum/gantt';

const ganttConfig = {
    startDate: '2019-01-10 00:00',

    project: new ProjectModel({
        autoLoad: true,
        transport: {
            load: {
                url: 'data/launch-saas.json'
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    }),

    timeRangesFeature: {
        showHeaderElements: true,
        showCurrentTimeLine: true
    },

    pdfExportFeature: {
        exportServer: 'http://localhost:8080',

        // Development config
        translateURLsToAbsolute: 'http://localhost:8081',
        clientURL: 'http://localhost:8081',
        // For production replace with this one. See README.md for explanation
        // translateURLsToAbsolute : 'http://localhost:8080/resources/', // Trailing slash is important
        keepPathName: false
    }
};

export { ganttConfig };
