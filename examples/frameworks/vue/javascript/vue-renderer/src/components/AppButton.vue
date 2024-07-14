<!-- AppButton -->
<template>
    <button
        class="b-button b-grey"
        @click="click($event)"
    >
        <span>Done: {{ record.percentDone | round }}%</span>
    </button>
</template>

<script>
import { Toast, StringHelper } from '@bryntum/gantt';

export default {
    name    : 'AppButton',
    props   : ['record'],
    methods : {
        click() {
            Toast.show(`<b>${Math.round(this.record.percentDone)}%</b> done of task <b>${StringHelper.encodeHtml(this.record.name)}</b>`);
        }
    },
    filters : {
        round(value) {
            return Math.round(value);
        }
    }
};
</script>
