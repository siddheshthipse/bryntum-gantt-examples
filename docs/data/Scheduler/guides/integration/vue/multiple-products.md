# Combining multiple Bryntum products

## Thin packages overview

Bryntum's products share the same data model and can be combined to provide different views of the underlying data.

When combining multiple Bryntum products in a single application using Vue, you should use thin npm packages. This
avoids runtime errors and also reduces the amount of code and CSS that has to be downloaded.

The main difference between thin packages and regular packages is that thin only contain product specific code and
styling, while regular contain code and styling for all underlying products (for example Scheduler includes Scheduler +
Grid + Core). Thin packages are valid for building a single product application.

<div class="note">

It is not possible to import several regular (non-thin) Bryntum npm packages like <code>@bryntum/grid</code> and 
<code>@bryntum/calendar</code> in one application. Doing this will lead to a runtime console error:

```shell
The Bryntum Scheduler bundle was loaded multiple times by the application.
```

</div>

## Thin packages list

Bryntum's npm repository contains thin packages for combining multiple Bryntum products in one application..

Thin library packages:

| Package                    | Purpose                                     |
|----------------------------|---------------------------------------------|
| @bryntum/core-thin         | Bryntum Core data and UI components package |
| @bryntum/grid-thin         | Bryntum Grid component package              |
| @bryntum/scheduler-thin    | Bryntum Scheduler component package         |
| @bryntum/schedulerpro-thin | Bryntum Scheduler Pro component package     |
| @bryntum/gantt-thin        | Bryntum Gantt component package             |
| @bryntum/calendar-thin     | Bryntum Calendar component package          |
| @bryntum/taskboard-thin    | Bryntum TaskBoard component package         |
| @bryntum/engine-thin       | Bryntum Scheduling engine component package |

Thin Vue 3 wrapper packages:

| Package                          | Purpose                                        |
|----------------------------------|------------------------------------------------|
| @bryntum/core-vue-3-thin         | Bryntum Core UI widgets Vue 3 wrappers package |
| @bryntum/grid-vue-3-thin         | Bryntum Grid Vue 3 wrapper package             |
| @bryntum/scheduler-vue-3-thin    | Bryntum Scheduler Vue 3 wrapper package        |
| @bryntum/schedulerpro-vue-3-thin | Bryntum Scheduler Pro Vue 3 wrapper package    |
| @bryntum/gantt-vue-3-thin        | Bryntum Gantt Vue 3 wrapper package            |
| @bryntum/calendar-vue-3-thin     | Bryntum Calendar Vue 3 wrapper package         |
| @bryntum/taskboard-vue-3-thin    | Bryntum TaskBoard Vue 3 wrapper package        |

<div class="note">

Please note that thin packages are available for licensed products only. Each product is licensed separately.

</div>

## Package dependencies

Each package contains code related to the specific product only and requires installing dependency packages for
all underlying products. This is not done automatically to give you full control over the installed packages.

List of required `dependencies` used in **package.json** for Vue application:

<div class="docs-tabs" data-name="multiproduct">
<div>
    <a>Grid</a>
    <a>Scheduler</a>
    <a>Scheduler Pro</a>
    <a>Gantt</a>
    <a>Calendar</a>
    <a>TaskBoard</a>
</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-vue-3-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/grid-vue-3-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-vue-3-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11",
    "@bryntum/scheduler-vue-3-thin": "5.6.11",
    "@bryntum/scheduler-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-vue-3-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11",
    "@bryntum/scheduler-thin": "5.6.11",
    "@bryntum/schedulerpro-vue-3-thin": "5.6.11",
    "@bryntum/schedulerpro-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-vue-3-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/gantt-vue-3-thin": "5.6.11",
    "@bryntum/gantt-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11",
    "@bryntum/scheduler-thin": "5.6.11",
    "@bryntum/schedulerpro-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/calendar-vue-3-thin": "5.6.11",
    "@bryntum/calendar-thin": "5.6.11",
    "@bryntum/core-vue-3-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11",
    "@bryntum/scheduler-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-vue-3-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/taskboard-vue-3-thin": "5.6.11",
    "@bryntum/taskboard-thin": "5.6.11"
  }
}
```
</div>
</div>

<div class="note">

<code>@bryntum/core-vue-3-thin</code> package includes Bryntum base UI widgets like <code>BryntumButton</code> and others
<a href="#Scheduler/guides/integration/vue/guide.md#wrappers-overview">listed here</a>. It is not required to install it if
you don't use any of them in your application.

</div>

## Product configuration

Importing product configuration for Vue application **app.config.tsx**:

<div class="docs-tabs" data-name="multiproduct">
<div>
    <a>Grid</a>
    <a>Scheduler</a>
    <a>Scheduler Pro</a>
    <a>Gantt</a>
    <a>Calendar</a>
    <a>TaskBoard</a>
</div>
<div>

```typescript
import { BryntumGridProps } from '@bryntum/grid-vue-3-thin';

