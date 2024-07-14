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

When the application already has a server transport layer then the data for Gantt is available in application code and
it needs to be passed (bound) to the component. One approach is to make the data available as state variables and set
these as properties of the React component:

**App.js:**

```typescript
import React, { useState } from 'react';

import { ganttConfig } from './AppConfig';
import { projectData } from './AppData';

import './App.scss';

function App() {

    const [calendars, setCalendars] = useState(projectData.calendars);
    const [tasks, setTasks] = useState(projectData.tasks);
    const [assignments, setAssignments] = useState(projectData.assignments);
    const [dependencies, setDependencies] = useState(projectData.dependencies);
    const [resources, setResources] = useState(projectData.resources);

    return (
        <BryntumGantt
            ref = {gantt}
            calendars = {calendars}
            tasks = {tasks}
            assignments = {assignments}
            dependencies = {dependencies}
            resources = {resources}
            {...ganttConfig}
        />
    );
}

export default App;
```

Here we have state variables, one per data set, together with their setters so whenever a change of data is needed the
setter needs to be called with new data as the argument and the change will be immediately reflected in the `Gantt`.

For example:

```javascript
setTasks(newTasks);
setResources(newResources);
```

## Binding existing data to the project

This approach binds data to a standalone `GanttProjectModel` and then uses this project in `Gantt`. Project has
its own markup in the template and it must be assigned to the `Gantt` during initialization.

This approach is suitable for more complex applications that use more than one Bryntum component that share a common
project:

**App.js:**

```typescript
import React, { useState } from 'react';

import { ganttConfig, projectConfig } from './AppConfig';
import { projectData } from './AppData';

import './App.scss';

function App() {
    const gantt = useRef();
    const project = useRef();

    const [calendars, setCalendars] = useState(projectData.calendars);
    const [tasks, setTasks] = useState(projectData.tasks);
    const [assignments, setAssignments] = useState(projectData.assignments);
    const [dependencies, setDependencies] = useState(projectData.dependencies);
    const [resources, setResources] = useState(projectData.resources);

    return (
        <>
            <BryntumGanttProjectModel
                ref = {project}
                calendars = {calendars}
                tasks = {tasks}
                assignments = {assignments}
                dependencies = {dependencies}
                resources = {resources}
                {...projectConfig}
            />
            <BryntumGantt
                ref = {gantt}
                project = {project}
                {...ganttConfig}
            />
        </>
    );
}

export default App;
```

Here we create a standalone `GanttProjectModel` (without any rendered output) with properties bound to individual data
sets. The project must be assigned to `Gantt` in `useEffect` which is configured to run only once on component mount.

<div class="note">

Note that <code>BryntumGanttProjectModel</code> must be returned first for other components to use it. Otherwise the <code>Gantt</code>
appears blank, without any data.

</div>

Check implementation in [inline-data](../examples/frameworks/react/javascript/inline-data/) React demo.



<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>