<!-- Application -->
<!-- Please note that this example uses the Bryntum Scheduler Pro, which is licensed separately. -->
<template>
    <div id="container">
        <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
        <bryntum-demo-header>
            <bryntum-button
                icon="b-fa-search-plus"
                tooltip="Zoom In"
                cls="b-raised b-blue"
                @click="onZoom('In')"
            />
            <bryntum-button
                icon="b-fa-search-minus"
                tooltip="Zoom Out"
                cls="b-raised b-blue"
                @click="onZoom('Out')"
            />
        </bryntum-demo-header>

        <bryntum-gantt
            ref="gantt"
            v-bind="ganttConfig"
        />
        <bryntum-splitter />
        <bryntum-scheduler-pro
            ref="scheduler"
            v-bind="schedulerConfig"
        />
    </div>
</template>

<script>
import {
    BryntumDemoHeader,
    BryntumGantt,
    BryntumSplitter,
    BryntumSchedulerPro,
    BryntumButton
} from '@bryntum/gantt-vue';
import { Toast } from '@bryntum/gantt';

import { ganttConfig, schedulerConfig } from '@/AppConfig';

export default {
    name : 'App',

    components : {
        BryntumDemoHeader,
        BryntumGantt,
        BryntumSplitter,
        BryntumSchedulerPro,
        BryntumButton
    },

    methods : {
        onZoom(action) {
            this.$refs.gantt.instance[`zoom${action}`]();
        }
    },

    mounted() {
        this.$refs.scheduler.instance.addPartner(this.$refs.gantt.instance);

        Toast.show({
            timeout : 3000,
            html    : 'Please note that this example uses the Bryntum Scheduler Pro, which is licensed separately.'
        });

    },

    data() {
        return { ganttConfig, schedulerConfig };
    }
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
