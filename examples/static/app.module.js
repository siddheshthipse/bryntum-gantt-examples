import { Gantt, ProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

const project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/dirty.json'
        }
    }
});

const dummyCalculations = {
    // Disable the project endDate automatic calculation
    project : {
        endDate : 'userProvidedValue'
    },
    // Disable task percentDone, startDate, endDate and duration fields automatic calculation
    tasks : {
        percentDone : 'userProvidedValue',
        startDate   : 'userProvidedValue',
        endDate     : 'userProvidedValue',
        duration    : 'userProvidedValue'
    }
};

let calculationsBackup;

const gantt = new Gantt({
    appendTo : 'container',

    project,

    startDate : '2019-01-12',
    endDate   : '2019-03-24',

    dependencyIdField : 'sequenceNumber',

    columns : [
        { type : 'name', width : 250 }
    ],

    features : {
        projectLines : true,
        // Disable data editing features
        dependencies : {
            allowCreate : false
        },
        percentBar : {
            allowResize : false
        },
        cellEdit       : false,
        taskEdit       : false,
        taskMenu       : false,
        taskDrag       : false,
        taskResize     : false,
        taskDragCreate : false
    },

    tbar : {
        items : {
            reloadBtn : {
                text     : 'Reload dirty data',
                tooltip  : 'Disable field calculations and reload the data',
                icon     : 'b-fa-bug',
                weight   : 10,
                disabled : true,
                onClick  : async({ source }) => {
                    // Disable calculations and load data
                    await project.setCalculations(dummyCalculations);
                    project.load();

                    // Toggle buttons
                    gantt.widgetMap.recalculateBtn.disabled = false;
                    source.disabled = true;
                }
            },
            recalculateBtn : {
                text     : 'Recalculate data',
                tooltip  : 'Enable field calculations back',
                icon     : 'b-fa-check',
                weight   : 20,
                disabled : !calculationsBackup,
                onClick  : async({ source }) => {
                    // Enable calculations
                    await project.setCalculations(calculationsBackup);

                    // Toggle buttons
                    source.disabled = true;
                    gantt.widgetMap.reloadBtn.disabled = false;
                }
            }
        }
    }
});

// disable calculations before data gets loaded
project.setCalculations(dummyCalculations).then(oldCalculations => {
    calculationsBackup = oldCalculations;
    // enable recalculate button after calculationsBackup variable is filled
    gantt.widgetMap.recalculateBtn.disabled = false;
});

// trigger data loading
project.load();
