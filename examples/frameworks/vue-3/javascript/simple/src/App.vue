<!-- Application -->
<template>
    <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
    <bryntum-demo-header />
    <div class="demo-toolbar align-right">
        <bryntum-slider
            v-bind="sliderConfig"
            :value="barMargin"
            @input="({ value }) => (barMargin = value)"
        />
    </div>
    <bryntum-gantt
        v-bind="ganttConfig"
        :barMargin="barMargin"
    />
</template>

<script>
import { ref, reactive } from 'vue';

import {
    BryntumDemoHeader,
    BryntumGantt,
    BryntumSlider
} from '@bryntum/gantt-vue-3';
import { useGanttConfig, sliderConfig } from '@/AppConfig';

export default {
    name : 'App',

    components : {
        BryntumDemoHeader,
        BryntumGantt,
        BryntumSlider
    },

    setup() {
        const barMargin = ref(4);
        const ganttConfig = reactive(useGanttConfig());

        return {
            ganttConfig,
            sliderConfig,
            barMargin
        };
    }
};
</script>

<style lang="scss">
@import './App.scss';
</style>
