# Combining multiple Bryntum products

## Thin packages overview

Bryntum's products share the same data model and can be combined to provide different views of the underlying data.

When combining multiple Bryntum products in a single application using Ionic + Angular, you should use thin npm
packages. This avoids runtime errors and also reduces the amount of code and CSS that has to be downloaded.

The main difference between thin packages and regular packages is that thin only contain product specific code and
styling, while regular contain code and styling for all underlying products (for example Scheduler includes Scheduler +
Grid + Core). Thin packages are valid for building a single product application.

<div class="note">

It is not possible to import several regular (non-thin) Bryntum npm packages like <code>@bryntum/grid</code> and
<code>@bryntum/calendar</code> in one application. Doing this will lead to a runtime console error:

```shell
The Bryntum SchedulerPro bundle was loaded multiple times by the application.
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

Thin Angular wrapper packages:

| Package                            | Purpose                                          |
|------------------------------------|--------------------------------------------------|
| @bryntum/core-angular-thin         | Bryntum Core UI widgets Angular wrappers package |
| @bryntum/grid-angular-thin         | Bryntum Grid Angular wrapper package             |
| @bryntum/scheduler-angular-thin    | Bryntum Scheduler Angular wrapper package        |
| @bryntum/schedulerpro-angular-thin | Bryntum Scheduler Pro Angular wrapper package    |
| @bryntum/gantt-angular-thin        | Bryntum Gantt Angular wrapper package            |
| @bryntum/calendar-angular-thin     | Bryntum Calendar Angular wrapper package         |
| @bryntum/taskboard-angular-thin    | Bryntum TaskBoard Angular wrapper package        |

<div class="note">

Please note that thin packages are available for licensed products only. Each product is licensed separately.

</div>

## Package dependencies

Each package contains code related to the specific product only and requires installing a dependency packages for
all underlying products. This is not done automatically to give you full control over the installed packages.

List of required `dependencies` used in **package.json** for Ionic + Angular application:

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
    "@bryntum/core-angular-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/grid-angular-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-angular-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11",
    "@bryntum/scheduler-angular-thin": "5.6.11",
    "@bryntum/scheduler-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-angular-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/grid-thin": "5.6.11",
    "@bryntum/scheduler-thin": "5.6.11",
    "@bryntum/schedulerpro-angular-thin": "5.6.11",
    "@bryntum/schedulerpro-thin": "5.6.11"
  }
}
```

</div>
<div>

```json
{
  "dependencies": {
    "@bryntum/core-angular-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/gantt-angular-thin": "5.6.11",
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
    "@bryntum/calendar-angular-thin": "5.6.11",
    "@bryntum/calendar-thin": "5.6.11",
    "@bryntum/core-angular-thin": "5.6.11",
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
    "@bryntum/core-angular-thin": "5.6.11",
    "@bryntum/core-thin": "5.6.11",
    "@bryntum/engine-thin": "5.6.11",
    "@bryntum/taskboard-angular-thin": "5.6.11",
    "@bryntum/taskboard-thin": "5.6.11"
  }
}
```
</div>
</div>

<div class="note">

<code>@bryntum/core-angular-thin</code> package includes Bryntum base UI widgets like <code>bryntum-button</code> and others
<a href="#SchedulerPro/guides/integration/angular/guide.md#wrappers-overview">listed here</a>. It is not required to install it if
you don't use any of them in your application.

</div>

## Modules configuration

Importing package module for Ionic + Angular application **app.module.ts**:

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
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BryntumCoreModule } from '@bryntum/core-angular-thin';
import { BryntumGridModule } from '@bryntum/grid-angular-thin';

import { AppComponent } from './app.component';

@NgModule({
    declarations : [
        AppComponent
    ],
    imports      : [
        BrowserModule,
        BryntumCoreModule,
        BryntumGridModule
    ],
    providers    : [],
    bootstrap    : [AppComponent]
})
export class AppModule {}
```

</div>
<div>

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BryntumCoreModule } from '@bryntum/core-angular-thin';
import { BryntumGridModule } from '@bryntum/grid-angular-thin';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular-thin';

import { AppComponent } from './app.component';

@NgModule({
    declarations : [
        AppComponent
    ],
    imports      : [
        BrowserModule,
        BryntumCoreModule,
        BryntumGridModule,
        BryntumSchedulerModule
    ],
    providers    : [],
    bootstrap    : [AppComponent]
})
export class AppModule {}
```

