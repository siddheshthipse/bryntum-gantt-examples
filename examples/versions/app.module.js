import { StringHelper, VersionGrid, BrowserHelper, Container, DateHelper, MessageDialog, ChangeLogTransactionModel, VersionModel, Gantt, ProjectModel, WebSocketProjectModel } from '../../build/gantt.module.js';
import shared from '../_shared/shared.module.js';

/**
 * Customize VersionGrid by inserting user avatars into transaction descriptions
 */
class MyVersionGrid extends VersionGrid {

    static $name = 'MyVersionGrid';

    static type = 'myversiongrid';

    static configurable = {
        columns : [
            {
                type      : 'tree',
                text      : 'Description',
                field     : 'description',
                flex      : 3,
                groupable : false,
                renderer(event) {
                    const { record, grid } = event;
                    if (record.transactionModel) {
                        const {
                            description,
                            transactionModel: { username }
                        } = record;
                        return {
                            children : [
                                {
                                    tag   : 'img',
                                    class : `user-avatar`,
                                    src   : `../_shared/images/users/${username}.jpg`
                                },
                                {
                                    tag  : 'span',
                                    html : StringHelper.encodeHtml(description)
                                }
                            ]
                        };
                    }
                    return grid.renderDescription(event);
                },
                autoHeight : true
            },
            {
                text      : 'Occurred At',
                field     : 'occurredAt',
                type      : 'date',
                format    : 'M/D/YY h:mm a',
                flex      : 1,
                groupable : false
            }
        ]
    };
}

MyVersionGrid.initClass();

/**
 * Demonstrates extending the built-in VersionModel in order to annotate versions
 * with a username or other application-specific data.
 */
class VersionModelWithUser extends VersionModel {

    static $name = 'VersionModelWithUser';

    static fields = [
        { name : 'username', type : 'string' }
    ];

    onBeforeSave() {
        this.username = currentUserName;
    }

    get defaultDescription() {
        return `${this.isAutosave ? 'Auto-saved' : `Saved by ${StringHelper.capitalize(this.username)}`} on 
        ${DateHelper.format(this.savedAt, 'MMM D YYYY')} at ${DateHelper.format(this.savedAt, 'h:mm a')}`;
    }
}

/**
 * Also demonstrate extending ChangeLogTransactionModel to track which
 * user generated the transaction.
 */
class TransactionModelWithUser extends ChangeLogTransactionModel {
    static $name = 'TransactionModelWithUser';

    static fields = [
        /**
         * Add a username field
         */
        { name : 'username', type : 'string' }
    ];

    construct(config) {
        super.construct({
            username : currentUserName,
            ...config
        });
    }
}

