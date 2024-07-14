# Combining multiple Bryntum products

## Thin packages overview

Bryntum's products share the same data model and can be combined to provide different views of the underlying data.

When combining multiple Bryntum products in a single application using React, you should use thin npm packages. This
avoids runtime errors and also reduces the amount of code and CSS that has to be downloaded.

The main difference between thin packages and regular packages is that thin only contain product specific code and
styling, while regular contain code and styling for all underlying products (for example Scheduler includes Scheduler +
Grid + Core). Thin packages are valid for building a single product application.

<div class="note">

It is not possible to import several regular (non-thin) Bryntum npm packages like <code>@bryntum/grid</code> and
<code>@bryntum/calendar</code> in one application. Doing this will lead to a runtime console error:

```shell
The Bryntum Core bundle was loaded multiple times by the application.
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

Thin React wrapper packages:

| Package                          | Purpose                                        |
|----------------------------------|------------------------------------------------|
| @bryntum/core-react-thin         | Bryntum Core UI widgets React wrappers package |
| @bryntum/grid-react-thin         | Bryntum Grid React wrapper package             |
| @bryntum/scheduler-react-thin    | Bryntum Scheduler React wrapper package        |
| @bryntum/schedulerpro-react-thin | Bryntum Scheduler Pro React wrapper package    |
| @bryntum/gantt-react-thin        | Bryntum Gantt React wrapper package            |
| @bryntum/calendar-react-thin     | Bryntum Calendar React wrapper package         |
| @bryntum/taskboard-react-thin    | Bryntum TaskBoard React wrapper package        |

<div class="note">

Please note that thin packages are available for licensed products only. Each product is licensed separately.

</div>

## Package dependencies

Each package contains code related to the specific product only and requires installing dependency packages for
all underlying products. This is not done automatically to give you full control over the installed packages.

List of required `dependencies` used in **package.json** for React application:

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
    "@bryntum/core-react-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/grid-react-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-react-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11",
    "@bryntum/scheduler-react-thin": "5.6.11",
    "@bryntum/scheduler-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-react-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11",
    "@bryntum/scheduler-thin": "5.6.11",
    "@bryntum/schedulerpro-react-thin": "5.6.11",
    "@bryntum/schedulerpro-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-react-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/gantt-react-thin": "5.6.11",
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
    "@bryntum/calendar-react-thin": "5.6.11",
    "@bryntum/calendar-thin": "5.6.11",
    "@bryntum/core-react-thin": "5.6.11",
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
    "@bryntum/core-react-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/taskboard-react-thin": "5.6.11",
    "@bryntum/taskboard-thin": "5.6.11"
  }
}
```
</div>
</div>

<div class="note">

<code>@bryntum/core-react-thin</code> package includes Bryntum base UI widgets like <code>BryntumButton</code> and others
<a href="#Core/guides/integration/react/guide.md#wrappers-overview">listed here</a>. It is not required to install it if
you don't use any of them in your application.

</div>

## Product configuration

Importing product configuration for React application **app.config.tsx**:

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
import { BryntumGridProps } from '@bryntum/grid-react-thin';

const gridConfig : Partial<BryntumGridProps> = {
    // Grid configuration
};
```

</div>
<div>

```typescript
import { BryntumSchedulerProps } from '@bryntum/scheduler-react-thin';

const schedulerConfig : Partial<BryntumSchedulerProps> = {
    // Scheduler configuration
};
```

</div>
<div>

```typescript
import { BryntumSchedulerProProps } from '@bryntum/schedulerpro-react-thin';

const schedulerProConfig : Partial<BryntumSchedulerProProps> = {
    // Scheduler Pro configuration
};
```

</div>
<div>

```typescript
import { BryntumGanttProps } from '@bryntum/gantt-react-thin';

const ganttConfig : Partial<BryntumGanttProps> = {
    // Gantt configuration
};
```

</div>
<div>

```typescript
import { BryntumCalendarProps } from '@bryntum/calendar-react-thin';

const calendarConfig : Partial<BryntumCalendarProps> = {
    // Calendar configuration
};
```

</div>
<div>

```typescript
import { BryntumTaskBoardProps } from '@bryntum/taskboard-react-thin';

