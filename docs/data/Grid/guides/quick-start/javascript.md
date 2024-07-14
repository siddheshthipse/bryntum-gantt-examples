# Getting Started with Bryntum Grid in JavaScript

## Try JavaScript demos

Bryntum Grid is delivered with a variety of JavaScript demo applications showing its functionality.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/grid/examples/" class="b-card"><i class="fas b-fa-globe"></i>View online JS demos</a>
<a href="#Grid/guides/download.md#javascript-demos" class="b-card"><i class="fab b-fa-js"></i>View local JS demos</a>
</div>

## Create JavaScript application

In this guide we will explain how to get started if you are not using npm. If you prefer to use npm,
[please visit the dedicated Quick Start here](#Grid/guides/quick-start/javascript-npm.md).

To get started, the broad steps are as follows:

1. [Download Bryntum Grid](##download)
2. [Create Application](##create-application)
3. [Bryntum bundles](##bryntum-bundles)
4. [Add component to Application](##add-component-to-application)
5. [Apply styles](##apply-styles)
6. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the live demo below:
<div class="external-example" data-file="Grid/guides/readme/basic.js"></div>

## Download

Bryntum Grid is a commercial product, but you can access our free trial archive with bundles and examples by
[downloading it here](https://bryntum.com/download/?product=grid).

## Create Application

You can proceed as usual. The Bryntum Grid Component is compliant with the most popular Javascript Standards.

To create an application, we will use [Vitejs](https://vitejs.dev/guide) and 
choose vanilla JavaScript.

First, execute the vite command:

```shell
npm create vite@latest my-grid-app -- --template vanilla
```

<div class="note">

For npm 7+, extra double-dash is needed.

</div>

It will generate a vanilla JavaScript boilerplate. Next, install dependencies:

```shell
cd my-grid-app
npm install
```

Open the project folder and delete `counter.js`, we don't need it in our case.

## Bryntum bundles

The Bryntum Grid distribution provides pre-build JavaScript bundles.
All bundles are transpiled with `chrome: 75` babel preset.

In distribution zip they are located under the **/build** folder.

| File                    | Contents                                                        |
|-------------------------|-----------------------------------------------------------------|
| `grid.module.js`     | Modules format bundle without WebComponents                     |
| `grid.lwc.module.js` | Modules format bundle with Lightning WebComponents (Salesforce) |
| `grid.wc.module.js`  | Modules format bundle with WebComponents                        |
| `grid.umd.js`        | UMD format bundle with WebComponents                            |

Typings for TypeScripts can be found in files with a `.d.ts` file extension.

Minified bundles are available for Licensed product version and delivered with `.min.js` suffix.

### Using EcmaScript module bundles

If you choose this option, **copy** the selected module file onto your application, in the root folder, for instance.

In the `main.js` file, you can import the grid JavaScript.

```javascript
import { Grid } from './grid.module.js';

const grid = new Grid({/*...*/ });
```

<div class="note">

We have copied the module directly from the <code>build</code> folder for simplicity in this code example. Consider
using your preferred build tool instead.

</div>

Learn more about how to use EcmaScript modules [here](#Grid/guides/gettingstarted/es6bundle.md).

### Using `<script>` tag and UMD files

Please consider this solution as legacy and use it only for compatibility. If you choose this option, **copy** the
selected UMD file onto your application, in the root folder, for instance.

To include Bryntum Grid on your page using a plain old script tag, add a `<script>` tag pointing to the UMD bundle
file in the `<HEAD>` of your `index.html` page. Example:

```html
<script src="grid.umd.js"></script>
```

In the `main.js`, you will be able to access Grid classes in the global `bryntum` namespace as
follows:

```javascript
const grid = new bryntum.grid.Grid({/*...*/ });
```

<div class="note">

We also recommend you to copy onto your application the <code>.js.map</code> file paired with the umd file you selected.

</div>

<div class="note">

We have copied the module directly from the <code>build</code> folder for simplicity in this code example. Consider
using your preferred build tool instead.

</div>

Read more on [script tag and UMD modules...](#Grid/guides/gettingstarted/scripttag.md)

## Add component to Application

Assuming the use of an EcmaScript module bundle:

```javascript
import { Grid } from './grid.module.js';

const grid = new Grid({
    appendTo : 'app',
    columns  : [
        { field : 'name', text : 'Name', width : 200 },
        { field : 'city', text : 'City', flex : 1 }
    ],
    data : [
        { name : 'Dan Stevenson', city : 'Los Angeles' },
        { name : 'Talisha Babin', city : 'Paris' }
    ]
});
```

Here we are providing inline data, you can learn more about how we manage 
data using Store [in this guide](#Core/guides/data/storebasics.md).

If you want to discover how flexible the Bryntum Grid Component is, please explore 
the [API documentation](#Grid/view/Grid).

## Apply styles

### Stylesheet

A theme is required to render the Bryntum Grid correctly.

You'll find a complete list of available CSS files in the `/build` folder of the distribution:

| File                        | Contents            |
|-----------------------------|---------------------|
| `grid.classic-dark.css`  | Classic-Dark theme  |
| `grid.classic.css`       | Classic theme       |
| `grid.classic-light.css` | Classic-Light theme |
| `grid.material.css`      | Material theme      |
| `grid.stockholm.css`     | Stockholm theme     |

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
@import './grid.stockholm.css';
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
designed an [engaging tutorial](#Grid/guides/tutorial.md) that we are excited 
to see you follow.

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Grid/guides/data/displayingdata.md) explains how they all fit together.

### Enabling features

Please refer to the
[enabling extra features guide](#Grid/guides/basics/features.md) 
to learn how to enhance your Grid chart with additional functionality (such as displaying labels for the tasks).

### Responsiveness

Grid can be configured to work well on many different screen sizes. This is achieved by specifying different
responsive "levels" (breakpoints) on Grid and then having per level configurations on the columns. 

If this is a
concern now, visit the  [responsive guide](#Grid/guides/customization/responsive.md) 
 to learn how to configure responsiveness.

### Localization

Bryntum Grid uses locales for translations of texts, date formats and such. This
[localization guide](#Grid/guides/customization/localization.md) 
shows you how to use one of the locales that Bryntum Grid ships with and how to create your own.



<p class="last-modified">Last modified on 2024-05-21 9:10:56</p>