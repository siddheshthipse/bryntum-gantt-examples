var {
    TreeGrid,
    Collection,
    StringHelper,
    ProjectModel,
    TaskModel,
    DependencyModel,
    Container
} = bryntum.gantt;

/**
 * Special collection class used in {@link #ActionsGrid} to allow only single top level item to be selected.
 */
class ActionsCollection extends Collection {
    splice(index = 0, toRemove, ...toAdd) {
        const me = this,
            lengthAfter = me.count - (Array.isArray(toRemove) ? toRemove.length : toRemove) + toAdd.length;

        // Collection must always has 1 action selected
        if (lengthAfter === 1) {
            // Collection doesn't allow adding more then 1 element
            // Only Initial state (id=-1) or parent nodes are allowed
            if (toAdd.length === 0 || toAdd.length === 1 && (toAdd[0].id === -1 || toAdd[0].isParent)) {
                super.splice(index, toRemove, ...toAdd);
            }
        }
    }
}

/**
 * Actions grid contains list of undo/redo transactions available to switch to and actions
 * constituting them.
 */
class ActionsGrid extends TreeGrid {
    static get $name() {
        return 'ActionsGrid';
    }

    // Factoryable type name
    static get type() {
        return 'actionsgrid';
    }

    static get configurable() {
        return {
            /**
       * The State Tracking Manager to use.
       * @config {Core.data.stm.StateTrackingManager}
       */
            stm      : null,
            readOnly : true,
            features : {
                cellEdit : false
            },
            recordCollection : new ActionsCollection(),
            store            : {
                fields : ['idx', 'title', 'changes'],
                data   : [{
                    id      : -1,
                    idx     : 0,
                    title   : 'Initial state',
                    changes : ''
                }]
            },
            columns : [{
                text     : '#',
                field    : 'idx',
                width    : '1em',
                sortable : false
            }, {
                text     : 'Action',
                field    : 'title',
                flex     : 0.4,
                type     : 'tree',
                sortable : false
            }, {
                text     : 'Changes',
                field    : 'changes',
                flex     : 0.6,
                sortable : false
            }]
        };
    }

    // Because callOnFunctions is set by default, this will be called when we trigger selectionChange
    // Restore application data model state to a particular Action grid selected transaction.
    onSelectionChange() {
        const {
                stm
            } = this,
            action = this.selectedRecord;
        if (action && action.parent.isRoot) {
            // Actions grid always will have one item selected
            const idx = action.idx;
            if (stm.position < idx) {
                stm.redo(idx - stm.position);
            }
            else if (stm.position > idx) {
                stm.undo(stm.position - idx);
            }
        }
    }

    updateStm(stm) {
        stm.on({
            // This event handler will be called each time a transaction recording stops.
            // Upon this event we:
            // - add a new transaction into the Actions grid store as well as we add
            //   transaction constituting actions as transaction node children.
            // - update undo/redo controls
            // - select the transaction currently
            recordingStop : 'onRecordingStop',
            // This event is fired each time a transaction restoring stops i.e. when state is restored to
            // a particular transaction. Here we update undo/redo controls and select the transaction currently
            // we are at in the Actions grid.
            restoringStop : 'onRestoringStop',
            thisObj       : this
        });
    }