const gridConfig : Partial<BryntumGridProps> = {
    // Grid configuration
};
```

</div>
<div>

```typescript
import { BryntumSchedulerProps } from '@bryntum/scheduler-vue-3-thin';

const schedulerConfig : Partial<BryntumSchedulerProps> = {
    // Scheduler configuration
};
```

</div>
<div>

```typescript
import { BryntumSchedulerProProps } from '@bryntum/schedulerpro-vue-3-thin';

const schedulerProConfig : Partial<BryntumSchedulerProProps> = {
    // Scheduler Pro configuration
};
```

</div>
<div>

```typescript
import { BryntumGanttProps } from '@bryntum/gantt-vue-3-thin';

const ganttConfig : Partial<BryntumGanttProps> = {
    // Gantt configuration
};
```

</div>
<div>

```typescript
import { BryntumCalendarProps } from '@bryntum/calendar-vue-3-thin';

const calendarConfig : Partial<BryntumCalendarProps> = {
    // Calendar configuration
};
```

</div>
<div>

```typescript
import { BryntumTaskBoardProps } from '@bryntum/taskboard-vue-3-thin';

const taskBoardConfig : Partial<TaskBoardConfigBryntumTaskBoardProps> = {
    // TaskBoard configuration
};
```
</div>
</div>

## Product styling

List of required styles for Vue application **App.scss**:

<div class="docs-tabs" data-name="multiproduct">
<div>
    <a>Grid</a>
    <a>Scheduler</a>
    <a>Scheduler Pro</a>
    <a>Gantt</a>
    <a>Calendar</a>
    <a>TaskBoard</a>
</div>
<div>

<strong>SCSS:</strong>

```scss
@import '@bryntum/core-thin/sass/themes/stockholm.scss';
@import '@bryntum/grid-thin/sass/themes/stockholm.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/grid-thin/grid.stockholm.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
@import '@bryntum/core-thin/sass/themes/stockholm.scss';
@import '@bryntum/grid-thin/sass/themes/stockholm.scss';
@import '@bryntum/scheduler-thin/sass/themes/stockholm.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/grid-thin/grid.stockholm.css';
@import '@bryntum/scheduler-thin/scheduler.stockholm.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
@import '@bryntum/core-thin/sass/themes/stockholm.scss';
@import '@bryntum/grid-thin/sass/themes/stockholm.scss';
@import '@bryntum/scheduler-thin/sass/themes/stockholm.scss';
@import '@bryntum/schedulerpro-thin/sass/themes/stockholm.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/grid-thin/grid.stockholm.css';
@import '@bryntum/scheduler-thin/scheduler.stockholm.css';
@import '@bryntum/schedulerpro-thin/schedulerpro.stockholm.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
@import '@bryntum/core-thin/sass/themes/stockholm.scss';
@import '@bryntum/grid-thin/sass/themes/stockholm.css';
@import '@bryntum/scheduler-thin/sass/themes/stockholm.scss';
@import '@bryntum/schedulerpro-thin/sass/themes/stockholm.scss';
@import '@bryntum/gantt-thin/sass/themes/stockholm.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/grid-thin/grid.stockholm.css';
@import '@bryntum/scheduler-thin/scheduler.stockholm.css';
@import '@bryntum/schedulerpro-thin/schedulerpro.stockholm.css';
@import '@bryntum/gantt-thin/gantt.stockholm.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
@import '@bryntum/core-thin/sass/themes/stockholm.scss';
@import '@bryntum/grid-thin/sass/themes/stockholm.scss';
@import '@bryntum/scheduler-thin/sass/themes/stockholm.scss';
@import '@bryntum/calendar-thin/sass/themes/stockholm.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/grid-thin/grid.stockholm.css';
@import '@bryntum/scheduler-thin/scheduler.stockholm.css';
@import '@bryntum/calendar-thin/calendar.stockholm.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
@import '@bryntum/core-thin/sass/themes/stockholm.scss';
@import '@bryntum/taskboard-thin/sass/themes/stockholm.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/taskboard-thin/taskboard.stockholm.css';
```
</div>
</div>

## Product template

Example of configuring product template for Vue application **App.vue**:

<div class="docs-tabs" data-name="multiproduct">
<div>
    <a>Grid</a>
    <a>Scheduler</a>
    <a>Scheduler Pro</a>
    <a>Gantt</a>
    <a>Calendar</a>
    <a>TaskBoard</a>
</div>
<div>

```typescript
<script setup>
import { createApp, ref } from 'vue';

