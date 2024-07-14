# Getting Started with Bryntum Grid in React

## Try React demos

Bryntum Grid is delivered with a variety of React demo applications showing its functionality.
All demo applications have been verified to be compatible with Node.js 20.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/grid/examples/?framework=react" class="b-card"><i class="fas b-fa-globe"></i>View online React demos</a>
<a href="#Grid/guides/integration/react/guide.md#build-and-run-local-demos" class="b-card"><i class="fab b-fa-react">
</i>Build and run React demos</a>
</div>

## Requirements

Bryntum Grid requires React `16.0.0` or higher,
and for applications written in TypeScript, TypeScript `3.6.0` or higher.

## Get Started

In this guide we will explain how to get started if you are using [vitejs.org guide](https://vitejs.dev/guide).

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Project setup](##project-setup)
3. [Create Grid Application](##create-grid-application)
4. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the illustration below:

<img src="Grid/getting-started-result-react-cra.png" class="b-screenshot" alt="Getting Started on Bryntum Grid with React Result">

## Access to npm registry

Please refer to this [guide for Bryntum NPM repository access](#Grid/guides/npm-repository.md).

## Project setup

There are many possible ways of creating and building React applications. Let’s use
[React Vite guide](https://vitejs.dev/guide), which has proven to offer higher efficiency and better performance in
development.

If you are using **javascript only**, please type:

```shell
npm create vite@latest bryntum-grid-app -- --template react
```

or if you prefer using **typescript**:

```shell
npm create vite@latest bryntum-grid-app -- --template react-ts
```

Please feel free to change `bryntum-grid-app` to your preferred application name

Once the template is created, install the node modules:

```shell
cd bryntum-grid-app
npm install && npm install sass
```

### Install Bryntum Grid packages

Now that our project has been setup successfully, it's time for us to install Bryntum Grid package into it so that
we can access the Bryntum features. From your terminal, you can install the following Bryntum Grid packages:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```shell
npm install @bryntum/grid@npm:@bryntum/grid-trial @bryntum/grid-react
```

</div>
<div>

```shell
npm install @bryntum/grid @bryntum/grid-react
```
</div>
</div>

<div class="note">

Note: Ensure that you have configured your npm properly to get access to the Bryntum packages. If not, refer to <a href="#Grid/guides/npm-repository.md">this guide</a>.

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
  "@bryntum/grid": "npm:@bryntum/grid-trial@5.6.11",
  "@bryntum/grid-react": "5.6.11",
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
  "@bryntum/grid": "5.6.11",
  "@bryntum/grid-react": "5.6.11",
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
Please follow [this guide](#Grid/guides/integration/react/troubleshooting.md#vite-application) for more
configuration information.

## Create Grid Application

Now that your project has been setup, let's start with creating a config file in the `src`, which will have Grid configuration.

<div class="docs-tabs" data-name="Grid">
<div>
    <a>GridConfig.js</a>
    <a>GridConfig.ts</a>
</div>
<div>

```javascript
const gridConfig = {
    columns : [
        { text : 'Name', field : 'name', flex : 2 },
        { text : 'Age', field : 'age', width : 100, type : 'number' },
        { text : 'City', field : 'city', flex : 1 },
        { text : 'Food', field : 'food', flex : 1 },
        {
            text  : 'Color',
            field : 'color',
            flex  : 1,
            renderer({ cellElement, value }) {
                // set the color based on the value (e.g. "Red" should be red)
                cellElement.style.color = value;
                return value;
            }
        }
    ],

    data : [
        {
            id        : 1,
            name      : 'Don A Taylor',
            firstName : 'Don',
            surName   : 'Taylor',
            city      : 'Dubai',
            team      : 'Paris Tigers',
            age       : 30,
            food      : 'Salad',
            color     : 'Black'
        },
        {
            id        : 2,
            name      : 'John B Adams',
            firstName : 'John',
            surName   : 'Adams',
            city      : 'Paris',
            team      : 'Washington Horses',
            age       : 64,
            food      : 'Bolognese',
            color     : 'Orange'
        },
        {
            id        : 3,
            name      : 'Doug C Jones',
            firstName : 'Doug',
            surName   : 'Jones',
            city      : 'Stockholm',
            team      : 'New York Hens',
            age       : 30,
            food      : 'Pancake',
            color     : 'Pink'
        },
        {
            id        : 4,
            name      : 'James D Davis',
            firstName : 'James',
            surName   : 'Davis',
            city      : 'Barcelona',
            team      : 'Dubai Lions',
            age       : 87,
            food      : 'Pancake',
            color     : 'Green'
        },
        {
            id        : 5,
            name      : 'Mike E Johnson',
            firstName : 'Mike',
            surName   : 'Johnson',
            city      : 'Dubai',
            team      : 'New York Roosters',
            age       : 14,
            food      : 'Pancake',
            color     : 'Green'
        },
        {
            id        : 6,
            name      : 'Don F Johnson',
            firstName : 'Don',
            surName   : 'Johnson',
            city      : 'Dubai',
            team      : 'Paris Tigers',
            age       : 18,
            food      : 'Fish n chips',
            color     : 'Red'
        },
        {
            id        : 7,
            name      : 'Jane G McGregor',
            firstName : 'Jane',
            surName   : 'McGregor',
            city      : 'Stockholm',
            team      : 'Dubai Eagles',
            age       : 78,
            food      : 'Fish n chips',
            color     : 'Green'
        },
        {
            id        : 8,
            name      : 'Jane H Thomas',
            firstName : 'Jane',
            surName   : 'Thomas',
            city      : 'New York',
            team      : 'Paris Cougars',
            age       : 65,
            food      : 'Fish n chips',
            color     : 'Black'
        },
        {
            id        : 9,
            name      : 'Lisa I Anderson',
            firstName : 'Lisa',
            surName   : 'Anderson',
            city      : 'New York',
            team      : 'Stockholm Tigers',
            age       : 14,
            food      : 'Burger',
            color     : 'Orange'
        },
        {
            id        : 10,
            name      : 'Don J Thomas',
            firstName : 'Don',
            surName   : 'Thomas',
            city      : 'Stockholm',
            team      : 'Barcelona Cougars',
            age       : 45,
            food      : 'Salad',
            color     : 'Black'
        },
        {
            id        : 11,
            name      : 'Doug K Jackson',
            firstName : 'Doug',
            surName   : 'Jackson',
            city      : 'Barcelona',
            team      : 'Dubai Cats',
            age       : 16,
            food      : 'Fish n chips',
            color     : 'Red'
        },
        {
            id        : 12,
            name      : 'James L Ewans',
            firstName : 'James',
            surName   : 'Ewans',
            city      : 'Dubai',
            team      : 'Dubai Dogs',
            age       : 30,
            food      : 'Salad',
            color     : 'Black'
        },
        {
            id        : 13,
            name      : 'Jenny M Brown',
            firstName : 'Jenny',
            surName   : 'Brown',
            city      : 'Dubai',
            team      : 'Stockholm Eagles',
            age       : 56,
            food      : 'Waffles',
            color     : 'Orange'
        },
        {
            id        : 14,
            name      : 'Doug N Ewans',
            firstName : 'Doug',
            surName   : 'Ewans',
            city      : 'Barcelona',
            team      : 'New York Dogs',
            age       : 61,
            food      : 'Pancake',
            color     : 'Teal'
        },
        {
            id        : 15,
            name      : 'Mike O Ewans',
            firstName : 'Mike',
            surName   : 'Ewans',
            city      : 'Stockholm',
            team      : 'New York Roosters',
            age       : 78,
            food      : 'Burger',
            color     : 'Green'
        }
    ]
};

export { gridConfig };
```

</div>
<div>

```typescript
/**
 * Application configuration
 */
import { GridConfig } from "@bryntum/grid";

const gridConfig: Partial<GridConfig> = {
  columns: [
    { text: "Name", field: "name", flex: 2 },
    { text: "Age", field: "age", width: 100, type: "number" },
    { text: "City", field: "city", flex: 1 },
    { text: "Food", field: "food", flex: 1 },
    {
      text: "Color",
      field: "color",
      flex: 1,
      renderer({
        cellElement,
        value,
      }: {
        cellElement: HTMLElement;
        value: string;
      }) {
        // set the color based on the value (e.g. "Red" should be red)
        cellElement.style.color = value;
        return value;
      },
    },
  ],

  data: [
    {
      id: 1,
      name: "Don A Taylor",
      firstName: "Don",
      surName: "Taylor",
      city: "Dubai",
      team: "Paris Tigers",
      age: 30,
      food: "Salad",
      color: "Black",
    },
    {
      id: 2,
      name: "John B Adams",
      firstName: "John",
      surName: "Adams",
      city: "Paris",
      team: "Washington Horses",
      age: 64,
      food: "Bolognese",
      color: "Orange",
    },
    {
      id: 3,
      name: "Doug C Jones",
      firstName: "Doug",
      surName: "Jones",
      city: "Stockholm",
      team: "New York Hens",
      age: 30,
      food: "Pancake",
      color: "Pink",
    },
    {
      id: 4,
      name: "James D Davis",
      firstName: "James",
      surName: "Davis",
      city: "Barcelona",
      team: "Dubai Lions",
      age: 87,
      food: "Pancake",
      color: "Green",
    },
    {
      id: 5,
      name: "Mike E Johnson",
      firstName: "Mike",
      surName: "Johnson",
      city: "Dubai",
      team: "New York Roosters",
      age: 14,
      food: "Pancake",
      color: "Green",
    },
    {
      id: 6,
      name: "Don F Johnson",
      firstName: "Don",
      surName: "Johnson",
      city: "Dubai",
      team: "Paris Tigers",
      age: 18,
      food: "Fish n chips",
      color: "Red",
    },
    {
      id: 7,
      name: "Jane G McGregor",
      firstName: "Jane",
      surName: "McGregor",
      city: "Stockholm",
      team: "Dubai Eagles",
      age: 78,
      food: "Fish n chips",
      color: "Green",
    },
    {
      id: 8,
      name: "Jane H Thomas",
      firstName: "Jane",
      surName: "Thomas",
      city: "New York",
      team: "Paris Cougars",
      age: 65,
      food: "Fish n chips",
      color: "Black",
    },
    {
      id: 9,
      name: "Lisa I Anderson",
      firstName: "Lisa",
      surName: "Anderson",
      city: "New York",
      team: "Stockholm Tigers",
      age: 14,
      food: "Burger",
      color: "Orange",
    },
    {
      id: 10,
      name: "Don J Thomas",
      firstName: "Don",
      surName: "Thomas",
      city: "Stockholm",
      team: "Barcelona Cougars",
      age: 45,
      food: "Salad",
      color: "Black",
    },
    {
      id: 11,
      name: "Doug K Jackson",
      firstName: "Doug",
      surName: "Jackson",
      city: "Barcelona",
      team: "Dubai Cats",
      age: 16,
      food: "Fish n chips",
      color: "Red",
    },
    {
      id: 12,
      name: "James L Ewans",
      firstName: "James",
      surName: "Ewans",
      city: "Dubai",
      team: "Dubai Dogs",
      age: 30,
      food: "Salad",
      color: "Black",
    },
    {
      id: 13,
      name: "Jenny M Brown",
      firstName: "Jenny",
      surName: "Brown",
      city: "Dubai",
      team: "Stockholm Eagles",
      age: 56,
      food: "Waffles",
      color: "Orange",
    },
    {
      id: 14,
      name: "Doug N Ewans",
      firstName: "Doug",
      surName: "Ewans",
      city: "Barcelona",
      team: "New York Dogs",
      age: 61,
      food: "Pancake",
      color: "Teal",
    },
    {
      id: 15,
      name: "Mike O Ewans",
      firstName: "Mike",
      surName: "Ewans",
      city: "Stockholm",
      team: "New York Roosters",
      age: 78,
      food: "Burger",
      color: "Green",
    },
  ],
};

export { gridConfig };
```
</div>
</div>

Next is to replace your `App.jsx` or `App.tsx` with the following code:

<div class="docs-tabs" data-name="App">
<div>
    <a>App.jsx</a>
    <a>App.tsx</a>
</div>
<div>

```javascript
import { BryntumGrid } from "@bryntum/grid-react";
import { gridConfig } from "./GridConfig";
import './App.scss';

function App() {

    return (
        <BryntumGrid
            {...gridConfig}
        />
    );
}

export default App;
```

</div>
<div>

```typescript
// TypeScript Version
import { BryntumGrid } from "@bryntum/grid-react";
import { gridConfig } from "./GridConfig";
import './App.scss';

function App() {

    return (
        <BryntumGrid
            {...gridConfig}
        />
    );
}

export default App;
```
</div>
</div>

This will setup your Grid, but you need to apply some styling to it.

### Styling

To ensure there is no unexpected styling, delete the `index.css` file and also remove it from the `main.jsx` or `main.tsx`.

Next, rename the `App.css` file to `App.scss` and replace it with the following:

```scss
// import bryntum theme
@import "@bryntum/grid/grid.stockholm.css";

// Giving our grid some height
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

Please refer to this [Troubleshooting guide](#Grid/guides/integration/react/troubleshooting.md).

## What to do next?

### Further on integration with React

Do you want to know more about how Bryntum Grid integrates with react and start to customize your application? We
provide you with a [complete React guide here](#Grid/guides/integration/react/guide.md).

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Grid/guides/data/displayingdata.md) explains how they all fit together.



<p class="last-modified">Last modified on 2024-05-21 9:10:56</p>