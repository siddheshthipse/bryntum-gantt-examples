# Scheduler Pro features

Features are classes that add functionality to the Scheduler Pro. The purpose of this guide is to give an overview of
the features that ships with Scheduler Pro and show how you can configure them.

Bryntum Scheduler Pro is based on the [Bryntum Grid](https://bryntum.com/products/grid/) and inherit from it various
extra functionality, like cell editing, column resizing, etc. Such extra functionality is called "feature". Please refer
to [this guide](#Grid/guides/basics/features.md) for general information about using the features in the Bryntum Grid.

If you want to create a custom feature, head over to [GridFeatureManager](#Grid/feature/GridFeatureManager) docs.

## Features in the box

Bryntum Scheduler Pro comes with the following features included:

### CalendarHighlight ([API docs](#SchedulerPro/feature/CalendarHighlight))

This feature temporarily visualizes calendars for the event or resource calendar (controlled by the calendar config).

This feature is **disabled** by default.

### CellEdit ([API docs](#SchedulerPro/feature/CellEdit))

Extends the CellEdit to encapsulate SchedulerPro functionality.

This feature is **enabled** by default.

### Dependencies ([API docs](#SchedulerPro/feature/Dependencies))

This feature implements support for project transactions and is used by default in Scheduler Pro.

This feature is **enabled** by default.

### DependencyEdit ([API docs](#SchedulerPro/feature/DependencyEdit))

Feature that displays a popup containing fields for editing dependency data.

This feature is **disabled** by default.

### EventBuffer ([API docs](#SchedulerPro/feature/EventBuffer))

Feature that allows showing additional time before & after an event, to visualize things like travel time - or the time
you need to prepare a room for a meeting + clean it up after.

This feature is **disabled** by default.

### EventResize ([API docs](#SchedulerPro/feature/EventResize))

Feature that allows resizing an event by dragging its end.

This feature is **enabled** by default.

### EventSegmentDrag ([API docs](#SchedulerPro/feature/EventSegmentDrag))

Allows user to drag and drop event segments within the row.

This feature is **enabled** by default.

### EventSegmentResize ([API docs](#SchedulerPro/feature/EventSegmentResize))

Feature that allows resizing an event segment by dragging its end.

This feature is **enabled** by default.

### EventSegments ([API docs](#SchedulerPro/feature/EventSegments))

This feature provides segmented events support. It implements rendering of such events and also adds a entries to the
event context menu allowing to split the selected event and rename segments.

This feature is **enabled** by default.

### NestedEvents ([API docs](#SchedulerPro/feature/NestedEvents))

A feature that renders child events nested inside their parent. Requires Scheduler Pro to use a tree event store (
normally handled automatically when events in data has children).

This feature is **disabled** by default.

### PercentBar ([API docs](#SchedulerPro/feature/PercentBar))

This feature visualizes the percentDone field as a progress bar on the event elements. Each progress bar also optionally
has a drag handle which users can drag can change the value.

This feature is **disabled** by default.

### ResourceNonWorkingTime ([API docs](#SchedulerPro/feature/ResourceNonWorkingTime))

Feature that highlights the non-working intervals for resources based on their calendar.

This feature is **disabled** by default.

### TaskEdit ([API docs](#SchedulerPro/feature/TaskEdit))

Feature that displays a Task editor, allowing users to edit task data.

This feature is **enabled** by default.

### TimeSpanHighlight ([API docs](#SchedulerPro/feature/TimeSpanHighlight))

This feature exposes methods on the owning timeline widget which you can use to highlight one or multiple time spans in
the schedule.

This feature is **disabled** by default.

### Versions ([API docs](#SchedulerPro/feature/Versions))

Captures versions (snapshots) of the active project, including a detailed log of the changes new in each version.

This feature is **disabled** by default.

## Importing features from sources

A feature is registered when the application imports it. When using the regular module/umd bundle, this is done
automatically, as the bundle encapsulates all code inside. However, when utilizing sources or thin bundles, a feature
might not be imported by default. For any feature not enabled by default, it is essential to ensure that you have
imported it to be able to use it.

Example:

```javascript
import SchedulerPro from 'PATH_TO_SOURCE/SchedulerPro/view/SchedulerPro.js';
import 'PATH_TO_SOURCE/SchedulerPro/feature/Baselines.js';

const SchedulerPro = new SchedulerPro({
    features : {
        baselines : {
            // feature config
        }
    }
});
```

<p class="last-modified">Last modified on 2024-05-21 9:05:01</p>