<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { BryntumDemoHeader, BryntumGantt, BryntumTreeGrid, BryntumSplitter } from '@bryntum/gantt-vue-3';
import { type Store, type Model, type SchedulerEventModel, ProjectModel, StringHelper, TaskModel, DependencyModel } from '@bryntum/gantt';
import { ganttConfiguration, treeGridConfiguration } from './AppConfig';

const
    ganttConfig    = reactive(ganttConfiguration),
    treeGridConfig = reactive(treeGridConfiguration),
    ganttRef       = ref(null),
    treeGridRef    = ref(null);

onMounted(() => {

    const
        gantt    = ganttRef.value.instance.value,
        treeGrid = treeGridRef.value.instance.value;

    const onRecordingStop = ({ stm, transaction }: any) => {
        // Because of the selection's ActionsCollection's insistence on NOT
        // removing a selected record, we must gather the toRemove records
        // before adding and selecting the new one, then remove them.

        const
            gantt       = ganttRef.value!.instance.value,
            treeGrid    = treeGridRef.value!.instance.value,
            actionStore = treeGrid.store as Store,
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
                            fromEvent = model.fromEvent || gantt.taskStore.getById(model.from),
                            toEvent   = model.toEvent || gantt.taskStore.getById(model.to);

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

        treeGrid.selectedRecord = action;

        // Remove after because the selection insists on having at least one selected record
        if (toRemove.length) {
            actionStore.rootNode.removeChild(toRemove);
        }
    };

    const onRestoringStop = ({ stm }: any) => {
        const
            treeGrid         = treeGridRef.value!.instance.value,
            store            = treeGrid.store as Store,
            rootNodeChildren = store.rootNode.children as Model[],
            action           = rootNodeChildren[stm.position];

        treeGrid.selectedRecord = action;
    };

    gantt.project.stm.on({
        // This event handler will be called each time a transaction recording stops.
        // Upon this event we:
        // - add a new transaction into the Actions TreeGrid store as well as we add
        //   transaction constituting actions as transaction node children.
        // - update undo/redo controls
        // - select the transaction currently
        recordingStop : onRecordingStop,

        // This event is fired each time a transaction restoring stops i.e. when state is restored to
        // a particular transaction. Here we update undo/redo controls and select the transaction currently
        // we are at in the Actions TreeGrid.
        restoringStop : onRestoringStop,

        thisObj : treeGrid
    });

    treeGrid.on({
        selectionchange() {
            const
                { stm } = gantt.project,
                action  = treeGrid.selectedRecord as any;

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
        },
        thisObj : treeGrid
    });
});

</script>

<template>
    <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
    <bryntum-demo-header />
    <div class="b-widget b-wrapper">
        <bryntum-gantt
            ref="ganttRef"
            v-bind="ganttConfig"
        />
        <bryntum-splitter />
        <bryntum-tree-grid
            ref="treeGridRef"
            v-bind="treeGridConfig"
            :cellEditFeature="false"
        />
    </div>
</template>

<style lang="scss">
@import './App.scss';
</style>
