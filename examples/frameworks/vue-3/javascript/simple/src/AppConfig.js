import { StringHelper } from '@bryntum/gantt';

/**
 * Application configuration
 */
const useGanttConfig = function() {
    return {
        project : {
            autoLoad  : true,
            transport : {
                load : {
                    url : './data/launch-saas.json'
                }
            }
        },

        dependencyIdField : 'sequenceNumber',

        columns : [{ type : 'name', width : 250 }],

        // Custom task content, display task name on child tasks
        taskRenderer({ taskRecord }) {
            if (taskRecord.isLeaf && !taskRecord.isMilestone) {
                return StringHelper.encodeHtml(taskRecord.name);
            }
        }
    };
};

const sliderConfig = {
    text        : 'Set Bar Margin',
    min         : 0,
    max         : 15,
    width       : '14em',
    showTooltip : false
};

export { useGanttConfig, sliderConfig };
