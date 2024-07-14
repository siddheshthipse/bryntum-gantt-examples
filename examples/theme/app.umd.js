var {
    Gantt,
    ProjectModel,
    GlobalEvents,
    WidgetHelper,
    DomHelper
} = bryntum.gantt;
const project = window.project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});
new Gantt({
    appendTo          : 'container',
    project,
    dependencyIdField : 'wbsCode',
    flex              : 1,
    startDate         : '2019-01-06',
    columns           : [{
        type : 'wbs'
    }, {
        type : 'name'
    }],
    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },
    features : {
        columnLines : false,
        filter      : true,
        timeRanges  : {
            showHeaderElements : true
        },
        labels : {
            left : {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    },
    tbar : {
        items : [{
            type : 'widget',
            cls  : 'label',
            html : 'Theme:'
        }, {
            type        : 'buttonGroup',
            toggleGroup : true,
            items       : ['Stockholm', 'Material', 'Classic-Light', 'Classic', 'Classic-Dark'].map(name => {
                return {
                    id      : name.toLowerCase(),
                    text    : name,
                    pressed : DomHelper.themeInfo.name === name
                };
            }),
            onAction({
                source: button
            }) {
                DomHelper.setTheme(button.text);
            }
        }]
    }
});
GlobalEvents.on({
    theme(themeChangeEvent) {
        WidgetHelper.getById(themeChangeEvent.theme).pressed = true;
    }
});
project.load();
