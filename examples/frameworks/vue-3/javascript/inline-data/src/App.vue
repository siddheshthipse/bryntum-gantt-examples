<!-- Application -->
<template>
    <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
    <bryntum-demo-header />
    <div class="demo-toolbar align-right">
        <bryntum-button
            text="Change Data"
            cls="b-raised b-blue"
            @action="dataChangeHandler"
        />
    </div>
    <bryntum-gantt-project-model
        ref="project"
        v-bind="projectConfig"
        :calendars="calendars"
        :tasks="tasks"
        :dependencies="dependencies"
        :resources="resources"
        :assignments="assignments"
        :time-ranges="timeRanges"
    />
    <bryntum-gantt
        ref="gantt"
        v-bind="ganttConfig"
        :project="project"
    />
</template>

<script>
import { ref } from 'vue';
import { DateHelper } from '@bryntum/gantt';
import { BryntumButton, BryntumDemoHeader, BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-vue-3';
import { ganttConfig, projectConfig, sliderConfig } from '@/AppConfig';
import * as initialData from '@/initialData';

export default {
    name : 'App',

    components : {
        BryntumDemoHeader,
        BryntumGanttProjectModel,
        BryntumGantt,
        BryntumButton
    },

    mounted() {
        // Set project so that gantt can use it
        console.log(this.$refs.gantt.instance.value.project.timeRangeStore);
    },

    setup() {
        const project = ref(null);
        const dataSet = ref(0);
        const calendars = ref(initialData.calendars);
        const tasks = ref(initialData.tasks);
        const dependencies = ref(initialData.dependencies);
        const resources = ref(initialData.resources);
        const assignments = ref(initialData.assignments);
        const timeRanges = ref(initialData.timeRanges);

        const dataChangeHandler = () => {
            if (dataSet.value === 0) {
                tasks.value = [
                    {
                        id       : 1,
                        name     : 'Task 1',
                        expanded : true,
                        children : [
                            { id : 11, name : 'Subtask 11', percentDone : 30, duration : 10 },
                            { id : 12, name : 'Subtask 12', percentDone : 67, duration : 5 }
                        ]
                    },
                    {
                        id       : 2,
                        name     : 'Task 2',
                        expanded : true,
                        children : [
                            { id : 21, name : 'Subtask 21', percentDone : 14, duration : 3 },
                            { id : 22, name : 'Subtask 22', percentDone : 94, duration : 7 },
                            { id : 23, name : 'Subtask 23', percentDone : 7, duration : 8 }
                        ]
                    }
                ];
                dependencies.value = [
                    { id : 1, from : 11, to : 12 },
                    { id : 2, from : 1, to : 21 },
                    { id : 3, from : 21, to : 22 },
                    { id : 4, from : 21, to : 23 }
                ];
                timeRanges.value = [
                    {
                        id           : 1,
                        name         : 'Important date',
                        startDate    : DateHelper.add(DateHelper.clearTime(new Date()), 15, 'day'),
                        duration     : 0,
                        durationUnit : 'd',
                        cls          : 'b-fa b-fa-diamond'
                    }
                ];

                dataSet.value = 1;
            }
            else {
                tasks.value = initialData.tasks;
                dependencies.value = initialData.dependencies;
                timeRanges.value = initialData.timeRanges;
                dataSet.value = 0;
            }

        };

        return {
            project,
            projectConfig,
            ganttConfig,
            sliderConfig,
            dataChangeHandler,
            calendars,
            tasks,
            dependencies,
            resources,
            assignments,
            timeRanges
        };
    }
};
</script>

<style lang="scss">
@import './App.scss';
</style>
