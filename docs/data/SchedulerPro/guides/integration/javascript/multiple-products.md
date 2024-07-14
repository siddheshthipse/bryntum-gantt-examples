# Combining multiple Bryntum products

## Thin packages overview

Bryntum products share the same data model and can be combined to provide different views of the underlying data.

When combining multiple Bryntum products in a single application using JavaScript, you should use thin npm packages. 
The main difference between thin packages and regular packages is that thin only contain product specific code and
styling, while regular contain code and styling for all underlying products (for example Scheduler includes Scheduler +
Grid + Core). Thin packages are also valid for building a single product application.

<div class="note">

It is not possible to import several regular (non-thin) Bryntum npm packages like <code>@bryntum/grid</code> and
<code>@bryntum/calendar</code> in one application. Doing this will lead to a runtime console error:

```shell
The Bryntum SchedulerPro bundle was loaded multiple times by the application.
```

</div>

## Thin packages list

Bryntum's npm repository contains thin packages for combining multiple Bryntum products in one application.

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

<div class="note">

Please note that thin packages are available for licensed products only. Each product is licensed separately.

</div>

## Package dependencies

Each package contains code related to the specific product only and requires installing dependency packages for
all underlying products. This is not done automatically to give you full control over the installed packages.

List of required `dependencies` used in `package.json` for JavaScript application:

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
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
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
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
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
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
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
    "@bryntum/calendar-thin": "5.6.11",
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
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/taskboard-thin": "5.6.11"
  }
}
```
</div>
</div>

## Product styling

List of required styles for JavaScript application `style.css/scss`:

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

For non-npm packages:

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

```html
<link rel="stylesheet" href="core.material.thin.css">
<link rel="stylesheet" href="grid.material.thin.css">
```

</div>
<div>

```html
<link rel="stylesheet" href="core.material.thin.css">
<link rel="stylesheet" href="grid.material.thin.css">
<link rel="stylesheet" href="scheduler.material.thin.css">
```

</div>
<div>

```html
<link rel="stylesheet" href="core.material.thin.css">
<link rel="stylesheet" href="grid.material.thin.css">
<link rel="stylesheet" href="scheduler.material.thin.css">
<link rel="stylesheet" href="schedulerpro.material.thin.css">
```

</div>
<div>

```html
<link rel="stylesheet" href="core.material.thin.css">
<link rel="stylesheet" href="grid.material.thin.css">
<link rel="stylesheet" href="scheduler.material.thin.css">
<link rel="stylesheet" href="schedulerpro.material.thin.css">
<link rel="stylesheet" href="gantt.material.thin.css">
```

</div>
<div>

<strong>SCSS:</strong>

```html
<link rel="stylesheet" href="core.material.thin.css">
<link rel="stylesheet" href="grid.material.thin.css">
<link rel="stylesheet" href="scheduler.material.thin.css">
<link rel="stylesheet" href="calendar.material.thin.css">
```

</div>
<div>

```html
<link rel="stylesheet" href="core.material.thin.css">
<link rel="stylesheet" href="taskboard.material.thin.css">
```
</div>
</div>

## Product template

Example of configuring product template for JavaScript application `main.js`:

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
import { Grid } from '@bryntum/grid-thin';
import './style.css';

const grid = new Grid({
    appendTo : 'app',
    columns  : [
        { field : 'name', text : 'Name', width : 200 },
        { field : 'city', text : 'City', flex : 1 }
    ],
    data : [
        { name : 'Dan Stevenson', city : 'Los Angeles' },
        { name : 'Talisha Babin', city : 'Paris' }
    ]
});
```

</div>
<div>

```typescript
import { Scheduler } from '@bryntum/scheduler-thin';
import './style.css';

const scheduler = new Scheduler({
    appendTo  : 'app',
    startDate : new Date(2022, 0, 1),
    endDate   : new Date(2022, 0, 10),
    columns   : [
        { text : 'Name', field : 'name', width : 160 }
    ],
    resources : [
        { id : 1, name : 'Dan Stevenson' },
        { id : 2, name : 'Talisha Babin' }
    ],
    events : [
        { resourceId : 1, startDate : '2022-01-01', endDate : '2022-01-10' },
        { resourceId : 2, startDate : '2022-01-02', endDate : '2022-01-09' }
    ]
});
```

</div>
<div>

