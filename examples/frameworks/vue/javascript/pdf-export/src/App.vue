<!-- Application -->
<template>
    <div id="container">
        <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
        <bryntum-demo-header />
        <div class="demo-toolbar align-right">
            <bryntum-button
                cls="b-deep-orange b-raised"
                text="Export to PDF/PNG"
                @click="exportHandler"
            />
        </div>
        <bryntum-gantt
            ref="gantt"
            v-bind="ganttConfig"
        ></bryntum-gantt>
    </div>
</template>

<script>
import {
    BryntumGantt,
    BryntumDemoHeader,
    BryntumButton
} from '@bryntum/gantt-vue';
import { ganttConfig } from '@/AppConfig.js';

export default {
    name : 'app',

    // local components
    components : {
        BryntumDemoHeader,
        BryntumGantt,
        BryntumButton
    },

    data() {
        return {
            ganttConfig
        };
    },

    methods : {
        exportHandler() {
            this.$refs.gantt.instance.features.pdfExport.showExportDialog();
        }
    }
};
</script>

<style lang="scss">
@import './App.scss';
</style>
