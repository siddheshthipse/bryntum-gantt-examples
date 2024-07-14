# Bryntum Gantt events in Vue

The Bryntum Gantt events are passed up to the Vue wrapper which makes it possible to listen to them the standard
Vue way.

## Listening to events

The following code demonstrates listening to the `taskClick` event:

Html:

```javascript
<template>
    <div>
        <bryntum-gantt
            ref="gantt"
            @taskclick="onTaskClick"
        />
    </div>
</template>

<script>

import { BryntumGantt } from "@bryntum/gantt-vue";

export default {

    name: "Gantt App",

    components: { BryntumGantt },

    methods : {
        onTaskClick() {
            // Do something
        }
   }
}
</script>
```

Please note that we prefix the capitalized event name with the `on` keyword and that we pass `$event` as
the argument to the listener.

## Preventable events

By returning `false` from a listener for an event documented as `preventable` the action that would otherwise be
executed after the event is prevented. These events names are usually prefixed with `before`.

For example:

```javascript
<template>
    <div>
        <bryntum-gantt
            ref="gantt"
            @beforetaskedit="onBeforeTaskEdit"
        />
    </div>
</template>

<script>

import { BryntumGantt } from "@bryntum/gantt-vue";

export default {

    name: "Gantt App",

    components: { BryntumGantt },

    methods : {
        onBeforeTaskEdit() {
            if (someCondition) {
                return false;
            }
        }
   }
}
</script>
```


<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>