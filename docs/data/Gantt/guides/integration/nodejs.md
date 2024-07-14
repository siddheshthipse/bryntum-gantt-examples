<h1 class="title-with-image"><img src="Core/logo/nodejs.svg" alt="Bryntum Gantt supports Node.js"/>
Using Bryntum Gantt with Node.js</h1>

## Node.js bundles

The Bryntum Gantt UI component has a lot of DOM references that naturally don't exist in the Node.js environment. To
be able to use Bryntum Gantt with Node.js we offer compatible Modules and CommonJS bundles that includes
[ProjectModel](#Scheduler/model/ProjectModel) and other required classes but no UI.

The bundles listed below can be found in the **build** folder in the distribution zip or as part of the
[**@bryntum/gantt**](#Gantt/guides/npm-repository.md) NPM package.

| _Bundle_             | Description                       |
|----------------------|-----------------------------------|
| **gantt.node.cjs** | Node.js bundle in CommonJS format |
| **gantt.node.mjs** | Node.js bundle in Modules format  |

<div class="note">

Node bundles are available for licensed Bryntum Gantt version only

</div>

## CommonJS bundle example

Code example for using `ProjectModel` in CommonJS code with `gantt.node.cjs` from
[**@bryntum/gantt**](#Gantt/guides/npm-repository.md).

If you want to use bundle from the distribution zip then replace `@bryntum/gantt` with path to the bundle.

```js
const { ProjectModel } = require('@bryntum/gantt/gantt.node.cjs'); 
new ProjectModel({
    // ProjectModel config
});
```

## Modules bundle example

Code example for using `ProjectModel` in Modules code with `gantt.node.mjs` from
[**@bryntum/gantt**](#Gantt/guides/npm-repository.md).

If you want to use bundle from the distribution zip then replace `@bryntum/gantt` with path to the bundle.

```js
import { ProjectModel } from '@bryntum/gantt/gantt.node.mjs'; 
new ProjectModel({
    // ProjectModel config
});
```


<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>