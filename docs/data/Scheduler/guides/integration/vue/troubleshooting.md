# Troubleshooting Bryntum Scheduler with Vue

## Requirements

Bryntum Scheduler requires Vue `2.0.0` or higher, 
and for applications written in TypeScript, TypeScript `3.6.0` or higher.

## Installing, building or running

If you face any issues building or running examples or your application, such issues can be often resolved by the
project cleanup procedure.

Run these commands in application folder for package cache cleanup, removing installed packages and reinstalling all
project dependencies:

<div class="docs-tabs" data-name="cleanup">
<div>
    <a>MacOS/Linux</a>
    <a>Windows</a>
</div>
<div>

<strong>npm</strong>

```shell
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

<strong>yarn</strong>

```shell
yarn cache clean
rm -rf node_modules
rm package-lock.json
yarn install
```

</div>
<div>

<strong>npm</strong>

```shell
npm cache clean --force
rmdir node_modules /s /q
del package-lock.json
npm install
```

<strong>yarn</strong>

```shell
yarn cache clean
rmdir node_modules /s /q
del package-lock.json
yarn install
```
</div>
</div>

### Transpiling dependencies
If you use Vue CLI, you can also try adding the following to your `vue.config.js`:

```javascript
module.exports = {
...
    transpileDependencies: [
        '@bryntum/scheduler'
    ],
};
```

## Custom Configurations

[Vue CLI](https://cli.vuejs.org/) is the default tooling for creating, developing and managing Vue applications so it
has been chosen for our examples. It also provides an abstraction level between the application and Webpack and easy
configurability of the project through `vue.config.js` file.

While this approach would be best in majority of cases, you can still have a custom Webpack configuration that is not
managed by Vue CLI. Although it is not feasible for us to support all possible custom configurations we have some
guidelines to make the Bryntum Calendar integration easier and smoother.

If you face any issues, executing one or more of the following steps should resolve the problem.

## Add or edit `.eslintignore` file

It may also be necessary to ignore linter for some files. If you do not have `.eslintignore` in your project root create
it (edit it otherwise) so that it has at least the following content:

```javascript
scheduler.module.js
```

## The Bryntum Scheduler bundle was loaded multiple times

```text
The Bryntum Scheduler bundle was loaded multiple times by the application.
```

The error above usually means that somewhere you have imported both the module and UMD versions of the Bryntum Scheduler 
package. Inspect the code and import from a single version of the Bryntum Scheduler bundle. We recommend using the default
module of the `@bryntum/scheduler` package (points to the module bundle):

```javascript
import { Scheduler } from '@bryntum/scheduler';
```

For more information on other causes of the error, please see
[this guide](#Scheduler/guides/gettingstarted/es6bundle.md#troubleshooting).

### Vite application

When using Vite with Vue to run a Bryntum application in development mode (`npm run dev`), in order to fix loading
bundles multiple times and avoid runtime error, it is recommended to include Bryntum packages in
the [optimizeDeps](https://vitejs.dev/config/dep-optimization-options.html) in **vite.config.js** as shown below.

<div class="docs-tabs" data-name="vue">
<div>
    <a>Vue 2</a>
    <a>Vue 3</a>
</div>
<div>

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins      : [react()],
    optimizeDeps : {
        include : ['@bryntum/scheduler', '@bryntum/scheduler-vue']
    }
});
```

</div>
<div>

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-vue';

export default defineConfig({
    plugins      : [vue()],
    optimizeDeps : {
        include : ['@bryntum/scheduler', '@bryntum/scheduler-vue-3']
    }
});
```
</div>
</div>

## JavaScript heap out of memory

"JavaScript heap out of memory" error occurs on large projects where the default amount of memory allocated by node is
not sufficient to complete the command successfully.

You can increase this amount by running the following command:

**For Linux/macOS:**

```shell
export NODE_OPTIONS=--max-old-space-size=8192
```

**For Windows powershell:**

```shell
$env:NODE_OPTIONS="--max-old-space-size=8192"
```

Alternatively you can increase the amount of memory by adding the following
`NODE_OPTIONS='--max-old-space-size=8192'` config to `scripts` section in **package.json** file:

**For example change used build script:**

```json
{
  "scripts": {
    "build": "your-build-script"
  }
}
```

**to:**

```json
{
  "scripts": {
    "build": "cross-env NODE_OPTIONS='--max-old-space-size=8192' your-build-script"
  }
}
```

To apply this environment config you need `cross-env` npm library which can be installed to devDependencies with:

```shell
nmp install cross-env --save-dev
```

## Legacy peer dependencies

When you use **npm** v7 or above to install application, it checks that application dependencies have valid versions
compared to the other packages used.

If you want change some dependency version you may use
[npm-shrinkwrap](https://docs.npmjs.com/cli/v9/commands/npm-shrinkwrap) for this to set the valid version you want.

Another approach is to install other dependency packages for new **npm** versions above v7 with the
`--legacy-peer-deps` config flag enabled. Please read information in
[npm documentation](https://docs.npmjs.com/cli/v9/using-npm/config#legacy-peer-deps).

**Example:**

Create **.npmrc** in application folder with the following code:
```
legacy-peer-deps=true
```

This will allow using `npm install` without errors.

<div class="note">

We recommend upgrading your application to use a newer framework version instead of working around it. This will help to resolve issues with outdated
peer dependencies

</div>

## Openssl legacy provider 

When using Node 18+ for application which uses legacy dependencies, you may receive this error during compilation:

```bash
Error: error:0308010C:digital envelope routines::unsupported
```

To resolve this issue create `.npmrc` file in the application folder and put this inside:

```txt
node-options="--openssl-legacy-provider"
```

Alternate solution is to open a terminal and export the environment variable before running your Node.js application:

**Mac, Ubuntu (and other Linux distributions):**

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

**Windows (command prompt)**

```bash
set NODE_OPTIONS=--openssl-legacy-provider
```

**Windows (PowerShell)**

```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
```



<p class="last-modified">Last modified on 2024-05-21 9:20:05</p>