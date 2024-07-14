<h1 class="title-with-image"><img src="Core/logo/ionic.svg" alt="Bryntum Scheduler supports Ionic"/>
Using Bryntum Scheduler with Ionic</h1>

## Bryntum NPM repository access

Please refer to this [guide for Bryntum NPM repository access](#Scheduler/guides/npm-repository.md).

## Ionic with Angular

The guide below references to using Ionic Framework for building application based on Angular.

## Bryntum Scheduler

The Bryntum Scheduler itself is framework agnostic, but it ships with demos and wrappers to simplify its use with popular
frameworks such as Ionic. The purpose of this guide is to give you a basic introduction on how to use Bryntum Scheduler
with Ionic.

## View online demos

Bryntum Scheduler Ionic demos can be viewed in our
[online example browser](https://bryntum.com/products/scheduler/examples/#Integration).

## Build and run local demos

Download distribution zip with demos according to this [guide](#Scheduler/guides/download.md#distribution).

Ionic demos are located in **examples/frameworks/ionic** folder inside
distribution zip.

Each demo contains bundled `README.md` file in demo folder with build and run instructions.

To view and run an example locally in development mode, you can use the following commands:

```shell
npm install
npm run start
```

That starts a local server accessible at [http://localhost:4200"](http://localhost:4200). If
you modify the example code while running it locally it is automatically rebuilt and updated in the browser allowing you
to see your changes immediately.

The production version of an example, or your application, is built by running:

```shell
npm install
npm run build
```

The built version is then located in `dist` sub-folder which contains the compiled code that can be deployed to your
production server.

## Install Ionic framework

Installation and API documentation can be found at the Ionic project's page https://ionicframework.com/.

Install the Ionic CLI globally with npm:

```shell
npm install -g ionic
```

The -g means it is a global install. For Windows it is recommended to open an Admin command prompt. For Mac/Linux, run
the command with sudo.

## Create Ionic app

Create an App:

```shell
ionic start IonicApp blank
```

`blank` is a common starter template for the app.

Run the App:

```shell
cd IonicApp
ionic serve
```

## TypeScript and Typings

Bryntum bundles ship with typings for the classes for usage in TypeScript applications. You can find `scheduler*.d.ts`
files in the `build` folder inside the distribution zip package. The definitions also contain a special config type
which can be passed to the class constructor.

The config specific types are also accepted by multiple other properties and functions, for example
the [Store.data](#Core/data/Store#config-data) config of the `Store` which accepts type `Partial<ModelConfig>[]`.

Sample code for tree store creation with `ModelConfig` and `StoreConfig` classes:

```typescript
import { Store, StoreConfig, ModelConfig } from '@bryntum/scheduler';

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

The Ionic wrappers encapsulate Bryntum Scheduler and other Bryntum widgets in Ionic components that expose configuration
options, properties, features and events. The wrapped all Bryntum UI components so they can be used the usual Ionic way.

To use native API package classes with wrappers import them from `@bryntum/scheduler`.

```typescript
import { Scheduler } from '@bryntum/scheduler';
```

### Installing the wrappers package

The wrappers are distributed as a separate package `@bryntum/scheduler-angular` that is installed according to the used
package manager. Please refer to this [guide for Bryntum NPM repository access](#Scheduler/guides/npm-repository.md).

### Wrappers Overview

Wrappers are Ionic components which provide full access to Bryntum API widget class configs, properties, events and
features. Each Wrapper has it's own HTML tag which can be used in ionic templates. This is the list of available
wrappers for Bryntum Scheduler Ionic package:

| Wrapper tag name                                | API widget reference                                                  |
| ----------------------------------------------- | --------------------------------------------------------------------- |
| &lt;bryntum-button/&gt;                         | [Button](#Core/widget/Button)                                         |
| &lt;bryntum-button-group/&gt;                   | [ButtonGroup](#Core/widget/ButtonGroup)                               |
| &lt;bryntum-checkbox/&gt;                       | [Checkbox](#Core/widget/Checkbox)                                     |
| &lt;bryntum-chip-view/&gt;                      | [ChipView](#Core/widget/ChipView)                                     |
| &lt;bryntum-color-field/&gt;                    | [ColorField](#Core/widget/ColorField)                                 |
| &lt;bryntum-color-picker/&gt;                   | [ColorPicker](#Core/widget/ColorPicker)                               |
| &lt;bryntum-combo/&gt;                          | [Combo](#Core/widget/Combo)                                           |
| &lt;bryntum-container/&gt;                      | [Container](#Core/widget/Container)                                   |
| &lt;bryntum-date-field/&gt;                     | [DateField](#Core/widget/DateField)                                   |
| &lt;bryntum-date-picker/&gt;                    | [DatePicker](#Core/widget/DatePicker)                                 |
| &lt;bryntum-date-time-field/&gt;                | [DateTimeField](#Core/widget/DateTimeField)                           |
| &lt;bryntum-display-field/&gt;                  | [DisplayField](#Core/widget/DisplayField)                             |
| &lt;bryntum-duration-field/&gt;                 | [DurationField](#Core/widget/DurationField)                           |
| &lt;bryntum-event-color-field/&gt;              | [EventColorField](#Scheduler/widget/EventColorField)                  |
| &lt;bryntum-event-color-picker/&gt;             | [EventColorPicker](#Scheduler/widget/EventColorPicker)                |
| &lt;bryntum-field-filter-picker/&gt;            | [FieldFilterPicker](#Core/widget/FieldFilterPicker)                   |
| &lt;bryntum-field-filter-picker-group/&gt;      | [FieldFilterPickerGroup](#Core/widget/FieldFilterPickerGroup)         |
| &lt;bryntum-file-field/&gt;                     | [FileField](#Core/widget/FileField)                                   |
| &lt;bryntum-file-picker/&gt;                    | [FilePicker](#Core/widget/FilePicker)                                 |
| &lt;bryntum-filter-field/&gt;                   | [FilterField](#Core/widget/FilterField)                               |
| &lt;bryntum-grid/&gt;                           | [Grid](#Grid/view/Grid)                                               |
| &lt;bryntum-grid-base/&gt;                      | [GridBase](#Grid/view/GridBase)                                       |
| &lt;bryntum-grid-field-filter-picker/&gt;       | [GridFieldFilterPicker](#Grid/widget/GridFieldFilterPicker)           |
| &lt;bryntum-grid-field-filter-picker-group/&gt; | [GridFieldFilterPickerGroup](#Grid/widget/GridFieldFilterPickerGroup) |
| &lt;bryntum-group-bar/&gt;                      | [GroupBar](#Grid/widget/GroupBar)                                     |
| &lt;bryntum-label/&gt;                          | [Label](#Core/widget/Label)                                           |
| &lt;bryntum-list/&gt;                           | [List](#Core/widget/List)                                             |
| &lt;bryntum-menu/&gt;                           | [Menu](#Core/widget/Menu)                                             |
| &lt;bryntum-number-field/&gt;                   | [NumberField](#Core/widget/NumberField)                               |
| &lt;bryntum-paging-toolbar/&gt;                 | [PagingToolbar](#Core/widget/PagingToolbar)                           |
| &lt;bryntum-panel/&gt;                          | [Panel](#Core/widget/Panel)                                           |
| &lt;bryntum-password-field/&gt;                 | [PasswordField](#Core/widget/PasswordField)                           |
| &lt;bryntum-project-combo/&gt;                  | [ProjectCombo](#Scheduler/widget/ProjectCombo)                        |
| &lt;bryntum-scheduler-project-model/&gt;        | [ProjectModel](#Scheduler/model/ProjectModel)                         |
| &lt;bryntum-radio/&gt;                          | [Radio](#Core/widget/Radio)                                           |
| &lt;bryntum-radio-group/&gt;                    | [RadioGroup](#Core/widget/RadioGroup)                                 |
| &lt;bryntum-resource-combo/&gt;                 | [ResourceCombo](#Scheduler/widget/ResourceCombo)                      |
| &lt;bryntum-resource-filter/&gt;                | [ResourceFilter](#Scheduler/widget/ResourceFilter)                    |
| &lt;bryntum-resource-header/&gt;                | [ResourceHeader](#Scheduler/view/ResourceHeader)                      |
| &lt;bryntum-scheduler/&gt;                      | [Scheduler](#Scheduler/view/Scheduler)                                |
| &lt;bryntum-scheduler-base/&gt;                 | [SchedulerBase](#Scheduler/view/SchedulerBase)                        |
| &lt;bryntum-scheduler-date-picker/&gt;          | [SchedulerDatePicker](#Scheduler/widget/SchedulerDatePicker)          |
| &lt;bryntum-slider/&gt;                         | [Slider](#Core/widget/Slider)                                         |
| &lt;bryntum-slide-toggle/&gt;                   | [SlideToggle](#Core/widget/SlideToggle)                               |
| &lt;bryntum-splitter/&gt;                       | [Splitter](#Core/widget/Splitter)                                     |
| &lt;bryntum-sub-grid/&gt;                       | [SubGrid](#Grid/view/SubGrid)                                         |
| &lt;bryntum-tab-panel/&gt;                      | [TabPanel](#Core/widget/TabPanel)                                     |
| &lt;bryntum-text-area-field/&gt;                | [TextAreaField](#Core/widget/TextAreaField)                           |
| &lt;bryntum-text-area-picker-field/&gt;         | [TextAreaPickerField](#Core/widget/TextAreaPickerField)               |
| &lt;bryntum-text-field/&gt;                     | [TextField](#Core/widget/TextField)                                   |
| &lt;bryntum-time-field/&gt;                     | [TimeField](#Core/widget/TimeField)                                   |
| &lt;bryntum-timeline-histogram/&gt;             | [TimelineHistogram](#Scheduler/view/TimelineHistogram)                |
| &lt;bryntum-time-picker/&gt;                    | [TimePicker](#Core/widget/TimePicker)                                 |
| &lt;bryntum-toolbar/&gt;                        | [Toolbar](#Core/widget/Toolbar)                                       |
| &lt;bryntum-tree-combo/&gt;                     | [TreeCombo](#Grid/widget/TreeCombo)                                   |
| &lt;bryntum-tree-grid/&gt;                      | [TreeGrid](#Grid/view/TreeGrid)                                       |
| &lt;bryntum-undo-redo/&gt;                      | [UndoRedo](#Scheduler/widget/UndoRedo)                                |
| &lt;bryntum-view-preset-combo/&gt;              | [ViewPresetCombo](#Scheduler/widget/ViewPresetCombo)                  |
| &lt;bryntum-widget/&gt;                         | [Widget](#Core/widget/Widget)                                         |
| &lt;bryntum-year-picker/&gt;                    | [YearPicker](#Core/widget/YearPicker)                                 |

### Import BryntumSchedulerModule

Add the following code to your `app.module.ts`:

```typescript
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular'

@NgModule({
    imports : [
        BryntumSchedulerModule
    ]
})
```

Then you will be able to use the custom tag like `<bryntum-scheduler>` and others listed above the same way as you use
your application components. Our examples are built this way so you can refer to them to see how to use the tag and how
to pass parameters.

### Using the wrapper in your application

Now you can use the component defined in the wrapper in your application:

```html
<bryntum-scheduler
    #scheduler
    tooltip="My cool Bryntum Scheduler component" ,
    (onCatchAll)="onSchedulerEvents($event)"
// other configs, properties, events or features
></bryntum-scheduler>
```

You will also need to import CSS file for Bryntum Scheduler. We recommend to do it in `src/styles.scss`:

```typescript
@import "@bryntum/scheduler/scheduler.material.css";

// other application-global styling
```

### Embedding widgets inside wrapper

Wrappers are designed to allow using Bryntum widgets as Angular components, but they themselves cannot contain other
Bryntum wrappers inside their tag. To embed Bryntum widgets inside a wrapper you should instead use the available
configuration options for the wrapper's widget. Please note that not all widgets may contain inner widgets, please refer
to the API docs to check for valid configuration options.

This example shows how to use a `Toolbar` widget inside the wrapper for Bryntum Scheduler:

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
<bryntum-scheduler
    #scheduler
    tbar="tbarConfig",
></bryntum-scheduler>
```

## Configs, properties and events

All Bryntum Ionic Wrappers support the full set of the public configs, properties and events of a component.

## Listening to Bryntum Scheduler events

The Bryntum Scheduler events are passed up to the Angular wrapper which makes it possible to listen to them the standard Angular
way. 

The following code demonstrates listening to the `eventClick` event:

Sample code for `app.component.ts`:

```typescript
export class AppComponent implements AfterViewInit {

    onSchedulerEventClick(e : {[key:string] : any}) : void {
        console.log('onEventClick', e);
    }
    // etc.
```

Sample code for `app.component.html`:

```html
<bryntum-scheduler
    #scheduler
    (onEventClick) = "onSchedulerEventClick($event)"
```

Please note that we prefix the capitalized event name with the `on` keyword and that we pass `$event` as
the argument to the listener.

Another valid method is to pass a [`listeners`](https://bryntum.com/products/scheduler/docs/api/Core/mixin/Events#config-listeners)
config object to the Angular wrapper. For example:

Sample code for `app.config.ts`:

```typescript
export const schedulerConfig = {
    listeners : {
        eventClick(e) {
            console.log('eventClick', e);
        }
    },
    // etc
```

and `app.component.html`:

```html
<bryntum-scheduler
    #scheduler
    [listeners] = "schedulerConfig.listeners!"
```

Please note that we use unprefixed event names in this case.

### Using dataChange event to synchronize data

Bryntum Scheduler keeps all data in its stores which are automatically synchronized with the UI and the user actions.
Nevertheless, it is sometimes necessary for the rest of the application to be informed about data changes. For that
it is easiest to use `dataChange` event.

`app.component.html`:

```html
<bryntum-scheduler
    #scheduler
    (onDataChange) = "syncData($event)"
```

`app.component.ts`:

```typescript
export class AppComponent {

    syncData({ store, action, records } : { store : Store; action : String; records : Model[]}) : void {
        console.log(`${store.id} changed. The action was: ${action}. Changed records: `, records);
        // Your sync data logic comes here
    }

    // ...
}
```

## Features

Features are suffixed with `Feature` and act as both configs and properties for `BryntumSchedulerComponent`. They are
mapped to the corresponding API features of the Bryntum Scheduler `instance`.

This is a list of all `BryntumSchedulerComponent` features:

| Wrapper feature name       | API feature reference                                          |
| -------------------------- | -------------------------------------------------------------- |
| cellCopyPasteFeature       | [CellCopyPaste](#Grid/feature/CellCopyPaste)                   |
| cellEditFeature            | [CellEdit](#Grid/feature/CellEdit)                             |
| cellMenuFeature            | [CellMenu](#Grid/feature/CellMenu)                             |
| cellTooltipFeature         | [CellTooltip](#Grid/feature/CellTooltip)                       |
| columnAutoWidthFeature     | [ColumnAutoWidth](#Grid/feature/ColumnAutoWidth)               |
| columnDragToolbarFeature   | [ColumnDragToolbar](#Grid/feature/ColumnDragToolbar)           |
| columnLinesFeature         | [ColumnLines](#Scheduler/feature/ColumnLines)                  |
| columnPickerFeature        | [ColumnPicker](#Grid/feature/ColumnPicker)                     |
| columnRenameFeature        | [ColumnRename](#Grid/feature/ColumnRename)                     |
| columnReorderFeature       | [ColumnReorder](#Grid/feature/ColumnReorder)                   |
| columnResizeFeature        | [ColumnResize](#Grid/feature/ColumnResize)                     |
| dependenciesFeature        | [Dependencies](#Scheduler/feature/Dependencies)                |
| dependencyEditFeature      | [DependencyEdit](#Scheduler/feature/DependencyEdit)            |
| eventCopyPasteFeature      | [EventCopyPaste](#Scheduler/feature/EventCopyPaste)            |
| eventDragFeature           | [EventDrag](#Scheduler/feature/EventDrag)                      |
| eventDragCreateFeature     | [EventDragCreate](#Scheduler/feature/EventDragCreate)          |
| eventDragSelectFeature     | [EventDragSelect](#Scheduler/feature/EventDragSelect)          |
| eventEditFeature           | [EventEdit](#Scheduler/feature/EventEdit)                      |
| eventFilterFeature         | [EventFilter](#Scheduler/feature/EventFilter)                  |
| eventMenuFeature           | [EventMenu](#Scheduler/feature/EventMenu)                      |
| eventNonWorkingTimeFeature | [EventNonWorkingTime](#Scheduler/feature/EventNonWorkingTime)  |
| eventResizeFeature         | [EventResize](#Scheduler/feature/EventResize)                  |
| eventTooltipFeature        | [EventTooltip](#Scheduler/feature/EventTooltip)                |
| excelExporterFeature       | [ExcelExporter](#Scheduler/feature/experimental/ExcelExporter) |
| fileDropFeature            | [FileDrop](#Grid/feature/experimental/FileDrop)                |
| fillHandleFeature          | [FillHandle](#Grid/feature/FillHandle)                         |
| filterFeature              | [Filter](#Grid/feature/Filter)                                 |
| filterBarFeature           | [FilterBar](#Grid/feature/FilterBar)                           |
| groupFeature               | [Group](#Grid/feature/Group)                                   |
| groupSummaryFeature        | [GroupSummary](#Scheduler/feature/GroupSummary)                |
| headerMenuFeature          | [HeaderMenu](#Grid/feature/HeaderMenu)                         |
| headerZoomFeature          | [HeaderZoom](#Scheduler/feature/HeaderZoom)                    |
| labelsFeature              | [Labels](#Scheduler/feature/Labels)                            |
| mergeCellsFeature          | [MergeCells](#Grid/feature/MergeCells)                         |
| nonWorkingTimeFeature      | [NonWorkingTime](#Scheduler/feature/NonWorkingTime)            |
| panFeature                 | [Pan](#Scheduler/feature/Pan)                                  |
| pdfExportFeature           | [PdfExport](#Scheduler/feature/export/PdfExport)               |
| printFeature               | [Print](#Scheduler/feature/export/Print)                       |
| quickFindFeature           | [QuickFind](#Grid/feature/QuickFind)                           |
| regionResizeFeature        | [RegionResize](#Grid/feature/RegionResize)                     |
| resourceMenuFeature        | [ResourceMenu](#Scheduler/feature/ResourceMenu)                |
| resourceTimeRangesFeature  | [ResourceTimeRanges](#Scheduler/feature/ResourceTimeRanges)    |
| rowCopyPasteFeature        | [RowCopyPaste](#Grid/feature/RowCopyPaste)                     |
| rowExpanderFeature         | [RowExpander](#Grid/feature/RowExpander)                       |
| rowReorderFeature          | [RowReorder](#Scheduler/feature/RowReorder)                    |
| rowResizeFeature           | [RowResize](#Scheduler/feature/RowResize)                      |
| scheduleContextFeature     | [ScheduleContext](#Scheduler/feature/ScheduleContext)          |
| scheduleMenuFeature        | [ScheduleMenu](#Scheduler/feature/ScheduleMenu)                |
| scheduleTooltipFeature     | [ScheduleTooltip](#Scheduler/feature/ScheduleTooltip)          |
| searchFeature              | [Search](#Grid/feature/Search)                                 |
| simpleEventEditFeature     | [SimpleEventEdit](#Scheduler/feature/SimpleEventEdit)          |
| sortFeature                | [Sort](#Grid/feature/Sort)                                     |
| splitFeature               | [Split](#Scheduler/feature/Split)                              |
| stickyCellsFeature         | [StickyCells](#Grid/feature/StickyCells)                       |
| stickyEventsFeature        | [StickyEvents](#Scheduler/feature/StickyEvents)                |
| stripeFeature              | [Stripe](#Grid/feature/Stripe)                                 |
| summaryFeature             | [Summary](#Scheduler/feature/Summary)                          |
| timeAxisHeaderMenuFeature  | [TimeAxisHeaderMenu](#Scheduler/feature/TimeAxisHeaderMenu)    |
| timeRangesFeature          | [TimeRanges](#Scheduler/feature/TimeRanges)                    |
| timeSelectionFeature       | [TimeSelection](#Scheduler/feature/TimeSelection)              |
| treeFeature                | [Tree](#Grid/feature/Tree)                                     |
| treeGroupFeature           | [TreeGroup](#Grid/feature/TreeGroup)                           |

## Bryntum Scheduler API instance

It is important to know that the Ionic `BryntumSchedulerComponent` is **not** the native Bryntum Scheduler instance, it
is a wrapper or an interface between the Ionic application and the Bryntum Scheduler itself.

All available configs, properties and features are propagated from the wrapper down to the underlying Bryntum Scheduler
instance, but there might be the situations when you want to access the Bryntum Scheduler directly. That is fully valid
approach and you are free to do it.

### Accessing the Bryntum Scheduler instance

If you need to access Bryntum Scheduler functionality not exposed by the wrapper, you can access the Bryntum Scheduler instance
directly. Within the wrapper it is available under the `instance` property.

This simple example shows how you could use it:

app.component.html

```html
<ion-header>
...
</ion-header>

<ion-content>
    <scheduler
        #scheduler
        tooltip = "My cool Bryntum Scheduler component"
    ></scheduler>
</ion-content>
```

Sample code for `app.component.ts`:

```typescript
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { Scheduler } from '@bryntum/scheduler';

export class AppComponent implements AfterViewInit {

    @ViewChild(BryntumSchedulerComponent, { static : false }) schedulerComponent: BryntumSchedulerComponent;

    private scheduler : Scheduler;

    @ViewChild(BryntumSchedulerComponent, { static : false }) schedulerComponent: BryntumSchedulerComponent;

    ngAfterViewInit(): void {
        // store Bryntum Scheduler isntance
        this.scheduler = this.schedulerComponent.instance;
    }
}
```

When accessing `instance` directly, use wrapper's API widget reference docs from the list above to get available configs
and properties.

## Troubleshooting

Please refer to this [Troubleshooting guide](#Scheduler/guides/integration/ionic/troubleshooting.md).

## References

* Config options, features, events and methods [Bryntum Scheduler API docs](#api)
* Visit [Ionic Framework Homepage](https://ionicframework.com)
* Visit [Angular Framework Homepage](https://angular.io)
* Post your questions to [Bryntum Support Forum](https://forum.bryntum.com/)
* [Contact us](https://bryntum.com/contact/)


<p class="last-modified">Last modified on 2024-05-21 9:20:05</p>