</div>
<div>

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BryntumCoreModule } from '@bryntum/core-angular-thin';
import { BryntumGridModule } from '@bryntum/grid-angular-thin';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular-thin';
import { BryntumSchedulerProModule } from '@bryntum/schedulerpro-angular-thin';

import { AppComponent } from './app.component';

@NgModule({
    declarations : [
        AppComponent
    ],
    imports      : [
        BrowserModule,
        BryntumCoreModule,
        BryntumGridModule,
        BryntumSchedulerModule,
        BryntumSchedulerProModule
    ],
    providers    : [],
    bootstrap    : [AppComponent]
})
export class AppModule {}
```

</div>
<div>

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BryntumCoreModule } from '@bryntum/core-angular-thin';
import { BryntumGridModule } from '@bryntum/grid-angular-thin';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular-thin';
import { BryntumSchedulerProModule } from '@bryntum/schedulerpro-angular-thin';
import { BryntumGanttModule } from '@bryntum/gantt-angular-thin';

import { AppComponent } from './app.component';

@NgModule({
    declarations : [
        AppComponent
    ],
    imports      : [
        BrowserModule,
        BryntumCoreModule,
        BryntumGridModule,
        BryntumSchedulerModule,
        BryntumSchedulerProModule,
        BryntumGanttModule
    ],
    providers    : [],
    bootstrap    : [AppComponent]
})
export class AppModule {}
```

</div>
<div>

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BryntumCoreModule } from '@bryntum/core-angular-thin';
import { BryntumGridModule } from '@bryntum/grid-angular-thin';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular-thin';
import { BryntumCalendarModule } from '@bryntum/calendar-angular-thin';

import { AppComponent } from './app.component';

@NgModule({
    declarations : [
        AppComponent
    ],
    imports      : [
        BrowserModule,
        BryntumCoreModule,
        BryntumGridModule,
        BryntumSchedulerModule,
        BryntumCalendarModule
    ],
    providers    : [],
    bootstrap    : [AppComponent]
})
export class AppModule {}
```

</div>
<div>

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BryntumCoreModule } from '@bryntum/core-angular-thin';
import { BryntumTaskBoardModule } from '@bryntum/taskboard-angular-thin';

import { AppComponent } from './app.component';

@NgModule({
    declarations : [
        AppComponent
    ],
    imports      : [
        BrowserModule,
        BryntumCoreModule,
        BryntumTaskBoardModule
    ],
    providers    : [],
    bootstrap    : [AppComponent]
})
export class AppModule {}
```
</div>
</div>

## Product configuration

Importing product configuration for Ionic + Angular application **app.component.ts**:

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
import { GridConfig } from '@bryntum/grid-thin';

const gridConfig : Partial<GridConfig> = {
    // Grid configuration
};
```

</div>
<div>

```typescript
import { SchedulerConfig } from '@bryntum/scheduler-thin';

const schedulerConfig : Partial<SchedulerConfig> = {
    // Scheduler configuration
};
```

</div>
<div>

```typescript
import { SchedulerProConfig } from '@bryntum/schedulerpro-thin';

const schedulerProConfig : Partial<SchedulerProConfig> = {
    // Scheduler Pro configuration
};
```

</div>
<div>

```typescript
import { GanttConfig } from '@bryntum/gantt-thin';

const ganttConfig : Partial<GanttConfig> = {
    // Gantt configuration
};
```

</div>
<div>

```typescript
import { CalendarConfig } from '@bryntum/calendar-thin';

const calendarConfig : Partial<CalendarConfig> = {
    // Calendar configuration
};
```

</div>
<div>

```typescript
import { TaskBoardConfig } from '@bryntum/taskboard-thin';