    onRecordingStop({
        stm,
        transaction
    }) {
    // Because of the selection's ActionsCollection's insistence on NOT
    // removing a selected record, we must gather the toRemove records
    // before adding and selecting the new one, then remove them.

        const actionStore = this.store,
            toRemove = actionStore.rootNode.children.slice(stm.position),
            action = actionStore.rootNode.insertChild({
                idx      : stm.position,
                title    : transaction.title,
                changes  : transaction.length > 1 ? `${transaction.length} steps` : `${transaction.length} step`,
                expanded : false,
                // Here we analyze transaction actions queue and provide a corresponding title for each
                // action record for better user experience. Similar thing can be done for entire transaction title.
                children : transaction.queue.map((action, idx) => {
                    let {
                            type,
                            parentModel,
                            model,
                            modelList,
                            newData
                        } = action,
                        title = '',
                        changes = '';
                    if (!model) {
                        if (parentModel) {
                            model = parentModel;
                        }
                        else {
                            model = modelList[modelList.length - 1];
                        }
                    }
                    if (type === 'UpdateAction' && model instanceof ProjectModel) {
                        title = 'Update project';
                        changes = StringHelper.safeJsonStringify(newData);
                    }
                    else if (type === 'EventUpdateAction') {
                        title = 'Edit task ' + model.name;
                        changes = StringHelper.safeJsonStringify(newData);
                    }
                    else if (type === 'AddAction' && model instanceof TaskModel) {
                        title = 'Add task ' + model.name;
                    }
                    else if (type === 'RemoveAction' && model instanceof TaskModel) {
                        title = 'Remove task ' + model.name;
                    }
                    else if (type === 'UpdateAction' && model instanceof DependencyModel) {
                        if (model.fromEvent && model.toEvent) {
                            title = `Edit link ${model.fromEvent.name} -> ${model.toEvent.name}`;
                        }
                        else {
                            title = 'Edit link';
                        }
                        changes = StringHelper.safeJsonStringify(newData);
                    }
                    else if (type === 'AddAction' && model instanceof DependencyModel) {
                        title = `Link ${model.fromEvent.name} -> ${model.toEvent.name}`;
                    }
                    else if (type === 'RemoveAction' && model instanceof DependencyModel) {
                        const fromEvent = model.fromEvent || this.taskStore.getById(model.from),
                            toEvent = model.toEvent || this.taskStore.getById(model.to);
                        if (fromEvent && toEvent) {
                            title = `Unlink ${fromEvent.name} -> ${toEvent.name}`;
                        }
                        else {
                            title = 'Unlink tasks';
                        }
                    }
                    else if (type === 'InsertChildAction') {
                        title = `Insert task ${model.name} at ${action.insertIndex} position`;
                    }
                    return {
                        idx : `${stm.position}.${idx + 1}`,
                        title,
                        changes
                    };
                })
            }, toRemove[0]);
        this.selectedRecord = action;

        // Remove after because the selection insists on having at least one selected record
        if (toRemove.length) {
            actionStore.rootNode.removeChild(toRemove);
        }
    }

    onRestoringStop({
        stm
    }) {
        const action = this.store.rootNode.children[stm.position];
        this.selectedRecord = action;
    }
}

// Register this widget type with its Factory This allows us insert widget
// into a container using just simple JSON configuration object.
ActionsGrid.initClass();
const project = window.project = new ProjectModel({
        loadUrl  : '../_datasets/launch-saas.json',
        autoLoad : true,
        // The State TrackingManager which the UndoRedo widget in the toolbar uses
        stm      : {
            autoRecord : true
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    }),
    {
        stm,
        taskStore
    } = project;

// Primary application container. Contains two widgets: Gantt and Actions grid.
new Container({
    appendTo : 'container',
    layout   : 'hbox',
    items    : [{
        type               : 'gantt',
        ref                : 'gantt',
        enableUndoRedoKeys : true,
        flex               : '1 1 auto',
        dependencyIdField  : 'wbsCode',
        project,
        columns            : [{
            type : 'wbs'
        }, {
            type  : 'name',
            field : 'name',
            text  : 'Name',
            width : 250
        }, {
            type : 'startdate',
            text : 'Start date'
        }, {
            type : 'duration',
            text : 'Duration'
        }, {
            text  : 'Predecessors',
            type  : 'predecessor',
            width : 112
        }, {
            text  : 'Successors',
            type  : 'successor',
            width : 112
        }, {
            type : 'addnew'
        }],
        subGridConfigs : {
            locked : {
                width : 420
            }
        },
        loadMask : 'Loading tasks...',
        tbar     : ['Gantt view', '->', {
            ref   : 'undoredoTool',
            type  : 'undoredo',
            text  : true,
            items : {
                transactionsCombo : null
            }
        }]
    }, {
        type : 'splitter'
    }, {
    // Custom Grid subclass to display transaction details
        ref  : 'actionsGrid',
        type : 'actionsgrid',
        flex : '0 0 30em',
        tbar : ['Actions view'],
        // It needs to know the State Tracking Manager and TaskStore
        stm,
        taskStore
    }]
});
