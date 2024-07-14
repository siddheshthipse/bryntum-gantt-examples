<!-- Application -->
<template>
    <div id="container">
        <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
        <bryntum-demo-header />
        <bryntum-gantt
            v-bind="ganttConfig"
        />
    </div>
</template>

<script>
import { ganttConfig } from '@/AppConfig';
import { BryntumDemoHeader, BryntumGantt } from '@bryntum/gantt-vue';

export default {
    name : 'app',

    components : {
        BryntumDemoHeader,
        BryntumGantt
    },

    data() {
        return { ganttConfig };
    }
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
