# Getting Started with Bryntum Gantt in JavaScript with npm package manager

## Try JavaScript demos

Bryntum Gantt is delivered with a variety of JavaScript demo applications showing its functionality.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/gantt/examples/" class="b-card"><i class="fas b-fa-globe"></i>View online JS demos</a>
<a href="#Gantt/guides/download.md#javascript-demos" class="b-card"><i class="fab b-fa-js"></i>View local JS demos</a>
</div>

## Create JavaScript application

In this guide we will explain how to get started using the npm CLI. If you prefer to not use
npm, please visit the dedicated [Quick Start here](#Gantt/guides/quick-start/javascript.md).

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Create Application](##create-application)
3. [Bryntum bundles](##bryntum-bundles)
4. [Install component](##install-component)
5. [Add component to Application](##add-component-to-application)
6. [Apply styles](##apply-styles)
7. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look 
like the live demo below:
<div class="external-example" data-file="Gantt/guides/readme/basic.js"></div>

## Access to npm registry

The quickest way to use our products is to use npm (Node Package Manager). If you do not have npm installed on your
computer, please visit [nodejs.org](https://nodejs.org).

Bryntum packages are hosted in a private Bryntum registry. Run the following command to locate the registry:

```shell
npm config set "@bryntum:registry=https://npm.bryntum.com"
```

You will then need to login into the registry using authentication details. Please note that these details differ
depending on if you are running the **trial** or the **licensed** version. Please choose the appropriate option below:

Run the following command to login:

<div class="docs-tabs" data-name="npm">
<div>
    <a>NPM v9+</a>
    <a>NPM v6, v7, v8</a>
</div>
<div>

```shell
npm login --auth-type=legacy --registry=https://npm.bryntum.com
```

<div class="note">

Bryntum repository does not support new login protocol used by NPM v9+. Please use <code>--auth-type=legacy</code> option to
authenticate

</div>

</div>
<div>

```shell
npm login --registry=https://npm.bryntum.com
```
</div>
</div>

You will be required to provide a username, password and email address.

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed Version</a>
</div>
<div>

```shell
Username: user..yourdomain.com
Password: trial
Email: (this IS public) user@yourdomain.com
```

<div class="note">

As username, use your email address, but make sure you replace <code>@</code> with <code>..</code> (double dot). Use <code>trial</code> as password.

</div>

<p>
Please note that after the trial period or as soon as you are ready to go on production, you will be required to acquire
a commercial license from the <a href="https://customerzone.bryntum.com">Bryntum Customer Zone</a>. You will then be
required to re-login to the Bryntum private registry with your customer details.
</p>

</div>
<div>

```shell
Username: user..yourdomain.com
Password: 
Email: (this IS public) user@yourdomain.com
```

<div class="note">

As username, use your Bryntum <strong>Customer Zone email</strong> but make sure you replace <code>@</code> with <code>..</code> (double dot).
Use your <strong>Bryntum Customer Zone</strong> password.

</div>
</div>
</div>

For more information, visit our [Npm Repository Guide](#Gantt/guides/npm-repository.md).

## Create Application

To create an application, we will use [Vitejs](https://vitejs.dev/guide) and 
choose vanilla JavaScript.

First, execute the vite command:

```shell
npm create vite@latest my-gantt-app -- --template vanilla
```

<div class="note">

For npm 7+, extra double-dash is needed.

</div>

It will generate a vanilla JavaScript boilerplate. Next, install dependencies:

```shell
cd my-gantt-app
npm install
```

Open the project folder and delete `counter.js`, we don't need it in our case.

## Install component

From your terminal, update project dependencies using the following commands:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```shell
npm install @bryntum/gantt@npm:@bryntum/gantt-trial@5.6.11
```

</div>
<div>

```shell
npm install @bryntum/gantt@5.6.11 
```
</div>
</div>

## Add component to Application

Once you have project set up, you can proceed with configuring your Gantt.

Replace your `main.js` with the following code:

```javascript
import { Gantt } from '@bryntum/gantt';
import './style.css';

const gantt = new Gantt({
    appendTo  : 'app',
    startDate : new Date(2022, 0, 1),
    endDate   : new Date(2022, 0, 10),
    columns   : [
        { type : 'name', width : 160 }
    ],
    project : {

        tasksData : [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    { id : 2, name : 'Proof-read docs', startDate : '2022-01-02', endDate : '2022-01-09' },
                    { id : 3, name : 'Release docs', startDate : '2022-01-09', endDate : '2022-01-10' }
                ]
            }
        ],

        dependenciesData : [
            { fromTask : 2, toTask : 3 }
        ]
    }
});
```

Here we are providing inline data, you can learn more about how we manage 
data using Store [in this guide](#Core/guides/data/storebasics.md).

The code above creates a simple project with a few tasks and dependencies between them.

Bryntum Gantt schedules project tasks taking dependencies, constraints, and calendars into account.
For an in-depth introduction to the Project, please refer to the [Data guide]("#Gantt/guides/data/project_data.md").

<div class="note">

Note that the <code>startDate</code> and <code>endDate</code> configs passed to the <code>Gantt</code> instance denote the currently accessible 
timespan.

</div>

Learn more about how to use EcmaScript modules [here](#Gantt/guides/gettingstarted/es6bundle.md).

If you want to discover how flexible the Bryntum Gantt Component is, please explore 
the [API documentation](#Gantt/view/Gantt).

## Apply styles

### Stylesheet

A theme is required to render the Bryntum Gantt correctly.

The following CSS files are provided with the Bryntum npm packages:

| File                        | Contents            |
|-----------------------------|---------------------|
| `gantt.classic-dark.css`  | Classic-Dark theme  |
| `gantt.classic.css`       | Classic theme       |
| `gantt.classic-light.css` | Classic-Light theme |
| `gantt.material.css`      | Material theme      |
| `gantt.stockholm.css`     | Stockholm theme     |

Remove the content of `style.css` and replace it with the following:

```css
@import "./node_modules/@bryntum/gantt/gantt.stockholm.css";
```

<div class="note">

We have referenced the CSS file directly from the <code>node_modules</code> folder for simplicity in this code example.
Consider using your preferred build tool instead.

</div>

### Sizing the component

By Default, the Component is configured to take `100%` of the parent DOM element with a min-height of `10em`.

For your application to show the Component with the appropriate size, you can for example make parent components take
the full height of the screen.

```css
#app {
    margin         : 0;
    display        : flex;
    flex-direction : column;
    height         : 100vh;
    font-size      : 14px;
}
```

There are many other solutions depending on the situation. Feel free to adapt the code above regarding your 
application layout. For more information on the topic, see this guide
[Sizing the component](https://bryntum.com/products/grid/docs/guide/Grid/basics/sizing).

## Run Application

Run the application by executing:

```shell
npm run dev
```

## What to do next?

### Tutorial

Now it is time to customize your application. To get familiar with the most common tasks developers perform, we have
designed an [engaging tutorial](#Gantt/guides/tutorial.md) that we are excited 
to see you follow.

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Gantt/guides/data/project_data.md) explains how they all fit together.

### Rendering and styling

In the [rendering and styling](#Gantt/guides/customization/styling.md) guide you will learn how to
customize the rendering of your Gantt.

### Enabling features

Please refer to the
[enabling extra features guide](#Gantt/guides/basics/features.md) 
to learn how to enhance your Gantt chart with additional functionality (such as displaying labels for the tasks).

### Responsiveness

Gantt can be configured to work well on many different screen sizes. This is achieved by specifying different
responsive "levels" (breakpoints) on Gantt and then having per level configurations on the columns. 

If this is a
concern now, visit the  [responsive guide](#Gantt/guides/customization/responsive.md) 
 to learn how to configure responsiveness.

### Localization

Bryntum Gantt uses locales for translations of texts, date formats and such. This
[localization guide](#Gantt/guides/customization/localization.md) 
shows you how to use one of the locales that Bryntum Gantt ships with and how to create your own.



<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>