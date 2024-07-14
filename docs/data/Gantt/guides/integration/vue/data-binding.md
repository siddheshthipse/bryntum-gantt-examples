# Binding Bryntum Gantt data

Bryntum Gantt is a data intensive component that uses several datasets. These datasets usually come from the server
and are held in `Gantt` project during the lifetime of the `Gantt` view. There are several ways of populating the
project data stores.

## Using project transport

[ProjectModel](#Gantt/model/ProjectModel) supports loading and saving of data in multiple stores with
[transport](#Gantt/model/ProjectModel#config-transport) config. Loading the stores and saving all changes is done in
one request.

Configuring `project` with `transport` is the simplest way of binding data to the `Gantt` project stores as seen from
the client side, but it does require following a specific protocol on the backend.

The configuration can be as simple as setting the `project` property like this:

```javascript
ganttConfig: {
    project : {
        loadUrl  : '/server/load/url',
        syncUrl  : '/server/save/url',
        autoLoad : true
    }
}
```
```jsx
<BryntumGantt {...ganttConfig}/>
```

With this configuration, the data is loaded and saved from and to the above URLs and the data `transport` is handled
automatically.

## Binding existing data to the component

When the application already has a server transport layer then the data for `Gantt` is available in application
code and it needs to be passed (bound) to the component. One approach is to make the data available as component
variables and bind them in the Vue template:

**App.vue:**

```javascript
<template>
    <bryntum-gantt
        :assignments = "assignments"
        :calendars = "calendars"
        :dependencies = "dependencies"
        :resources = "resources"
        :tasks = "tasks"
        v-bind = "ganttConfig"
    />
</template>

<script>
import { ref, reactive } from 'vue';

import { BryntumGantt } from '@bryntum/gantt-vue-3';

import { useGanttConfig } from '@/AppConfig';
import * as appData from '@/AppData';

export default {
    name : 'App',

    components : {
        BryntumGantt
    },

    setup() {
        const ganttConfig = reactive(useGanttConfig());

        const assignments = ref(appData.assignments);
        const calendars = ref(appData.calendars);
        const dependencies = ref(appData.dependencies);
        const resources = ref(appData.resources);
        const tasks = ref(appData.tasks);

        return {
            ganttConfig,
            assignments,
            calendars,
            dependencies,
            resources,
            tasks
        };
    }
};
</script>

<style lang = "scss">
@import './App.scss';
</style>
```

Here we have component variables, initialized by spreading `...initialData`. Whenever a change of the data is needed,
it is only necessary to assign the new values to these variables, for example:

```javascript
this.tasks = newTasks;
this.dependencies = newDependencies;
```

## Binding existing data to the project

This approach binds data to a standalone `GanttProjectModel` and then uses this project in `Gantt`. Project has its
own markup in the template and it must be assigned to the `Gantt` during initialization.

This approach is suitable for more complex applications that use more than one Bryntum component that share a common
`project`:

**App.vue:**

```javascript
<template>
    <div>
        <bryntum-gantt-project-model
            ref = "project"
            :assignments = "assignments"
            :calendars = "calendars"
            :dependencies = "dependencies"
            :resources = "resources"
            :tasks = "tasks"
        />
        <bryntum-gantt
            :project = "project"
            v-bind = "ganttConfig"
        />
    </div>
</template>

<script>
import { ref, reactive } from 'vue';

import { BryntumGanttProjectModel, BryntumGantt } from '@bryntum/gantt-vue-3';

import { useGanttConfig } from '@/AppConfig';
import * as appData from '@/AppData';

export default {
    name : 'App',

    components : {
        BryntumGanttProjectModel,
        BryntumGantt
    },

    setup() {
        const project = ref(null);

        const ganttConfig = reactive(useGanttConfig());

        const assignments = ref(appData.assignments);
        const calendars = ref(appData.calendars);
        const dependencies = ref(appData.dependencies);
        const resources = ref(appData.resources);
        const tasks = ref(appData.tasks);

        return {
            project,
            ganttConfig,
            assignments,
            dependencies,
            calendars,
            tasks,
            resources
        };
    }
};
</script>

<style lang = "scss">
@import './App.scss';
</style>
```

Here we create a standalone `GanttProjectModel` (without any rendered output) with properties bound to individual 
data sets.

<div class="note">

Note that <code>bryntum-gantt-project-model</code> tag must come before all other components that use it. Otherwise the <code>project</code>
reference is not valid to these components.

</div>

Check implementation in [inline-data](../examples/frameworks/vue-3/javascript/inline-data/) Vue 3 demo.



<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>