/**
 * Application configuration
 */

const ganttConfig = {
    project: {
        autoLoad: true,
        transport: {
            load: {
                url: "data/timeranges.json"
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },
    flex: "2 1 auto",
    columns: [{ type: "name", field: "name", width: 250 }],
    timeRangesFeature: {
        enableResizing: true,
        showCurrentTimeLine: false,
        showHeaderElements: true
    },
    bbar: {
        cls: "gantt-bbar",
        items: [
            {
                toggleable: true,
                text: "Show header elements",
                tooltip: "Toggles the rendering of time range header elements",

                pressed: true,
                icon: "b-fa-square",
                pressedIcon: "b-fa-check-square",
                onClick: ({ source }) => {
                    source.up("Gantt").features.timeRanges.showHeaderElements =
                        source.pressed;
                }
            }
        ]
    }
};

const panelConfig = {
    layout: "fit",
    cls: "timeranges",
    flex: "0 0 350px",

    items: [
        {
            type: "grid",
            ref: "grid",
            flex: 1,
            columns: [
                {
                    text: "Time ranges",
                    flex: 1,
                    field: "name"
                },
                {
                    type: "date",
                    text: "Start Date",
                    width: 110,
                    align: "right",
                    field: "startDate"
                },
                {
                    type: "number",
                    text: "Duration",
                    width: 100,
                    field: "duration",
                    min: 0,
                    instantUpdate: true,
                    renderer: data => `${data.record.duration} d`
                }
            ],
            features: {
                sort: true
            }
        }
    ],
    bbar: [
        {
            type: "button",
            text: "Add",
            icon: "b-fa-plus",
            cls: "b-green",
            tooltip: "Add new time range",
            onClick({ source }) {
                const store = source.parent.parent.widgetMap.grid.store;
                store.add({
                    name: "New range",
                    startDate: new Date(2019, 0, 14),
                    duration: 5
                });
            }
        }
    ]
};

export { ganttConfig, panelConfig };
