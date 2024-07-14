# Getting Started with Bryntum Gantt in Vue

## Try Vue demos

Bryntum Gantt is delivered with a variety of Vue demo applications showing its functionality.
All demo applications have been verified to be compatible with Node.js 20.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/gantt/examples/?framework=vue" class="b-card"><i class="fas b-fa-globe"></i>View online Vue demos</a>
<a href="#Gantt/guides/integration/vue/guide.md#build-and-run-local-demos" class="b-card"><i class="fab b-fa-vuejs"></i>Build and run Vue demos</a>
</div>

## Requirements

Bryntum Gantt requires Vue `2.0.0` or higher, 
and for applications written in TypeScript, TypeScript `3.6.0` or higher.

## Create Vue 3 application

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Create Application](##create-application)
3. [Install component](##install-component)
4. [Add component to Application](##add-component-to-application)
5. [Apply styles](##apply-styles)
6. [Run Application](##run-application)

The application we will be building now should look like the illustration below:

<img src="Gantt/getting-started-result.png" class="b-screenshot" alt="Getting Started on Bryntum Gantt with Vue Result">

<div class="note">

Please note this guide is designed for creating Vue 3 application.

</div>

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

Similarly to all the examples shipped with the distribution, we will be using [Vue CLI](https://cli.vuejs.org/) to build
Vue applications.

Type the following command to install Vue CLI:

```shell
npm install -g @vue/cli
```

We will then create a basic application with Vue CLI:

```shell
vue create my-app
```

* To the question `Please pick a preset:` we will answer Vue 3 `Default (Vue 3) ([Vue 3] babel, eslint)`.

* To the question `Pick a Package Manager` we will select `NPM` for this quick start.

<div class="note">

Please feel free to change <code>my-app</code> to your preferred application name

</div>

You can then move to your application folder:

```shell
cd my-app
```

<div class="note">

Please note some generated files will no longer be needed in your app, you can safely remove 
<code>.src/components/HelloWorld.vue</code> and <code>src/assets/logo.png</code>.

</div>

## Install component

From your terminal, update project dependencies using the following commands:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```shell
npm install @bryntum/gantt@npm:@bryntum/gantt-trial@5.6.11 @bryntum/gantt-vue-3@5.6.11
```

</div>
<div>

```shell
npm install @bryntum/gantt@5.6.11 @bryntum/gantt-vue-3@5.6.11
```
</div>
</div>

## Add component to Application

Edit the **src/App.vue** file and replace the content with the following:

```javascript
<template>
    <div>
        <bryntum-gantt-project-model
            ref="project"
            v-bind="projectConfig"
            :tasks="tasks"
            :dependencies="dependencies"
        />
        <bryntum-gantt
            ref="gantt"
            v-bind="ganttConfig"
        />
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

import {
    BryntumGanttProjectModel,
    BryntumGantt
} from '@bryntum/gantt-vue-3';

import { useGanttConfig, useProjectConfig } from '@/AppConfig';

export default {
    name : 'App',

    components : {
        BryntumGanttProjectModel,
        BryntumGantt
    },

    setup() {
        const gantt = ref(null);
        const project = ref(null);

        const ganttConfig = reactive(useGanttConfig());
        const projectConfig = reactive(useProjectConfig());

        const tasks = ref(null);
        const dependencies = ref(null);

        tasks.value = [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    { id : 6, name : 'Proof-read docs', startDate : '2022-01-02', endDate : '2022-01-09' },
                    { id : 3, name : 'Release docs', startDate : '2022-01-09', endDate : '2022-01-10' }
                ]
            }
        ];
        dependencies.value = [
            { fromTask : 6, toTask : 3 }
        ];

        onMounted(() => {
            gantt.value.instance.value.project = project.value.instance.value;
        });

        return {
            project,
            gantt,
            projectConfig,
            ganttConfig,
            tasks,
            dependencies
        };
    }
};

</script>

<style lang="scss">
@import './App.scss';
</style>
```

The code above creates a simple project with a few tasks and dependencies between them.

Bryntum Gantt schedules project tasks taking dependencies, constraints, and calendars into account.
For an in-depth introduction to the Project, please refer to the [Data guide]("#Gantt/guides/data/project_data.md").

**Create** a **src/AppConfig.js** file with the following content:

```javascript
export const useGanttConfig = () => {
    return {

        columns : [{ type : 'name', width : 160 }],

        startDate : new Date(2022, 0, 1),
        endDate   : new Date(2022, 0, 10)
    };
};

export const useProjectConfig = () => {
    return {
        startDate : new Date(2022, 0, 1)
    };
};
```

If you prefer using CSS styling then replace `@import './App.scss';` with `@import './App.css';`.

<div class="note">

Note that the <code>startDate</code> and <code>endDate</code> configs passed to <code>ganttConfig</code> denote
the currently visible timespan.

</div>

## Apply styles

### Stylesheet

A theme is required to render the Bryntum Gantt correctly.

The following CSS files are provided with the Bryntum npm packages or in the `/build` folder of the distribution:

| File                        | Contents            |
|-----------------------------|---------------------|
| `gantt.classic-dark.css`  | Classic-Dark theme  |
| `gantt.classic.css`       | Classic theme       |
| `gantt.classic-light.css` | Classic-Light theme |
| `gantt.material.css`      | Material theme      |
| `gantt.stockholm.css`     | Stockholm theme     |

You'll need to reference the selected CSS file into your project.

<div class="docs-tabs" data-name="stylesheet">
<div>
    <a>CSS</a>
    <a>SCSS</a>
</div>
<div>

You'll need to copy the selected CSS file into your project, let's say in the <strong>src</strong> folder.

<div class="note">

We also recommend you to copy onto your application the <code>.css.map</code> file paired with the css file you selected.

</div>

You'll also need to copy the <strong>font</strong> folder next to the CSS file.

</div>
<div>

Create a <strong>src/App.scss</strong> file and add the following:

```scss
@import "~@bryntum/gantt/gantt.stockholm.css";
```
For your application to support sass files, you'll need to add additional dependencies to your project.

From the terminal:

```shell
npm install sass@1.42.0 --save-dev --save-prefix=~
```

```shell
npm install sass-loader@~8.0.2 --save-dev --save-prefix=~
```
</div>
</div>

### Sizing the component

By Default, the Component is configured to take `100%` of the parent DOM element with a min-height of `10em`.

For your application to show the Component with the appropriate size, you can for example make parent components take
the full height of the screen.

<div class="docs-tabs" data-name="stylesheet">
<div>
    <a>CSS</a>
    <a>SCSS</a>
</div>
<div>

In your <strong>src/App.css</strong> file, add the following:

```css
body,
html {
    margin         : 0;
    display        : flex;
    flex-direction : column;
    height         : 100vh;
    font-family    : sans-serif;
    font-size      : 14px;
}
```

```css
#app {
    flex : 1 1 100%;
}
```

</div>
<div>

In your <strong>src/App.scss</strong> file, add the following:

```css
body,
html {
    margin         : 0;
    display        : flex;
    flex-direction : column;
    height         : 100vh;
    font-family    : sans-serif;
    font-size      : 14px;
}
```

```css
#app {
    flex : 1 1 100%;
}
```
</div>
</div>

There are many other solutions depending on the situation. Feel free to adapt the code above regarding your application
layout. For more information on the topic, see this guide
[Sizing the component](https://bryntum.com/products/grid/docs/guide/Grid/basics/sizing).

## Run Application

From your terminal:

```shell
npm run serve
```

Your application is now available under [http://localhost:8080](http://localhost:8080).

## Further on integration with Vue

Do you want to know more about how Bryntum Gantt integrates with Vue and starts to customize your application? We
provide you with a [complete Vue guide here](#Gantt/guides/integration/vue/guide.md).

## Troubleshooting

Stuck somewhere? Please refer to this [Troubleshooting guide](#Gantt/guides/integration/vue/troubleshooting.md). If
you find errors in our docs and/or onboarding guides, please report them in [our forums](https://forum.bryntum.com).

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Gantt/guides/data/project_data.md) explains how they all fit together.



<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>