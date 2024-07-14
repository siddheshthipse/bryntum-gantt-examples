/**
 * Application configuration
 */
import { DateHelper, StringHelper } from '@bryntum/gantt';

export const ganttConfig = {
    dependencyIdField : 'wbsCode',

    project : {
        transport : {
            load : {
                url : 'data/launch-saas.json'
            }
        },
        autoLoad : true
    },

    columns : [
        { type : 'wbs' },
        { type : 'name' }
    ],

    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },

    // Allow extra space for baseline(s)
    rowHeight : 60,

    baselinesFeature : {
        // Custom tooltip template for baselines
        template(data) {
            const
                me           = this,
                { baseline } = data,
                { task }     = baseline,
                delayed      = task.startDate > baseline.startDate,
                overrun      = task.durationMS > baseline.durationMS;

            let { decimalPrecision } = me;

            if (decimalPrecision == null) {
                decimalPrecision = me.client.durationDisplayPrecision;
            }

            const
                multiplier      = Math.pow(10, decimalPrecision),
                displayDuration = Math.round(baseline.duration * multiplier) / multiplier;

            return `
                <div class="b-gantt-task-title">${StringHelper.encodeHtml(task.name)} (${me.L('baseline')} ${baseline.parentIndex + 1})</div>
                <table>
                <tr><td>${me.L('Start')}:</td><td>${data.startClockHtml}</td></tr>
                ${baseline.milestone ? '' : `
                    <tr><td>${me.L('End')}:</td><td>${data.endClockHtml}</td></tr>
                    <tr><td>${me.L('Duration')}:</td><td class="b-right">${displayDuration + ' ' + DateHelper.getLocalizedNameOfUnit(baseline.durationUnit, baseline.duration !== 1)}</td></tr>
                `}
                </table>
                ${delayed ? `
                    <h4 class="statusmessage b-baseline-delay"><i class="statusicon b-fa b-fa-exclamation-triangle"></i>${me.L('Delayed start by')} ${DateHelper.formatDelta(task.startDate - baseline.startDate)}</h4>
                ` : ''}
                ${overrun ? `
                    <h4 class="statusmessage b-baseline-overrun"><i class="statusicon b-fa b-fa-exclamation-triangle"></i>${me.L('Overrun by')} ${DateHelper.formatDelta(task.durationMS - baseline.durationMS)}</h4>
                ` : ''}
                `;
        }
    },
    columnLinesFeature : false,
    filterFeature      : true,
    labelsFeature      : {
        left : {
            field  : 'name',
            editor : {
                type : 'textfield'
            }
        }
    },

    tbar : {
        items : {
            setMenuButton : {
                type : 'button',
                text : 'Set baseline',
                menu : [{
                    ref  : 'setBaseline1',
                    text : 'Set baseline 1'
                }, {
                    ref  : 'setBaseline2',
                    text : 'Set baseline 2'
                }, {
                    ref  : 'setBaseline3',
                    text : 'Set baseline 3'
                }]
            },
            showMenuButton : {
                type : 'button',
                text : 'Show baseline',
                menu : [{
                    ref     : 'showBaseline1',
                    checked : true,
                    text    : 'Baseline 1'
                }, {
                    ref     : 'showBaseline2',
                    checked : true,
                    text    : 'Baseline 2'
                }, {
                    ref     : 'showBaseline3',
                    checked : true,
                    text    : 'Baseline 3'
                }]
            },
            showBaselines : {
                type       : 'checkbox',
                text       : 'Show baselines',
                checked    : true,
                toggleable : true
            }
        }
    }
};
