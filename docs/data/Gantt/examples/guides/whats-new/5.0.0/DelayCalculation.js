const gantt = new Gantt({
    appendTo : targetElement,

    emptyText : '',

    height : 300,

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 150 }
    ],

    async generateDataset(renderEarly) {
        gantt.mask('Generating 5k tasks');

        // Required to allow browser to update DOM before task generation starts
        await AsyncHelper.sleep(10);

        const config = await ProjectGenerator.generateAsync(5000, 50, undefined, undefined, false);

        gantt.mask?.('Rendering');

        // Required to allow browser to update DOM before calculations starts
        await AsyncHelper.sleep(10);

        gantt.project?.destroy();

        gantt.project = new ProjectModel({
            delayCalculation : renderEarly,
            ...config
        });

        gantt.unmask?.();
    },

    tbar : [
        {
            text : 'Render first (faster)',
            onClick() {
                gantt.generateDataset(true);
            }
        },
        {
            text : 'Calculate first (slower)',
            onClick() {
                gantt.generateDataset(false);
            }
        }
    ]
});

gantt.generateDataset(true);
