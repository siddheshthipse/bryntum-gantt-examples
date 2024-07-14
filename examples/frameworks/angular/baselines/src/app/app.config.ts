import { DateHelper, StringHelper, GanttConfig, Gantt, Widget, MenuItem } from '@bryntum/gantt';

const gantt        = (widget: Widget): Gantt => widget.up(Gantt.type);
const setBaseline  = (item: MenuItem, index: number) => gantt(item).taskStore.setBaseline(index);
const showBaseline = (item: MenuItem, index: number) => gantt(item).element.classList.toggle(`b-hide-baseline-${index}`, item.checked);

export const ganttConfig: Partial<GanttConfig> = {

    dependencyIdField : 'wbsCode',

    project : {
        transport : {
            load : {
                url : 'assets/data/launch-saas.json'
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

    features : {
        baselines : {
            // Custom tooltip template for baselines
            template({ baseline, startClockHtml, endClockHtml }) {
                const
                    { task }         = baseline,
                    delayed          = task.startDate > baseline.startDate,
                    overrun          = task.durationMS > baseline.durationMS,
                    decimalPrecision = 2,
                    multiplier       = Math.pow(10, decimalPrecision),
                    displayDuration  = Math.round(baseline.duration * multiplier) / multiplier;

                return `
                    <div class="b-gantt-task-title">${StringHelper.encodeHtml(task.name)} (baseline ${baseline.parentIndex + 1})</div>
                    <table>
                    <tr><td>Start</td><td>${startClockHtml}</td></tr>
                    ${baseline.isMilestone ? '' : `
                        <tr>
                            <td>End:</td>
                            <td>${endClockHtml}</td>
                        </tr>
                        <tr>
                            <td>Duration:</td>
                            <td class="b-right">${displayDuration} ${DateHelper.getLocalizedNameOfUnit(baseline.durationUnit, baseline.duration !== 1)}</td>
                        </tr>
                    `}
                    </table>
                    ${delayed ? `
                        <h4 class="statusmessage b-baseline-delay"><i class="statusicon b-fa b-fa-exclamation-triangle"></i>
                            Delayed start by ${DateHelper.formatDelta((task.startDate as Date).getTime() - (baseline.startDate as Date).getTime())}
                        </h4>
                    ` : ''}
                    ${overrun ? `
                        <h4 class="statusmessage b-baseline-overrun"><i class="statusicon b-fa b-fa-exclamation-triangle"></i>
                            Overrun by ${DateHelper.formatDelta(task.durationMS - baseline.durationMS)}
                        </h4>
                    ` : ''}
                    `;
            }
        },
        columnLines : false,
        filter      : true,
        labels      : {
            left : {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    },

    tbar : {
        items : {
            setMenuButton : {
                type : 'button',
                text : 'Set baseline',
                menu : [{
                    type   : 'menuitem',
                    ref    : 'setBaseline1',
                    text   : 'Set baseline 1',
                    onItem : ({ item }) => setBaseline(item, 1)
                }, {
                    type   : 'menuitem',
                    ref    : 'setBaseline2',
                    text   : 'Set baseline 2',
                    onItem : ({ item }) => setBaseline(item, 2)
                }, {
                    type   : 'menuitem',
                    ref    : 'setBaseline3',
                    text   : 'Set baseline 3',
                    onItem : ({ item }) => setBaseline(item, 3)
                }]
            },
            showMenuButton : {
                type : 'button',
                text : 'Show baseline',
                menu : [{
                    type    : 'menuitem',
                    ref     : 'showBaseline1',
                    checked : true,
                    text    : 'Baseline 1',
                    onItem  : ({ item }) => showBaseline(item, 1)
                }, {
                    type    : 'menuitem',
                    ref     : 'showBaseline2',
                    checked : true,
                    text    : 'Baseline 2',
                    onItem  : ({ item }) => showBaseline(item, 2)
                }, {
                    type    : 'menuitem',
                    ref     : 'showBaseline3',
                    checked : true,
                    text    : 'Baseline 3',
                    onItem  : ({ item }) => showBaseline(item, 3)
                }]

            },
            showBaselines : {
                type     : 'checkbox',
                text     : 'Show baselines',
                checked  : true,
                onChange : ({ checked, source }) => gantt(source).features.baselines.disabled = !checked
            }
        }
    }
};
