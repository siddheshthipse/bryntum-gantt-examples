<h1 class="title-with-image"><img src="Core/logo/angular.svg" alt="Bryntum Gantt supports Angular"/>
Using Bryntum Gantt with Angular</h1>

## Requirements

Bryntum Gantt requires Angular `9.0.0` or higher,
and TypeScript `3.6.0` or higher. 

## Bryntum NPM repository access

Please refer to this [guide for Bryntum NPM repository access](#Gantt/guides/npm-repository.md).

## Bryntum Gantt

The Bryntum Gantt itself is framework agnostic, but it ships with demos and wrappers to simplify its use with popular
frameworks such as Angular. The purpose of this guide is to give you a basic introduction on how to use Bryntum Gantt
with Angular.

## View online demos

Bryntum Gantt Angular demos can be viewed in our [online example browser](https://bryntum.com/products/gantt/examples/?framework=angular).

## IVY and View Engine wrappers

Bryntum Gantt comes with two npm Angular wrapper packages to support different versions of Angular framework.

<div class="docs-tabs" data-name="angular">
<div>
    <a>IVY</a>
    <a>View Engine</a>
</div>
<div>

<code>@bryntum/gantt-angular</code> is designed to work with Angular 12 and newer versions, which use the IVY rendering
engine. It is <strong>recommended</strong> to use this package if possible. Follow these steps to use the package:

Install the package using npm:

```shell
npm install @bryntum/gantt-angular@5.6.11
```

Import the component in your Angular application:

```typescript
import { BryntumGanttComponent } from '@bryntum/gantt-angular';
```

</div>
<div>

<p>
<code>@bryntum/gantt-angular-view</code> is designed to work with Angular 11 and older versions, which use the View Engine
for rendering. If you are using one of the legacy Angular versions, you can follow these steps to use the
package:</p>

<p>Install the package using npm:</p>

```shell
npm install @bryntum/gantt-angular-view@5.6.11
```

<p>Import the component in your Angular application:</p>

```typescript
import { BryntumGanttComponent } from '@bryntum/gantt-angular-view';
```

<p>You may also install View Engine package with npm aliasing and import classes from <code>@bryntum/gantt-angular</code>:</p>

```shell
npm install @bryntum/gantt-angular@npm@bryntum/gantt-angular-view@5.6.11
```

<p>Import the component in your Angular application:</p>

```typescript
import { BryntumGanttComponent } from '@bryntum/gantt-angular';
```
</div>
</div>

<div class="note">

Do not forget to change wrapper package name accordingly when you import classes.

</div>

## Build and run local demos

Download distribution zip with demos according to this [guide](#Gantt/guides/download.md#distribution).

Angular demos are located in **examples/frameworks/angular** folder inside distribution zip.

Each demo contains bundled `README.md` file in demo folder with build and run instructions.

To view and run an example locally in development mode, you can use the following commands:

```shell
npm install
npm run start
```

That starts a local server accessible at [http://localhost:4200](http://localhost:4200). If
you modify the example code while running it locally it is automatically rebuilt and updated in the browser allowing you
to see your changes immediately.

The production version of an example, or your application, is built by running:

```shell
npm install
npm run build
```

The built version is then located in `dist` sub-folder which contains the compiled code that can be deployed to your
production server.

The demos have been created with [Angular CLI](https://cli.angular.io/)</a>
by `ng new [example-name]` and then implemented using the Bryntum Gantt wrappers. You can refer to an example while
studying this guide to get more information on the implementation.

## TypeScript and Typings

Bryntum bundles ship with typings for the classes for usage in TypeScript applications. You can find `gantt*.d.ts`
files in the `build` folder inside the distribution zip package. The definitions also contain a special config type
which can be passed to the class constructor.

The config specific types are also accepted by multiple other properties and functions, for example
the [Store.data](#Core/data/Store#config-data) config of the `Store` which accepts type `Partial<ModelConfig>[]`.

Sample code for tree store creation with `ModelConfig` and `StoreConfig` classes:

```typescript
import { Store, StoreConfig, ModelConfig } from '@bryntum/gantt';

const storeConfig: Partial<StoreConfig> = {
    tree : true,
    data : [
        {
            id       : 1,
            children : [
                {
                    id : 2
                }
            ] as Partial<ModelConfig>[]
        }
    ] as Partial<ModelConfig>[]
};

new Store(storeConfig);
```

## Wrappers

The Angular wrappers encapsulate Bryntum Gantt and other Bryntum widgets in Angular components that expose
configuration options, properties, features and events. The wrapped all Bryntum UI components so they can be used the
usual Angular way.

To use native API package classes with wrappers import them from `@bryntum/gantt`.

```typescript
import { Gantt } from '@bryntum/gantt';
```

### Installing the wrappers package

The wrappers are distributed as a separate package `@bryntum/gantt-angular` that is installed according to the used
package manager. Please refer to this [guide for Bryntum NPM repository access](#Gantt/guides/npm-repository.md).

### Wrappers Overview

Wrappers are Angular components which provide full access to Bryntum API widget class configs, properties, events and
features. Each Wrapper has it's own HTML tag which can be used in angular templates. This is the list of available
wrappers for Bryntum Gantt Angular package:

| Wrapper tag name                                   | API widget reference                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------------------------- |
| &lt;bryntum-assignment-field/&gt;                  | [AssignmentField](#Gantt/widget/AssignmentField)                                      |
| &lt;bryntum-assignment-grid/&gt;                   | [AssignmentGrid](#Gantt/widget/AssignmentGrid)                                        |
| &lt;bryntum-button/&gt;                            | [Button](#Core/widget/Button)                                                         |
| &lt;bryntum-button-group/&gt;                      | [ButtonGroup](#Core/widget/ButtonGroup)                                               |
| &lt;bryntum-calendar-field/&gt;                    | [CalendarField](#SchedulerPro/widget/CalendarField)                                   |
| &lt;bryntum-calendar-picker/&gt;                   | [CalendarPicker](#Gantt/widget/CalendarPicker)                                        |
| &lt;bryntum-checkbox/&gt;                          | [Checkbox](#Core/widget/Checkbox)                                                     |
| &lt;bryntum-chip-view/&gt;                         | [ChipView](#Core/widget/ChipView)                                                     |
| &lt;bryntum-color-field/&gt;                       | [ColorField](#Core/widget/ColorField)                                                 |
| &lt;bryntum-color-picker/&gt;                      | [ColorPicker](#Core/widget/ColorPicker)                                               |
| &lt;bryntum-combo/&gt;                             | [Combo](#Core/widget/Combo)                                                           |
| &lt;bryntum-constraint-type-picker/&gt;            | [ConstraintTypePicker](#SchedulerPro/widget/ConstraintTypePicker)                     |
| &lt;bryntum-container/&gt;                         | [Container](#Core/widget/Container)                                                   |
| &lt;bryntum-cycle-resolution-popup/&gt;            | [CycleResolutionPopup](#SchedulerPro/widget/CycleResolutionPopup)                     |
| &lt;bryntum-date-field/&gt;                        | [DateField](#Core/widget/DateField)                                                   |
| &lt;bryntum-date-picker/&gt;                       | [DatePicker](#Core/widget/DatePicker)                                                 |
| &lt;bryntum-date-time-field/&gt;                   | [DateTimeField](#Core/widget/DateTimeField)                                           |
| &lt;bryntum-dependency-field/&gt;                  | [DependencyField](#Gantt/widget/DependencyField)                                      |
| &lt;bryntum-dependency-type-picker/&gt;            | [DependencyTypePicker](#SchedulerPro/widget/DependencyTypePicker)                     |
| &lt;bryntum-display-field/&gt;                     | [DisplayField](#Core/widget/DisplayField)                                             |
| &lt;bryntum-duration-field/&gt;                    | [DurationField](#Core/widget/DurationField)                                           |
| &lt;bryntum-effort-field/&gt;                      | [EffortField](#SchedulerPro/widget/EffortField)                                       |
| &lt;bryntum-end-date-field/&gt;                    | [EndDateField](#SchedulerPro/widget/EndDateField)                                     |
| &lt;bryntum-event-color-field/&gt;                 | [EventColorField](#Scheduler/widget/EventColorField)                                  |
| &lt;bryntum-event-color-picker/&gt;                | [EventColorPicker](#Scheduler/widget/EventColorPicker)                                |
| &lt;bryntum-field-filter-picker/&gt;               | [FieldFilterPicker](#Core/widget/FieldFilterPicker)                                   |
| &lt;bryntum-field-filter-picker-group/&gt;         | [FieldFilterPickerGroup](#Core/widget/FieldFilterPickerGroup)                         |
| &lt;bryntum-file-field/&gt;                        | [FileField](#Core/widget/FileField)                                                   |
| &lt;bryntum-file-picker/&gt;                       | [FilePicker](#Core/widget/FilePicker)                                                 |
| &lt;bryntum-filter-field/&gt;                      | [FilterField](#Core/widget/FilterField)                                               |
| &lt;bryntum-gantt/&gt;                             | [Gantt](#Gantt/view/Gantt)                                                            |
| &lt;bryntum-gantt-base/&gt;                        | [GanttBase](#Gantt/view/GanttBase)                                                    |
| &lt;bryntum-gantt-task-editor/&gt;                 | [GanttTaskEditor](#SchedulerPro/widget/GanttTaskEditor)                               |
| &lt;bryntum-grid/&gt;                              | [Grid](#Grid/view/Grid)                                                               |
| &lt;bryntum-grid-base/&gt;                         | [GridBase](#Grid/view/GridBase)                                                       |
| &lt;bryntum-grid-field-filter-picker/&gt;          | [GridFieldFilterPicker](#Grid/widget/GridFieldFilterPicker)                           |
| &lt;bryntum-grid-field-filter-picker-group/&gt;    | [GridFieldFilterPickerGroup](#Grid/widget/GridFieldFilterPickerGroup)                 |
| &lt;bryntum-group-bar/&gt;                         | [GroupBar](#Grid/widget/GroupBar)                                                     |
| &lt;bryntum-label/&gt;                             | [Label](#Core/widget/Label)                                                           |
| &lt;bryntum-list/&gt;                              | [List](#Core/widget/List)                                                             |
| &lt;bryntum-menu/&gt;                              | [Menu](#Core/widget/Menu)                                                             |
| &lt;bryntum-model-combo/&gt;                       | [ModelCombo](#SchedulerPro/widget/ModelCombo)                                         |
| &lt;bryntum-number-field/&gt;                      | [NumberField](#Core/widget/NumberField)                                               |
| &lt;bryntum-paging-toolbar/&gt;                    | [PagingToolbar](#Core/widget/PagingToolbar)                                           |
| &lt;bryntum-panel/&gt;                             | [Panel](#Core/widget/Panel)                                                           |
| &lt;bryntum-password-field/&gt;                    | [PasswordField](#Core/widget/PasswordField)                                           |
| &lt;bryntum-project-combo/&gt;                     | [ProjectCombo](#Scheduler/widget/ProjectCombo)                                        |
| &lt;bryntum-gantt-project-model/&gt;               | [ProjectModel](#Gantt/model/ProjectModel)                                             |
| &lt;bryntum-radio/&gt;                             | [Radio](#Core/widget/Radio)                                                           |
| &lt;bryntum-radio-group/&gt;                       | [RadioGroup](#Core/widget/RadioGroup)                                                 |
| &lt;bryntum-resource-combo/&gt;                    | [ResourceCombo](#Scheduler/widget/ResourceCombo)                                      |
| &lt;bryntum-resource-filter/&gt;                   | [ResourceFilter](#Scheduler/widget/ResourceFilter)                                    |
| &lt;bryntum-resource-header/&gt;                   | [ResourceHeader](#Scheduler/view/ResourceHeader)                                      |
| &lt;bryntum-resource-histogram/&gt;                | [ResourceHistogram](#SchedulerPro/view/ResourceHistogram)                             |
| &lt;bryntum-resource-utilization/&gt;              | [ResourceUtilization](#SchedulerPro/view/ResourceUtilization)                         |
| &lt;bryntum-scheduler/&gt;                         | [Scheduler](#Scheduler/view/Scheduler)                                                |
| &lt;bryntum-scheduler-base/&gt;                    | [SchedulerBase](#Scheduler/view/SchedulerBase)                                        |
| &lt;bryntum-scheduler-date-picker/&gt;             | [SchedulerDatePicker](#Scheduler/widget/SchedulerDatePicker)                          |
| &lt;bryntum-scheduler-pro/&gt;                     | [SchedulerPro](#SchedulerPro/view/SchedulerPro)                                       |
| &lt;bryntum-scheduler-pro-base/&gt;                | [SchedulerProBase](#SchedulerPro/view/SchedulerProBase)                               |
| &lt;bryntum-scheduler-task-editor/&gt;             | [SchedulerTaskEditor](#SchedulerPro/widget/SchedulerTaskEditor)                       |
| &lt;bryntum-scheduling-direction-picker/&gt;       | [SchedulingDirectionPicker](#SchedulerPro/widget/SchedulingDirectionPicker)           |
| &lt;bryntum-scheduling-issue-resolution-popup/&gt; | [SchedulingIssueResolutionPopup](#SchedulerPro/widget/SchedulingIssueResolutionPopup) |
| &lt;bryntum-scheduling-mode-picker/&gt;            | [SchedulingModePicker](#SchedulerPro/widget/SchedulingModePicker)                     |
| &lt;bryntum-slider/&gt;                            | [Slider](#Core/widget/Slider)                                                         |
| &lt;bryntum-slide-toggle/&gt;                      | [SlideToggle](#Core/widget/SlideToggle)                                               |
| &lt;bryntum-splitter/&gt;                          | [Splitter](#Core/widget/Splitter)                                                     |
| &lt;bryntum-start-date-field/&gt;                  | [StartDateField](#SchedulerPro/widget/StartDateField)                                 |
| &lt;bryntum-sub-grid/&gt;                          | [SubGrid](#Grid/view/SubGrid)                                                         |
| &lt;bryntum-tab-panel/&gt;                         | [TabPanel](#Core/widget/TabPanel)                                                     |
| &lt;bryntum-task-editor/&gt;                       | [TaskEditor](#Gantt/widget/TaskEditor)                                                |
| &lt;bryntum-text-area-field/&gt;                   | [TextAreaField](#Core/widget/TextAreaField)                                           |
| &lt;bryntum-text-area-picker-field/&gt;            | [TextAreaPickerField](#Core/widget/TextAreaPickerField)                               |
| &lt;bryntum-text-field/&gt;                        | [TextField](#Core/widget/TextField)                                                   |
| &lt;bryntum-time-field/&gt;                        | [TimeField](#Core/widget/TimeField)                                                   |
| &lt;bryntum-timeline/&gt;                          | [Timeline](#SchedulerPro/widget/Timeline)                                             |
| &lt;bryntum-timeline-histogram/&gt;                | [TimelineHistogram](#Scheduler/view/TimelineHistogram)                                |
| &lt;bryntum-time-picker/&gt;                       | [TimePicker](#Core/widget/TimePicker)                                                 |
| &lt;bryntum-toolbar/&gt;                           | [Toolbar](#Core/widget/Toolbar)                                                       |
| &lt;bryntum-tree-combo/&gt;                        | [TreeCombo](#Grid/widget/TreeCombo)                                                   |
| &lt;bryntum-tree-grid/&gt;                         | [TreeGrid](#Grid/view/TreeGrid)                                                       |
| &lt;bryntum-undo-redo/&gt;                         | [UndoRedo](#Scheduler/widget/UndoRedo)                                                |
| &lt;bryntum-version-grid/&gt;                      | [VersionGrid](#SchedulerPro/widget/VersionGrid)                                       |
| &lt;bryntum-view-preset-combo/&gt;                 | [ViewPresetCombo](#Scheduler/widget/ViewPresetCombo)                                  |
| &lt;bryntum-widget/&gt;                            | [Widget](#Core/widget/Widget)                                                         |
| &lt;bryntum-year-picker/&gt;                       | [YearPicker](#Core/widget/YearPicker)                                                 |

### Import BryntumGanttModule

Add the following code to your `app.module.ts`:

```typescript
import { BryntumGanttModule } from '@bryntum/gantt-angular'

@NgModule({
    imports : [
        BryntumGanttModule
    ]
})
```

Then you will be able to use the custom tag like `<bryntum-gantt>` and others listed above the same way as you use
your application components. Our examples are built this way so you can refer to them to see how to use the tag and how
to pass parameters.

### Using the wrapper in your application

Now you can use the component defined in the wrapper in your application:

```html
<bryntum-gantt
    #gantt
    tooltip = "My cool Bryntum Gantt component",
    (onCatchAll) = "onGanttEvents($event)"
    // other configs, properties, events or features
></bryntum-gantt>
```

You will also need to import CSS file for Bryntum Gantt. We recommend to do it in `src/styles.scss`:

```typescript
@import "@bryntum/gantt/gantt.material.css";

// other application-global styling
```

### Embedding widgets inside wrapper

Wrappers are designed to allow using Bryntum widgets as Angular components, but they themselves cannot contain other
Bryntum wrappers inside their tag. To embed Bryntum widgets inside a wrapper you should instead use the available
configuration options for the wrapper's widget. Please note that not all widgets may contain inner widgets, please refer
to the API docs to check for valid configuration options.

This example shows how to use a `Toolbar` widget inside the wrapper for Bryntum Gantt:

Sample code for `app.component.ts`:

```typescript
export class AppComponent {

    // Toolbar (tbar) config
    tbarConfig = {
        items : [
            {
                type : 'button',
                text : 'My button'
            }
        ]
    }

}
```

Sample code for `app.component.html`:

```html
<bryntum-gantt
    #gantt
    [tbar]="tbarConfig"
></bryntum-gantt>
```

## View Encapsulations

Angular provides 3 options for `ViewEncapsulation`: `Emulated` (default), `None` and `ShadowDom`, two of which are fully supported by Bryntum.

### View Encapsulation.Emulated

The default encapsulation, when active, modifies styles defined and imported in the component's (s)css file so that styles do not leak into the rest of the application. The Bryntum theme imported therein is also modified. For example:

```css
.b-fa {
  font-family:var(--b-fa-style-family, "Font Awesome 6 Free");
  font-weight:var(--b-fa-style, 900);
}
```

is changed to:

```css
.b-fa[_ngcontent-ng-c2992155993] {
  font-family:var(--b-fa-style-family, "Font Awesome 6 Free");
  font-weight:var(--b-fa-style, 900);
}
```

Should the `b-fa` CSS class be used in the component's html template, the class name would be changed as well and it would become `.b-fa[_ngcontent-ng-c2992155993]`. The scope of css classes is this way scoped to the component only.

The problem here is that the html of Bryntum Gantt is not generated by Angular but by the underlying JavaScript code. Therefore, the modified CSS classes are not understood and the Gantt is not styled at all.

The solution would be to import Bryntum Gantt theme in `styles.scss` which makes it global when no CSS class name mangling takes place so they are understood and properly applied to Bryntum Gantt. The styles defined in component's (s)css file are still scoped to the component only and can be used for html which is not Gantt.

This is a partial support.

### ViewEncapsulation.None

This is the easiest way because no modification of CSS classes takes place so the Bryntum Gantt theme can be imported either in `styles.scss` or in component's (s)css file.

This is the full support.

### ViewEncapsulation.ShadowDom

If this encapsulation method is used, Bryntum Gantt is generated into a shadow root element and therefore there are several things to do at the application level to make it working fully. First of all, the Bryntum Gantt theme **has to be imported in the component's (s)css file**. The reason for it is that Angular then ensures the styles are copied from the theme file to the shadow root element from where they are applied to the Gantt.

The only remaining problem to solve is fonts. Fonts are not copied and reference to them is broken by copying styles to shadow root. This can be solved in either of the following two ways.

#### Add Font Faces to `styles.scss`:

```css
@font-face {
    font-family : Roboto;
    font-style  : normal;
    font-weight : 400;
    src         :
        url("../node_modules/@bryntum/gantt/fonts/Roboto-Regular.woff2") format("woff2"),
        url("../node_modules/@bryntum/gantt/fonts/Roboto-Regular.woff") format("woff");
}

@font-face {
    font-family  : "Font Awesome 6 Free";
    font-style   : normal;
    font-weight  : 900;
    font-display : block;
    src          :
        url("../node_modules/@bryntum/gantt/fonts/fa-solid-900.woff2") format("woff2"),
        url("../node_modules/@bryntum/gantt/fonts/fa-solid-900.ttf") format("truetype");
}
```

This approach is used in [Scheduler Animations demo](https://bryntum.com/products/scheduler/examples/frameworks/angular/animations/). This demo also shows how to access the shadow root element in the code.

#### Add Font Faces in `ngAfterViewInit`:

You can also add the required font faces at runtime:

```typescript
    ngAfterViewInit(): void {
        // The following lines are only needed for ViewEncapsulation.ShadowDom
        document.fonts.add(new FontFace('FontAwesome6Free', `url(assets/fonts/fa-solid-900.woff2)`));
        document.fonts.add(new FontFace('Roboto', `url(assets/fonts/Roboto-Regular.woff2)`));
    }
```

You will also need to modify the default `tsconfig.json` file to add `DOM.Iterable`:

```json
  "compilerOptions": {
    // other options
    "lib": [
      "ES2022",
      "dom",
      "DOM.Iterable"
    ]
```

The last thing to add is fonts directory to assets in `angular.json`:

```json
// other options
"assets": [
    "src/assets",
    {
        "glob": "**/*",
        "input": "node_modules/@bryntum/gantt/fonts",
        "output": "assets/fonts"
    },
    // other assets
]
```

This approach is used in [Scheduler Basic demo](https://bryntum.com/products/scheduler/examples/frameworks/angular/basic/).

## Using Angular components as renderers

To use an Angular component as column renderer, header renderer or tooltip renderer define a custom element using the
Angular component which you want to use as the renderer. It can be done in `src/app/app.module.ts`:

```typescript
// The component used for custom tag definition
import { ColorRendererComponent } from './color-renderer/color-renderer.component';

// Function to create the custom element
import { createCustomElement } from '@angular/elements';

// ... other required imports

@NgModule({
    declarations : [
        AppComponent,
        ColorRendererComponent
    ],
    // These component(s) will be converted to Custom Elements
    entryComponents : [
        ColorRendererComponent
    ],
    imports : [
        BrowserModule,
        BryntumGanttModule
    ],
    providers : [],
    bootstrap : [AppComponent]
})

export class AppModule {
    constructor(injector: Injector) {
        // convert Angular Component to Custom Element and register it with browser
        customElements.define('color-renderer', createCustomElement(ColorRendererComponent, { injector }));
    }
}
```

The above renderer then can be used, for example, as a column renderer:

```typescript
columns : [
    {
        text       : 'Angular Component',
        field      : 'color',
        htmlEncode : false, // to prevent encoding of renderer output
        renderer(data: any) {
            const { record, value } = data;
            // Use registered Custom Element tag name and pass it attributes
            return `<color-renderer value="${value.toLowerCase()}" name="${record.name}"></color-renderer>`;
        }
    }
]
```

This approach is used in
[Grid Angular Renderer demo](https://bryntum.com/products/grid/examples/frameworks/angular/angular-renderer/).
The renderers are used the same way also for Scheduler, Gantt, Calendar and others.

## Configs, properties and events

All Bryntum Angular Wrappers support the full set of the public configs, properties and events of a component.

## Features

Features are suffixed with `Feature` and act as both configs and properties for `BryntumGanttComponent`. They are
mapped to the corresponding API features of the Bryntum Gantt `instance`.

This is a list of all `BryntumGanttComponent` features:

| Wrapper feature name      | API feature reference                                        |
| ------------------------- | ------------------------------------------------------------ |
| baselinesFeature          | [Baselines](#Gantt/feature/Baselines)                        |
| cellCopyPasteFeature      | [CellCopyPaste](#Grid/feature/CellCopyPaste)                 |
| cellEditFeature           | [CellEdit](#Gantt/feature/CellEdit)                          |
| cellMenuFeature           | [CellMenu](#Grid/feature/CellMenu)                           |
| cellTooltipFeature        | [CellTooltip](#Grid/feature/CellTooltip)                     |
| columnAutoWidthFeature    | [ColumnAutoWidth](#Grid/feature/ColumnAutoWidth)             |
| columnDragToolbarFeature  | [ColumnDragToolbar](#Grid/feature/ColumnDragToolbar)         |
| columnLinesFeature        | [ColumnLines](#Scheduler/feature/ColumnLines)                |
| columnPickerFeature       | [ColumnPicker](#Grid/feature/ColumnPicker)                   |
| columnRenameFeature       | [ColumnRename](#Grid/feature/ColumnRename)                   |
| columnReorderFeature      | [ColumnReorder](#Grid/feature/ColumnReorder)                 |
| columnResizeFeature       | [ColumnResize](#Grid/feature/ColumnResize)                   |
| criticalPathsFeature      | [CriticalPaths](#Gantt/feature/CriticalPaths)                |
| dependenciesFeature       | [Dependencies](#Gantt/feature/Dependencies)                  |
| dependencyEditFeature     | [DependencyEdit](#SchedulerPro/feature/DependencyEdit)       |
| eventFilterFeature        | [EventFilter](#Scheduler/feature/EventFilter)                |
| eventSegmentsFeature      | [EventSegments](#SchedulerPro/feature/EventSegments)         |
| excelExporterFeature      | [ExcelExporter](#Grid/feature/experimental/ExcelExporter)    |
| fileDropFeature           | [FileDrop](#Grid/feature/experimental/FileDrop)              |
| fillHandleFeature         | [FillHandle](#Grid/feature/FillHandle)                       |
| filterFeature             | [Filter](#Grid/feature/Filter)                               |
| filterBarFeature          | [FilterBar](#Grid/feature/FilterBar)                         |
| groupFeature              | [Group](#Grid/feature/Group)                                 |
| groupSummaryFeature       | [GroupSummary](#Grid/feature/GroupSummary)                   |
| headerMenuFeature         | [HeaderMenu](#Grid/feature/HeaderMenu)                       |
| headerZoomFeature         | [HeaderZoom](#Scheduler/feature/HeaderZoom)                  |
| indicatorsFeature         | [Indicators](#Gantt/feature/Indicators)                      |
| labelsFeature             | [Labels](#Gantt/feature/Labels)                              |
| mergeCellsFeature         | [MergeCells](#Grid/feature/MergeCells)                       |
| mspExportFeature          | [MspExport](#Gantt/feature/export/MspExport)                 |
| nonWorkingTimeFeature     | [NonWorkingTime](#Scheduler/feature/NonWorkingTime)          |
| panFeature                | [Pan](#Scheduler/feature/Pan)                                |
| parentAreaFeature         | [ParentArea](#Gantt/feature/ParentArea)                      |
| pdfExportFeature          | [PdfExport](#Gantt/feature/export/PdfExport)                 |
| percentBarFeature         | [PercentBar](#SchedulerPro/feature/PercentBar)               |
| printFeature              | [Print](#Gantt/feature/export/Print)                         |
| progressLineFeature       | [ProgressLine](#Gantt/feature/ProgressLine)                  |
| projectLinesFeature       | [ProjectLines](#Gantt/feature/ProjectLines)                  |
| quickFindFeature          | [QuickFind](#Grid/feature/QuickFind)                         |
| regionResizeFeature       | [RegionResize](#Grid/feature/RegionResize)                   |
| rollupsFeature            | [Rollups](#Gantt/feature/Rollups)                            |
| rowCopyPasteFeature       | [RowCopyPaste](#Grid/feature/RowCopyPaste)                   |
| rowExpanderFeature        | [RowExpander](#Grid/feature/RowExpander)                     |
| rowReorderFeature         | [RowReorder](#Scheduler/feature/RowReorder)                  |
| rowResizeFeature          | [RowResize](#Grid/feature/RowResize)                         |
| scheduleMenuFeature       | [ScheduleMenu](#Scheduler/feature/ScheduleMenu)              |
| scheduleTooltipFeature    | [ScheduleTooltip](#Scheduler/feature/ScheduleTooltip)        |
| scrollButtonsFeature      | [ScrollButtons](#Gantt/feature/ScrollButtons)                |
| searchFeature             | [Search](#Grid/feature/Search)                               |
| sortFeature               | [Sort](#Grid/feature/Sort)                                   |
| splitFeature              | [Split](#Grid/feature/Split)                                 |
| stickyCellsFeature        | [StickyCells](#Grid/feature/StickyCells)                     |
| stripeFeature             | [Stripe](#Grid/feature/Stripe)                               |
| summaryFeature            | [Summary](#Gantt/feature/Summary)                            |
| taskCopyPasteFeature      | [TaskCopyPaste](#Gantt/feature/TaskCopyPaste)                |
| taskDragFeature           | [TaskDrag](#Gantt/feature/TaskDrag)                          |
| taskDragCreateFeature     | [TaskDragCreate](#Gantt/feature/TaskDragCreate)              |
| taskEditFeature           | [TaskEdit](#Gantt/feature/TaskEdit)                          |
| taskMenuFeature           | [TaskMenu](#Gantt/feature/TaskMenu)                          |
| taskNonWorkingTimeFeature | [TaskNonWorkingTime](#Gantt/feature/TaskNonWorkingTime)      |
| taskResizeFeature         | [TaskResize](#Gantt/feature/TaskResize)                      |
| taskSegmentDragFeature    | [TaskSegmentDrag](#Gantt/feature/TaskSegmentDrag)            |
| taskSegmentResizeFeature  | [TaskSegmentResize](#Gantt/feature/TaskSegmentResize)        |
| taskTooltipFeature        | [TaskTooltip](#Gantt/feature/TaskTooltip)                    |
| timeAxisHeaderMenuFeature | [TimeAxisHeaderMenu](#Scheduler/feature/TimeAxisHeaderMenu)  |
| timeRangesFeature         | [TimeRanges](#Scheduler/feature/TimeRanges)                  |
| timeSpanHighlightFeature  | [TimeSpanHighlight](#SchedulerPro/feature/TimeSpanHighlight) |
| treeFeature               | [Tree](#Grid/feature/Tree)                                   |
| treeGroupFeature          | [TreeGroup](#Gantt/feature/TreeGroup)                        |
| versionsFeature           | [Versions](#Gantt/feature/Versions)                          |

## Bryntum Gantt API instance

It is important to know that the Angular `BryntumGanttComponent` is **not** the native Bryntum Gantt instance, it is
a wrapper or an interface between the Angular application and the Bryntum Gantt itself.

All available configs, properties and features are propagated from the wrapper down to the underlying Bryntum Gantt
instance, but there might be the situations when you want to access the Bryntum Gantt directly. That is fully valid
approach and you are free to do it.

### Accessing the Bryntum Gantt instance

If you need to access Bryntum Gantt functionality not exposed by the wrapper, you can access the Bryntum Gantt instance
directly. Within the wrapper it is available under the `instance` property.

This simple example shows how you could use it:

app.component.html

```html
<bryntum-gantt
    #gantt
    tooltip = "My cool Bryntum Gantt component"
></bryntum-gantt>
```

Sample code for `app.component.ts`:

```typescript
import { BryntumGanttComponent } from '@bryntum/gantt-angular';
import { Gantt } from '@bryntum/gantt';

export class AppComponent implements AfterViewInit {

    @ViewChild(BryntumGanttComponent, { static : false }) ganttComponent: BryntumGanttComponent;

    private gantt : Gantt;

    @ViewChild(BryntumGanttComponent, { static : false }) ganttComponent: BryntumGanttComponent;

    ngAfterViewInit(): void {
        // store Bryntum Gantt isntance
        this.gantt = this.ganttComponent.instance;
    }
}
```

When accessing `instance` directly, use wrapper's API widget reference docs from the list above to get available configs
and properties.

## Troubleshooting

Please refer to this [Troubleshooting guide](#Gantt/guides/integration/angular/troubleshooting.md).

## References

* Config options, features, events and methods [Bryntum Gantt API docs](#api)
* Visit [Angular Framework Homepage](https://angular.io)
* Post your questions to [Bryntum Support Forum](https://forum.bryntum.com/)
* [Contact us](https://bryntum.com/contact/)


<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>