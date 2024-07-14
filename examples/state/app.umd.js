var {
    AjaxHelper,
    AsyncHelper,
    StringHelper,
    StateProvider,
    Toast,
    Gantt
} = bryntum.gantt;

/**
 * A simple example of saving a StateProvider's data to a backend.
 */
class BackendState {
    constructor(stateProvider) {
        this.stateProvider = stateProvider;
    }

    async init() {

        const response = await AjaxHelper.get('data/state.json');
        this.stateProvider.data = await response.json();

        // Start listening for changes after we load up the data:
        this.stateProvider.on({
            save : this.onSave.bind(this)
        });
    }

    onSave() {
    // Grab data to save and call save() if it is not running already. We could
    // use the "stateIds" we receive to deal with only those properties that are
    // changing. See Core.state.StateProvider "save" event for more details.
        this.stateData = this.stateProvider.data;
        if (!this.saving) {
            this.save().catch(err => console.warn('Failed to persist state', err));
        }
    }

    async save() {
        this.saving = true;
        try {
            while (this.stateData) {
                // Grab the changes and save them. Keep doing so until all are saved.
                const data = this.stateData;
                this.stateData = null;
                await this.saveChanges(data);
            }
        }
        finally {
            this.saving = false;
        }
    }

    async saveChanges() {

        await AsyncHelper.sleep(250);
    }
}
const stateId = 'mainGantt';
function launch() {
    const gantt = new Gantt({
        appendTo          : 'container',
        dependencyIdField : 'sequenceNumber',
        // The key used to automatically save this widget's state in the page's state provider
        stateId,
        // If start/end dates are not provided, they'd be inferred from the project and will override dates restored from
        // the state
        startDate         : new Date(2019, 0, 13),
        endDate           : new Date(2019, 2, 24),
        features          : {
            filter : true
        },
        project : {
            autoLoad  : true,
            transport : {
                load : {
                    url : '../_datasets/launch-saas.json'
                }
            }
        },
        tbar : [{
            type  : 'checkbox',
            ref   : 'autoSaveCheckbox',
            label : 'Auto save',
            value : true,
            onChange({
                checked
            }) {
                gantt.stateId = checked ? stateId : null;
            }
        }, {
            type    : 'button',
            ref     : 'resetButton',
            color   : 'b-red',
            icon    : 'b-fa b-fa-times',
            text    : 'Reset to default',
            tooltip : 'Resets application to the default state',
            onAction() {
                gantt.resetDefaultState();
                Toast.show('Default state restored');
            }
        }],
        columns : [
            // To persist column state it is better to explicitly specify an id
            {
                id    : 'name',
                type  : 'name',
                width : 250
            }, {
                id    : 'startDate',
                type  : 'startdate',
                width : 150
            }, {
                id    : 'duration',
                type  : 'duration',
                width : 150
            }, {
                id    : 'predecessors',
                type  : 'predecessor',
                width : 150
            }],
        // Custom task content, display task name on child tasks
        taskRenderer({
            taskRecord
        }) {
            if (taskRecord.isLeaf && !taskRecord.isMilestone) {
                return StringHelper.encodeHtml(taskRecord.name);
            }
        }
    });
}

/*
    By default, state is saved locally in localStorage. State can also be saved to
    a backend server, however, there are some caveats to consider when doing so:

    #1 - State must be ready at app launch time

    Stateful widgets consume state data during their construction, which cannot be
    done asynchronously. This can be handled with an AJAX fetch issued before
    widgets are created (as in this example), or by "rendering" the state data on
    the server and returning it as content in the page.

    If the state is loaded asynchronously and applied after widget creation, there
    will be a noticeable flicker as the defaults are replaced with the state values.

    #2 - State is not always the same as settings or preferences

    Users may use an application on different device types (desktop, phone, and
    tablet) and expect their experience on each device to be what they had when
    they last used that device.

    #3 - Undesired state is harder to clear

    Potentially undesired application state will not be cleared by clearing browser
    user data (a common troubleshooting strategy) and will follow the user to other
    browsers as well (another common troubleshooting technique).
 */

if (new URL(window.location).searchParams.get('state') === 'remote') {
    // if ('?state=remote' in URL)
    // For server-side state, initialize the page widgets after the state is loaded from the server.
    new BackendState(StateProvider.setup('memory')).init().then(launch);
}
else {
    // To use localStorage instead of a backend for state, the launch process is simply this:
    StateProvider.setup('local');
    launch();
}
