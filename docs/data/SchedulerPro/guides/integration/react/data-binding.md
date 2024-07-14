# Binding Bryntum Scheduler Pro data

Bryntum Scheduler Pro is a data intensive component that uses several datasets. These datasets usually come from the server
and are held in `SchedulerPro` project during the lifetime of the `SchedulerPro` view. There are several ways of populating the
project data stores.

## Using project transport

[ProjectModel](#SchedulerPro/model/ProjectModel) supports loading and saving of data in multiple stores with
[transport](#SchedulerPro/model/ProjectModel#config-transport) config. Loading the stores and saving all changes is done in
one request.

Configuring `project` with `transport` is the simplest way of binding data to the `SchedulerPro` project stores as seen from
the client side, but it does require following a specific protocol on the backend.

The configuration can be as simple as setting the `project` property like this:

```javascript
schedulerproConfig: {
    project : {
        loadUrl  : '/server/load/url',
        syncUrl  : '/server/save/url',
        autoLoad : true
    }
}
```
```jsx
<BryntumSchedulerPro {...schedulerproConfig}/>
```

With this configuration, the data is loaded and saved from and to the above URLs and the data `transport` is handled
automatically.

## Binding existing data to the component

When the application already has a server transport layer then the data for SchedulerPro is available in application code and
it needs to be passed (bound) to the component. One approach is to make the data available as state variables and set
these as properties of the React component:

**App.js:**

```typescript
import React, { useState } from 'react';

import { schedulerProConfig } from './AppConfig';
import { projectData } from './AppData';

import './App.scss';

function App() {
    const [events, setEvents] = useState(projectData.events);
    const [assignments, setAssignments] = useState(projectData.assignments);
    const [dependencies, setDependencies] = useState(projectData.dependencies);
    const [resources, setResources] = useState(projectData.resources);

    return (
        <BryntumSchedulerPro
            ref = {schedulerpro}
            events = {events}
            assignments = {assignments}
            dependencies = {dependencies}
            resources = {resources}
            {...schedulerProConfig}
        />
    );
}

export default App;
```

Here we have state variables, one per data set, together with their setters so whenever a change of data is needed the
setter needs to be called with new data as the argument and the change will be immediately reflected in the `SchedulerPro`.

For example:

```javascript
setEvents(newEvents);
setResources(newResources);
```

## Binding existing data to the project

This approach binds data to a standalone `SchedulerProProjectModel` and then uses this project in `SchedulerPro`. Project has
its own markup in the template and it must be assigned to the `SchedulerPro` during initialization.

This approach is suitable for more complex applications that use more than one Bryntum component that share a common
project:

**App.js:**

```typescript
import React, { useState } from 'react';

import { schedulerProConfig, projectConfig } from './AppConfig';
import { projectData } from './AppData';

import './App.scss';

function App() {
    const schedulerpro = useRef();
    const project = useRef();

    const [events, setEvents] = useState(projectData.events);
    const [assignments, setAssignments] = useState(projectData.assignments);
    const [dependencies, setDependencies] = useState(projectData.dependencies);
    const [resources, setResources] = useState(projectData.resources);

    return (
        <>
            <BryntumSchedulerProProjectModel
                ref = {project}
                events = {events}
                assignments = {assignments}
                dependencies = {dependencies}
                resources = {resources}
                {...projectConfig}
            />
            <BryntumSchedulerPro
                ref = {schedulerpro}
                project = {project}
                {...schedulerProConfig}
            />
        </>
    );
}

export default App;
```

Here we create a standalone `SchedulerProProjectModel` (without any rendered output) with properties bound to individual data
sets. The project must be assigned to `SchedulerPro` in `useEffect` which is configured to run only once on component mount.

<div class="note">

Note that <code>BryntumSchedulerProProjectModel</code> must be returned first for other components to use it. Otherwise the <code>SchedulerPro</code>
appears blank, without any data.

</div>

Check implementation in [inline-data](../examples/frameworks/react/javascript/inline-data/) React demo.



<p class="last-modified">Last modified on 2024-05-21 9:33:30</p>