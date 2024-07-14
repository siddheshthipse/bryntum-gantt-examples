# Gantt features

Features are classes that add functionality to the Gantt. The purpose of this guide is to give an overview of the
features that ships with Gantt and show how you can configure them.

Bryntum Gantt is based on the Bryntum Grid ([API docs](https://bryntum.com/products/grid/)) and inherit from it various
extra functionality, like cell editing, column resizing, etc. Such extra functionality is called "feature". Please refer
to this guide ([API docs](#Grid/guides/basics/features.md)) for general information about using the features in the
Bryntum Grid.

If you want to create a custom feature, head over to [GridFeatureManager](#Grid/feature/GridFeatureManager) docs.

## Features in the box

In addition to the features in Grid, Gantt also comes with the following features included:

### Baselines ([API docs](#Gantt/feature/Baselines))

Displays a task's baselines below the tasks in the timeline.

This feature is **disabled** by default.

### CellEdit ([API docs](#Gantt/feature/CellEdit))

Extends the CellEdit to encapsulate Gantt functionality.

This feature is **enabled** by default.

### CriticalPaths ([API docs](#Gantt/feature/CriticalPaths))

This feature highlights the project critical paths.

This feature is **enabled** by default.

### Dependencies ([API docs](#Gantt/feature/Dependencies))

Draws dependency lines between tasks in the Gantt chart.

This feature is **enabled** by default.

### Indicators ([API docs](#Gantt/feature/Indicators))

The Indicators feature displays indicators (icons) for different dates related to a task in its row.

This feature is **disabled** by default.

### Labels ([API docs](#Gantt/feature/Labels))

Specialized version of the Labels feature for Scheduler, that handles labels for tasks in Gantt.

This feature is **disabled** by default.

### MspExport [API Docs](#Gantt/feature/export/MspExport)

A feature that allows exporting Gantt to Microsoft Project without involving a server.

This feature is **disabled** by default.

### ParentArea ([API docs](#Gantt/feature/ParentArea))

Highlights the area encapsulating all child tasks of a parent task in a semi-transparent layer.

This feature is **disabled** by default.

### PdfExport [API Docs](#Gantt/feature/export/PdfExport)

Generates PDF/PNG files from the Gantt component.

This feature is **disabled** by default.

### Print [API Docs](#Gantt/feature/export/Print)

Allows printing Gantt contents using browser print dialog.

This feature is **disabled** by default.

### ProgressLine ([API docs](#Gantt/feature/ProgressLine))

This feature draws project progress line with SVG lines.

This feature is **disabled** by default.

### ProjectLines ([API docs](#Gantt/feature/ProjectLines))

Draws two vertical lines in the timeline area to highlight project start/end dates.

This feature is **enabled** by default.

### Rollups ([API docs](#Gantt/feature/Rollups))

If the task's rollup data field is set to true, it displays a small bar or diamond below its summary task in the
timeline.

This feature is **disabled** by default.

### ScrollButtons ([API docs](#Gantt/feature/ScrollButtons))

This feature injects buttons in each row that scrolls the task bar into view.

This feature is **disabled** by default.

### Summary ([API docs](#Gantt/feature/Summary))

A feature displaying a summary bar in the grid footer.

This feature is **disabled** by default.

### TaskCopyPaste ([API docs](#Gantt/feature/TaskCopyPaste))

Allow using `[Ctrl/CMD + C/X]` and `[Ctrl/CMD + V]` to copy/cut and paste tasks.

This feature is **enabled** by default.

### TaskDrag ([API docs](#Gantt/feature/TaskDrag))

Allows user to drag tasks in the timeline, to update the start date.

This feature is **enabled** by default.

### TaskDragCreate ([API docs](#Gantt/feature/TaskDragCreate))

Allows user to schedule an unscheduled task by dragging in its empty timeline row area.

This feature is **enabled** by default.

### TaskEdit ([API docs](#Gantt/feature/TaskEdit))

Shows a dialog allowing user to edit the task information.

This feature is **enabled** by default.

### TaskMenu ([API docs](#Gantt/feature/TaskMenu))

Equips the Gantt chart with a customizable context menu (available on right click).

This feature is **enabled** by default.

### TaskNonWorkingTime ([API docs](#Gantt/feature/TaskNonWorkingTime))

Feature highlighting the non-working time intervals for tasks, based on their calendar.

This feature is **disabled** by default.

### TaskResize ([API docs](#Gantt/feature/TaskResize))

Allows a user to "resize" (change the duration) of the task, by dragging its end date.

This feature is **enabled** by default.

### TaskSegmentDrag ([API docs](#Gantt/feature/TaskSegmentDrag))

Allows user to drag and drop task segments, to change their start date.

This feature is **enabled** by default.

### TaskSegmentResize ([API docs](#Gantt/feature/TaskSegmentResize))

Feature that allows resizing a task segment by dragging its end.

This feature is **enabled** by default.

### TaskTooltip ([API docs](#Gantt/feature/TaskTooltip))

Displays some task information in a tooltip when hovering the task bar

This feature is **enabled** by default.

### TreeGroup ([API docs](#Gantt/feature/TreeGroup))

Extends Grid's TreeGroup (follow the link for more info) feature to enable using it with Gantt.

This feature is **disabled** by default.

### Versions ([API docs](#Gantt/feature/Versions))

Captures versions (snapshots) of the active project, including a detailed log of the changes new in each version.

This feature is **disabled** by default.

Gantt can also use the following features from Scheduler:

### ColumnLines ([API docs](#Scheduler/feature/ColumnLines))

Draws lines at the columns (ticks) in the timeaxis. Major ticks can have a different color than normal.

This feature is **enabled** by default.

The demo below shows the default ColumnLines configuration, note the darker line between weeks:

<div class="external-example" data-file="Scheduler/guides/schedulerfeatures/ColumnLines.js"></div>

### HeaderZoom [API Docs](#Scheduler/feature/HeaderZoom)

Enables users to click and drag to zoom to a date range in Scheduler's header time axis. Only supported in horizontal
mode.

This feature is **disabled** by default.

### NonWorkingTime ([API docs](#Scheduler/feature/NonWorkingTime))

Can be used to highlight weekends or other non working days. By default gives them a grayish background color, to
distinguish them from normal days.

This feature is **disabled** by default.

Note that saturday and sunday have a tinted background in the demo:

<div class="external-example" data-file="Scheduler/guides/schedulerfeatures/NonWorkingTime.js"></div>

### Pan [API Docs](#Scheduler/feature/Pan)

Makes the scheduler's timeline pannable by dragging with the mouse. Try it out in the demo below.

This feature is **disabled** by default.

### TimeAxisHeaderMenu ([API docs](#Scheduler/feature/TimeAxisHeaderMenu))

Displays a context menu for the timeaxis header. The menu is populated by other features.

This feature is **enabled** by default.

Right click on the timeaxis header to display the context menu:

<div class="external-example" data-file="Scheduler/guides/schedulerfeatures/TimeAxisHeaderMenu.js"></div>

### TimeRanges ([API docs](#Scheduler/feature/TimeRanges))

Add highlighted time ranges (lines and zones) to the schedule. Can also display a line showing the current time.

This feature is **disabled** by default.

Drag the handles in the header to resize or move (with SHIFT) then TimeRange:
<div class="external-example" data-file="Scheduler/guides/schedulerfeatures/TimeRanges.js"></div>

## Importing features from sources

A feature is registered when the application imports it. When using the regular module/umd bundle, this is done
automatically, as the bundle encapsulates all code inside. However, when utilizing sources or thin bundles, a feature
might not be imported by default. For any feature not enabled by default, it is essential to ensure that you have
imported it to be able to use it.

Example:

```javascript
import Gantt from 'PATH_TO_SOURCE/Gantt/view/Gantt.js';
import 'PATH_TO_SOURCE/Gantt/feature/Baselines.js';

const gantt = new Gantt({
    features : {
        baselines : {
            // feature config
        }
    }
});
```

<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>