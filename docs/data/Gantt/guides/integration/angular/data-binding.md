# Binding Bryntum Gantt data

Bryntum Gantt is a data intensive component that uses several datasets. These datasets usually come from the server
and are held in `Gantt` project during the lifetime of the `Gantt` view. There are several ways of populating the
project data stores.

## Using project transport

[ProjectModel](#Gantt/model/ProjectModel) supports loading and saving of data in multiple stores with
[transport](#Gantt/model/ProjectModel#config-transport) config. Loading the stores and saving all changes is done in
one request.

Configuring `project` with `transport` is the simplest way of binding data to the `Gantt` project stores as seen from
the client side, but it does require following a specific protocol on the backend.

The configuration can be as simple as setting the `project` property like this:

```javascript
ganttConfig: {
    project : {
        loadUrl  : '/server/load/url',
        syncUrl  : '/server/save/url',
        autoLoad : true
    }
}
```
```jsx
<BryntumGantt {...ganttConfig}/>
```

With this configuration, the data is loaded and saved from and to the above URLs and the data `transport` is handled
automatically.

## Binding existing data to the component

When the application already has a server transport layer then the data for `Gantt` is available in application code
and it needs to be passed (bound) to the component. One approach is to make the data available as Angular component
class variables and then use them in templates:

**app.component.ts:**

```typescript
import { Component, OnInit } from '@angular/core';
import { ganttConfig } from './app.config';
import { DataService } from './data.service';

@Component({
    selector    : 'app-root',
    templateUrl : './app.component.html',
    styleUrls   : ['./app.component.scss'],
    providers   : [DataService]
})
export class AppComponent implements OnInit {

    tasks = [];
    dependencies = [];
    resources = [];
    assignments = [];
    calendars = [];
    timeRanges = [];

    ganttConfig = ganttConfig;

    // Inject data service
    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        // Get initial data
        Object.assign(this, this.dataService.getData());
    }
}
```

**app.component.html:**

```html
<bryntum-gantt
    #gantt
    [startDate] = "ganttConfig.startDate!"
    [columns] = "ganttConfig.columns!"
    [assignments] = "assignments"
    [calendars] = "calendars"
    [dependencies] = "dependencies"
    [resources] = "resources"
    [tasks] = "tasks"
    [timeRanges] = "timeRanges"
></bryntum-gantt>
```

`DataService` is a placeholder name in this example and it would be replaced by the service that provides data in your
application.

The key is to supply existing data to the class variables and then use these variables in the template.

## Binding existing data to the project

This approach binds data to a standalone `GanttProjectModel` component and then uses this project in Gantt. 
Project has its own markup in the template and it must be assigned to the `Gantt` during initialization.

This approach is suitable for more complex applications that use more than one Bryntum component that share a common
`project`:

**app.component.ts:**

```typescript
import { Component, OnInit } from '@angular/core';
import { ganttConfig, projectConfig } from './app.config';
import { DataService } from './data.service';

@Component({
    selector    : 'app-root',
    templateUrl : './app.component.html',
    styleUrls   : ['./app.component.scss'],
    providers   : [DataService]
})
export class AppComponent implements OnInit {

    tasks = [];
    dependencies = [];
    resources = [];
    assignments = [];
    calendars = [];
    timeRanges = [];

    ganttConfig = ganttConfig;
    projectConfig = projectConfig;

    // Inject data service
    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        // Get initial data
        Object.assign(this, this.dataService.getData());
    }
}
```

**app.component.html:**

```html
<bryntum-gantt-project-model
    #project
    [startDate] = "projectConfig.startDate!"
    [assignments] = "assignments"
    [calendars] = "calendars"
    [dependencies] = "dependencies"
    [resources] = "resources"
    [tasks] = "tasks"
    [timeRanges] = "timeRanges"
></bryntum-gantt-project-model>

<bryntum-gantt
    #gantt
    [columns] = "ganttConfig.columns!"
    [project] = "project"
></bryntum-gantt>
```

<div class="note">

Note that <code>bryntum-gantt-project-model</code> tag must come before all other components that use it.
Otherwise the <code>#project</code> reference is not valid to these components.

</div>

`DataService` is a placeholder name in this example and it would be replaced by the service that provides data in your
application.

Check implementation in [inline-data](../examples/frameworks/angular/inline-data/) Angular demo.



<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>