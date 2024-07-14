# Getting Started with Bryntum Scheduler Pro in React

## Try React demos

Bryntum Scheduler Pro is delivered with a variety of React demo applications showing its functionality.
All demo applications have been verified to be compatible with Node.js 20.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/schedulerpro/examples/?framework=react" class="b-card"><i class="fas b-fa-globe"></i>View online React demos</a>
<a href="#SchedulerPro/guides/integration/react/guide.md#build-and-run-local-demos" class="b-card"><i class="fab b-fa-react">
</i>Build and run React demos</a>
</div>

## Requirements

Bryntum Scheduler Pro requires React `16.0.0` or higher,
and for applications written in TypeScript, TypeScript `3.6.0` or higher.

## Get Started

In this guide we will explain how to get started if you are using [vitejs.org guide](https://vitejs.dev/guide).

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Project setup](##project-setup)
3. [Create SchedulerPro Application](##create-schedulerpro-application)
4. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the illustration below:

<img src="SchedulerPro/getting-started-result-react-cra.png" class="b-screenshot" alt="Getting Started on Bryntum Scheduler Pro with React Result">

## Access to npm registry

Please refer to this [guide for Bryntum NPM repository access](#SchedulerPro/guides/npm-repository.md).

## Project setup

There are many possible ways of creating and building React applications. Let’s use
[React Vite guide](https://vitejs.dev/guide), which has proven to offer higher efficiency and better performance in
development.

If you are using **javascript only**, please type:

```shell
npm create vite@latest bryntum-schedulerpro-app -- --template react
```

or if you prefer using **typescript**:

```shell
npm create vite@latest bryntum-schedulerpro-app -- --template react-ts
```

Please feel free to change `bryntum-schedulerpro-app` to your preferred application name

Once the template is created, install the node modules:

```shell
cd bryntum-schedulerpro-app
npm install && npm install sass
```

### Install Bryntum Scheduler Pro packages

Now that our project has been setup successfully, it's time for us to install Bryntum Scheduler Pro package into it so that
we can access the Bryntum features. From your terminal, you can install the following Bryntum Scheduler Pro packages:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```shell
npm install @bryntum/schedulerpro@npm:@bryntum/schedulerpro-trial @bryntum/schedulerpro-react
```

</div>
<div>

```shell
npm install @bryntum/schedulerpro @bryntum/schedulerpro-react
```
</div>
</div>

<div class="note">

Note: Ensure that you have configured your npm properly to get access to the Bryntum packages. If not, refer to <a href="#SchedulerPro/guides/npm-repository.md">this guide</a>.

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
  "@bryntum/schedulerpro": "npm:@bryntum/schedulerpro-trial@5.6.11",
  "@bryntum/schedulerpro-react": "5.6.11",
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
  "@bryntum/schedulerpro": "5.6.11",
  "@bryntum/schedulerpro-react": "5.6.11",
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
Please follow [this guide](#SchedulerPro/guides/integration/react/troubleshooting.md#vite-application) for more
configuration information.

## Create SchedulerPro Application

Now that your project has been setup, let's start with creating a config file in the `src`, which will have SchedulerPro configuration.

<div class="docs-tabs" data-name="SchedulerPro">
<div>
    <a>SchedulerProConfig.js</a>
    <a>SchedulerProConfig.ts</a>
</div>
<div>

```javascript
const schedulerproConfig = {

    startDate  : new Date(2022, 2, 23, 2),
    endDate    : new Date(2022, 2, 23, 18),
    rowHeight  : 60,
    barMargin  : 15,
    eventStyle : 'colored',
    viewPreset : 'hourAndDay',

    columns : [
        { type : 'resourceInfo', width : 150 }
    ],

    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : 'data.json'
            }
        }
    }

};

export { schedulerproConfig };
```

</div>
<div>

```typescript
import { SchedulerProConfig } from '@bryntum/schedulerpro';

const schedulerproConfig: Partial<SchedulerProConfig> = {

    startDate  : new Date(2022, 2, 23, 2),
    endDate    : new Date(2022, 2, 23, 18),
    rowHeight  : 60,
    barMargin  : 15,
    eventStyle : 'colored',
    viewPreset : 'hourAndDay',

    columns : [
        { type : 'resourceInfo', width : 150 }
    ],

    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : 'data.json'
            }
        }
    }

};

export { schedulerproConfig };
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
          "id": 1,
          "name": "Truck 1",
          "iconCls": "b-fa b-fa-truck",
          "image": false
        },
        {
          "id": 2,
          "name": "Truck 2",
          "iconCls": "b-fa b-fa-truck",
          "image": false
        },
        {
          "id": 3,
          "name": "Truck 3",
          "iconCls": "b-fa b-fa-truck",
          "image": false
        },
        {
          "id": 4,
          "name": "Train 1",
          "iconCls": "b-fa b-fa-train",
          "image": false
        },
        {
          "id": 5,
          "name": "Train 2",
          "iconCls": "b-fa b-fa-train",
          "image": false
        },
        {
          "id": 6,
          "name": "Pickup 1",
          "iconCls": "b-fa b-fa-truck-pickup",
          "image": false
        },
        {
          "id": 7,
          "name": "Pickup 2",
          "iconCls": "b-fa b-fa-truck-pickup",
          "image": false
        },
        {
          "id": 8,
          "name": "Pickup 3",
          "iconCls": "b-fa b-fa-truck-pickup",
          "image": false
        }
      ]
    },
    "events": {
      "rows": [
        {
          "id": 1,
          "name": "Arrive",
          "startDate": "2022-03-23T03:00",
          "duration": 2,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-arrow-right",
          "eventColor": "blue"
        },
        {
          "id": 2,
          "name": "Unload",
          "duration": 3,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-snowplow",
          "eventColor": "orange"
        },
        {
          "id": 3,
          "name": "Load",
          "duration": 2,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-truck-loading",
          "eventColor": "green"
        },
        {
          "id": 4,
          "name": "Depart",
          "duration": 1.5,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-arrow-right",
          "cls": "depart",
          "eventColor": "blue"
        },
        {
          "id": 5,
          "name": "Arrive",
          "startDate": "2022-03-23T07:00",
          "duration": 2,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-arrow-right",
          "eventColor": "blue"
        },
        {
          "id": 6,
          "name": "Unload",
          "duration": 1.5,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-snowplow",
          "eventColor": "orange"
        },
        {
          "id": 7,
          "name": "Load",
          "duration": 1.5,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-truck-loading",
          "eventColor": "green"
        },
        {
          "id": 8,
          "name": "Depart",
          "duration": 2,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-arrow-right",
          "cls": "depart",
          "eventColor": "blue"
        },
        {
          "id": 9,
          "name": "Yearly maintenance",
          "startDate": "2022-03-23T03:00",
          "duration": 5,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-wrench",
          "eventColor": "gray"
        },
        {
          "id": 10,
          "name": "Arrive",
          "startDate": "2022-03-23T01:00",
          "duration": 1.5,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-arrow-right",
          "eventColor": "blue"
        },
        {
          "id": 11,
          "name": "Unload",
          "duration": 2,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-snowplow",
          "eventColor": "orange"
        },
        {
          "id": 12,
          "name": "Load",
          "duration": 3,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-truck-loading",
          "eventColor": "green"
        },
        {
          "id": 13,
          "name": "Depart",
          "duration": 2,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-arrow-right",
          "cls": "depart",
          "eventColor": "blue"
        },
        {
          "id": 14,
          "name": "Arrive",
          "startDate": "2022-03-23T02:00",
          "duration": 5,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-arrow-right",
          "eventColor": "blue"
        },
        {
          "id": 15,
          "name": "Reload",
          "duration": 6,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-snowplow",
          "eventColor": "orange"
        },
        {
          "id": 16,
          "name": "Depart",
          "duration": 4,
          "durationUnit": "hour",
          "iconCls": "b-fa b-fa-arrow-right",
          "cls": "depart",
          "eventColor": "blue"
        }
      ]
    },
    "assignments": {
      "rows": [
        {
          "id": 1,
          "event": 1,
          "resource": 1
        },
        {
          "id": 2,
          "event": 2,
          "resource": 1
        },
        {
          "id": 3,
          "event": 3,
          "resource": 4
        },
        {
          "id": 4,
          "event": 4,
          "resource": 4
        },
        {
          "id": 5,
          "event": 5,
          "resource": 7
        },
        {
          "id": 6,
          "event": 6,
          "resource": 7
        },
        {
          "id": 7,
          "event": 7,
          "resource": 8
        },
        {
          "id": 8,
          "event": 8,
          "resource": 8
        },
        {
          "id": 9,
          "event": 9,
          "resource": 2
        },
        {
          "id": 10,
          "event": 9,
          "resource": 3
        },
        {
          "id": 11,
          "event": 9,
          "resource": 6
        },
        {
          "id": 12,
          "event": 10,
          "resource": 2
        },
        {
          "id": 13,
          "event": 11,
          "resource": 2
        },
        {
          "id": 14,
          "event": 12,
          "resource": 5
        },
        {
          "id": 15,
          "event": 13,
          "resource": 5
        },
        {
          "id": 16,
          "event": 14,
          "resource": 11
        },
        {
          "id": 17,
          "event": 15,
          "resource": 11
        },
        {
          "id": 18,
          "event": 16,
          "resource": 11
        }
      ]
    },
    "dependencies": {
      "rows": [
        {
          "id": 1,
          "fromEvent": 1,
          "toEvent": 2,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 2,
          "fromEvent": 2,
          "toEvent": 3,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 3,
          "fromEvent": 3,
          "toEvent": 4,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 4,
          "fromEvent": 5,
          "toEvent": 6,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 5,
          "fromEvent": 6,
          "toEvent": 7,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 6,
          "fromEvent": 7,
          "toEvent": 8,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 7,
          "fromEvent": 9,
          "toEvent": 10,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 8,
          "fromEvent": 10,
          "toEvent": 11,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 9,
          "fromEvent": 11,
          "toEvent": 12,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 10,
          "fromEvent": 13,
          "toEvent": 14,
          "lag": 2,
          "lagUnit": "hour"
        },
        {
          "id": 11,
          "fromEvent": 14,
          "toEvent": 15,
          "lag": 2,
          "lagUnit": "hour"
        },
        {
          "id": 12,
          "fromEvent": 17,
          "toEvent": 18,
          "lag": 1,
          "lagUnit": "hour"
        },
        {
          "id": 13,
          "fromEvent": 18,
          "toEvent": 19,
          "lag": 2,
          "lagUnit": "hour"
        },
        {
          "id": 14,
          "fromEvent": 19,
          "toEvent": 20,
          "lag": 3,
          "lagUnit": "hour"
        },
        {
          "id": 16,
          "fromEvent": 22,
          "toEvent": 23,
          "lag": 3,
          "lagUnit": "hour"
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
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { schedulerproConfig } from './SchedulerProConfig';
import './App.scss';

function App() {
    return (
        <BryntumSchedulerPro {...schedulerproConfig} />
    );
}

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/integration/react/data-binding

export default App;
```

</div>
<div>

```typescript
import React, { FunctionComponent, useRef } from 'react';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { schedulerproConfig } from './SchedulerProConfig';
import './App.scss';

const App: FunctionComponent = () => {

    const schedulerpro = useRef<BryntumSchedulerPro>(null);

    return (
        <BryntumSchedulerPro
            ref = {schedulerpro}
            {...schedulerproConfig}
        />
    );
};

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/integration/react/data-binding

export default App;
```
</div>
</div>

This will setup your SchedulerPro, but you need to apply some styling to it.

### Styling

To ensure there is no unexpected styling, delete the `index.css` file and also remove it from the `main.jsx` or `main.tsx`.

Next, rename the `App.css` file to `App.scss` and replace it with the following:

```scss
// import bryntum theme
@import "@bryntum/schedulerpro/schedulerpro.stockholm.css";

// Giving our schedulerpro some height
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

## Troubleshooting

Please refer to this [Troubleshooting guide](#SchedulerPro/guides/integration/react/troubleshooting.md).

## What to do next?

### Further on integration with React

Do you want to know more about how Bryntum Scheduler Pro integrates with react and start to customize your application? We
provide you with a [complete React guide here](#SchedulerPro/guides/integration/react/guide.md).

### Learn about Data

[Data Binding Guide](#SchedulerPro/guides/integration/react/data-binding.md) explains how data can be bound to the component.

Bryntum components often use multiple collections and entities.

The [Data guide](#SchedulerPro/guides/data/displayingdata.md) explains how they all fit together.



<p class="last-modified">Last modified on 2024-05-21 9:33:30</p>