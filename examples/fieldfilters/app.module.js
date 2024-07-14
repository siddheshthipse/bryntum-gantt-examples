import { Model, Store, TaskModel, Duration, BrowserHelper, Container, Gantt } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

class Color extends Model {
    static $name = 'Color';

    static fields = [
        'name'
    ];
}

// Define a separate store holding additional data that we can attach to the main TaskModel, to
// demonstrate setting up relations between models and filtering on them
const colorStore = new Store({
    modelClass : Color,
    data       : [
        { id : 1, name : 'Red' },
        { id : 2, name : 'Green' },
        { id : 3, name : 'Blue' },
        { id : 4, name : 'Chartreuse' },
        { id : 5, name : 'Oatmeal Heather' }
    ]
});

export default colorStore;

// here you can extend our default Task class with your additional fields, methods and logic
class Task extends TaskModel {

    static $name = 'Task';

    static fields = [
        { name : 'colorId', type : 'number' }
    ];

    static relations = {
        color : {
            foreignKey   : 'colorId',
            foreignStore : colorStore
        }
    };
}

Task.exposeRelations();

const FILTERS_STORAGE_KEY = 'b-example-gantt-fieldfilters-filters';

const parseDate = dateString => dateString ? new Date(dateString) : dateString;

// Restore any filters saved in localStorage (at startup)
let savedFilters;
const savedFiltersJSON = BrowserHelper.getLocalStorageItem(FILTERS_STORAGE_KEY);
if (savedFiltersJSON) {
    try {
        savedFilters = JSON.parse(savedFiltersJSON, function(key, value) {
            if (key === 'value' && this.type === 'date') {
                return (Array.isArray(value) ? value.map(parseDate) : parseDate(value));
            }
            else if (key === 'value' && this.type === 'duration') {
                return (Array.isArray(value)
                    ? value.map(durationStr => new Duration(durationStr))
                    : new Duration(value));
            }
            return value;
        });
    }
    catch (e) {
        console.error(`Couldn't parse saved filters:\n\n${savedFilters}\n\nError was:\n\n${e}`);
    }
}

// For demonstration purposes, we'll define one "fixed" filter that can't be deleted, and whose
// property and operator are predefined. We'll use the `canDeleteFilter` and `getFieldFilterPickerConfig`
// options to achieve this.

// Don't allow changing property or operator for certain filters. You can use any logic here
// and apply any FieldFilterPicker configuration you want.
const canDeleteFilter = filter => filter.id !== 'permanent-filter-1';

// Pass specific options to the child `FieldFilterPicker` based on the filter id
const getFieldFilterPickerConfig = filter =>
    filter.id === 'permanent-filter-1'
        ? {
            propertyLocked : true,
            operatorLocked : true
        }
        : undefined;

// The filter picker UI will draw its filterable fields from the grid's columns and their backing fields by default,
// but for fields that include relations we need to provide some additional information, so we override those field configs
// here. The fields defined here will be merged with the grid's column fields by the filter UI, with these taking precedence.
const filterPickerFields = {
    colorId : {
        // Defines how to show a related record in the pick-list dropdown when setting up a filter limited to specific values.
        // In this case, when filtering the main record on its colorId field, we want to show the actual color names in the dropdown.
        relatedDisplayField : 'name'
    }
};

const gantt = new Gantt({
    flex              : 1,
    dependencyIdField : 'sequenceNumber',

    project : {
        // Let the Project know we want to use our own Task model with custom fields / methods
        taskModelClass : Task,
        taskStore      : {
            // Attach the colorStore to the task store in order to reference it in the Task model's relationConfig
            colorStore
        },

        autoLoad  : true,
        loadUrl   : '../_datasets/launch-saas.json',
        listeners : {
            load : ({ source: gantt }) => {
                // Set some colors on tasks
                const { taskStore } = gantt.project;
                taskStore.forEach(task => {
                    task.color = colorStore.getAt(Math.floor(Math.random() * colorStore.count));
                }, this, { includeFilteredOutRecords : true });
                // Must re-apply any existing filters after changing data
                taskStore.filter();
            }
        }
    },

    features : {
        filter : {
            // For this demo we want the column popup filter menu to have the same restrictions
            // as the main filter picker group, so we pass a FieldFilterPickerGroup configuration
            // object to the Filter feature here
            pickerConfig : {
                canDeleteFilter,
                getFieldFilterPickerConfig,
                fields : filterPickerFields
            }
        }
    },

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 250 },
        { type : 'number', field : 'percentDone', text : '% Done', width : 150 },
        { type : 'date', field : 'startDate', text : 'Start Date', width : 150 },
        { type : 'date', field : 'endDate', text : 'End Date *', width : 150 },
        { type : 'duration', text : 'Duration', width : 150 },
        { type : 'number', field : 'colorId', text : 'Color', width : 150, renderer : ({ record }) => record.color?.name }
    ]
});

const app = new Container({
    layout   : 'box',
    appendTo : 'container',
    width    : '100%',
    height   : '100%',
    items    : {
        gantt,
        splitter : {
            type : 'splitter'
        },
        filtersPanel : {
            type        : 'panel',
            cls         : 'filters-panel',
            title       : 'Filters',
            collapsible : true,
            layout      : {
                type : 'vbox'
            },
            flex     : 1,
            maxWidth : '35em',
            items    : {
                enableAllCheckbox : {
                    type      : 'checkbox',
                    text      : 'Enable/disable all',
                    checked   : true,
                    listeners : {
                        change : ({ checked }) => checked ? app.widgetMap.filterPickers.activateAll() : app.widgetMap.filterPickers.deactivateAll()
                    }
                },
                filterPickers : {
                    type  : 'gridfieldfilterpickergroup',
                    width : '100%',
                    ref   : 'filterPickers',

                    // Provide our Gantt's columns as the list of properties (fields) available for filtering
                    grid : gantt,

                    // Override certain fields to provide additional required information
                    fields : filterPickerFields,

                    // From the available set of columns in gantt.columns, only allow these in the filter property drop-downs
                    // allowedFieldNames : ['name', 'startDate', 'percentDone', 'fullDuration'],

                    filters : savedFilters ?? [{
                        id            : 'permanent-filter-1',
                        property      : 'percentDone',
                        operator      : '<',
                        value         : 100,
                        caseSensitive : false
                    }],

                    listeners : {
                        change : ({ filters }) => {
                            // Save filters to localStorage when they change
                            BrowserHelper.setLocalStorageItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
                        }
                    },

                    canDeleteFilter,
                    getFieldFilterPickerConfig
                }
            }
        }
    }
});
