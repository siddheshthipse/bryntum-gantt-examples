import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { BryntumGanttComponent, BryntumTreeGridComponent } from '@bryntum/gantt-angular';
import { type Model, type Store, type TreeGrid, type TaskStore, DependencyModel, Gantt, ProjectModel, SchedulerEventModel, StringHelper, TaskModel } from '@bryntum/gantt';
import { ganttConfig, treeGridConfig } from './app.config';

@Component({
    selector      : 'app-root',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
    @ViewChild(BryntumGanttComponent) ganttComponent!: BryntumGanttComponent;
    @ViewChild(BryntumTreeGridComponent) treeGridComponent!: BryntumTreeGridComponent;

    ganttConfig    = ganttConfig;
    treeGridConfig = treeGridConfig;

    private gantt!: Gantt;
    private treeGrid!: TreeGrid;
    private taskStore!: TaskStore;

    ngAfterViewInit(): void {
        const
            gantt      = this.gantt = this.ganttComponent.instance,
            treeGrid   = this.treeGrid = this.treeGridComponent.instance;
        this.taskStore = gantt.taskStore;

        gantt.project.stm.on({
            // This event handler will be called each time a transaction recording stops.
            // Upon this event we:
            // - add a new transaction into the Actions TreeGrid store as well as we add
            //   transaction constituting actions as transaction node children.
            // - update undo/redo controls
            // - select the transaction currently
            recordingStop : this.onRecordingStop,

            // This event is fired each time a transaction restoring stops i.e. when state is restored to
            // a particular transaction. Here we update undo/redo controls and select the transaction currently
            // we are at in the Actions TreeGrid.
            restoringStop : this.onRestoringStop,
            thisObj       : this
        });
        treeGrid.on({
            selectionchange() {
                const
                    { stm }     = gantt.project,
                    action: any = treeGrid.selectedRecord;

                if (action && action.parent.isRoot) {
                    // Actions TreeGrid always will have one item selected
                    const idx = action.idx;

                    if (stm.position < idx) {
                        stm.redo(idx - stm.position);
                    }
                    else if (stm.position > idx) {
                        stm.undo(stm.position - idx);
                    }
                }
            }
        });
    }

    onRecordingStop({ stm, transaction }) {
        // Because of the selection's ActionsCollection's insistence on NOT
        // removing a selected record, we must gather the toRemove records
        // before adding and selecting the new one, then remove them.
        const
            actionStore = this.treeGrid.store as Store,
            toRemove    = (actionStore.rootNode.children as Model[]).slice(stm.position),
            action      = actionStore.rootNode.insertChild({
                idx      : stm.position,
                title    : transaction.title,
                changes  : transaction.length > 1 ? `${transaction.length} steps` : `${transaction.length} step`,
                expanded : false,
                // Here we analyze transaction actions queue and provide a corresponding title for each
                // action record for better user experience. Similar thing can be done for entire transaction title.
                children : transaction.queue.map((action: any, idx: number) => {
                    let {
                            type,
                            parentModel,
                            model,
                            modelList,
                            newData
                        } = action,
                        title   = '',
                        changes = '';

                    if (!model) {
                        if (parentModel) {
                            model = parentModel;
                        }
                        else {
                            model = modelList[modelList.length - 1];
                        }
                    }

                    const { fromEvent, toEvent } = model as { fromEvent: SchedulerEventModel; toEvent: SchedulerEventModel };

                    if (type === 'UpdateAction' && model instanceof ProjectModel) {
                        title   = 'Update project';
                        changes = StringHelper.safeJsonStringify(newData);
                    }
                    else if (type === 'EventUpdateAction') {
                        title   = 'Edit task ' + model.name;
                        changes = StringHelper.safeJsonStringify(newData);
                    }
                    else if (type === 'AddAction' && model instanceof TaskModel) {
                        title = 'Add task ' + model.name;
                    }
                    else if (type === 'RemoveAction' && model instanceof TaskModel) {
                        title = 'Remove task ' + model.name;
                    }
                    else if (type === 'UpdateAction' && model instanceof DependencyModel) {
                        if (fromEvent && toEvent) {
                            title = `Edit link ${fromEvent.name} -> ${toEvent.name}`;
                        }
                        else {
                            title = 'Edit link';
                        }
                        changes = StringHelper.safeJsonStringify(newData);
                    }
                    else if (type === 'AddAction' && model instanceof DependencyModel) {
                        title = `Link ${fromEvent.name} -> ${toEvent.name}`;
                    }
                    else if (type === 'RemoveAction' && model instanceof DependencyModel) {
                        const
                            fromEvent = model.fromEvent || this.taskStore.getById(model.from),
                            toEvent   = model.toEvent || this.taskStore.getById(model.to);

                        if (fromEvent && toEvent) {
                            title = `Unlink ${(fromEvent as SchedulerEventModel).name} -> ${(toEvent as SchedulerEventModel).name}`;
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
            }, toRemove[0]) as Model;

        this.treeGrid.selectedRecord = action;

        // Remove after because the selection insists on having at least one selected record
        if (toRemove.length) {
            actionStore.rootNode.removeChild(toRemove);
        }
    }

    onRestoringStop({ stm }) {
        const
            store    = this.treeGrid.store as Store,
            rootNode = store.rootNode,
            action   = rootNode.children[stm.position];

        this.treeGrid.selectedRecord = action;
    }
}
