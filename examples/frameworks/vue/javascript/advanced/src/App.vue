<!-- Application -->
<template>
    <div id="container">
        <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
        <bryntum-demo-header />
        <bryntum-gantt-project-model
            ref="project"
            v-bind="projectConfig"
            :taskModelClass="Task"
        />
        <bryntum-gantt
            v-bind="ganttConfig"
            :project="project"
        />
    </div>
</template>

<script>
import { BryntumDemoHeader, BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-vue';
import { projectConfig, ganttConfig } from '@/AppConfig';
import Task from '@/lib/Task.js';

export default {
    name : 'app',

    components : {
        BryntumDemoHeader,
        BryntumGantt,
        BryntumGanttProjectModel
    },
    mounted() {
        // Set project so that gantt can use it
        this.project = this.$refs.project;
    },
    data() {
        return {
            projectConfig,
            ganttConfig,
            Task,
            project : null
        };
    }
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
