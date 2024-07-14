# Binding Bryntum Scheduler data

Bryntum Scheduler is a data intensive component that uses several datasets. These datasets usually come from the server
and are held in `Scheduler` project during the lifetime of the `Scheduler` view. There are several ways of populating the
project data stores.

## Using CrudManager transport

[CrudManager](#Scheduler/data/CrudManager) is a built-in class that implements loading and saving of data in multiple
stores with [transport](#Scheduler/data/CrudManager#config-transport) config. Loading the stores and saving all
changes is done in one request.

Configuring `crudManager` with `transport` is the simplest way of binding data to the `Scheduler` project stores as seen
from the client side, but it does require following a specific protocol on the backend.

The configuration of `crudManager` can be as simple as:

```javascript
crudManager : {
    transport : {
        load : {
            url : '/server/load/url'
        },
        sync : {
            url : '/server/save/url'
        }
    },
    autoLoad : true
}
```

With this configuration, the data is loaded and saved from and to the above URLs and the data `transport` is handled
automatically.

## Binding existing data to the component

When the application already has a server transport layer then the data for `Scheduler` is available in application
code and it needs to be passed (bound) to the component. One approach is to make the data available as component
variables and bind them in the Vue template:

**App.vue:**

```javascript
<template>
    <bryntum-scheduler
        :assignments = "assignments"
        :dependencies = "dependencies"
        :resources = "resources"
        :events = "events"
        v-bind = "schedulerConfig"
    />
</template>

<script>
import { ref, reactive } from 'vue';

import { BryntumScheduler } from '@bryntum/scheduler-vue-3';

import { useSchedulerConfig } from '@/AppConfig';
import * as appData from '@/AppData';

export default {
    name : 'App',

    components : {
        BryntumScheduler
    },

    setup() {
        const schedulerConfig = reactive(useSchedulerConfig());

        const assignments = ref(appData.assignments);
        const dependencies = ref(appData.dependencies);
        const resources = ref(appData.resources);
        const events = ref(appData.events);

        return {
            schedulerConfig,
            assignments,
            dependencies,
            resources,
            events
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
this.events = newEvents;
this.dependencies = newDependencies;
```

## Binding existing data to the project

This approach binds data to a standalone `SchedulerProjectModel` and then uses this project in `Scheduler`. Project has its
own markup in the template and it must be assigned to the `Scheduler` during initialization.

This approach is suitable for more complex applications that use more than one Bryntum component that share a common
`project`:

**App.vue:**

```javascript
<template>
    <div>
        <bryntum-scheduler-project-model
            ref = "project"
            :assignments = "assignments"
            :dependencies = "dependencies"
            :resources = "resources"
            :events = "events"
        />
        <bryntum-scheduler
            :project = "project"
            v-bind = "schedulerConfig"
        />
    </div>
</template>

<script>
import { ref, reactive } from 'vue';

import { BryntumSchedulerProjectModel, BryntumScheduler } from '@bryntum/scheduler-vue-3';

import { useSchedulerConfig } from '@/AppConfig';
import * as appData from '@/AppData';

export default {
    name : 'App',

    components : {
        BryntumSchedulerProjectModel,
        BryntumScheduler
    },

    setup() {
        const project = ref(null);

        const schedulerConfig = reactive(useSchedulerConfig());

        const assignments = ref(appData.assignments);
        const dependencies = ref(appData.dependencies);
        const resources = ref(appData.resources);
        const events = ref(appData.events);

        return {
            project,
            schedulerConfig,
            assignments,
            dependencies,
            events,
            resources
        };
    }
};
</script>

<style lang = "scss">
@import './App.scss';
</style>
```

Here we create a standalone `SchedulerProjectModel` (without any rendered output) with properties bound to individual 
data sets.

<div class="note">

Note that <code>bryntum-scheduler-project-model</code> tag must come before all other components that use it. Otherwise the <code>project</code>
reference is not valid to these components.

</div>



<p class="last-modified">Last modified on 2024-05-21 9:20:05</p>