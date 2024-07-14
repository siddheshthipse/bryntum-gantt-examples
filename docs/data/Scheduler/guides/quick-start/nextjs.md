# Getting started with Bryntum Scheduler in Next.js

This quick start guide will show you how to build a basic Bryntum Scheduler in a Next.js TypeScript application using the [Next.js getting started guide](https://nextjs.org/docs/getting-started/installation) as a starting point.

You can also take a shortcut and start with our [Bryntum Scheduler Next.js with TypeScript starter template](https://github.com/bryntum/bryntum-scheduler-nextjs-quick-start) that we'll create in this guide. The starter template uses Next.js version 14.1 and the [app router](https://nextjs.org/docs/app), which uses [server components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) by default.
We'll also show you how to persist your data to a database.  

## Requirements

Next.js version 14.1 requires [Node.js 18.17](https://nodejs.org/) or higher. Bryntum Scheduler requires React `16.0.0` or higher and TypeScript `3.6.0` or higher for applications written in TypeScript.

## Getting started

To get started, we'll follow these steps to create a basic Bryntum Scheduler Next.js app:

1. Setup a Next.js application.
2. Install the Bryntum Scheduler component.
3. Create a Bryntum Scheduler component.
4. Run the application.

The basic Bryntum Scheduler starter template that we'll build will look like this:

<img src="Scheduler/getting-started-nextjs-result.png" class="b-screenshot" alt="Getting Started with Bryntum Scheduler in Next.js result">

## Setup a Next.js application

We'll use the [Next.js getting started guide](https://nextjs.org/docs/getting-started/installation) to create a Next.js application. Next.js recommends using `create-next-app` to create a new Next.js app as it sets everything up for you, automatically. Create a Next.js application by running the following command:

```shell
npx create-next-app@latest
```

You'll see multiple prompts. To follow along with this guide, choose the following options:

```shell
What is your project named? bryntum-scheduler
Would you like to use TypeScript? No / Yes ✔️
Would you like to use ESLint? No / Yes ✔️
Would you like to use Tailwind CSS? No ✔️ / Yes
Would you like to use `src/` directory? No / Yes ✔️
Would you like to use App Router? (recommended) No / Yes ✔️
Would you like to customize the default import alias (@/*)? No ✔️ / Yes
```

After you've selected your answers for the prompt questions, `create-next-app` will create a folder with your project name and install the dependencies. 

Change your current working directory to the new Next.js project directory:

```shell
cd bryntum-scheduler
```

## Install the Bryntum Scheduler component

Installing the Bryntum Scheduler component using npm is the quickest way to use our products. First, get access to the Bryntum private npm registry by following the [guide in our docs](#Scheduler/guides/quick-start/javascript-npm.md#access-to-npm-registry). Once you’ve logged in to the registry, install the Bryntum Scheduler component packages:

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

The application configuration may add a caret "^" as a prefix of the dependencies version in your `package.json` file. We recommend removing the caret character as a version prefix so that you have full control over package updates.

## Create a Bryntum Scheduler component

Let's start by creating a config file called `schedulerConfig.ts` in the `src/` folder. Add the following lines of code to it:
 
```typescript
import { BryntumSchedulerProps } from "@bryntum/scheduler-react";

const schedulerConfig: BryntumSchedulerProps = {
  startDate: new Date(2024, 2, 21, 6),
  endDate: new Date(2024, 2, 21, 20),
  viewPreset: "hourAndDay",
  eventStyle: "border",
  columns: [
    {
      type: "resourceInfo",
      text: "Name",
      field: "name",
      width: 90,
      showImage: false,
    },
    { text: "City", field: "city", width: 90 },
  ],
  stripeFeature: true,
  dependenciesFeature: true,
};

export { schedulerConfig };
```

This object will be used for configuration of the Bryntum Scheduler component.

Next, we'll create a Bryntum Scheduler React component. Create a `components` folder in the `src` folder. Create a file called `Scheduler.tsx` in the `src/components/` folder. Add the following lines of code to it:

```typescript
"use client";

import { CrudManagerConfig } from "@bryntum/scheduler";
import { BryntumScheduler } from "@bryntum/scheduler-react";
import { useEffect, useRef, useState } from "react";

export default function Scheduler({ ...props }) {
  const [crudManagerConfig] = useState<Partial<CrudManagerConfig>>({
    loadUrl: "data/data.json",
    autoLoad: true,
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production.
    validateResponse: true,
  });
  
  const schedulerRef = useRef<BryntumScheduler>(null);

  useEffect(() => {
    // Bryntum Scheduler instance
    const scheduler = schedulerRef?.current?.instance;
  }, []);

  return (
    <BryntumScheduler
      {...props}
      ref={schedulerRef}
      crudManager={crudManagerConfig}
    />
  );
}
```

The Scheduler component is a React [client component](https://nextjs.org/docs/app/building-your-application/rendering/client-components) as it uses the "use client" directive at the top of the file.

The [CrudManager](#Scheduler/guides/data/crud_manager.md) config for loading the example JSON data is added as a React state variable in the `Scheduler.tsx` component so that we keep the same `crudManagerConfig` object between re-renders.

The code in the useEffect hook setup function shows you how to access the Bryntum Scheduler instance.

The loaded example data is the [data for the stores](#Scheduler/guides/data/displayingdata.md). 

Let's create the file for the example data. In the `public` folder, create a folder called `data`. In the `data` folder, create a file called `data.json` and add the following JSON object to it:

```json
{
  "success": true,
  "resources": {
    "rows": [
      {
        "id": "r1",
        "name": "Celia",
        "city": "Barcelona"
      },
      {
        "id": "r2",
        "name": "Lee",
        "city": "London"
      },
      {
        "id": "r3",
        "name": "Macy",
        "city": "New York"
      },
      {
        "id": "r4",
        "name": "Madison",
        "city": "Barcelona"
      },
      {
        "id": "r5",
        "name": "Rob",
        "city": "Rome"
      },
      {
        "id": "r6",
        "name": "Dave",
        "city": "Barcelona"
      },
      {
        "id": "r7",
        "name": "Dan",
        "city": "London"
      },
      {
        "id": "r8",
        "name": "George",
        "city": "New York"
      },
      {
        "id": "r9",
        "name": "Gloria",
        "city": "Rome"
      },
      {
        "id": "r10",
        "name": "Henrik",
        "city": "London"
      }
    ]
  },
  "events": {
    "rows": [
      {
        "id": 1,
        "startDate": "2024-03-21 10:00",
        "endDate": "2024-03-21 12:00",
        "name": "Multi assigned A",
        "iconCls": "b-fa b-fa-users"
      },
      {
        "id": 2,
        "startDate": "2024-03-21 13:00",
        "endDate": "2024-03-21 15:00",
        "name": "Single assigned A",
        "iconCls": "b-fa b-fa-user",
        "eventColor": "indigo"
      },
      {
        "id": 3,
        "startDate": "2024-03-21 08:00",
        "endDate": "2024-03-21 11:00",
        "name": "Single assigned B",
        "iconCls": "b-fa b-fa-user",
        "eventColor": "cyan"
      },
      {
        "id": 4,
        "startDate": "2024-03-21 10:00",
        "endDate": "2024-03-21 13:00",
        "name": "Single assigned C",
        "iconCls": "b-fa b-fa-user",
        "eventColor": "blue"
      },
      {
        "id": 5,
        "startDate": "2024-03-21 13:00",
        "endDate": "2024-03-21 15:00",
        "name": "Single assigned D",
        "iconCls": "b-fa b-fa-user",
        "eventColor": "violet"
      },
      {
        "id": 6,
        "startDate": "2024-03-21 14:00",
        "endDate": "2024-03-21 17:00",
        "name": "Multi assigned B",
        "iconCls": "b-fa b-fa-users",
        "eventColor": "lime"
      }
    ]
  },
  "assignments": {
    "rows": [
      {
        "id": 1,
        "resourceId": "r3",
        "eventId": 1
      },
      {
        "id": 2,
        "resourceId": "r2",
        "eventId": 1
      },
      {
        "id": 3,
        "resourceId": "r8",
        "eventId": 1
      },
      {
        "id": 4,
        "resourceId": "r7",
        "eventId": 2
      },
      {
        "id": 5,
        "resourceId": "r4",
        "eventId": 3
      },
      {
        "id": 6,
        "resourceId": "r5",
        "eventId": 4
      },
      {
        "id": 7,
        "resourceId": "r6",
        "eventId": 5
      },
      {
        "id": 8,
        "resourceId": "r1",
        "eventId": 6
      },
      {
        "id": 9,
        "resourceId": "r9",
        "eventId": 6
      }
    ]
  },
  "dependencies": {
    "rows": [
      {
        "id": 1,
        "from": 1,
        "to": 6
      },
      {
        "id": 2,
        "from": 6,
        "to": 2,
        "toSide": "right"
      }
    ]
  }
}
```

We need to create a wrapper component for the Bryntum Scheduler React component to render on the client only. In the `components` folder, create a file called `SchedulerWrapper.tsx` and add the following lines of code to it:

```typescript
import dynamic from "next/dynamic";
import { schedulerConfig } from "../schedulerConfig";

const Scheduler = dynamic(() => import("./Scheduler"), {
  ssr: false,
  loading: () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  },
});

const SchedulerWrapper = () => {
  return (
    <>
      <Scheduler
        {...schedulerConfig}
      />
    </>
  );
};

export { SchedulerWrapper };
```

The Bryntum Scheduler React component is [dynamically imported](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic) with server-side rendering (`ssr`) set to `false`. This is done to prevent the Bryntum Scheduler React client component from being pre-rendered on the server as Bryntum components are client-side only.

Next, replace the code in the `src/app/page.tsx` file with the following lines of code:

```typescript
import styles from "./page.module.css";
import "@bryntum/scheduler/scheduler.stockholm.css";

import { SchedulerWrapper } from "@/components/SchedulerWrapper";

export default function Home() {
  return (
    <main className={styles.main}>
      <SchedulerWrapper />
    </main>
  );
}
```

We imported the CSS styles for the Bryntum Scheduler Stockholm theme, which is one of five available themes.

### Styling

To style the Bryntum Scheduler so that it takes up the whole page, replace the styles in the `src/app/globals.css` file with the following styles:

```css
body,
html {
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Poppins, "Open Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
}
```

In the `src/app/page.module.css` file, replace the styles with the following style for the `<main>` HTML tag:

```css
.main {
  height: 100%;
}
```

You can learn more about styling your Bryntum Scheduler in our [style guide](#Scheduler/guides/customization/styling.md). 

## Run the application

Run the local development server:

```shell
npm run dev
```
 
You'll see the Bryntum Scheduler app at the URL [http://localhost:3000](http://localhost:3000/).

## Persisting data to a database

Now that you have the client-side Bryntum Scheduler up and running, you can adjust your Scheduler configuration and add some server-side code to get data from and persist data changes to a database.

There are three ways to populate Bryntum Scheduler project data stores:

- [Using the CrudManager transport](#Scheduler/guides/integration/react/data-binding.md#using-crudmanager-transport).
- [Binding existing data to the component](#Scheduler/guides/integration/react/data-binding.md#binding-existing-data-to-the-component).
- [Binding existing data to the project](#Scheduler/guides/integration/react/data-binding.md#binding-existing-data-to-the-project).

The Next.js starter template uses a CrudManager transport, which is the simplest way of connecting to a server. You can set your Next.js API route to load data from the [`loadUrl`](#Scheduler/crud/AbstractCrudManagerMixin#config-loadUrl). Use the [`syncUrl`](#Scheduler/crud/AbstractCrudManagerMixin#config-syncUrl) to set the Next.js API route to sync data changes to the server. All changes are sent to the `syncUrl` as a single POST request.

To use a project transport, the data sent back from your Next.js API routes needs to have specific [load](#Scheduler/guides/data/crud_manager.md#load-response-structure) and [sync](#Scheduler/guides/data/crud_manager.md#sync-response-structure) response structures. 

For a detailed explanation of how to get and persist your data to a database using a project transport and Next.js API routes, take a look at our blog post [Creating a Bryntum Gantt chart with React, TypeScript, Prisma, and SQLite: Remix vs. Next.js](https://bryntum.com/blog/creating-a-bryntum-gantt-chart-with-react-typescript-prisma-and-sqlite-remix-vs-next-js/). 

See an example of how to bind existing data to a component using a Next.js API route in our blog post [Create a scheduler with Bryntum using Next.js, Prisma, SQLite, and GraphQL](https://bryntum.com/blog/create-a-scheduler-using-bryntum-next-js-prisma-sqlite-and-graphql/). 

From Next.js version 14, you can use [server actions and mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) instead of API routes in your Bryntum Scheduler client component to persist data changes to a database. You can use the [dataChange event](#Scheduler/guides/integration/react/events.md#using-datachange-event-to-synchronize-data) to listen for store changes so that you can sync data changes using server actions as shown in the example code below:

```typescript
  const syncData = ({ store, action, records }) => {
    // Call your server actions here
    if (store.id === "resources") {
      if (action === "add") {
        //...
      }
      //...
    };
  };

  return (
    <BryntumScheduler 
      {...props}
      ref={schedulerRef}
      onDataChange={syncData} 
    />
  )
```

## What to do next?

Take a look at our [guide to using Bryntum Scheduler with React](#Scheduler/guides/integration/react/guide.md) to learn about the following topics and more: 

- Using TypeScript.
- Rendering React components in column cells, tooltips, and widgets.
- Adding features like the [TimeRanges feature](#Scheduler/feature/TimeRanges).
- Using Bryntum Scheduler CSS themes.

We also have a comprehensive [Bryntum Scheduler with React tutorial](#Scheduler/guides/tutorial/tutorial-react.md) where you can learn how to:

- Add columns.
- React to events.
- Customize the time-axis.
- Add styles and colors.

## Troubleshooting

If you get stuck, take a look at our [guide to troubleshooting Bryntum Scheduler with React](#Scheduler/guides/integration/react/troubleshooting.md). If you find any errors in our docs or guides, please report them in [our forums](https://forum.bryntum.com/).


<p class="last-modified">Last modified on 2024-05-21 9:04:59</p>