const
    userNames       = ['amit', 'dan', 'emilia', 'linda', 'hitomi', 'henrik', 'kate', 'steve'],
    currentUserName = userNames[Math.floor(Math.random() * userNames.length)],
    project         = new ProjectModel({
        loadUrl  : '../_datasets/launch-saas.json',
        autoLoad : true,
        // The State TrackingManager which the UndoRedo widget in the toolbar uses
        stm      : {
            autoRecord : true
        },
        validateResponse : true,
        listeners        : {
            load : {
                async fn() {
                    // Listener will be started once on load and is used for demo purposes to add Undo operations on start

                    // Code may be edited in CodeEditor during data load and this will destroy existing gantt and project
                    if (gantt.isDestroyed) {
                        return;
                    }

                    const
                        { project }  = gantt,
                        { versions } = gantt.features,
                        task         = project.taskStore.getById(11); // Get Install Apache task by id

                    project.stm.enable();

                    // Make repeated edits, saving versions along the way, to populate version grid
                    await task.setStartDate(new Date(2019, 0, 20));

                    if (gantt.isDestroyed) {
                        return;
                    }

                    versions.transactionDescription = `Moved task ${task.name}`;
                    versions.stopTransaction();
                    versions.saveVersion();

                    await task.setStartDate(new Date(2019, 0, 21));

                    if (gantt.isDestroyed) {
                        return;
                    }

                    versions.transactionDescription = `Moved task ${task.name}`;
                    versions.stopTransaction();
                },
                once : true
            }
        }
    }),
    gantt           = new Gantt({
        enableUndoRedoKeys      : true,
        dependencyIdField       : 'wbsCode',
        flex                    : 2,
        resourceImageFolderPath : '../_shared/images/users/',
        project,
        columns                 : [
            { type : 'wbs' },
            { type : 'name', field : 'name', text : 'Name', width : 250 },
            { type : 'startdate', text : 'Start date' },
            { type : 'duration', text : 'Duration' },
            { text : 'Predecessors', type : 'predecessor', width : 112 },
            { text : 'Successors', type : 'successor', width : 112 },
            { type : 'addnew' }
        ],
        subGridConfigs : {
            locked : {
                width : 420
            }
        },
        loadMask : 'Loading tasks...',
        tbar     : [
            'Gantt view',
            '->',
            {
                ref   : 'undoredoTool',
                type  : 'undoredo',
                text  : true,
                items : {
                    transactionsCombo : null
                }
            }
        ],
        features : {
            baselines : {
                disabled : true
            },
            versions : {
                /**
                 * Configure the versions feature with our custom models that track user information
                 */
                versionModelClass     : VersionModelWithUser,
                transactionModelClass : TransactionModelWithUser
            },
            dependencies   : true,
            dependencyEdit : true
        },
        listeners : {
            /**
             * Demonstrates overriding the default transaction description to provide more detail
             * about which user action initiated the transaction. In this case, we set a custom
             * description for transactions involving a task drag event.
             */
            taskDrop({ taskRecords }) {
                this.features.versions.transactionDescription = taskRecords.length === 1
                    ? `Dragged task ${taskRecords[0].name}` : `Dragged ${taskRecords.length} tasks`;
            },

            taskResizeEnd({ taskRecord }) {
                this.features.versions.transactionDescription = `Resized task ${taskRecord.name}`;
            },

            afterDependencyCreateDrop() {
                this.features.versions.transactionDescription = `Drew a link`;
            },

            transactionChange({ hasUnattachedTransactions }) {
                this.owner.widgetMap.saveButton.disabled = !hasUnattachedTransactions;
            }
        }
    }),
    app             = new Container({
        appendTo : 'container',
        layout   : 'box',
        items    : {
            gantt,
            splitter    : { type : 'splitter' },
            versionGrid : {
                type                       : MyVersionGrid.type,
                flex                       : 1,
                emptyText                  : 'No versions to display',
                project                    : gantt.project,
                showUnattachedTransactions : true,
                selectionMode              : {
                    row  : true,
                    cell : false
                },
                features : {
                    cellMenu : {
                        /**
                         * Add a button to the version row context menu.
                         */
                        items : {
                            duplicateButton : {
                                text   : 'Duplicate',
                                icon   : 'b-fa b-fa-copy',
                                onItem : async({ record }) => {
                                    const result = await MessageDialog.confirm({
                                        title   : 'Duplicate Version?',
                                        message : `This will create a new project from the content of the selected version.
                                        Do you want to continue?`
                                    });
                                    if (result === MessageDialog.yesButton) {
                                        // Sample code demonstrating cloning a saved version
                                        await gantt.features.versions.getVersionContent(record.versionModel);
                                        gantt.project = new WebSocketProjectModel(record.versionModel.content);
                                    }
                                }
                            }
                        }
                    }
                },
                dateFormat : 'M/D/YY h:mm a',
                tbar       : {
                    items : [
                        {
                            ref       : 'saveButton',
                            text      : 'Save Version',
                            icon      : 'b-fa b-fa-plus',
                            listeners : {
                                click : () => {
                                    gantt.features.versions.saveVersion();
                                }
                            }
                        },
                        '->',
                        {
                            ref       : 'onlyNamedToggle',
                            type      : 'slidetoggle',
                            text      : 'Show named versions only',
                            color     : 'b-blue',
                            listeners : {
                                change : ({ checked }) => {
                                    app.widgetMap.versionGrid.showNamedVersionsOnly = checked;
                                }
                            }
                        },
                        {
                            ref       : 'showVersionsToggle',
                            type      : 'slidetoggle',
                            text      : 'Changes only',
                            color     : 'b-blue',
                            checked   : false,
                            listeners : {
                                change : ({ checked }) => {
                                    app.widgetMap.versionGrid.showVersions = !checked;
                                }
                            }
                        }
                    ]
                },
                listeners : {
                    // Handle the user asking to restore a given version
                    restore : async({ version }) => {
                        const result = await MessageDialog.confirm({
                            title   : 'Restore Version?',
                            message : `Are you sure you want to restore the selected version, replacing the
                            current project? You will lose any unsaved changes.`
                        });
                        if (result === MessageDialog.yesButton) {
                            const { versions, baselines } = gantt.features;
                            await versions.restoreVersion(version);
                            baselines.disabled = true;
                            project.stm.resetQueue();
                        }
                    },

                    // Handle the user asking to compare a given version
                    compare : async({ source, version }) => {
                        const { versions, baselines } = gantt.features;
                        baselines.disabled = false;
                        await versions.compareVersion(version);
                        source.comparingVersionId = version.id;
                        gantt.refreshRows();
                    },

                    stopCompare : async({ source }) => {
                        const { versions, baselines } = gantt.features;
                        baselines.disabled = true;
                        await versions.stopComparing();
                        source.comparingVersionId = null;
                    }
                }
            }
        }
    });
