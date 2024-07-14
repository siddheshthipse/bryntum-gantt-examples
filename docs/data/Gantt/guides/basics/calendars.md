# Calendars

## Introduction

Bryntum Gantt has a powerful calendar system which defines when work on tasks can be performed.

The calendar implementation is very performant, even for a big number of calendars.
This is achieved by using extensive caching of all data and using fast internal data structures.

Calendars can be assigned to a project as well as tasks and resources (see ["Resource calendars"](##resource-calendars) chapter for details on resource calendars effect).
By default, if a task or resource has no explicitly assigned calendar, it uses the [project calendar](#Gantt/model/ProjectModel#field-calendar).
The default calendar of the project (which is used if not configured explicitly) uses 24/7/365 availability.

Calendars are organized in a tree store (see below ["Parent calendars"](##parent-calendars) chapter), which is called
[calendar manager store](#Gantt/data/CalendarManagerStore). It is available as the
[calendarManagerStore](#Gantt/model/ProjectModel#property-calendarManagerStore) property of the project.

Individual calendars are represented by the [CalendarModel](#Gantt/model/CalendarModel) class.
Here is an example of _24 hrs per day, 5 days per week_ calendar creating:
```javascript
new CalendarModel({
    id        : 111,
    name      : "My cool calendar",
    intervals : [
        {
            recurrentStartDate : "on Sat at 0:00",
            recurrentEndDate   : "on Mon at 0:00",
            isWorking          : false
        }
    ]
})
```
The manual calendar construction shown in the above snippet is not needed in most of the cases.
[Calendar manager store](#Gantt/data/CalendarManagerStore) does that job automatically as soon as corresponding objects gets loaded into it.
Further in the guide we demonstrate calendars data as objects regardless of the way they get into the store.

_For details on calendar loading please see [Calendars loading](##calendars-loading) chapter._

## Availability intervals

A calendar consists of a collection of [availability intervals](#Gantt/model/CalendarIntervalModel).
Which can be accessed/loaded via the [CalendarModel.intervals](#Gantt/model/CalendarModel#field-intervals) field.
Here is an example of data representing a calendar which has two intervals:
```json
{
    "id"        : 222,
    "name"      : "calendar #1",
    "intervals" : [
        {
            "recurrentStartDate" : "on Sat at 0:00",
            "recurrentEndDate"   : "on Mon at 0:00",
            "isWorking"          : false
        },
        {
            "startDate"          : "2020-10-02",
            "endDate"            : "2020-10-12",
            "isWorking"          : false
        }
    ]
}
```
And here is one for accessing a calendar's intervals in runtime:
```javascript
// iterate project calendar intervals
for (const i of project.calendar.intervals) {
    console.log(i);
}
```
Calendar intervals can also be added dynamically with [addInterval](#Gantt/model/CalendarModel#function-addInterval) and
[addIntervals](#Gantt/model/CalendarModel#function-addIntervals) methods:
```javascript
// Make 1st Oct 2020 a non working date
calendar.addInterval({
    startDate : new Date(2020, 9, 1),
    endDate   : new Date(2020, 9, 2),
    isWorking : false
})
```

The intervals have a [isWorking](#Gantt/model/CalendarIntervalModel#field-isWorking) field, which defines
whether it represents a working time period (`true` value, is default) or non-working (a holiday or other day off, `false` value).

**Please note** that by default calendars consider any period as working (can be changed with [unspecifiedTimeIsWorking](#Gantt/model/CalendarModel#field-unspecifiedTimeIsWorking))
so configuring a specific calendar essentially means **adding non working intervals**.

An interval could be either **recurrent** (repeating in time), like _"every Saturday at midnight"_ or **static** like _"from 2019/05/01 till 2019/05/02"_.

### Recurrent intervals

Recurrent intervals are meant to be used for repeating periods like (daily working time, lunch breaks, weekends etc.)

A recurrent interval should fill the
[recurrentStartDate](#Gantt/model/CalendarIntervalModel#field-recurrentStartDate) and
[recurrentEndDate](#Gantt/model/CalendarIntervalModel#field-recurrentEndDate) fields.
The fields value should be specified in the format defined by the excellent library for recurrent events: [Later](http://bunkat.github.io/later/).
Please refer to its [documentation](http://bunkat.github.io/later/parsers.html#text) on details.

As an example, let's take a closer look at defining a calendar that should have _8 hrs_ a day
working time for _5 working days_ a week (`Mon` .. `Fri`).
Each day will have 1 hour lunch break so working periods are
`08:00-12:00` and `13:00-17:00`.

Since by default a calendar treats all time as working we invert the above periods to express
proper **non working ranges**.
And in this case only two intervals are needed to achieve that:

- from `12:00` till `13:00` (`weekday` in [Later](https://bunkat.github.io/later/parsers.html#text) syntax
means `Mon`, `Tue`, `Wed`, `Thu` and `Fri` days which is exactly what we need):
```json
{
    "recurrentStartDate" : "every weekday at 12:00",
    "recurrentEndDate"   : "every weekday at 13:00",
    "isWorking"          : false
}
```
- from `17:00` till `08:00` of the next `weekday` (`Mon`, `Tue`, `Wed`, `Thu` or `Fri`):
```json
{
    "recurrentStartDate" : "every weekday at 17:00",
    "recurrentEndDate"   : "every weekday at 08:00",
    "isWorking"          : false
}
```
The above two intervals also make Saturday and Sunday non working days.
It happens since on Friday they add a non working interval starting at `17:00` (due to `every weekday at 17:00` rule)
which finishes only on Monday at `08:00` (due to `every weekday at 08:00` rule, where `weekday` does not include `Sat` nor `Sun` so the next matching time is `Mon 08:00`).

So the overall calendar data will look like this:
```json
{
    "id"           : 555,
    "name"         : "8h / 5d calendar",
    "intervals"    : [
        {
            "recurrentStartDate" : "every weekday at 12:00",
            "recurrentEndDate"   : "every weekday at 13:00",
            "isWorking"          : false
        },
        {
            "recurrentStartDate" : "every weekday at 17:00",
            "recurrentEndDate"   : "every weekday at 08:00",
            "isWorking"          : false
        }
    ]
}
```
And in case we need to apply that working time for a `6 days` week `Mon` .. `Sat` the calendar definition can look like this:
```json
{
    "id"           : 555,
    "name"         : "8h / 6d calendar",
    "intervals" : [
        {
            "recurrentStartDate" : "on Mon, Tue, Wed, Thu, Fri, Sat at 12:00",
            "recurrentEndDate"   : "on Mon, Tue, Wed, Thu, Fri, Sat at 13:00",
            "isWorking"          : false
        },
        {
            "recurrentStartDate" : "on Mon, Tue, Wed, Thu, Fri, Sat at 17:00",
            "recurrentEndDate"   : "on Mon, Tue, Wed, Thu, Fri, Sat at 08:00",
            "isWorking"          : false
        }
    ]
}
```
See more details in [Later syntax docs](https://bunkat.github.io/later/parsers.html#text).

**Please note** that an interval can be **either** static or recurring. It is not valid to have filled both
[startDate](#Gantt/model/CalendarIntervalModel#field-startDate)/[endDate](#Gantt/model/CalendarIntervalModel#field-endDate)
and
[recurrentStartDate](#Gantt/model/CalendarIntervalModel#field-recurrentStartDate)/[recurrentEndDate](#Gantt/model/CalendarIntervalModel#field-recurrentEndDate) fields.

### Static intervals

An example of a static interval could be a day-off, a vacation or some other period defined with specific dates.

A static interval should have [startDate](#Gantt/model/CalendarIntervalModel#field-startDate) and
[endDate](#Gantt/model/CalendarIntervalModel#field-endDate) values provided with specific dates.

Here is a static interval data example making days from `2020-10-02 00:00` till `2020-10-12 00:00` non working:
```json
{
    "id"        : 123,
    "startDate" : "2020-10-02",
    "endDate"   : "2020-10-12",
    "isWorking" : false,
    "name"      : "Vacation"
}
```

### Intersecting intervals

Consider the following calendar definition with 2 intervals:
```javascript
{
    id        : 1,
    name      : 'My Calendar',
    intervals : [
        {
            recurrentStartDate : 'at 08:00',
            recurrentEndDate   : 'at 16:00',
            isWorking          : true
        },
        {
            recurrentStartDate : 'on Sat at 00:00',
            recurrentEndDate   : 'on Mon at 00:00',
            isWorking          : false
        }
    ],
    unspecifiedTimeIsWorking : false
}
```

The intention is to define a calendar with "normal" working time `08:00-16:00` and non-working weekend days. However,
the intervals intersects - for weekend days, the timespan `08:00-16:00` presents in both intervals, 
with the different `isWorking` flag. 

Which interval "wins" in such case of intersection is defined by the following rules:

- Intervals from the child calendar always wins over the parent's
- Static intervals wins over the recurrent intervals (in the same calendar)
- Between the static intervals of the calendar, the one with bigger [priority](#Gantt/model/CalendarIntervalModel#field-priority) field
  value wins over the one with smaller [priority](#Gantt/model/CalendarIntervalModel#field-priority) field value.
- Between the static intervals of the calendar with the same `priority`, the one with bigger index wins over the one with smaller index
  ("last win")
- Between the recurrent intervals of the calendar, the one with bigger [priority](#Gantt/model/CalendarIntervalModel#field-priority) field
  value wins over the one with smaller [priority](#Gantt/model/CalendarIntervalModel#field-priority) field value
- Between the recurrent intervals of the calendar with the same `priority`, the ones with bigger index wins over the ones with smaller index
  ("last win")


## Calendars and duration values

Task [duration](#Gantt/model/TaskModel#field-duration) is amount of **working time** between the task [start](#Gantt/model/TaskModel#field-startDate) and [end](#Gantt/model/TaskModel#field-endDate) dates.
Duration value consists of its [magnitude](#Gantt/model/TaskModel#field-duration) and [unit](#Gantt/model/TaskModel#field-durationUnit).
The project has special settings for duration units (which also apply to other *duration-type* values including [effort](#Gantt/model/TaskModel#field-effort), [slack](#Gantt/model/TaskModel#field-totalSlack) and [lag](#Gantt/model/DependencyModel#field-lag)):

- [hoursPerDay](#Gantt/model/ProjectModel#field-hoursPerDay) - defines how many hours `1 day` contains
- [daysPerWeek](#Gantt/model/ProjectModel#field-daysPerWeek) - defines how many days `1 week` contains
- [daysPerMonth](#Gantt/model/ProjectModel#field-daysPerMonth) - defines how many days `1 month` contains

So all duration values in the project are **always** expressed using the above unit settings
and since they are **working time** they naturally depend on calendars.

Let's take a closer look at how a calendar and the above project settings work together when a task gets scheduled:

For example, there is a project that has [hoursPerDay](#Gantt/model/ProjectModel#field-hoursPerDay) set to `8` (so `1 day` means `8 hours`).
It contains a task that starts `2020-10-07 08:00`, finishes `2020-10-07 17:00` and has `1 day` duration.
The task uses calendar that has `08:00-12:00`, `13:00-17:00` working time, for 5 days a week (`Mon`, `Tue`, `Wed`, `Thu` and `Fri`).

*Example 1:*

We set `2 days` [duration](#Gantt/model/TaskModel#field-duration) to the task.
Then the Gantt calculates the task new [end date](#Gantt/model/TaskModel#field-endDate) following these steps:

1. It uses [hoursPerDay](#Gantt/model/ProjectModel#field-hoursPerDay) value (which is `8`) and converts `2 days` to `16 hours` (`2 * 8 = 16`)
2. It starts iterating from the task start date over the working intervals provided by the calendar:
    - `2020-10-07` `08:00 - 12:00` - It sums up the intervals duration: `+4 hours`
    - `2020-10-07` `13:00 - 17:00` - `4 + 4 = 8 hours`
    - `2020-10-08` `08:00 - 12:00` - `8 + 4 = 12 hours`
    - `2020-10-08` `13:00 - 17:00` - `12 + 4 = 16 hours`.
3. At this point the iterating stops. It has accumulated the provided `16 hours` duration and it happened at `2020-10-08 17:00` which
   is our calculated end date value.

*Example 2:*

We set the task [end date](#Gantt/model/TaskModel#field-endDate) to `2020-10-09 17:00`.
Then the Gantt calculates the task new [duration](#Gantt/model/TaskModel#field-duration) following these steps:

1. It starts iterating from the task start date over the working intervals provided by the calendar:
    - `2020-10-07` `08:00 - 12:00` - It sums up the intervals duration: `+4 hours`
    - `2020-10-07` `13:00 - 17:00` - `4 + 4 = 8 hours`
    - `2020-10-08` `08:00 - 12:00` - `8 + 4 = 12 hours`
    - `2020-10-08` `13:00 - 17:00` - `12 + 4 = 16 hours`.
    - `2020-10-09` `08:00 - 12:00` - `16 + 4 = 20 hours`
    - `2020-10-09` `13:00 - 17:00` - `20 + 4 = 24 hours`.
2. At this point the iterating stops. It reaches the provided `2020-10-09 17:00` [end date](#Gantt/model/TaskModel#field-endDate)
   and has accumulated `24 hours` as new duration value.
3. The Gantt converts `24 hours` to `days` unit that was used by the task initially.
   So it uses [hoursPerDay](#Gantt/model/ProjectModel#field-hoursPerDay) value (which is `8`)
   and converts `24 hours` to `3 days` (`24 / 8 = 3`)

### Project calendar best practices

A project might have multiple calendars with own working hours configuration in each of them.
All tasks and resources use the [project calendar](#Gantt/model/ProjectModel#field-calendar) by default so good practice is configuring the most often used calendar
as the [project one](#Gantt/model/ProjectModel#field-calendar).

The project duration units ([hoursPerDay](#Gantt/model/ProjectModel#field-hoursPerDay), [daysPerWeek](#Gantt/model/ProjectModel#field-daysPerWeek) and [daysPerMonth](#Gantt/model/ProjectModel#field-daysPerMonth))
are normally configured to match the [project calendar](#Gantt/model/ProjectModel#field-calendar) daily/weekly/monthly working time availability.

*For example:*

Here is a part of project load response showing the described above _8hrs/day_ calendar data.
Since the project calendar has two intervals providing `8hrs` of working time a day it sets [hoursPerDay](#Gantt/model/ProjectModel#field-hoursPerDay) to `8`,
[daysPerWeek](#Gantt/model/ProjectModel#field-daysPerWeek) to `5` (since the calendar has 5 working days a week),
and [daysPerMonth](#Gantt/model/ProjectModel#field-daysPerMonth) to `20` (an average amount of working days per month):

```json
{
  "success": true,
  "project": {
    "calendar": 777,
    "startDate": "2020-01-14",
    "hoursPerDay": 8,
    "daysPerWeek": 5,
    "daysPerMonth": 20
  },
  "calendars": {
    "rows": [
      {
        "id": 777,
        "name": "Default",
        "intervals": [
          {
            "recurrentStartDate": "every weekday at 12:00",
            "recurrentEndDate": "every weekday at 13:00",
            "isWorking": false
          },
          {
            "recurrentStartDate": "every weekday at 17:00",
            "recurrentEndDate": "every weekday at 08:00",
            "isWorking": false
          }
        ]
      }
    ]
  }
}
```

In case of a _24hrs/day_ project calendar [hoursPerDay](#Gantt/model/ProjectModel#field-hoursPerDay) should be set to 24 respectively:

```json
{
  "success": true,
  "project": {
    "calendar": "general",
    "startDate": "2020-01-14",
    "hoursPerDay": 24,
    "daysPerWeek": 5,
    "daysPerMonth": 20
  },
  "calendars": {
    "rows": [
      {
        "id": "general",
        "name": "General",
        "intervals": [
          {
            "recurrentStartDate": "on Sat at 0:00",
            "recurrentEndDate": "on Mon at 0:00",
            "isWorking": false
          }
        ]
      }
    ]
  }
}
```

In the above snippet [daysPerWeek](#Gantt/model/ProjectModel#field-daysPerWeek) and [daysPerMonth](#Gantt/model/ProjectModel#field-daysPerMonth)
are still `5` and `20` respectively since `Sat` and `Sun` are also defined as non working.

## Resource calendars

By default when a task has assigned resources its scheduling takes into account both the task and the resources calendars.
Such a task can perform work only when some of its resources can work and the task calendar allows working.
So technically the Gantt uses the calendars intersection in that case.

*For example:*

There is a task that starts `2020-10-08 08:00` finishes `2020-10-08 12:00` and has `4 hours` duration. The task uses an *8hrs/day* calendar (working time `08:00-12:00`, `13:00-17:00`).

We assign to the task *resource A* with calendar having working time `09:00-13:00`.
The Gantt starts rescheduling the task to take the resource calendar into account.
It iterates over the following working intervals:

- `2020-10-08` `08:00 - 09:00` - Working interval for *resource A*, but non-working for the task calendar. **Skipping it.**
- `2020-10-08` `09:00 - 12:00` - Working interval for the task calendar and resource *A*. Sum up the intervals duration: `+3 hours`.
- `2020-10-08` `12:00 - 13:00` - Working interval for *resource A*, but non-working for the task calendar. **Skipping it.**
- `2020-10-08` `13:00 - 17:00` - Working interval for the task, , but non-working for the *resource A*. **Skipping it.**
- `2020-10-09` `08:00 - 09:00` - Working interval for *resource A*, but non-working for the task calendar. **Skipping it.**
- `2020-10-09` `09:00 - 12:00` - Working interval for the task calendar and resource *A*: `3 + 1 = 4 hours`.

At this point the iterating stops and it results the Gantt changing the task start date to `2020-10-08 09:00`
(the *real* moment the task starts performing work) and end date to `2020-10-09 10:00` (moment when `4 hours` duration was accumulated).

Now we assign to the task another *resource B* with calendar having working time `13:00-17:00`. The Gantt triggers a new round of rescheduling
and iterates over these intervals this time:

- `2020-10-08` `08:00 - 09:00` - Working interval for *resource A*, but non-working for the task calendar. **Skipping it.**
- `2020-10-08` `09:00 - 12:00` - Working interval for the task calendar and *resource A*. Sum up the intervals duration: `+3 hours`.
- `2020-10-08` `12:00 - 13:00` - Working interval for *resource A*, but non-working for the task calendar. **Skipping it.**
- `2020-10-08` `13:00 - 17:00` - Working interval for the task calendar and *resource B*: `3 + 1 = 4 hours`

At this point the iterating stops. It has accumulated the task `4 hours` duration at `2020-10-08 14:00` which
is new end date value.

**Please note** that above logic can be disabled with the
[ignoreResourceCalendar](#Gantt/model/TaskModel#field-ignoreResourceCalendar) field. When the field is set to `true`
on a task, its assigned resource calendars are not taken into account when scheduling. The task gets scheduled
based on its own calendar only.

**Please note** that above does not fully apply to the tasks using [*FixedDuration*](#Gantt/model/TaskModel#field-schedulingMode) scheduling mode.
Such tasks do not take resource calendars into account when calculating duration (yet they do when calculating [effort](#Gantt/model/TaskModel#field-effort) related parameters).


## Parent calendars

Calendars are organized in a tree store, and thus a [CalendarModel](#Gantt/model/CalendarModel) has a regular [parent](http://lh/bryntum-suite/Gantt/docs/#Core/data/mixin/TreeNode#property-parent) property inherited from the [TreeNode](http://lh/bryntum-suite/Gantt/docs/#Core/data/mixin/TreeNode) mixin.
It denotes the "parent" calendar, from which the current calendar inherits availability intervals. The intervals,
defined in the current calendar override the ones from its any parent.

For example below data produces two calendars `Default` (parent) and `Team1 calendar` (child calendar).
`Team1 calendar` automatically inherits non working Saturdays and Sundays defined on `Default` parent calendar.
Besides them `Team1 calendar` defines its own non working period called `Vacation 2020` from `2020-08-14` till `2020-09-14`:

```json
{
  "success": true,
  "...": "...",
  "calendars": {
    "rows": [
      {
        "id": 1,
        "name": "Default",
        "intervals": [
          {
            "id": 5,
            "recurrentStartDate": "on Sat at 0:00",
            "recurrentEndDate": "on Mon at 0:00",
            "isWorking": false
          }
        ],
        "children": [
          {
            "id": 11,
            "name": "Team1 calendar",
            "intervals": [
              {
                "id": 6,
                "name": "Vacation 2020",
                "startDate": "2020-08-14",
                "endDate": "2020-09-14",
                "isWorking": false
              }
            ]
          }
        ]
      }
    ]
  }
}
```


**IMPORTANT**: The [unspecifiedTimeIsWorking](#Gantt/model/CalendarModel#field-unspecifiedTimeIsWorking) field is not inherited. If you've specified it as `false` in the parent calendar and
did not specify in the child, it will get the default value of `true` and you might receive unexpected results.

This structure allows very flexible definitions for calendars, from the most common ones at the top of
the hierarchy to more specific at the bottom. A more specific calendar will only need to define data that is different from its parent.

## Assigning a calendar through the API

To set the calendar of an entity using the data API, use the `setCalendar` method. It is available on the
[ProjectModel](#Gantt/model/ProjectModel#function-setCalendar), [TaskModel](#Gantt/model/TaskModel#function-setCalendar) and
[ResourceModel](#Gantt/model/ResourceModel#function-setCalendar).

This method will trigger a schedule change propagation and returns a `Promise`.

## Calendars loading

[ProjectModel](#Gantt/model/ProjectModel) is able to load all the related data including calendars.
The class implements [Crud Manager protocol](#Gantt/guides/data/crud_manager_project.md). Let's take a closer look at 
the calendars related part of the `load` response.

Calendars data should be provided in `calendars` section
which should have `rows` array where each entry represents an individual calendar.

For example, below load response returns a single calendar called `My calendar`, that makes
days from _Monday_ till _Friday_ working and having 8 working hours per day _08:00-17:00_ (with _12:00-13:00_ break for lunch).
The response sets it as the project calendar and configures duration values matching the calendar (8 hrs per day, 5 days per week and 20 days per month):
```json
{
    "success" : true,

    "project" : {
        "calendar"     : 9999,
        "hoursPerDay"  : 8,
        "daysPerWeek"  : 5,
        "daysPerMonth" : 20
    },

    "calendars" : {
        "rows" : [
            {
                "id"        : 9999,
                "name"      : "My calendar",
                "intervals" : [
                    {
                        "id"                 : 123,
                        "recurrentStartDate" : "every weekday at 12:00",
                        "recurrentEndDate"   : "every weekday at 13:00",
                        "isWorking"          : false
                    },
                    {
                        "id"                 : 456,
                        "recurrentStartDate" : "every weekday at 17:00",
                        "recurrentEndDate"   : "every weekday at 08:00",
                        "isWorking"          : false
                    }
                ]
            }
        ]
    },
    "..." : "..."
}
```

## Inline calendars data

[Project](#Gantt/model/ProjectModel) also supports inline data loading on its construction which can be used for calendars loading.
For example below we load the same calendar from in the previous chapter yet use inline data:

```javascript
const project = new ProjectModel({
    // project calendar
    calendar : 9999,
    // we use an 8hrs calendar for the project
    // then duration unit values should match the calendar:
    hoursPerDay  : 8, // 1 day === 8 hrs
    daysPerWeek  : 5, // 1 week === 6 days
    daysPerMonth : 20, // 1 month === 20 days,
    // calendars data
    calendarsData : [
        {
            id        : 9999,
            name      : 'My calendar',
            intervals : [
                {
                    id                 : 123,
                    recurrentStartDate : 'every weekday at 12:00',
                    recurrentEndDate   : 'every weekday at 13:00',
                    isWorking          : false
                },
                {
                    id                 : 456,
                    recurrentStartDate : 'every weekday at 17:00',
                    recurrentEndDate   : 'every weekday at 08:00',
                    isWorking          : false
                }
            ]
        }
    ]
})
```
**Worth mentioning** that if you want using inline calendars loading but keep using remote loading for other project stores
your backend **should not** include `calendars` section in its load response.
Otherwise responded data will override the provided inline.

## Assigning a calendar through the UI

To give user the ability to change the calendar of the task using the UI, you can use a
[CalendarColumn](#Gantt/column/CalendarColumn)

<img src="Gantt/calendarcolumn.png" style="max-width : 300px" alt="Calendar column">

Also the [TaskEditor](#Gantt/feature/TaskEdit) has a field for changing the calendar on the "Advanced" tab.

<img src="Gantt/calendarfield.png" style="max-width : 500px" alt="Calendar field">


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>