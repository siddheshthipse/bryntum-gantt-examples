<!-- Application -->
<template>
    <!-- BryntumDemoHeader component is used for Bryntum example styling only and can be removed -->
    <bryntum-demo-header />
    <bryntum-gantt
        ref="ganttRef"
        v-bind="ganttConfig"
    />
</template>

<script>
import { onMounted, ref } from 'vue';

import {
    BryntumDemoHeader,
    BryntumGantt
} from '@bryntum/gantt-vue-3';

import { ganttConfig } from '@/AppConfig';

export default {
    name : 'App',

    components : {
        BryntumDemoHeader,
        BryntumGantt
    },

    setup() {
        const ganttRef = ref(null);

        function onShowBaselinesCheck({ checked }) {
            ganttRef.value.instance.value.features.baselines.disabled = !checked;
        }

        function onSetBaselineItem({ source }) {
            let index;

            switch (source.ref) {
                case 'setBaseline1':
                    index = 1;
                    break;
                case 'setBaseline2':
                    index = 2;
                    break;
                case 'setBaseline3':
                    index = 3;
                    break;
                default:
                    index = 1;
                    break;
            }

            ganttRef.value.instance.value.taskStore.setBaseline(index);
        }

        function onShowBaselineItem({ source, checked }) {
            if (source.isMenuItem) {
                let index;

                switch (source.ref) {
                    case 'showBaseline1':
                        index = 1;
                        break;
                    case 'showBaseline2':
                        index = 2;
                        break;
                    case 'showBaseline3':
                        index = 3;
                        break;
                    default:
                        index = 1;
                        break;
                }

                ganttRef.value.instance.value.element.classList.toggle(`b-hide-baseline-${index}`, !checked);
            }
        }

        onMounted(() => {
            const { showBaselines, setMenuButton, showMenuButton } = ganttRef.value.instance.value.widgetMap;

            showBaselines.on({ change : onShowBaselinesCheck, thisObj : this });
            setMenuButton.on({ item : onSetBaselineItem, thisObj : this });
            showMenuButton.on({ toggle : onShowBaselineItem, thisObj : this });
        });

        return {
            ganttConfig,
            ganttRef
        };
    }
};
</script>

<style lang="scss">
@import './App.scss';
</style>
