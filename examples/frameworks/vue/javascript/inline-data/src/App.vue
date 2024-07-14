<!-- Application -->
<template>
    <div id="container">
        <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
        <bryntum-demo-header/>
        <div class="demo-toolbar align-right">
            <bryntum-button
                text="Change data"
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
    </div>
</template>

<script>
import { DateHelper } from '@bryntum/gantt';
import { BryntumButton, BryntumDemoHeader, BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-vue';
import * as initialData from '@/initialData.js';
import { ganttConfig, projectConfig } from '@/AppConfig.js';

export default {
    name : 'app',

    // local components
    components : {
        BryntumDemoHeader,
        BryntumGanttProjectModel,
        BryntumGantt,
        BryntumButton
    },

    data() {
        return {
            // initialData spreads as tasks, dependencies, etc.
            ...initialData,
            projectConfig,
            ganttConfig,
            dataSet : 0,
            project : null
        };
    },
    mounted() {
        // Set project so that gantt can use it
        this.project = this.$refs.project;
    },
    methods : {
        dataChangeHandler() {
            if (this.dataSet === 0) {
                this.tasks = [
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
                this.dependencies = [
                    { id : 1, from : 11, to : 12 },
                    { id : 2, from : 1, to : 21 },
                    { id : 3, from : 21, to : 22 },
                    { id : 4, from : 21, to : 23 }
                ];
                this.timeRanges = [
                    {
                        id           : 1,
                        name         : 'Important date',
                        startDate    : DateHelper.add(DateHelper.clearTime(new Date()), 15, 'day'),
                        duration     : 0,
                        durationUnit : 'd',
                        cls          : 'b-fa b-fa-diamond'
                    }
                ];

                this.dataSet = 1;
            }
            else {
                Object.assign(this, initialData);
                this.dataSet = 0;
            }
        }
    }
};
</script>

<style lang="scss">
@import './App.scss';
</style>
