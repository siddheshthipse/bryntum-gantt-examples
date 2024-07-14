# Binding Bryntum Scheduler data

Bryntum Scheduler is a data intensive component that uses several datasets. These datasets usually come from the server
and are held in `Scheduler` project during the lifetime of the `Scheduler` view. There are several ways of populating the
project data stores.

## Using CrudManager transport

[CrudManager](#Scheduler/data/CrudManager) is a built-in class that implements loading and saving of data in multiple
stores with [transport](#Scheduler/data/CrudManager#config-transport) config. Loading the stores and saving all
changes is done in one request.

Configuring `crudManager` with `transport` is the simplest way of binding data to the `Scheduler` project stores as seen
from the client side, but it does require following a specific protocol on the backend.

The configuration of `crudManager` can be as simple as:

```javascript
crudManager : {
    transport : {
        load : {
            url : '/server/load/url'
        },
        sync : {
            url : '/server/save/url'
        }
    },
    autoLoad : true
}
```

With this configuration, the data is loaded and saved from and to the above URLs and the data `transport` is handled
automatically.

## Binding existing data to the component

When the application already has a server transport layer then the data for `Scheduler` is available in application code
and it needs to be passed (bound) to the component. One approach is to make the data available as Angular component
class variables and then use them in templates:

**app.component.ts:**

```typescript
import { Component, OnInit } from '@angular/core';
import { schedulerConfig } from './app.config';
import { DataService } from './data.service';

@Component({
    selector    : 'app-root',
    templateUrl : './app.component.html',
    styleUrls   : ['./app.component.scss'],
    providers   : [DataService]
})
export class AppComponent implements OnInit {

    events = [];
    dependencies = [];
    resources = [];
    assignments = [];
    timeRanges = [];

    schedulerConfig = schedulerConfig;

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
<bryntum-scheduler
    #scheduler
    [columns] = "schedulerConfig.columns!"
    [assignments] = "assignments"
    [dependencies] = "dependencies"
    [events] = "events"
    [resources] = "resources"
    [timeRanges] = "timeRanges"
></bryntum-scheduler>
```

`DataService` is a placeholder name in this example and it would be replaced by the service that provides data in your
application.

The key is to supply existing data to the class variables and then use these variables in the template.

## Binding existing data to the project

This approach binds data to a standalone `SchedulerProjectModel` component and then uses this project in Scheduler. 
Project has its own markup in the template and it must be assigned to the `Scheduler` during initialization.

This approach is suitable for more complex applications that use more than one Bryntum component that share a common
`project`:

**app.component.ts:**

```typescript
import { Component, OnInit } from '@angular/core';
import { schedulerConfig, projectConfig } from './app.config';
import { DataService } from './data.service';

@Component({
    selector    : 'app-root',
    templateUrl : './app.component.html',
    styleUrls   : ['./app.component.scss'],
    providers   : [DataService]
})
export class AppComponent implements OnInit {

    events = [];
    dependencies = [];
    resources = [];
    assignments = [];
    timeRanges = [];

    schedulerConfig = schedulerConfig;
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
<bryntum-scheduler-project-model
    #project
    [startDate] = "projectConfig.startDate!"
    [assignments] = "assignments"
    [dependencies] = "dependencies"
    [events] = "events"
    [resources] = "resources"
    [timeRanges] = "timeRanges"
></bryntum-scheduler-project-model>

<bryntum-scheduler
    #scheduler
    [columns] = "schedulerConfig.columns!"
    [project] = "project"
></bryntum-scheduler>
```

<div class="note">

Note that <code>bryntum-scheduler-project-model</code> tag must come before all other components that use it.
Otherwise the <code>#project</code> reference is not valid to these components.

</div>

`DataService` is a placeholder name in this example and it would be replaced by the service that provides data in your
application.



<p class="last-modified">Last modified on 2024-05-21 9:20:05</p>