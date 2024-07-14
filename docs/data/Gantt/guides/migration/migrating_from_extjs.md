# Migrate from Gantt for Ext JS

In this guide we will walk you through in detail how to migrate from our <a href="https://bryntum.com/products/gantt-for-extjs">Ext JS based Gantt product</a>
to the modern Bryntum Gantt. We will focus our guide around the advanced example which has a fair amount of complexity,
and many features enabled (this example exists in both products). After completing this migration, you will end up with a simple JS application
which can be downloaded from [our website](https://bryntum.com/playpen/migrating_from_extjs_to_vanilla.zip).

## Introduction

In Ext Gantt, the advanced demo is built as a single page application. It has single entry point - `app.js` which is loaded by
the index page. The entry point creates an `Ext.Application`, a controller to listen to global events (like locale change), a state
tracking manager to enable undo/redo feature, and uses `Ext.Viewport` to render items of the main view to the page.

Bryntum Gantt however does not have an application concept, and it also does not assume to fully control the page content.
From the outside, it is a plain JS widget (though encapsulating enormous amounts of features) that you append to the page.
Compared to Ext JS Classic widgets, the modern Bryntum widgets can be sized with CSS (we prefer flexbox to do that)
rather than as part of a JS-based layout architecture. When porting the demo we will be using standard HTML/CSS to
compose the page and the contents of the `@bryntum/gantt` NPM package as ES6 imports (to avoid needing a build step).

## First step

We start by initializing a directory and NPM

```shell
~$ mkdir --parents app/resources
~$ cd app
app$ touch app.js index.html resources/app.css
app$ npm init
```

Then we log into the private Bryntum NPM repo to fetch the `@bryntum/gantt` package (for more info please refer to the
[NPM guide](#Gantt/guides/npm-repository.md)):

```shell
app$ npm config set @bryntum:registry https://npm.bryntum.com
app$ npm login --registry=https://npm.bryntum.com
app$ npm i @bryntum/gantt
```

After this, we make a simple HTML page with a container element occupying all available space on the page and we append
 the Gantt to it:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Bryntum Gantt - Advanced demo</title>
    <!-- Loading theme for Gantt component. It is important to set this id if
     you plan to change themes in runtime -->
    <link rel="stylesheet"
        href="node_modules/@bryntum/gantt/gantt.stockholm.css"
        data-bryntum-theme>
    <!-- Application CSS -->
    <link rel="stylesheet" href="resources/app.css">
</head>

<body>
    <div id="container"></div>
    <!-- Using Ecma Modules -->
    <script type="module" src="app.js"></script>
</body>

</html>
```

Use this bit of CSS to stretch the container element

```css
/* resources/app.css */
html, body {
    height: 100%;
}

body {
    display        : flex;
    flex-direction : column;
    margin         : 0;
    font-family    : sans-serif;
}

#container {
    flex    : 1;
    display : flex;
}
```

## Application layout

To reproduce the Ext JS application layout, let's take a look at the main view's <code>items</code> config:
```javascript
// Ext Gantt application config
this.items = {
    xtype  : 'container',
    region : 'center',
    layout : 'border',
    items  : [
        {
            xtype  : 'advanced-timeline',
            height : 180,
            header : { xtype: 'controlheader' },
            region : 'north',
        },
        {
            xtype     : 'advanced-gantt',
            region    : 'center',
            reference : 'gantt'
        }
    ]
},
{
    xtype  : 'details',
    region : 'east',
    split  : true
}
```

It renders the `container` component to the center of the main viewport, adds `details` panel to the right with
a splitter. Inside the `container` element there is a `Gantt` panel taking center area and a `timeline` component above
it with a custom header. To recreate this we can use a number of Panels, with title just to see what's going on:
```javascript
// app.js
import { Container } from "./node_modules/@bryntum/gantt/gantt.module.js";

const container = new Container({
    appendTo : 'container',
    // This will be transformed to flexbox CSS
    layoutStyle : {
        // Place items horizontally
        flexFlow     : 'row',
        // Take all available space on the cross axis (vertical)
        alignContent : 'stretch'
    },
    items : [
        {
            type : 'container',
            flex : 1, // Take all available space
            layoutStyle : {
                flexFlow : 'column' // Place items vertically
            },
            items : [
                {
                    type : 'panel',
                    title : 'timeline'
                },
                {
                    type : 'panel',
                    flex : 1,
                    title : 'gantt'
                }
            ]
        },
        { type : 'splitter' }, // Allows resizing sibling items
        {
            type : 'panel',
            title : 'details'
        }
    ]
});
```

If you open this page in a browser, you will see the future layout of the application:

<img src="data/Gantt/images/migration/panel-layout.png" alt="Panel layout"/>

Now when you know how to layout items using containers and flexboxes, lets drop details panel - implementing similar
component is a too advanced topic for this guide. A simplified container could look like this:
```javascript
const container = new Container({
    appendTo : 'container',
    // This will be transformed to flexbox CSS
    layoutStyle : {
        // Place items vertically
        flexFlow     : 'column',
        // Take all available space on the cross axis (horizontal)
        alignContent : 'stretch'
    },
    items : [
        {
            type : 'panel',
            title : 'timeline'
        },
        {
            type : 'panel',
            flex : 1,
            title : 'gantt'
        }
    ]
});
```

<img src="data/Gantt/images/migration/simple-layout.png" alt="Simple panel layout"/>

## Configuring Gantt

Now we can start replacing placeholder panels with actual content starting from the Gantt component itself with a basic
configuration we can take from old Gantt. Let's go through configs and see what changed there.

```javascript
Ext.define('Gnt.examples.advanced.view.Gantt', {
    // This became a config of the TimeRanges feature.
    showTodayLine           : true,

    // This config accepts string to display during load and by default it
    // shows localized `Loading...` message.
    loadMask                : true,

    // This became a config of the PercentBar feature and is true by default.
    enableProgressBarResize : true,

    // This is the new 'Rollups' feature, disabled by default.
    showRollupTasks         : true,

    // Next two configs are identical compared to old version.
    rowHeight               : 30,
    viewPreset              : 'weekAndDayLetter',

    // Obsolete config. Project lines are managed by the ProjectLines feature
    // which doesn't allow configuring targets for lines.
    projectLinesConfig : {
        linesFor : 'start'
    },

    // Obsolete config. Gantt always allows to deselect rows when pressing
    // CTRL key. This cannot be turned off.
    allowDeselect : true,

    // Obsolete config. There is no spreadsheet selection model analog yet.
    selModel : {
        type : 'gantt_spreadsheet',
        rowNumbererHeaderWidth : 70
    },

    // This config has a slightly different syntax.
    lockedGridConfig : {
        width : 400
    },

    // This config doesn't exist anymore, to add class to the row you have to
    // use `record.cls` field or the column renderer.
    lockedViewConfig : {
        getRowClass : function (rec) {
            return rec.isRoot() ? 'root-row' : '';
        }
    },

    // Obsolete config. Task template is not configurable anymore, use
    // taskRenderer instead. This particular template behavior is the default.
    taskBodyTemplate : '...',

    // This should be configured on the Labels feature.
    leftLabelField : {
        dataIndex : 'Name',
        editor    : { xtype : 'textfield' }
    },

    // Ext JS has concept of plugins and features, in Bryntum Gantt there are
    // only features.
    plugins : [
        // This is replaced by the TaskMenu feature and enabled by default.
        'advanced_taskcontextmenu',
        // This is replaced by the Pan feature.
        'scheduler_pan',
        // Task editor exists, but this config is not applicable anymore.
        {
            ptype         : 'gantt_taskeditor',
            height        : 450,
            taskFormClass : 'Gnt.examples.advanced.view.TaskEditorGeneralForm'
        },
        // This plugin used to edit Project nodes and is obsolete now.
        'gantt_projecteditor',
        // This is replaced by the Filter feature - enabled by default.
        'gridfilters',
        // This is replaced by the ProgressLine feature.
        {
            ptype      : 'gantt_progressline',
            disabled   : true,
            statusDate : new Date(2017, 1, 6),
            id         : 'progressline'
        },
        // This is replaced by the DependencyEdit feature.
        {
            ptype : 'gantt_dependencyeditor',
            width : 320
        },
        // This is a demo-specific plugin which does not yet exist in Bryntum
        // Gantt.
        {
            pluginId : 'taskarea',
            ptype    : 'taskarea'
        },
        // This is replaced by the CellEdit feature and is enabled by default.
        {
            ptype        : 'scheduler_treecellediting',
            clicksToEdit : 2,
            pluginId     : 'editingInterface'
        },
        // This is not supported
        {
            ptype : 'gantt_clipboard',
            source : ['raw','text']
        },
        // This is a plugin related to spreadsheet selection model and is not
        // yet supported
        'gantt_selectionreplicator'
    ],

    columns : [
        // Does not exist anymore. This column purpose was to allow row
        // reordering with spreadsheet selection model. Since Bryntum Gantt
        // doesn't yet support spreadsheet selection, this column is not
        // available. There is a RowReorder feature, which is enabled for
        // Gantt by default.
        {   xtype     : 'dragdropcolumn' },
        {
            xtype     : 'namecolumn',
            width     : 200,
            cls       : 'namecolumn',
            // Similar behavior is achieved with the FilterBar feature.
            layout    : 'vbox',
            items     : {
                xtype : 'gantt-filter-field'
            }
        },
        // This is the default config for Date columns now.
        {
            xtype     : 'startdatecolumn',
            width     : 130,
            dataIndex : 'StartDate',
            filter    : {
                type : 'date'
            }
        },
        {
            xtype     : 'enddatecolumn',
            width     : 130,
            dataIndex : 'EndDate',
            filter    : {
                type : 'date'
            }
        },
        {
            xtype     : 'durationcolumn',
            width     : 100
        },
        {   xtype     : 'constrainttypecolumn' },
        {   xtype     : 'constraintdatecolumn' },
        {
            xtype     : 'percentdonecolumn',
            width     : 100,
            dataIndex : 'PercentDone',
            filter    : {
                type : 'number'
            }
        },
        {   xtype     : 'predecessorcolumn' },
        {   xtype     : 'addnewcolumn' }
    ],

    // Renderer is supported but has slightly different signature.
    eventRenderer : function (task, tplData) {
        var style,
            segments, i,
            result;

        if (task.get('Color')) {
            style = Ext.String.format(
                        'background-color: #{0};border-color:#{0}',
                        task.get('Color')
            );

            if (!tplData.segments) {
                result = {
                    style : style
                };
            }
            else {
                segments = tplData.segments;
                for (i = 0; i < segments.length; i++) {
                    segments[i].style = style;
                }
            }
        }

        return result;
    }
});
```

The config used to create a similar Gantt panel using Bryntum Gantt would look like this:

```javascript
{
    type : 'gantt',
    flex : 1,
    // We will define this variable below.
    project,
    rowHeight : 30,
    // Default bar margin differs very much from one in Ext Gantt.
    barMargin : 3,
    viewPreset : 'weekAndDayLetter',
    features : {
        timeRanges : {
            showCurrentTimeLine : true
        },
        rollups : true,
        labels : {
            left : {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        },
        pan : true,
        // Add feature and disable by default.
        progressLine : { disabled : true },
        dependencyEdit : true
    },
    },
    subGridConfigs : {
        locked : {
            width : 400
        }
    },
    columns : [
        { type : 'wbs' },
        { type : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'enddate' },
        { type : 'duration' },
        { type : 'constrainttype' },
        { type : 'constraintdate' },
        { type : 'percentdone', width : 70 },
        {
            type  : 'predecessor',
            width : 112
        },
        { type : 'addnew' }
    ]
}
```

## Changes in the data package

There are a few key differences between the old and new CRUD protocols, which do not allow to simply load the same data.
Here is a list of differences:

- General changes:
    - Field names are camel cased, StartDate -> startDate.
    - Project meta information is defined in `project` section. It includes project calendar and project start date.
- Tasks:
    - Baselines should be an array.
    - `TaskType` field is no longer supported. It was mainly used to tell project node from task node, but is no longer
    required.
    - `leaf` field does not exist either. A node becomes a parent node only if it has at least one child node.
    - `schedulingMode` field set of supported modes has been changed. See details in
    [Task scheduling modes](##task-scheduling-modes) chapter.
- Calendars:
    - Calendar is described by 3 fields: `id`, `name` and `intervals`.
    - `Days` and `DefaultAvailability` fields were replaced by single `intervals` field, which uses different syntax
    to define working/non-working time.
    - `hoursPerDay/daysPerWeek/daysPerMonth` fields are moved from calendar to the project metadata.
- Dependencies:
    - Fields are renamed: `From` -> `fromTask`, `To` -> `toTask`.
- Assignments:
    - Fields are renamed: `TaskId` -> `event`, `ResourceId` -> `resource`.

Some differences like field names, are fixable with a simple mapping. But others (intervals, baselines, metadata) require
changes on the backend. In the diff below, the most vital changes are highlighted, and old field names are kept intact
as much as possible:
```diff
{
+   "project": {
+       "calendar": "General",
+       "startDate": "2017-01-16",
+       "hoursPerDay" : 8,
+       "daysPerWeek" : 5,
+       "daysPerMonth" : 20
+   },
    "calendars": {
-       "metaData" : {
-           "projectCalendar" : "General"
-       },
        "rows"     : [{
            "Id"                  : "General",
            "Name"                : "General",
-           "parentId"            : null,
-           "DaysPerWeek"         : 5,
-           "DaysPerMonth"        : 20,
-           "HoursPerDay"         : 8,
-           "WeekendFirstDay"     : 6,
-           "WeekendSecondDay"    : 0,
-           "WeekendsAreWorkdays" : false,
-           "DefaultAvailability" : [
-               "08:00-12:00",
-               "13:00-17:00"
-           ],
-           "leaf"                : true,
-           "Days"                : {
-               "rows" : [{
-                   "Id"   : 1,
-                   "Cls"  : "gnt-national-holiday",
-                   "Date" : "2017-01-12",
-                   "Name" : "Some big holiday"
-               }]
-           }
+           "intervals"    : [
+               {
+                   "recurrentStartDate" : "on Sat at 0:00",
+                   "recurrentEndDate"   : "on Mon at 0:00",
+                   "isWorking"          : false
+               },
+               {
+                   "recurrentStartDate" : "every weekday at 12:00",
+                   "recurrentEndDate"   : "every weekday at 13:00",
+                   "isWorking"          : false
+               },
+               {
+                   "recurrentStartDate" : "every weekday at 17:00",
+                   "recurrentEndDate"   : "every weekday at 08:00",
+                   "isWorking"          : false
+               }
+           ]
        }]
    },
    "tasks": {
-       "metaData" : {
-           "projectStartDate" : "2017-01-16"
-       },
        "rows": [{
            "Id"                : 1,
            "leaf"              : true,
            "Name"              : "Investigate",
            "StartDate"         : "2017-01-16",
            "Duration"          : 8,
            "CalendarId"        : "General",
-           "BaselineStartDate" : "2017-01-18",
-           "BaselineEndDate"   : "2017-01-26",
+           "baselines"         : [{
+               "StartDate" : "2017-01-18",
+               "EndDate"   : "2017-01-26"
+           }]
            "Segments"          : [
                {
                    "Id"        : 1,
                    "StartDate" : "2017-01-16",
                    "Duration"  : 1
                },
                {
                    "Id"        : 2,
                    "StartDate" : "2017-01-18",
                    "Duration"  : 2
                },
                {
                    "Id"        : 3,
                    "StartDate" : "2017-01-23",
                    "Duration"  : 5
                }
            ]
        }]
    },
    "dependencies": {
        "rows": [{ "Id": 1, "From": 1, "To": 1 }]
    },
    "resources": {
        "rows": [{ "Id": 1, "Name": "Dan" }]
    },
    "assignments": {
        "rows": [{ "Id": 1, "TaskId": 1, "ResourceId": 1 }]
    }
}
```

In order to use this dataset we need to map fields to the data object by subclassing TaskModel. Let's create `src/model/Task.js`
and declare model like this:
```javascript
import { TaskModel } from "../../node_modules/@bryntum/gantt/gantt.module.js";

class Task extends TaskModel {
    // This way we extend default field definitions
    static get fields() {
        return [
            // Declare field `Id` which uses corresponding field from the data object. Internally
            // lowercase `record.id` is used, but such mapping is handled different from other fields (see below).
            { name : 'Id' },
            { name : 'calendar', dataSource : 'CalendarId', serialize : calendar => calendar && calendar.id },
            // Declare field `record.name` which reads data from `Name` property of the data object.
            { name : 'name', dataSource : 'Name' },
            // Date fields require type specified in order to covert incoming ISO string to Date instance
            { name : 'startDate', dataSource : 'StartDate', type : 'date' },
            { name : 'endDate', dataSource : 'EndDate', type : 'date' },
            { name : 'duration', dataSource : 'Duration' },
            { name : 'durationUnit', dataSource : 'DurationUnit' },
            { name : 'percentDone', dataSource : 'PercentDone' },
            { name : 'schedulingMode', dataSource : 'SchedulingMode' },
            { name : 'cls', dataSource : 'Cls' },
            { name : 'effort', dataSource : 'Effort' },
            {
                name       : 'effortUnit',
                dataSource : 'EffortUnit',
                // Converter method processes incoming value, this one makes sure that field always has value
                convert(value) {
                    return value || 'hour';
                }
            },
            { name : 'note', dataSource : 'Note' },
            { name : 'constraintType', dataSource : 'ConstraintType' },
            { name : 'constraintDate', dataSource : 'ConstraintDate' },
            { name : 'manuallyScheduled', dataSource : 'ManuallyScheduled' },
            { name : 'draggable', dataSource : 'Draggable' },
            { name : 'resizable', dataSource : 'Resizable' },
            { name : 'rollup', dataSource : 'Rollup' },
            { name : 'showInTimeline', dataSource : 'ShowInTimeline' },
            { name : 'deadlineDate', dataSource : 'DeadlineDate', type : 'date' }
        ];
    }
}

// Id field requires special treatment
Task.idField = 'Id';
```

We continue to declare other models in the same manner, mapping every field.

Dependency model:
```javascript
import { DependencyModel } from "../../node_modules/@bryntum/gantt/gantt.module.js";

export default class Dependency extends DependencyModel {
    static get fields() {
        return [
            { name : 'Id' },
            { name : 'fromEvent', dataSource : 'From' },
            { name : 'toEvent', dataSource : 'To' },
            { name : 'lag', dataSource : 'Lag' },
            { name : 'lagUnit', dataSource : 'LagUnit' }
        ];
    }
}

Dependency.idField = 'Id';
```

Assignment model:
```javascript
import { AssignmentModel } from "../../node_modules/@bryntum/gantt/gantt.module.js";

export default class Assignment extends AssignmentModel {
    static get fields() {
        return [
            { name : 'Id' },
            { name : 'event', dataSource : 'TaskId' },
            { name : 'resource', dataSource : 'ResourceId' },
            { name : 'units', dataSource : 'Units' }
        ];
    }
}

Assignment.idField = 'Id';
```

Resource model:
```javascript
import { ResourceModel } from "../../node_modules/@bryntum/gantt/gantt.module.js";

export default class Resource extends ResourceModel {
    static get fields() {
        return [
            { name : 'Id' },
            { name : 'name', dataSource : 'Name' }
        ];
    }
}

Resource.idField = 'Id';
```

Calendar model is similar to resource model - it only needs to map name and id field.

### Task scheduling modes

Set of supported scheduling modes has been slightly changed in the new Gantt.
There are four supported modes `Normal`, `FixedDuration`, `FixedEffort` and `FixedUnits`.

Ext Gantt `EffortDriven` mode was renamed to `FixedEffort` in the new Gantt.
And a new special [effortDriven](#Gantt/model/TaskModel#field-effortDriven) boolean flag
was added to configure tasks more flexibly.

Old `DynamicAssignment` mode was removed since in the new Gantt it's just a combination
of [schedulingMode](#Gantt/model/TaskModel#field-schedulingMode) set to `FixedDuration`
with [effortDriven](#Gantt/model/TaskModel#field-effortDriven) flag set to `true`.

Also new `FixedUnits` mode was added in which the assignment units are a fixed (means user provided
and not recalculated automatically) value.
In this mode changing of the [effort](#Gantt/model/TaskModel#field-effort) causes recalculation
of the task [duration](#Gantt/model/TaskModel#field-duration) and vice versa
[duration](#Gantt/model/TaskModel#field-duration) changes result recalculating
the task [effort](#Gantt/model/TaskModel#field-effort).

## Setup the project


### Project basics

In Bryntum Gantt, the CRUD Manager is a mixin consumed by a <code>ProjectModel</code>. The ProjectModel is a mega-store
which encapsulates all the Gantt-related data stores (tasks, calendars, resources etc) and manages all communication
with the backend (<code>load</code> & <code>sync</code>) but can also work without a backend using inline data.
The other main purpose of the ProjectModel is to schedule tasks according to the defined calendars and dependencies -
to calculate project. In the Ext Gantt, these calculations where made by the <code>TaskStore</code>,
but now it is Project's responsibility. A typical workflow using a project can be described with this small
code snippet:
```javascript
// create project which loads data from a URL
const project = new ProjectModel({
    autoLoad  : true,
    transport : {
        load : {
            url : 'load'
        },
        sync : {
            url : 'sync'
        }
    }
});

// `commitAsync` will schedule an asynchronous project calculation and return a
// Promise instance. When that promise is resolved, it is safe to continue
// working with project.
project.commitAsync().then(() => {
    // Changing duration using accessor will schedule another commit after 100ms
    project.taskStore.getById(1).duration = 2;

    // But we want to force it...
    return project.commitAsync();
}).then(() => {
    // ...to store changes ASAP
    return project.sync();
});
```

### Setup project for Gantt

Every Gantt instance requires a Project instance, let's create one for our application:
```javascript
// app.js
import Assignment from "./src/model/Assignment.js";
import Calendar from "./src/model/Calendar.js";
import Dependency from "./src/model/Dependency.js";
import Project from "./src/model/Project.js";
import Resource from "./src/model/Resource.js";
import Task from "./src/model/Task.js";

// configure project to use customized models
const project = new Project({
    taskModelClass : Task,
    dependencyModelClass : Dependency,
    resourceModelClass : Resource,
    assignmentModelClass : Assignment,
    calendarModelClass : Calendar,

    // specify data source
    transport : {
        load : {
            url : 'data/data.json'
        }
    }
});

// load project data
project.load();
```

Now the app should display the Gantt chart with demo data loaded:

<img src="data/Gantt/images/migration/brytnum-gantt-data-load.png" alt="Gantt loads data"/>

## Configuring the Timeline panel

Timeline uses the same project instance as the Gantt, so we need to share it:

```diff
{
-   type : 'panel',
-   title : 'timeline'
+   type : 'timeline',
+   project
}
```

Now if you run the application, you will see the Timeline rendered instead of the placeholder panel:

<img src="data/Gantt/images/migration/timeline.png" alt="Timeline added"/>

## Styling

The Ext Gantt application also has a custom task renderer method which appends custom color to a task bar.
In the migrated application we will add a dropdown to pick colors. First we need to add a new column:
```javascript
// src/column/Color.js
import { Column, ColumnStore } from '../../node_modules/@bryntum/gantt/gantt.module.js';

const colorMap = {
  Blue   : '#64B5F6',
  Green  : '#81C784',
  Red    : '#E57373',
  Yellow : '#FFF176',
  Pink   : '#F06292',
  Purple : '#BA68C8',
  Orange : '#FFB74D',
  Teal   : '#4DB6AC',
  Black  : '#555'
};

export default class ColorColumn extends Column {
    // Define the type for this column, used in your columns config to add this column
    static get type() {
        return 'color';
    }

    // Override default values
    static get defaults() {
        return {
            field  : 'color',
            text   : 'Color',
            align  : 'center',
            editor : {
                type  : 'combo',
                items : [
                    'Black',
                    'Blue',
                    'Green',
                    'Orange',
                    'Pink',
                    'Purple',
                    'Red',
                    'Teal',
                    'Yellow'
                ]
            }
        };
    }

    renderer({ value, cellElement }) {
        cellElement.style.backgroundColor = colorMap[value] || '';
        cellElement.style.color = value ? '#fff' : '';

        return value;
    }
}

// Register with ColumnStore to make the column available to the grid
ColumnStore.registerColumnType(ColorColumn);
```

Column refers to the `color` field on the model, so we should define one on the Task model:
```diff
             { name : 'resizable', dataSource : 'Resizable' },
             { name : 'rollup', dataSource : 'Rollup' },
             { name : 'showInTimeline', dataSource : 'ShowInTimeline' },
-            { name : 'deadlineDate', dataSource : 'DeadlineDate', type : 'date' }
+            { name : 'deadlineDate', dataSource : 'DeadlineDate', type : 'date' },
+            { name : 'color' }
         ];
     }
 }
