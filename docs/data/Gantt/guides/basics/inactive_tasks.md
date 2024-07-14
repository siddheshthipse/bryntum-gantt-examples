# Inactive tasks

## Introduction

A task has a [special boolean field](#Gantt/model/TaskModel#field-inactive) that makes it **inactive**.
It allows user to keep certain tasks in the project plan while disabling their effect on the scheduling.
Helpful for example when using a common project pattern for multiple cases so tasks not needed in some individual project can be deactivated while keeping the project's general structure.

**Inactive tasks** are excluded from the scheduling process so they cannot affect regular **active tasks**.
They don't push their **active** successors (but still push **inactive ones**) and don't roll up their attributes ([startDate](#Gantt/model/TaskModel#field-startDate),
[endDate](#Gantt/model/TaskModel#field-endDate), [percentDone](#Gantt/model/TaskModel#field-percentDone) and
[effort](#Gantt/model/TaskModel#field-effort)) to their **active parents** (but still do that for **inactive ones**).

Activating or deactivating a summary task also toggles the state of all its children.
Activating a child task in turn activates its summary tasks and deactivating **all child tasks** also deactivates
their summary task.

Inactive tasks do not affect resource allocation and thus aren't taken into account by the [resource histogram](#SchedulerPro/view/ResourceHistogram).

## Visual representation of inactive tasks

The Gantt displays the tasks strike-out in the left part of the grid and gray colored in the time axis part.

<div class="external-example" data-file="Gantt/guides/whats-new/4.3.0/inactive_tasks.js"></div>

## Turning a task into inactive

To make a task inactive on the data level, set its
[inactive](#Gantt/model/TaskModel#field-inactive) field:

```js
// make the task inactive
task.inactive = true
```

Or use the [setInactive](#Gantt/model/TaskModel#function-setInactive) method:

```js
// make the task inactive and wait till rescheduling is done
await task.setInactive(true)

/* here rescheduling is done */
```

On the user interface level it can be done with the [Inactive column](#Gantt/column/InactiveColumn):

<img src="Gantt/inactive_column.png" alt="Inactive column"/>

or with the `Inactive` checkbox in the task editor `Advanced` tab:

<img src="Gantt/inactive_task_editor.png" alt="Inactive checkbox in the task editor"/>

## Critical paths feature

Inactive tasks naturally cannot be a part of any _critical path_ so they are never highlighted by [that feature](#Gantt/feature/CriticalPaths).

<div class="external-example" data-file="Gantt/guides/whats-new/4.3.0/inactive_tasks_critical_paths.js"></div>

## Rollups feature

Inactive task bars are not displayed on their active parent tasks when using the [rollup feature](#Gantt/feature/Rollups).
But inactive task bars are displayed on their inactive parent tasks.

<div class="external-example" data-file="Gantt/guides/whats-new/4.3.0/inactive_tasks_rollups.js"></div>

## Progress line feature

[The feature](#Gantt/feature/ProgressLine) treats inactive tasks as not started and draws the progress line respectively (line is rendered at [statusDate](#Gantt/feature/ProgressLine#config-statusDate) for not started tasks).

<div class="external-example" data-file="Gantt/guides/whats-new/4.3.0/inactive_tasks_progress_line.js"></div>


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>