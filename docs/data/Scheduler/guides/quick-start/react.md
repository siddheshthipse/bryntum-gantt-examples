# Getting Started with Bryntum Scheduler in React

[@youtube](https://www.youtube.com/embed/vDbsQQjJpXo)

## Try React demos

Bryntum Scheduler is delivered with a variety of React demo applications showing its functionality.
All demo applications have been verified to be compatible with Node.js 20.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/scheduler/examples/?framework=react" class="b-card"><i class="fas b-fa-globe"></i>View online React demos</a>
<a href="#Scheduler/guides/integration/react/guide.md#build-and-run-local-demos" class="b-card"><i class="fab b-fa-react">
</i>Build and run React demos</a>
</div>

## Requirements

Bryntum Scheduler requires React `16.0.0` or higher,
and for applications written in TypeScript, TypeScript `3.6.0` or higher.

## Get Started

In this guide we will explain how to get started if you are using [vitejs.org guide](https://vitejs.dev/guide).

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Project setup](##project-setup)
3. [Create Scheduler Application](##create-scheduler-application)
4. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the illustration below:

<img src="Scheduler/getting-started-result-react-cra.png" class="b-screenshot" alt="Getting Started on Bryntum Scheduler with React Result">

## Access to npm registry

Please refer to this [guide for Bryntum NPM repository access](#Scheduler/guides/npm-repository.md).

## Project setup

There are many possible ways of creating and building React applications. Let’s use
[React Vite guide](https://vitejs.dev/guide), which has proven to offer higher efficiency and better performance in
development.

If you are using **javascript only**, please type:

```shell
npm create vite@latest bryntum-scheduler-app -- --template react
```

or if you prefer using **typescript**:

```shell
npm create vite@latest bryntum-scheduler-app -- --template react-ts
```

Please feel free to change `bryntum-scheduler-app` to your preferred application name

Once the template is created, install the node modules:

```shell
cd bryntum-scheduler-app
npm install && npm install sass
```

### Install Bryntum Scheduler packages

Now that our project has been setup successfully, it's time for us to install Bryntum Scheduler package into it so that
we can access the Bryntum features. From your terminal, you can install the following Bryntum Scheduler packages:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```shell
npm install @bryntum/scheduler@npm:@bryntum/scheduler-trial @bryntum/scheduler-react
```

</div>
<div>

```shell
npm install @bryntum/scheduler @bryntum/scheduler-react
```
</div>
</div>

<div class="note">

Note: Ensure that you have configured your npm properly to get access to the Bryntum packages. If not, refer to <a href="#Scheduler/guides/npm-repository.md">this guide</a>.

</div>

### Dependencies

The application configuration may add a caret `^` as a prefix of dependencies version. We recommend not to use the caret
character as a version prefix to take upgrades fully under control. If necessary, please check the generated
**package.json** file and replace `dependencies` and `devDependencies` by the following:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```json
"dependencies": {
  "@bryntum/scheduler": "npm:@bryntum/scheduler-trial@5.6.11",
  "@bryntum/scheduler-react": "5.6.11",
  "react": "18.2.0",
  "react-dom": "18.2.0"
},
"devDependencies": {
  "@types/react": "~18.2.14",
  "@types/react-dom": "~18.2.6",
  "@vitejs/plugin-react": "~4.0.1",
  "postinstall": "~0.7.4",
  "sass": "~1.69.6",
  "typescript": "~5.1.6",
  "vite": "~4.4.5"
}
```

</div>
<div>

```json
"dependencies": {
  "@bryntum/scheduler": "5.6.11",
  "@bryntum/scheduler-react": "5.6.11",
  "react": "18.2.0",
  "react-dom": "18.2.0"
},
"devDependencies": {
  "@types/react": "~18.2.14",
  "@types/react-dom": "~18.2.6",
  "@vitejs/plugin-react": "~4.0.1",
  "postinstall": "~0.7.4",
  "sass": "~1.69.6",
  "typescript": "~5.1.6",
  "vite": "~4.4.5"
}
```
</div>
</div>

<div class="note">

Note: The version of React above is not mandatory and is used here only for the purpose of the example. Please
adjust the dependencies according to your development requirement.

</div>

### Vite Configuration

When using Vite to run a Bryntum application in development mode, in order to fix loading bundles multiple times, it is
recommended to include Bryntum packages in the [optimizeDeps](https://vitejs.dev/config/dep-optimization-options.html)
in **vite.config.js**.
Please follow [this guide](#Scheduler/guides/integration/react/troubleshooting.md#vite-application) for more
configuration information.

## Create Scheduler Application

Now that your project has been setup, let's start with creating a config file in the `src`, which will have Scheduler configuration.

<div class="docs-tabs" data-name="Scheduler">
<div>
    <a>SchedulerConfig.js</a>
    <a>SchedulerConfig.ts</a>
</div>
<div>

```javascript
/**
 * Application configuration
 */

const schedulerConfig = {
    startDate        : new Date(2022, 2, 20, 6),
    endDate          : new Date(2022, 2, 20, 20),
    viewPreset       : 'hourAndDay',
    rowHeight        : 50,
    barMargin        : 5,
    multiEventSelect : true,

    columns : [{ text : 'Name', field : 'name', width : 130 }],

    crudManager : {
        transport : {
            load : {
                url : 'data.json'
            }
        },
        autoLoad : true
    }
};

export { schedulerConfig };
```

</div>
<div>

```typescript
/**
 * Application configuration
 */
import { SchedulerConfig } from '@bryntum/scheduler';

const schedulerConfig: Partial<SchedulerConfig> = {

    startDate        : new Date(2022, 2, 20, 6),
    endDate          : new Date(2022, 2, 20, 20),
    viewPreset       : 'hourAndDay',
    rowHeight        : 50,
    barMargin        : 5,
    multiEventSelect : true,

    columns : [
        { text : 'Name', field : 'name', width : 130 }
    ],

    crudManager : {
        transport : {
            load : {
                url : 'data.json'
            }
        },
        autoLoad : true
    }
};

export { schedulerConfig };
```
</div>
</div>

With that, add the following content to `public/data.json`.
```javascript
{
    "success": true,
    "resources": {
      "rows": [
        {
          "id": "r1",
          "name": "Mike"
        },
        {
          "id": "r2",
          "name": "Linda"
        },
        {
          "id": "r3",
          "name": "Don"
        },
        {
          "id": "r4",
          "name": "Karen"
        },
        {
          "id": "r5",
          "name": "Doug"
        },
        {
          "id": "r6",
          "name": "Peter"
        },
        {
          "id": "r7",
          "name": "Sam"
        },
        {
          "id": "r8",
          "name": "Melissa"
        },
        {
          "id": "r9",
          "name": "John"
        },
        {
          "id": "r10",
          "name": "Elle"
        }
      ]
    },
    "events": {
      "rows": [
        {
          "id": 1,
          "resourceId": "r1",
          "startDate": "2022-03-20T10:00",
          "endDate": "2022-03-20T12:00",
          "name": "Click me",
          "iconCls": "b-fa b-fa-mouse-pointer",
          "eventColor": "pink"
        },
        {
          "id": 2,
          "resourceId": "r2",
          "startDate": "2022-03-20T12:00",
          "endDate": "2022-03-20T13:30",
          "name": "Drag me",
          "iconCls": "b-fa b-fa-arrows-alt"
        },
        {
          "id": 3,
          "resourceId": "r3",
          "startDate": "2022-03-20T14:00",
          "duration": 2,
          "durationUnit": "h",
          "name": "Double click me",
          "eventColor": "purple",
          "iconCls": "b-fa b-fa-mouse-pointer"
        },
        {
          "id": 4,
          "resourceId": "r4",
          "startDate": "2022-03-20T08:00",
          "endDate": "2022-03-20T11:00",
          "name": "Right click me",
          "iconCls": "b-fa b-fa-mouse-pointer"
        },
        {
          "id": 5,
          "resourceId": "r5",
          "startDate": "2022-03-20T15:00",
          "endDate": "2022-03-20T17:00",
          "name": "Resize me",
          "iconCls": "b-fa b-fa-arrows-alt-h"
        },
        {
          "id": 6,
          "resourceId": "r6",
          "startDate": "2022-03-20T16:00",
          "endDate": "2022-03-20T19:00",
          "name": "Important meeting (read-only)",
          "iconCls": "b-fa b-fa-exclamation-triangle",
          "eventColor": "red",
          "readOnly": true
        },
        {
          "id": 7,
          "resourceId": "r6",
          "startDate": "2022-03-20T06:00",
          "endDate": "2022-03-20T08:00",
          "name": "Sports event",
          "iconCls": "b-fa b-fa-basketball-ball"
        },
        {
          "id": 8,
          "resourceId": "r7",
          "startDate": "2022-03-20T09:00",
          "endDate": "2022-03-20T11:30",
          "name": "Dad's birthday!",
          "iconCls": "b-fa b-fa-gift",
          "style": "background-color : teal; font-size: 18px",
          "eventStyle": "none"
        },
        {
          "id": 9,
          "resourceId": "r8",
          "startDate": "2022-03-20T14:00",
          "endDate": "2022-03-20T16:00",
          "name": "Visit dentist",
          "iconCls": "b-fa b-fa-user-doctor",
          "eventColor": "orange"
        },
        {
          "id": 10,
          "resourceId": "r9",
          "startDate": "2022-03-20T10:00",
          "endDate": "2022-03-20T14:00",
          "name": "Car maintenance",
          "iconCls": "b-fa b-fa-car",
          "eventColor": "blue"
        },
        {
          "id": 11,
          "resourceId": "r10",
          "startDate": "2022-03-20T16:00",
          "endDate": "2022-03-20T19:00",
          "name": "Party time",
          "iconCls": "b-fa b-fa-cake-candles",
          "eventColor": "purple"
        }
      ]
    }
  }
```

Next is to replace your `App.jsx` or `App.tsx` with the following code:

<div class="docs-tabs" data-name="App">
<div>
    <a>App.jsx</a>
    <a>App.tsx</a>
</div>
<div>

```javascript
import { BryntumScheduler } from "@bryntum/scheduler-react";
import { schedulerConfig } from "./SchedulerConfig";
import "./App.scss";

function App() {
  return <BryntumScheduler {...schedulerConfig} />;
}

export default App;
```

</div>
<div>

```typescript
import React, { FunctionComponent, useRef } from 'react';
import { BryntumScheduler } from '@bryntum/scheduler-react';
import { schedulerConfig } from './SchedulerConfig';
import './App.scss';

const App: FunctionComponent = () => {

    const scheduler = useRef<BryntumScheduler>(null);

    return (
        <BryntumScheduler
            ref = {scheduler}
            {...schedulerConfig}
        />
    );
};

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/scheduler/docs/guide/Scheduler/integration/react/data-binding

export default App;
```
</div>
</div>

This will setup your Scheduler, but you need to apply some styling to it.

### Styling

To ensure there is no unexpected styling, delete the `index.css` file and also remove it from the `main.jsx` or `main.tsx`.

Next, rename the `App.css` file to `App.scss` and replace it with the following:

```scss
// import bryntum theme
@import "@bryntum/scheduler/scheduler.stockholm.css";

// Giving our scheduler some height
#root {
  height: 100vh;
}
```

## Run Application

Run application development server:

```shell
npm run dev
```

Your application is now available under [http://localhost:5173](http://localhost:5173) in your browser.

Happy coding!

## Customizations

Now that your app is up and running, it is time to try to customize some of the commonly used built-in features.

### Customizing context menus

The Scheduler shows context menus when right-clicking the empty space in the schedule, as well as the event bars. In
this video we walk you through how to customize the existing menu items, and adding new items. For an in-depth guide on
this topic, please see [this guide](#Scheduler/guides/customization/contextmenu.md).

[@youtube](https://www.youtube.com/embed/HAq12QUBMx8)

### Customizing the event editor

The Scheduler ships with a fully customizable event editor. In this video we walk you through the basic customizations,
such as adding new fields or modifying the default fields. For an in-depth guide on this topic, please see 
[this guide](#Scheduler/guides/customization/eventedit.md).

[@youtube](https://www.youtube.com/embed/ghWLmifpO_4)

## Full tutorial

To get familiar with the most common tasks developers perform, we have
created an [engaging tutorial](#Scheduler/guides/tutorial/tutorial-react.md) for you to follow.

## Troubleshooting

Please refer to this [Troubleshooting guide](#Scheduler/guides/integration/react/troubleshooting.md).

## What to do next?

### Tutorial

Now it is time to customize your application. To get familiar with the most common tasks developers perform, we have
designed an [engaging tutorial](#Scheduler/guides/tutorial/tutorial-react.md) that we are excited to see you follow.

### Further on integration with React

Do you want to know more about how Bryntum Scheduler integrates with react and start to customize your application? We
provide you with a [complete React guide here](#Scheduler/guides/integration/react/guide.md).

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Scheduler/guides/data/displayingdata.md) explains how they all fit together.



<p class="last-modified">Last modified on 2024-05-21 9:20:05</p>