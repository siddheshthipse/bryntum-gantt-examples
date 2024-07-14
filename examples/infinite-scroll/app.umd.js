var {
    Gantt,
    ProjectModel,
    StringHelper
} = bryntum.gantt;
const project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
const centerDate = new Date(2019, 0, 18);
const gantt = new Gantt({
    appendTo   : 'container',
    project,
    viewPreset : {
        base     : 'weekAndDay',
        tickSize : 60
    },
    dependencyIdField : 'sequenceNumber',
    // Provide start date to prevent project from reconfiguring it
    startDate         : '2019-01-13',
    infiniteScroll    : true,
    // Give lots of smooth scrolling range to touch based scroll devices
    bufferCoef        : globalThis.matchMedia('(any-pointer:coarse)').matches ? 10 : 5,
    visibleDate       : {
        date  : centerDate,
        block : 'center'
    },
    weekStartDay : 1,
    columns      : [{
        type  : 'name',
        width : 250
    }, {
        type  : 'startdate',
        width : 100
    }, {
        type  : 'duration',
        width : 100
    }],
    tbar : {
        items : {
            scrollTo : {
                label      : 'Scroll to date',
                inputWidth : '7em',
                width      : 'auto',
                type       : 'datefield',
                value      : centerDate,
                step       : '1w',
                listeners  : {
                    change({
                        userAction,
                        value
                    }) {
                        if (userAction) {
                            gantt.scrollToDate(value, {
                                block   : 'center',
                                animate : 500
                            });
                        }
                    }
                },
                highlightExternalChange : false
            }
        }
    },
    listeners : {
        horizontalScroll() {
            // Keep scrollTo date synced with the visible date
            this.widgetMap.scrollTo.value = this.timeAxis.floorDate(this.viewportCenterDate);
        }
    },
    // Custom task content, display task name on child tasks
    taskRenderer({
        taskRecord
    }) {
        if (taskRecord.isLeaf && !taskRecord.isMilestone) {
            return StringHelper.encodeHtml(taskRecord.name);
        }
    }
});
project.load();