import { BryntumGrid } from '@bryntum/grid-vue-3-thin';
import { gridConfig } from './app.config';

import './App.scss';

createApp({
});
</script>

<template>
    <bryntum-grid
        v-bind="gridConfig"
    />
</template>

<style lang="scss">
</style>
```

</div>
<div>

```typescript
<script setup>
import { createApp, ref } from 'vue';

import { BryntumScheduler } from '@bryntum/scheduler-vue-3-thin';
import { schedulerConfig } from './app.config';

import './App.scss';

createApp({
});
</script>

<template>
    <bryntum-scheduler
        v-bind="schedulerConfig"
    />
</template>

<style lang="scss">
</style>
```

</div>
<div>

```typescript
<script setup>
import { createApp, ref } from 'vue';

import { BryntumSchedulerPro, BryntumSchedulerProProjectModel } from '@bryntum/schedulerpro-vue-3-thin';
import { schedulerProProjectConfig, schedulerProConfig } from './configs/schedulerrpo';

import './App.scss';

const schedulerProProject = ref(null);

createApp({
    setup() {
        return {
            schedulerProProject
        };
    }
});
</script>

<template>
    <bryntum-scheduler-pro-project-model
        ref="schedulerProProject"
        v-bind="schedulerProProjectConfig"
    />
    <bryntum-scheduler-pro
        :project="schedulerProProject"
        v-bind="schedulerProConfig"
    />
</template>

<style lang="scss">
</style>
```

<p>
Using <code>bryntum-scheduler-pro-project-model</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>project</code> prop, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>

</div>
<div>

```typescript
<script setup>
import { createApp, ref } from 'vue';

import { BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-vue-3-thin';
import { ganttConfig, ganttProjectConfig } from './app.config';

import './App.scss';

const ganttProject = ref(null);

createApp({
    setup() {
        return {
            ganttProject
        };
    }
});
</script>

<template>
    <bryntum-gantt-project-model
        ref="ganttProject"
        v-bind="ganttProjectConfig"
    />
    <bryntum-gantt
        :project="ganttProject"
        v-bind="ganttConfig"
    />
</template>

<style lang="scss">
</style>
```

<p>
Using <code>bryntum-gantt-pro-project-model</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>project</code> prop, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>

</div>
<div>

```typescript
<script setup>
import { createApp, ref } from 'vue';

import { BryntumCalendar } from '@bryntum/calendar-vue-3-thin';
import { calendarConfig } from './app.config';

import './App.scss';

createApp({
});
</script>

<template>
    <bryntum-calendar
        v-bind="calendarConfig"
    />
</template>

<style lang="scss">
</style>
```

</div>
<div>

```typescript
<script setup>
import { createApp, ref } from 'vue';

import { BryntumTaskBoard, BryntumTaskBoardProjectModel } from '@bryntum/taskboard-vue-3-thin';
import { taskBoardProjectConfig, taskBoardConfig } from './app.config';

import './App.scss';

const taskBoardProject = ref(null);

createApp({
    setup() {
        return {
            taskBoardProject
        };
    }
});
</script>

<template>
    <bryntum-task-board-project-model
        ref="taskBoardProject"
        v-bind="taskBoardProjectConfig"
    />
    <bryntum-task-board
        :project="taskBoardProject"
        v-bind="taskBoardConfig"
    />

</template>

<style lang="scss">
</style>
```

<p>
Using <code>bryntum-task-board-pro-project-model</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>project</code> prop, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>
</div>
</div>



<p class="last-modified">Last modified on 2024-05-21 9:20:05</p>