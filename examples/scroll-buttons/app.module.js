import { Gantt, StringHelper } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

new Gantt({
    appendTo          : 'container',
    dependencyIdField : 'sequenceNumber',
    rowHeight         : 55,
    tickSize          : 30,
    startDate         : new Date(2024, 0, 6),
    infiniteScroll    : true,
    eventColor        : 'blue',
    resourceMargin    : {
        start : 10,
        end   : 5
    },
    project : {
        autoLoad : true,
        loadUrl  : '../_datasets/launch-saas3.json'
    },

    features : {
        scrollButtons : {
            labelRenderer({ taskRecord }) {
                return `${taskRecord.wbsCode} ${StringHelper.encodeHtml(taskRecord.name)}`;
            }
        },
        regionResize   : false,
        nonWorkingTime : false,
        pan            : true,
        dependencies   : {
            // Makes dependency lines easier to click
            clickWidth : 5,
            radius     : 15
        }
    },

    taskRenderer({ taskRecord }) {
        if (taskRecord.isLeaf && !taskRecord.isMilestone) {
            return `${taskRecord.renderedPercentDone}%`;
        }
        return '';
    },

    subGridConfigs : {
        locked : {
            collapsed : true
        }
    }
});