const taskBoardConfig : Partial<TaskBoardConfigBryntumTaskBoardProps> = {
    // TaskBoard configuration
};
```
</div>
</div>

## Product styling

List of required styles for React application **App.scss**:

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

Example of configuring product template for React application **App.tsx**:

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
import { Fragment, useEffect } from 'react';

import { BryntumGrid } from '@bryntum/grid-react-thin';

import { gridConfig } from './app.config';

import './App.scss';

function App() {

    useEffect(() => { });

    return (
        <Fragment>
            <BryntumGrid
                {...gridConfig}
            />
        </Fragment>
    );
}

export default App;
```

</div>
<div>

```typescript
import { Fragment,  useEffect } from 'react';

import { BryntumScheduler } from '@bryntum/scheduler-react-thin';

import { schedulerConfig } from './app.config';

import './App.scss';

function App() {

    useEffect(() => { });

    return (
        <Fragment>
            <BryntumScheduler
                {...schedulerConfig}
            />
        </Fragment>
    );
}

export default App;
```

</div>
<div>

```typescript
import { Fragment, useRef, useEffect } from 'react';

import { BryntumSchedulerPro, BryntumSchedulerProProjectModel } from '@bryntum/schedulerpro-react-thin';

import { schedulerProProjectConfig, schedulerProConfig } from './app.config';

import './App.scss';

function App() {

    const schedulerProProjectRef = useRef<BryntumSchedulerProProjectModel>(null);

    useEffect(() => { });

    return (
        <Fragment>
            <BryntumSchedulerProProjectModel
                ref={schedulerProProjectRef}
                {...schedulerProProjectConfig}
            />
            <BryntumSchedulerPro
                {...schedulerProConfig}
                project={schedulerProProjectRef}
            />
        </Fragment>
    );
}

export default App;
```

<p>
Using <code>BryntumSchedulerProProjectModel</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>project</code> prop, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>

</div>
<div>

```typescript
import { Fragment, useRef, useEffect } from 'react';

import { BryntumGrid } from '@bryntum/grid-react-thin';
import { BryntumScheduler } from '@bryntum/scheduler-react-thin';
import { BryntumSchedulerPro, BryntumSchedulerProProjectModel } from '@bryntum/schedulerpro-react-thin';
import { BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-react-thin';

import { ganttConfig, ganttProjectConfig } from './app.config';

import './App.scss';

function App() {

    const ganttProjectRef = useRef<BryntumGanttProjectModel>(null);

    useEffect(() => { });

    return (
        <Fragment>
            <BryntumGanttProjectModel
                ref={ganttProjectRef}
                {...ganttProjectConfig}
            />
            <BryntumGantt
                project={ganttProjectRef}
                {...ganttConfig}
            />
        </Fragment>
    );
}

export default App;
```

<p>
Using <code>BryntumGanttProjectModel</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>project</code> prop, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>

</div>
<div>

```typescript
import { Fragment, useEffect } from 'react';

import { BryntumCalendar } from '@bryntum/calendar-react-thin';
import { calendarConfig } from './app.config';

import './App.scss';

function App() {

    useEffect(() => { });

    return (
        <Fragment>
            <BryntumCalendar
                {...calendarConfig}
            />
        </Fragment>
    );
}

export default App;
```

</div>
<div>

```typescript
import { Fragment, useRef, useEffect } from 'react';

import { BryntumTaskBoard, BryntumTaskBoardProjectModel } from '@bryntum/taskboard-react-thin';

import { taskBoardProjectConfig, taskBoardConfig } from './app.config';

import './App.scss';

function App() {

    const taskBoardProjectRef = useRef<BryntumTaskBoardProjectModel>(null);

    useEffect(() => { });

    return (
        <Fragment>
            <BryntumTaskBoardProjectModel
                ref={taskBoardProjectRef}
                {...taskBoardProjectConfig}
            />
            <BryntumTaskBoard
                id={'taskboard'}
                {...taskBoardConfig}
                project={taskBoardProjectConfig}
            />
        </Fragment>
    );
}

export default App;
```

<p>
Using <code>BryntumTaskBoardProjectModel</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>project</code> prop, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>
</div>
</div>



<p class="last-modified">Last modified on 2024-05-21 9:10:47</p>