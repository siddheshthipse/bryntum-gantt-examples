# Gantt event scheduling

## Manually scheduled events

An event can be either **automatically** (default) or **manually** scheduled. This is defined by the [manuallyScheduled](#Gantt/model/TaskModel#field-manuallyScheduled) event flag.
Events that are manually scheduled are not affected by the automatic rescheduling process, they are meant to be adjusted manually by a user.

## Inactive tasks

Please note that any event can be excluded from the scheduling process by deactivating it.
This can be done by setting its [inactive](#Gantt/model/TaskModel#field-inactive) field to `true`.
Such **inactive events** do not push their linked tasks nor do they rollup their attributes to parent events.

## Automatic event scheduling

The Gantt scheduling engine will update start and end dates of automatically scheduled events based on their constraints, links and position in the task hierarchy.
This means that the [startDate](#Gantt/model/TaskModel#field-startDate) and [endDate](#Gantt/model/TaskModel#field-endDate) will be revalidated and
might be recalculated as soon as the event is added or loaded to a project.

### Project direction

The Gantt engine supports both forward and backward scheduling, controlled by
 the [project direction](#Gantt/model/ProjectModel#field-direction) config.

#### Forward scheduled project

In a forward scheduled project (default), the Gantt engine schedules events as soon as possible (ASAP).
For such projects, the [start date](#Gantt/model/ProjectModel#field-startDate) is mandatory and sets an implicit [Start no earlier than](#Gantt/model/TaskModel#field-constraintType) constraint
(see constraint details in below chapters) inherited by all events. This means any event having no restrictions will fall back to that date.

The [end date](#Gantt/model/ProjectModel#field-endDate) of a forward scheduled project is a calculated value equal to the latest [end date](#Gantt/model/TaskModel#field-endDate) of its events.

#### Backward scheduled project

In a backward scheduled project, the Gantt engine schedules events as late as possible (ALAP).
In such a project, the [end date](#Gantt/model/ProjectModel#field-endDate) value is mandatory and the [start date](#Gantt/model/ProjectModel#field-startDate) is calculated as the earliest [start date](#Gantt/model/TaskModel#field-startDate) of the project events.
The project [end date](#Gantt/model/ProjectModel#field-endDate) creates an implicit [Finish no later than](#Gantt/model/TaskModel#field-constraintType) constraint inherited by all events.
This means that any event with no restrictions will fall back to finish on that date.

### Propagating changes through event dependencies

When an Event changes, its linked tasks will be rescheduled automatically.
In forward scheduled projects, successors react on their predecessor changes and in backward scheduled projects,
the predecessors react to changes made in their successors.

How dependent events will be updated after a modification depends on the [dependency type](#Gantt/model/DependencyModel#field-type).
The Gantt engine supports the following four types of dependencies:

- Finish-to-Start (default)
- Start-to-Start
- Finish-to-Finish
- Start-to-Finish

#### Finish-to-Start

<img src="engine/media/dependency-fs.png" alt="Finish-to-Start dependency" class="b-">

The default type of a dependency is "Finish-to-Start" (FS). This type of dependency restricts the dependent event
to not start earlier than the end date of the preceding event.

#### Start-to-Start

<img src="engine/media/dependency-ss.png" alt="Start-to-Start dependency" class="b-">

With this dependency type, the succeeding event is delayed to not start earlier than the start of the preceding event.

#### Finish-to-Finish

<img src="engine/media/dependency-ff.png" alt="Finish-to-Finish dependency" class="b-">

The succeeding event cannot finish before the completion of the preceding event.

#### Start-to-Finish

<img src="engine/media/dependency-sf.png" alt="Start-to-Finish dependency" class="b-">

The finish of the succeeding event is constrained by the start of the preceding event. The successor cannot finish
before the predecessor starts.

#### Dependency lead and lag

A [dependency](#Gantt/model/DependencyModel) can have a [lag (or lead)](#Gantt/model/DependencyModel#field-lag) value which
can delay the succeeding event by the number of [lag units](#Gantt/model/DependencyModel#field-lagUnit) specified.

<img src="engine/media/dependency-lag.png" alt="Dependency lag" class="b-">

Lead (or "negative lag") will accelerate the succeeding event by the number of time units specified.

<img src="engine/media/dependency-lead.png" alt="Dependency lead" class="b-">

**Please note**, the [lag](#Gantt/model/DependencyModel#field-lag) value specifies the amount of **working time**. The
calendar controlling which time to use is defined by the [calendar](#Gantt/model/DependencyModel#field-calendar) field. By
 default, the successor calendar is used.

### Event constraint effect on the scheduling

An event constraint defines boundaries for the schedulable date range of an event and it is taken into account
 when the engine schedules the project events.

A constraint is a combination of two event properties: [constraintType](#Gantt/model/TaskModel#field-constraintType) and [constraintDate](#Gantt/model/TaskModel#field-constraintDate).
The date range specified by a constraint, restricts the event start / end dates to be **not earlier than**,
**not later than** or **equal** to the provided [constraintDate](#Gantt/model/TaskModel#field-constraintDate).

As mentioned above, an event having no restrictions is scheduled on the project start for forward projects
(and on the project end date for backward projects). When an event is manually dragged by a user in a Gantt chart,
the Gantt enforces the position by setting a constraint on the event.
In a forward scheduled project it uses:

 - [Start no earlier than](#Gantt/model/TaskModel#field-constraintType) (SNET) constraint when the event is moved by changing its [start date](#Gantt/model/TaskModel#field-startDate)
 - [Finish no earlier than](#Gantt/model/TaskModel#field-constraintType) (FNET) constraint when the event is moved by changing its [end date](#Gantt/model/TaskModel#field-endDate).

And for a backward scheduled project it uses:

 - [Start no later than](#Gantt/model/TaskModel#field-constraintType) (SNLT) constraint when the event is moved by changing its [start date](#Gantt/model/TaskModel#field-startDate)
 - [Finish no later than](#Gantt/model/TaskModel#field-constraintType) (FNLT) constraint when the event is moved by changing its [end date](#Gantt/model/TaskModel#field-endDate).

The way a constraint affects an event depends on its [type](#Gantt/model/TaskModel#field-constraintType). There are two group of
constraints available:

- Inflexible constraints.
- Semi-flexible constraints.

#### Inflexible constraints

There are two constraint types in this group: [Must start on](#Gantt/model/TaskModel#field-constraintType) (MSO) and [Must finish on](#Gantt/model/TaskModel#field-constraintType) (MFO).
They force an event to start / finish exactly on the [date](#Gantt/model/TaskModel#field-constraintDate) provided.

#### Semi-flexible constraints

These constraints share the same priority with event dependencies. They all work together respecting the event working time:

- [Start no earlier than](#Gantt/model/TaskModel#field-constraintType) (SNET) - restricts the event to start on or after the specified date.
- [Finish no earlier than](#Gantt/model/TaskModel#field-constraintType) (FNET) - restricts the event to finish on or after the specified date.
- [Start no later than](#Gantt/model/TaskModel#field-constraintType) (SNLT) - restricts the event to start before (or on) the specified date.
- [Finish no later than](#Gantt/model/TaskModel#field-constraintType) (FNLT) - restricts the event to finish before (or on) the specified date.

Effectively, the event start/end dates are calculated as aggregated values taking into account both dependencies
and such constraints. The earliest start date for an event is computed as the latest of the earliest start allowed by
its constraint and the earliest start allowed by its dependencies.

An example: Event A has two incoming dependencies which don't allow it to start earlier than _01/18/2017_ and the event
has a SNET constraint which forces it to start not earlier than _01/17/2017_. In this case, the resulting earliest
start date of the event is _01/18/2017_. If we change the constraint date to _01/19/2017_ the resulting earliest start
date will become _01/19/2017_.

## Taking into account the project hierarchy

When scheduling events, the Gantt engine takes the hierarchy into account by following these two principles:

- Each event inherits its parent (_summary_) event restrictions (dependencies and constraints).
- A summary event [start date](#Gantt/model/TaskModel#field-startDate) and [end date](#Gantt/model/TaskModel#field-endDate) should match the minimum
[start date](#Gantt/model/TaskModel#field-startDate) and maximum [end date](#Gantt/model/TaskModel#field-endDate) of its children respectively. Its
[effort](#Gantt/model/TaskModel#field-effort) equals the sum of the [effort](#Gantt/model/TaskModel#field-effort) values of all its children.

The [% completed](#Gantt/model/TaskModel#field-percentDone) value of a parent event is calculated based on its children's progress. It is determined by dividing the sum of each child's completed duration by the total duration of all children. The completed duration for each child is obtained by multiplying its individual percentage completion value by its duration.

To explain this more, consider the following example:
<img src="engine/media/gantt-chart.png" alt="Gantt Chart" class="b-">

It has the following values:

| Cell                  | Duration | Complete Duration |
| ---------             | -------- | ----------------- |
| Contact designers     | 5        | 350               |
| Shortlist designers   | 3        | 180               |
| Review design         | 2        | 100               |
| Inform management...  | 0        | 0                 |
| Apply design...       | 7        | 0                 |
| **Sum of all**        | 17       | 630               |

Next, divide the sum of complete duration by sum of duration
(`630/17`), which will result in **37%**.

**FYI:** calculation of % done for parent tasks can be disabled by setting
[autoCalculatePercentDoneForParentTasks](#Gantt/model/ProjectModel#field-autoCalculatePercentDoneForParentTasks) to `false`.

Following the above rules, the Gantt engine recalculates summary events when their children are updated. The same
goes for the reverse case, child events will react to changes to constraints and dependencies of their parents.

## Event scheduling mode

Unlike the dependencies and constraints affecting the event position on the time axis,
the [scheduling mode](#Gantt/model/TaskModel#field-schedulingMode) specifies how the event´s own properties depend on each other.
It defines which properties are **fixed** (provided by user) and which ones should be **calculated**.

There are four [scheduling modes](#Gantt/model/TaskModel#field-schedulingMode) available in the Gantt engine:

 - Normal (default mode).
 - Fixed Duration
 - Fixed Effort
 - Fixed Units

There is also an additional [effortDriven](#Gantt/model/TaskModel#field-effortDriven) flag allowing to fix
 the [event effort](#Gantt/model/TaskModel#field-effort) value. When set, it tells the event to preserve its [effort](#Gantt/model/TaskModel#field-effort)
 value and instead recalculate other properties.

### Normal

In the Normal mode (default), the event is scheduled based on information about its start / end dates.
The event [effort](#Gantt/model/TaskModel#field-effort) and [assignments](#Gantt/model/TaskModel#field-assigned) are not calculated in this mode.

This mode is always used for summary events.

The [effortDriven](#Gantt/model/TaskModel#field-effortDriven) flag is not used in this mode.

### Fixed Duration

Fixed Duration mode means that the event has fixed [start](#Gantt/model/TaskModel#field-startDate) and [end](#Gantt/model/TaskModel#field-endDate) dates
and [duration](#Gantt/model/TaskModel#field-duration), but its [effort](#Gantt/model/TaskModel#field-effort) is computed dynamically
based on the assigned resources.

A typical example of such an event is a meeting. Meetings typically have pre-defined start and end dates and the
more people are participating in the meeting, the more effort is spent on the event.
When duration of such event increases, its effort gets increased too.

Changes to the [effort](#Gantt/model/TaskModel#field-effort) of such an event will cause assignment units recalculation and vice-versa
(assignments change will cause recalculation of the [effort](#Gantt/model/TaskModel#field-effort)).

Enabling [effortDriven](#Gantt/model/TaskModel#field-effortDriven) for an event will change that behavior and force the event to
**always** recalculate its assignment units whenever the event changes its [duration](#Gantt/model/TaskModel#field-duration) or
[effort](#Gantt/model/TaskModel#field-effort).

**NOTE:** calculations provided by this mode work only if the event has at least one resource assigned.

### Fixed Effort

Fixed Effort mode means that event has a fixed [effort](#Gantt/model/TaskModel#field-effort) and computed [duration](#Gantt/model/TaskModel#field-duration).
The more resources are assigned to the event, the less the [duration](#Gantt/model/TaskModel#field-duration) will be.

A typical example is a "paint the walls" task - several painters will complete it faster.

Enabling the [effortDriven](#Gantt/model/TaskModel#field-effortDriven) flag makes no sense in this mode.

**NOTE:** calculations provided by this mode work only if the event has at least one resource assigned.

### Fixed Units

Fixed Units mode means, that event has fixed [assignments](#Gantt/model/TaskModel#field-assigned) and computed [duration](#Gantt/model/TaskModel#field-duration)
or [effort](#Gantt/model/TaskModel#field-effort).

Changes to the [effort](#Gantt/model/TaskModel#field-effort) of such an event will cause [duration](#Gantt/model/TaskModel#field-duration) recalculation and
vice-versa ([duration](#Gantt/model/TaskModel#field-duration) change will cause recalculation of [effort](#Gantt/model/TaskModel#field-effort)).

Changes of the [assignment](#Gantt/model/TaskModel#field-assigned) of such an event will cause [effort](#Gantt/model/TaskModel#field-effort) recalculation
and [duration](#Gantt/model/TaskModel#field-duration) recalculation if the [effortDriven](#Gantt/model/TaskModel#field-effortDriven) flag is enabled.

**NOTE:** calculations provided by this mode work only if the event has at least one resource assigned.


<p class="last-modified">Last modified on 2024-05-21 9:52:03</p>