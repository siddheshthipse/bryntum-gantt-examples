import { StringHelper } from '@bryntum/gantt';

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
        }
    },

    dependencyIdField : 'sequenceNumber',

    columns : [
        {
            type  : 'name',
            width : 250
        },
        {
            htmlEncodeHeaderText : false,

            text   : 'Button<br /><small>Vue Component</small>',
            width  : '9em',
            align  : 'center',
            field  : 'name',
            editor : false,
            vue    : true,
            renderer({ record }) {
                // The object needed by the wrapper to render the component
                return {
                    // Required. Name of the component to render.
                    // The component must be registered globally in main.js
                    // https://vuejs.org/v2/guide/components.html#Dynamic-Components
                    is : 'AppButton',

                    // `Button` gets its text from `record`
                    record

                    // Any other properties we provide for the Vue component, e.g. `value`.
                };
            }
        }
    ],

    // Custom task content, display task name on child tasks
    taskRenderer({ taskRecord }) {
        if (taskRecord.isLeaf && !taskRecord.isMilestone) {
            return StringHelper.encodeHtml(taskRecord.name);
        }
    }
};

export { ganttConfig };
