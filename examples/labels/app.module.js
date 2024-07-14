import { Gantt, DateHelper } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

// region Label configs
const
    topLabel    = {
        field  : 'name',
        editor : {
            type : 'textfield'
        }
    },
    bottomLabel = {
        field : 'startDate',
        renderer({ taskRecord }) {
            return DateHelper.format(taskRecord.startDate, 'DD-MMM-Y');
        }
    },
    beforeLabel   = {
        renderer({ taskRecord }) {
            return 'Id: ' + taskRecord.id;
        }
    },
    afterLabel  = {
        renderer({ taskRecord }) {
            return `${taskRecord.duration || '?'} ${DateHelper.getLocalizedNameOfUnit(taskRecord.durationUnit, taskRecord.duration !== 1)}`;
        }
    };

// endregion

const gantt = new Gantt({
    appendTo : 'container',

    startDate : '2019-01-08',
    endDate   : '2019-04-01',

    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : '../_datasets/launch-saas.json'
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },

    dependencyIdField : 'sequenceNumber',

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 250 }
    ],

    viewPreset : 'weekAndDayLetter',

    rowHeight : 70,
    barMargin : 5,

    features : {
        labels : {
            top    : topLabel,
            bottom : bottomLabel,
            before : null,
            after  : null
        }
    },

    tbar : [
        {
            type        : 'buttonGroup',
            toggleGroup : true,
            items       : [
                {
                    text        : 'Top + Bottom',
                    ref         : 'topAndBottomLabels',
                    pressed     : true,
                    ganttConfig : {
                        rowHeight : 70,
                        barMargin : 5
                    },
                    labelsFeatureConfig : {
                        top    : topLabel,
                        bottom : bottomLabel,
                        before : null,
                        after  : null
                    }
                },
                {
                    text        : 'Before + After',
                    ref         : 'beforeAndAfterLabels',
                    ganttConfig : {
                        rowHeight : 45,
                        barMargin : 10
                    },
                    labelsFeatureConfig : {
                        top    : null,
                        bottom : null,
                        before : beforeLabel,
                        after  : afterLabel
                    }
                },
                {
                    text        : 'All',
                    ref         : 'allLabels',
                    ganttConfig : {
                        rowHeight : 70,
                        barMargin : 5
                    },
                    labelsFeatureConfig : {
                        top    : topLabel,
                        bottom : bottomLabel,
                        before : beforeLabel,
                        after  : afterLabel
                    }
                }
            ],
            // Process pressed button only
            onAction({ source : button }) {
                gantt.blockRefresh = true;
                gantt.features.labels.setConfig(button.labelsFeatureConfig);
                gantt.rowHeight = button.ganttConfig.rowHeight;
                gantt.barMargin = button.ganttConfig.barMargin;
                gantt.blockRefresh = false;
                gantt.refresh(true);
            }
        }
    ]
});