```typescript
import { SchedulerPro } from '@bryntum/schedulerpro-thin';
import './style.css';

const schedulerPro = new SchedulerPro({
    appendTo  : 'app',
    startDate : new Date(2022, 0, 1),
    endDate   : new Date(2022, 0, 10),
    columns   : [
        { text : 'Name', field : 'name', width : 160 }
    ],
    project : {

        resourcesData : [
            { id : 1, name : 'Dan Stevenson' },
            { id : 2, name : 'Talisha Babin' }
        ],

        eventsData : [
            { id : 1, startDate : '2022-01-01', duration : 3, durationUnit : 'd', name : 'Event 1' },
            { id : 2, duration : 4, durationUnit : 'd', name : 'Event 2' }
        ],

        assignmentsData : [
            { event : 1, resource : 1 },
            { event : 2, resource : 2 }
        ],

        dependenciesData : [
            { fromEvent : 1, toEvent : 2 }
        ]
    }
});
```

</div>
<div>

```typescript
import { Gantt } from '@bryntum/gantt-thin';
import './style.css';

const gantt = new Gantt({
    appendTo  : 'app',
    startDate : new Date(2022, 0, 1),
    endDate   : new Date(2022, 0, 10),
    columns   : [
        { type : 'name', width : 160 }
    ],
    project : {

        tasksData : [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    { id : 2, name : 'Proof-read docs', startDate : '2022-01-02', endDate : '2022-01-09' },
                    { id : 3, name : 'Release docs', startDate : '2022-01-09', endDate : '2022-01-10' }
                ]
            }
        ],

        dependenciesData : [
            { fromTask : 2, toTask : 3 }
        ]
    }
});
```

</div>
<div>

```typescript
import { Calendar } from '@byntum/calendar-thin';

const calendar = new Calendar({

    appendTo : document.body,

    resources : [
        {
            id         : 1,
            name       : 'Default Calendar',
            eventColor : 'green'
        }
    ],
    events : [
        {
            id         : 1,
            name       : 'Meeting',
            startDate  : '2022-01-01T10:00:00',
            endDate    : '2022-01-01T11:00:00',
            resourceId : 1
        }
    ]
});
```

</div>
<div>

```typescript
import { TaskBoard } from '@bryntum/taskboard-thin';
import './style.css';

const taskBoard = new TaskBoard({
    appendTo    : 'app',
    columnField : 'status',
    columns     : [
        'todo',
        'doing',
        'done'
    ],
    project : {
        tasksData : [
            { id : 1, name : 'My first task', status : 'doing' },
            { id : 2, name : 'My second task', status : 'todo' }
        ]
    }
});
```
</div>
</div>

### Non-npm packages

If you're not using npm, you can use **module** or **UMD** bundles.

#### Thin module bundle

Similar to npm packages, thin module bundles contain code for one specific product, which means that it has a 
much smaller size, but you have to use multiple bundles to get anything working (Grid for example has to 
pull in the Core bundle to work). Here's an example:

```javascript
// Import 3 classes separately from different thin bundles
import { Store } from 'core.module.thin.js';
import { Grid } from 'grid.module.thin.js';
import { SchedulerPro } from 'schedulerpro.module.thin.js';

```

#### UMD bundle

The umd bundle (`scheduler.umd.js` importable as a good old script tag, exposes all classes globally) is to be 
considered legacy. Using it is not something we recommend unless your environment prevents you from using a more modern 
bundle. It will not allow you to combine multiple products very well. Below you find a snippet here for completeness:

```html
<!-- Script tag in your html file -->
<script src="scheduler.umd.js"></script>
```

```javascript
// No imports needed, classes are exposed to window.bryntum.scheduler
const { Store, Grid, SchedulerPro } = window.bryntum.scheduler;

```

## Combining products

You can combine multiple products and have them on the same page. For example, if you want to combine **Grid** 
and **Scheduler**, you can have them like the following:

```javascript
import { Grid } from "@bryntum/grid-thin";
import { Scheduler } from "@bryntum/scheduler-thin";
import "./style.css"; // import styles

const grid = new Grid({
  appendTo: "app",
  columns: [
    { field: "name", text: "Name", width: 200 },
    { field: "city", text: "City", flex: 1 },
  ],
  data: [
    { name: "Dan Stevenson", city: "Los Angeles" },
    { name: "Talisha Babin", city: "Paris" },
  ],
});

const scheduler = new Scheduler({
  appendTo: "app",
  startDate: new Date(2022, 0, 1),
  endDate: new Date(2022, 0, 10),
  columns: [{ text: "Name", field: "name", width: 160 }],
  resources: [
    { id: 1, name: "Dan Stevenson" },
    { id: 2, name: "Talisha Babin" },
  ],
  events: [
    { resourceId: 1, startDate: "2022-01-01", endDate: "2022-01-10" },
    { resourceId: 2, startDate: "2022-01-02", endDate: "2022-01-09" },
  ],
});
```

<p class="last-modified">Last modified on 2024-05-21 9:33:30</p>