```

Last step is to append this column to the view:

```diff
 import Resource from "./src/model/Resource.js";
 import Task from "./src/model/Task.js";
+import "./src/column/Color.js";


+                        { type : 'color' },
                         { type : 'addnew' }
-                    ]
+                    ],
+                    taskRenderer({ taskRecord, renderData }) {
+                        if (taskRecord.color) {
+                            renderData.style = `background-color: ${taskRecord.color}`;
+                        }
+                    }
                 }
             ]
         },
```

Run the application and scroll the locked view. You will find a column with a dropdown editor allowing to pick colors
which are then used as task background color.

<img src="data/Gantt/images/migration/color-picker.png" alt="Color picker added"/>

## Summing up

Bryntum Gantt has almost achieved <a href="https://bryntum.com/products/gantt-for-extjs/compare/">feature parity</a>
with Ext Gantt. Some APIs have been changed but overall the approach is very similar:
1. Components can be configured using a class name or by a type name (`xtype` in Ext JS, `type` in Bryntum Gantt) passed to a
factory (container, panel or even widget factory - `WidgetHelper.createWidget`).
2. Components are flexible and can be configured with an object.
3. Containers can contain components organized into component trees of any depth.
4. Components can be queried by reference, resolved from DOM elements etc.
5. Concepts such as column, editor, model, store are almost identical to how things work in Ext Gantt.
6. In Ext Gantt there are both plugins and features - in Bryntum Gantt everything is a feature. Features can
also enabled / disabled at runtime.
7. The event system is almost identical: events are triggered, and can be listened to with the `on` method which returns
   a detacher function.

You can download the migrated example app [here](https://bryntum.com/playpen/migrating_from_extjs_to_vanilla.zip).

For more information please refer to our other guides and docs and if you find yourself stuck while migrating,
please ask for help in our <a href="https://bryntum.com/forum">forums</a> and we will do our best to assist you.


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>