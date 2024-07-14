# Getting Started with Bryntum Gantt in JavaScript

## Try JavaScript demos

Bryntum Gantt is delivered with a variety of JavaScript demo applications showing its functionality.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/gantt/examples/" class="b-card"><i class="fas b-fa-globe"></i>View online JS demos</a>
<a href="#Gantt/guides/download.md#javascript-demos" class="b-card"><i class="fab b-fa-js"></i>View local JS demos</a>
</div>

## Create JavaScript application

In this guide we will explain how to get started if you are not using npm. If you prefer to use npm,
[please visit the dedicated Quick Start here](#Gantt/guides/quick-start/javascript-npm.md).

To get started, the broad steps are as follows:

1. [Download Bryntum Gantt](##download)
2. [Create Application](##create-application)
3. [Bryntum bundles](##bryntum-bundles)
4. [Add component to Application](##add-component-to-application)
5. [Apply styles](##apply-styles)
6. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the live demo below:
<div class="external-example" data-file="Gantt/guides/readme/basic.js"></div>

## Download

Bryntum Gantt is a commercial product, but you can access our free trial archive with bundles and examples by
[downloading it here](https://bryntum.com/download/?product=gantt).

## Create Application

You can proceed as usual. The Bryntum Gantt Component is compliant with the most popular Javascript Standards.

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

## Bryntum bundles

The Bryntum Gantt distribution provides pre-build JavaScript bundles.
All bundles are transpiled with `chrome: 75` babel preset.

In distribution zip they are located under the **/build** folder.

| File                    | Contents                                                        |
|-------------------------|-----------------------------------------------------------------|
| `gantt.module.js`     | Modules format bundle without WebComponents                     |
| `gantt.lwc.module.js` | Modules format bundle with Lightning WebComponents (Salesforce) |
| `gantt.wc.module.js`  | Modules format bundle with WebComponents                        |
| `gantt.umd.js`        | UMD format bundle with WebComponents                            |

Bryntum Gantt also contains Non-UI bundles for usage with Node.JS.

| File                    | Contents                         |
|-------------------------|----------------------------------|
| `gantt.node.cjs`      | Non-UI bundle in CommonJS format |
| `gantt.node.mjs`      | Non-UI bundle in Modules format  |

Typings for TypeScripts can be found in files with a `.d.ts` file extension.

Minified bundles are available for Licensed product version and delivered with `.min.js` suffix.

### Using EcmaScript module bundles

If you choose this option, **copy** the selected module file onto your application, in the root folder, for instance.

In the `main.js` file, you can import the gantt JavaScript.

```javascript
import { Gantt } from './gantt.module.js';

const gantt = new Gantt({/*...*/ });
```

<div class="note">

We have copied the module directly from the <code>build</code> folder for simplicity in this code example. Consider
using your preferred build tool instead.

</div>

Learn more about how to use EcmaScript modules [here](#Gantt/guides/gettingstarted/es6bundle.md).

### Using `<script>` tag and UMD files

Please consider this solution as legacy and use it only for compatibility. If you choose this option, **copy** the
selected UMD file onto your application, in the root folder, for instance.

To include Bryntum Gantt on your page using a plain old script tag, add a `<script>` tag pointing to the UMD bundle
file in the `<HEAD>` of your `index.html` page. Example:

```html
<script src="gantt.umd.js"></script>
```

In the `main.js`, you will be able to access Gantt classes in the global `bryntum` namespace as
follows:

```javascript
const gantt = new bryntum.gantt.Gantt({/*...*/ });
```

<div class="note">

We also recommend you to copy onto your application the <code>.js.map</code> file paired with the umd file you selected.

</div>

<div class="note">

We have copied the module directly from the <code>build</code> folder for simplicity in this code example. Consider
using your preferred build tool instead.

</div>

Read more on [script tag and UMD modules...](#Gantt/guides/gettingstarted/scripttag.md)

## Add component to Application

Assuming the use of an EcmaScript module bundle:

```javascript
import { Gantt } from './gantt.module.js';

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

If you want to discover how flexible the Bryntum Gantt Component is, please explore 
the [API documentation](#Gantt/view/Gantt).

## Apply styles

### Stylesheet

A theme is required to render the Bryntum Gantt correctly.

You'll find a complete list of available CSS files in the `/build` folder of the distribution:

| File                        | Contents            |
|-----------------------------|---------------------|
| `gantt.classic-dark.css`  | Classic-Dark theme  |
| `gantt.classic.css`       | Classic theme       |
| `gantt.classic-light.css` | Classic-Light theme |
| `gantt.material.css`      | Material theme      |
| `gantt.stockholm.css`     | Stockholm theme     |

You'll need to copy the selected CSS file into your project, let's say in the root folder.

<div class="note">

We also recommend you to copy onto your application the <code>.css.map</code> file paired with the css file you selected.

</div>

The Vite boilerplate comes with a `style.css` file, you can import it in your `index.html` page in the `<head>...</head>` section.

```html
<link rel="stylesheet" href="style.css">
```

Next, you can import the bryntum theme file in your `style.css`.

```css
@import './gantt.stockholm.css';
```

You'll also need to **copy** the **font** folder next to the CSS file.

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

There are many other solutions depending on the situation. Feel free to adapt the code above regarding your application
layout. For more information on the topic, see this guide
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