const taskBoardConfig : Partial<TaskBoardConfig> = {
    // TaskBoard configuration
};
```
</div>
</div>

## Product styling

List of required styles for Ionic + Angular application **app.component.scss**:

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
// Setup font locations for Angular CSS preprocessor
$fa-font-path  : '../../fonts';
$roboto-font-path : '../../../fonts';

@import '@bryntum/core-thin/sass/themes/material.scss';
@import '@bryntum/grid-thin/sass/themes/material.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.material.css';
@import '@bryntum/grid-thin/grid.material.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
// Setup font locations for Angular CSS preprocessor
$fa-font-path  : '../../fonts';
$roboto-font-path : '../../../fonts';

@import '@bryntum/core-thin/sass/themes/material.scss';
@import '@bryntum/grid-thin/sass/themes/material.scss';
@import '@bryntum/scheduler-thin/sass/themes/material.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.material.css';
@import '@bryntum/grid-thin/grid.material.css';
@import '@bryntum/scheduler-thin/scheduler.material.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
// Setup font locations for Angular CSS preprocessor
$fa-font-path  : '../../fonts';
$roboto-font-path : '../../../fonts';

@import '@bryntum/core-thin/sass/themes/material.scss';
@import '@bryntum/grid-thin/sass/themes/material.scss';
@import '@bryntum/scheduler-thin/sass/themes/material.scss';
@import '@bryntum/schedulerpro-thin/sass/themes/material.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.material.css';
@import '@bryntum/grid-thin/grid.material.css';
@import '@bryntum/scheduler-thin/scheduler.material.css';
@import '@bryntum/schedulerpro-thin/schedulerpro.material.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
// Setup font locations for Angular CSS preprocessor
$fa-font-path  : '../../fonts';
$roboto-font-path : '../../../fonts';

@import '@bryntum/core-thin/sass/themes/material.scss';
@import '@bryntum/grid-thin/sass/themes/material.css';
@import '@bryntum/scheduler-thin/sass/themes/material.scss';
@import '@bryntum/schedulerpro-thin/sass/themes/material.scss';
@import '@bryntum/gantt-thin/sass/themes/material.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.material.css';
@import '@bryntum/grid-thin/grid.material.css';
@import '@bryntum/scheduler-thin/scheduler.material.css';
@import '@bryntum/schedulerpro-thin/schedulerpro.material.css';
@import '@bryntum/gantt-thin/gantt.material.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
// Setup font locations for Angular CSS preprocessor
$fa-font-path  : '../../fonts';
$roboto-font-path : '../../../fonts';

@import '@bryntum/core-thin/sass/themes/material.scss';
@import '@bryntum/grid-thin/sass/themes/material.scss';
@import '@bryntum/scheduler-thin/sass/themes/material.scss';
@import '@bryntum/calendar-thin/sass/themes/material.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.material.css';
@import '@bryntum/grid-thin/grid.material.css';
@import '@bryntum/scheduler-thin/scheduler.material.css';
@import '@bryntum/calendar-thin/calendar.material.css';
```

</div>
<div>

<strong>SCSS:</strong>

```scss
// Setup font locations for Angular CSS preprocessor
$fa-font-path  : '../../fonts';
$roboto-font-path : '../../../fonts';

@import '@bryntum/core-thin/sass/themes/material.scss';
@import '@bryntum/taskboard-thin/sass/themes/material.scss';
```

<strong>CSS:</strong>

```scss
@import '@bryntum/core-thin/core.material.css';
@import '@bryntum/taskboard-thin/taskboard.material.css';
```
</div>
</div>

## Product template

Example of configuring product template for Ionic + Angular application **app.component.html**:

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
<bryntum-grid
    #grid
    ...
></bryntum-grid>
```

</div>
<div>

```html
<bryntum-scheduler
    #scheduler
    ...
></bryntum-scheduler>
```

</div>
<div>

```html
<bryntum-scheduler-pro-project-model
    #schedulerProProject
    ...
></bryntum-scheduler-pro-project-model>
<bryntum-scheduler-pro
    #schedulerpro
    [project]="schedulerProProject"
    ...
></bryntum-scheduler-pro>
```

<p>
Using <code>bryntum-scheduler-pro-project-model</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>[project]</code> property, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>

</div>
<div>

```html
<bryntum-gantt-project-model
    #ganttProject
    ...
></bryntum-gantt-project-model>
<bryntum-gantt
    #gantt
    [project]="ganttProject!"
    ...
></bryntum-gantt>
```

<p>
Using <code>bryntum-gantt-pro-project-model</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>[project]</code> property, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>

</div>
<div>

```html
<bryntum-calendar
    #calendar
    ...
></bryntum-calendar>
```

</div>
<div>

```html
<bryntum-task-board-project-model
    #taskBoardProject
    ...
></bryntum-task-board-project-model>
<bryntum-task-board
    #taskboard
    [project]="taskBoardProject"
    ...
></bryntum-task-board>
```

<p>
Using <code>bryntum-task-board-pro-project-model</code> is not obligatory, you can also configure the project by supplying a
configuration object to the <code>[project]</code> property, or leave it out fully and supply data in other ways. Using the project
component is only required when you want to share the full project between multiple products.
</p>
</div>
</div>



<p class="last-modified">Last modified on 2024-05-21 9:33:30</p>