# Tutorial

Follow the steps in this tutorial to get this app up and running:

<div class="external-example" data-file="Gantt/guides/tutorial/result.js"></div>

## Project setup
To create an application, we will use [Vitejs](https://vitejs.dev/guide) and 
choose vanilla JavaScript but you can use any other build tool of your choice.

To do so, execute:
```
npm create vite@latest my-gantt-app -- --template vanilla
```

It will generate a vanilla JavaScript project.

## Installing Dependencies

To install vite's dependencies:

```shell
cd my-gantt-app
npm install
```

Next, add the bryntum dependencies. If you have the Bryntum Gantt distribution, 
it provides pre-build JavaScript bundle. Copy the `/build/gantt.module.js` 
and `/build/gantt.stockholm.css` files to the **my-gantt-app** root folder.

After that, link the CSS in your `index.html`:

```html
<head>
    <!-- rest of code -->
    <link rel="stylesheet" href="gantt.stockholm.css" data-bryntum-theme>
</head>
```

Remove the `counter.js` from the root directory, we don't need it.

## Minimal Gantt

Now we are going to add a minimal Gantt chart to the `main.js` file:

```javascript
import { Gantt } from './gantt.module.js';

const gantt = new Gantt({
    // Where to render to, accepts an element or an element id
    appendTo : 'app',
    
    // Normally sizing would be handled by CSS, but for simplicity
    // we use fixed with and height for the tutorial 
    width  : 800,
    height : 600,

    // Dates that the time axis will span
    startDate : '2023-04-16',
    endDate   : '2023-05-15',
});
```

The page should now show something similar to this:

<div class="external-example" data-file="Gantt/guides/tutorial/minimal.js"></div>

## Running the app

Run the development server by executing:
```
npm run dev
```

The application is now available on [http://localhost:5173](http://localhost:5173).

## Loading data

The gantt chart above is very empty, lets populate it with some data. Gantt uses a `project` to hold all of its stores 
(`taskStore`, `resourceStore`, `assignmentStore` etc.). The `project` also contains a scheduling engine, used to 
schedule tasks based on constraints, dependencies, calendars etc. 

Gantt accepts inline data, or it can use its `project` to load remote data using the `CrudManager` protocol. Depending 
on your setup you will want to pick one or the other.

If you for example have multiple widgets on your page displaying the same data, you might  already have it available on
the client - supplying it as inline data can then be cheaper than remotely loading it also for Gantt. But for most cases
loading it remotely will be the best fit.

To load data remotely, configure `project` with an url to load from. Modify the previous snippet, adding the following:

```javascript
const gantt = new Gantt({
    
    // Code from the previous step omitted for brevity
    // ...

    // The project collects all data stores and handles loading 
    // (and syncing, but not in this example)
    project : {
        loadUrl  : 'data/data.json',
        autoLoad : true
    }
});
```

The response is expected in a specific format, see 
[this guide](#Gantt/guides/data/crud_manager_project.md#load-response-structure). For more information on working with project 
data, see [this guide](#Gantt/guides/data/project_data.md).

The data used for this tutorial is available here: [data.json](data/Gantt/examples/guides/tutorial/data.json). An 
excerpt from that file:

```json
{
    "project"      : {
        "calendar"  : "general",
        "startDate" : "2023-04-17"
    },
    "calendars" : {
        ...
    },
    "resources"    : {
        ...
    },
    "tasks"        : {
        "rows" : [
            {
                "id"       : 100,
                "name"     : "Project",
                "expanded" : true,
                "children" : [
                    { "id" : 1, "duration" : 5, "name" : "Kickoff" },
                    ...
                ]
            }
        ]
    },
    "assignments"  : {
        ...
    },
    "dependencies" : {
        ...
    }
}
```

Make sure the url points to where you placed your data. With the correct load url now in place, you should be seeing the
following:

<div class="external-example" data-file="Gantt/guides/tutorial/load.js"></div>

## Saving changes

As for loading data, you have multiple options for saving changes. You can use the project's crud manager functionality
to sync changes automatically to the backend (by configuring it with a `syncUrl` and `autoSync`), which requires your
backend to follow the CrudManager protocol. Or you can listen for changes and send them to your backend manually,
trading ease of use on the client for flexibility on the server.

In this step we will use the latter approach. We will listen for changes, but since we have no backend in place we will
just log the changes to the console. Modify the previous snippet, adding the following:

```javascript
const gantt = new Gantt({
    // Code from the previous step omitted for brevity
    // ...

    project : {
        loadUrl  : 'data/data.json',
        autoLoad : true,
        // New code ↓
        listeners : {
            // Listener for the `hasChanges` event, triggered when any store
            // handled by the project has changes
            hasChanges() {
                console.log(gantt.project.changes);
                
                // In a real app you would send the changes to the server here.
                // Then you would call `gantt.project.acceptChanges()` to 
                // clear local changes.
            }
        }
    }
});
```

Try it out here (be sure to open the console to see the output):

<div class="external-example" data-file="Gantt/guides/tutorial/save.js"></div>

## Adding columns

A Gantt chart by default consists of a left-hand side grid part with fixed width and a schedule part occupying the 
rest of the width. The grid part shows information about the tasks. By default, it includes a "Name" column, but you can
add an arbitrary number of columns to it. In this step we keep the "Name" column and add another column:

```javascript
const gantt = new Gantt({

    // Code from the previous steps omitted for brevity
    // ...

    // Columns in the grid part
    columns : [
        {
            type  : 'name',
            width : 200
        },
        {
            type  : 'resourceassignment',
            width : 170
        }
    ]
});
```

The app should now look something like this:

<div class="external-example" data-file="Gantt/guides/tutorial/columns.js"></div>

## Configuring features

Gantt ships with a large set of features that can be enabled/disabled and configured to affect the functionality of the 
component. We are going to configure the `Dependencies` feature (which draws arrows between task bars to visualize 
dependencies between tasks).

Alter your Gantt config, add:

```javascript
const gantt = new Gantt({

    // Code from the previous steps omitted for brevity
    // ...

    // Configure Gantt features
    features : {
        // Configure the dependencies feature
        dependencies : {
            // Rounded line joints
            radius     : 5,
            // Easier to click on lines
            clickWidth : 5
        }
    }
});
```

That change yields the following app:

<div class="external-example" data-file="Gantt/guides/tutorial/features.js"></div>

## Reacting to events

Gantt, its features and data stores fire a number of events that you can listen to, for example Gantt fires `taskClick`
when clicking a task bar, the `taskStore` fires `add` when a new task is added, etc. See the API docs for each class for
all events (Gantt's events are for example [listed here](#Gantt/view/Gantt#events)).

To catch an event, you can either specify declarative `listeners` in the config, or add them programmatically using the
`on` method. In this step we will add a declarative listener for the `taskClick` event, and a programmatic listener for
the `beforeTaskEdit` event.

```javascript
const gantt = new Gantt({
    // Code from the previous steps omitted for brevity
    // ...

    // Declarative listener
    listeners : {
        taskClick({ taskRecord }) {
            Toast.show(`Clicked ${taskRecord.name}`);
        }
    }
});

// Programmatic listener
gantt.on('beforeTaskEdit', ({ taskRecord }) => {
    Toast.show(`Editing ${taskRecord.name}`);
});
```

<div class="external-example" data-file="Gantt/guides/tutorial/events.js"></div>

## Customizing the time axis

The cells in the schedule part are called "ticks". The size of these and the header above them can be customized using
a view preset. Gantt ships with a number of presets, but you can also define your own or extend existing ones. See the 
API docs for [PresetManager](#Scheduler/preset/PresetManager) for the full listing.

For this tutorial, we are going to extend the existing `weekAndDayLetter` preset to modify the top header to show the
week number instead of the first date of the week. Add the following to your app:

```javascript
const gantt = new Gantt({

    // Code from the previous steps omitted for brevity
    // ...

    // The view preset controls the time axis and its header
    viewPreset : {
        base : 'weekAndDayLetter',

        // Customize the header
        headers : [
            // Week 16 ... on the top level
            {
                unit       : 'week',
                dateFormat : 'Wp'
            },
            // M, T, W ... on the bottom level
            {
                unit       : 'day',
                dateFormat : 'd1'
            }
        ]
    },
});
```

The header should now have changed in your app:

<div class="external-example" data-file="Gantt/guides/tutorial/viewpreset.js"></div>

## Adding some style

You can use CSS to style the Gantt chart and its tasks. For example, to add border-radius for a rounded look:

```css
.b-gantt-task { 
    border-radius : 20px; 
}
```

Much rounder now:

<div class="external-example" data-file="Gantt/guides/tutorial/result.js"></div>

That's it, you finished the tutorial 👍 Happy coding!

<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>