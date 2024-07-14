# Migrate from AG Grid to Bryntum Grid

[Bryntum Grid](https://www.bryntum.com/products/grid/) and [AG Grid](https://www.ag-grid.com/) are popular JavaScript web component libraries that are used to create feature-rich tables. In our [JavaScript table libraries comparison article](https://bryntum.com/blog/comparison-of-javascript-table-libraries-using-svelte-bryntum-grid-vs-ag-grid-vs-datatables/) blog, we showed that Bryntum Grid had the best developer experience due to its many built-in functions for common table features, such as creating custom filters, adding buttons, and adding column summaries. 

In this tutorial, we’ll migrate an existing implementation of an AG Grid table to Bryntum Grid. We'll do the following:

- Set up the AG Grid reference implementation starter that uses Node.js and MySQL.
- Create an API endpoint for a Bryntum Grid to get data from the MySQL database.
- Add the Bryntum Grid to the frontend.
- Test the migration implementation.

You can find the code for this tutorial in [our AG Grid starter project GitHub repository](https://github.com/bryntum/ag-grid-to-bryntum-grid-starter).

## Setting up the AG Grid starter project

We'll use an existing AG Grid starter project created by AG Grid. It's a reference implementation that shows you how to perform server-side operations using AG Grid with Express.js and MySQL. For more information about this reference implementation, take a look at the following tutorial from the AG Grid docs: [Server-Side Operations With Node.js](http://ag-grid.com/nodejs-server-side-operations/).

First, clone the [AG Grid starter project](https://github.com/bryntum/ag-grid-to-bryntum-grid-starter) that was forked from the AG Grid docs tutorial: [Server-Side Operations With Node.js](http://ag-grid.com/nodejs-server-side-operations/). 

Navigate into the project directory:

```bash
cd ag-grid-to-bryntum-grid-starter
```

Let's remove the dependencies we don't need.

In the `package.json` file, remove `"mysql"` from the `"dependencies"` object. We'll use MySQL2 instead of MySQL because it makes connecting to the MySQL database easier. The MySQL library does not support the new default authentication method used by MySQL 8, which we'll use in this tutorial. You can read more about the MySQL 8 authentication protocol [here](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server/56509065#56509065). 

Now remove `"node-sass"` from the `"devDependencies"` object. We won't need this dependency and it may cause issues when you install the dependencies if you have Python 3 installed on your PC. 

Next, you can delete the `yarn.lock` file as we'll use npm as a Node.js package manager instead of Yarn. Node version 16.13.1 was used for this migration. 

Install the dependencies by running the following command:

```bash
npm install
```

Now install [MySQL2](https://www.npmjs.com/package/mysql2#history-and-why-mysql2):

```bash
npm install mysql2
```

In the `server/olympicWinnersService.js` file, find the following line:

```javascript
import mysql from "mysql";
```

And replace it with this import:

```javascript
import mysql from "mysql2";
```

The `olympicWinnersService.js` file uses the `mysql2` library to connect to a MySQL database and run SQL queries. The database is queried in the `/olympicWinners` POST route in the `server/server.js` file. Client-side HTML and JavaScript files in the `client` folder are bundled with Webpack and the [`webpack-dev-middleware`](https://www.npmjs.com/package/webpack-dev-middleware) library serves Webpack bundles in the Express app, as you can see in the following line in the `server/server.js` file:

```javascript
app.use(webpackMiddleware(webpack(webpackConfig)));
```

Note that this library should only be used for development. 

The client-side AG Grid is instantiated and defined in the `client/index.js` file.

## Setting up a MySQL database locally

We'll install MySQL Workbench, a MySQL GUI we’ll use to create a database and run queries. Download MySQL Community Server and MySQL Workbench from the [MySQL community downloads page](https://dev.mysql.com/downloads/). If you’re using Windows, you can use the MySQL Installer to download the MySQL products. Use the default configurations when configuring MySQL Community Server and MySQL Workbench, but configure the MySQL Community Server to start on system startup for your convenience.

Open the MySQL Workbench desktop application and open the local instance of the MySQL Community Server you configured.

We’ll write our MySQL queries in the query tab and execute the queries by pressing the yellow lightning bolt button.

Let's create a database with a table for our grids. Execute the following query to create a database called `sample_data`:

```sql
CREATE DATABASE sample_data;
```

## Populating the MySQL database  

In your AG Grid app, the `data/olympic_winners.sql` file contains SQL queries for creating an `olympic_winners` table in your `sample_data` database and populating it with example data. We'll use MySQL Community Server to run this SQL script. 

Run the following command in your operating system command-line interface (for example, Windows Command Prompt):

```bash
mysql -u root -p -D sample_data < "C:/Users/path to your project/ag-grid-to-bryntum-grid-starter/data/olympic_winners.sql"
```

Here's a breakdown of what this SQL command means:

- `mysql` is the MySQL command line utility.
- `-u root` specifies the username, which is "root".
- `-p` specifies that the command should prompt you for a password.
- `-D sample_data` selects the `sample_data` database.
- `<` is a redirection operator that feeds the content of the file into the `mysql` command.
- `"C:/Users/path to your project/ag-grid-to-bryntum-grid-starter/data/olympic_winners.sql"` is the file to be loaded. We use quotes here because the path contains spaces.

You may need to add the path name of your MySQL Server `bin` directory to your operating system `PATH` environment variable to run this script. You can learn how to do this [here](https://dev.mysql.com/doc/mysql-windows-excerpt/5.7/en/mysql-installation-windows-path.html). 

In MySQL Workbench, execute the following query to select the database we created: 

```sql
USE sample_data;
```

Now execute the following query to view all of the sample data:

```sql
SELECT * FROM olympic_winners ORDER BY country ASC;
```

You should see the example data in the result grid:

![Olympic sample data in MySQL Workbench](data/Grid/images/migration/migrate-ag-grid-to-bryntum/mysql-data.png)

## Connecting the database to the Node.js backend

To connect the database to our backend Node.js server, install dotenv:

```bash
npm install dotenv
```

The dotenv module will allow you to load environment variables from a `.env` file.

Create a `utils` folder in the project root directory. In the `utils` folder, create a file named `dbConnect.js` and add the following lines of code to it:

```javascript
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.log(process.env.HOST, process.env.USER);
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
```

The `createConnection` method is used to create a connection to the MySQL database. To establish the connection, the `connect` method is called. 

Now create a `.env` file in the root directory of the project. Add the following environment variables to it.
```
HOST=localhost
PORT=1338
USER=root
PASSWORD=your-password
DATABASE=sample_data
```

Make sure to add `.env` to the `.gitignore` file.

In the `server/olympicWinners.js` file, remove the connection variable and the `mysql` import and add the following line of code:

```javascript
import { connection } from "../utils/dbConnect";
```

In the `server/server.js` file, add the following line of code below the imports: 

```javascript
const port = process.env.PORT || 1338;
```

Here we place the database connection in a separate file so that we can easily reuse it with the API endpoint we'll create for Bryntum Grid. We'll use the port defined in the `.env` file. 

Still in the `server/server.js` file, change the `app.listen` method to the following:

```javascript
app.listen(port, () => {
  console.log(`Started on localhost: ${port}`);
});
```

Now run the local development server:

```bash
npm run dev
```

You should see the AG Grid table with data about Olympic medalists between the years 2000 and 2012 if you visit http://localhost:1338 in your browser:

![Ag Grid table](data/Grid/images/migration/migrate-ag-grid-to-bryntum/ag-grid-table.png)

The "country" and "sport" columns are combined into a "Group" column. This is defined in the `columnDefs` property of the `gridOptions` object in the `client/index.js` file. When you click on the arrow icon next to a country in the "Group" column, the "sport" column data is lazy loaded. When you click on the arrow icon next to a sport, the "athlete" and "year" columns are populated:

![AG Grid - lazy loaded data](data/Grid/images/migration/migrate-ag-grid-to-bryntum/ag-grid-lazy-loading.png)

AG Grid uses the [Server-Side Row Model (SSRM)](https://www.ag-grid.com/javascript-data-grid/server-side-model/) to lazy load child records from group rows. The grid is configured to use the SSRM by setting the `rowModelType` in `gridOptions` to `'serverSide'` in the `client/index.js` file. 

Data fetching for the SSRM is defined in the `getRows(params)` function. Each time the page is loaded and when a group row is expanded, a POST request is made to the `/olympicWinners` API route to fetch data for the AG Grid. In the `server/olympicWinnersService.js` file, the `OlympicWinnersService` class has methods for creating the required MySQL queries, making queries to the database, and returning the data to the `olympicWinners` API route.

## Creating a new server API endpoint for the Bryntum Grid

For this migration, we can use the database used by AG Grid as is. For other migrations, you may need to do a database migration. Take a look at our [migrating from DHTMLX Gantt to Bryntum Gantt](https://bryntum.com/blog/migrate-from-dhtmlx-gantt-to-bryntum-gantt/) tutorial for more on database migration. 

In the `server.js` file, add the following API route GET request handler below the `'/olympicWinners'` POST request handler:

```javascript
app.get("/load", async (req, res) => {
  const { id } = req.query;
  let country, sport = "";
  
  if (id) {
    if (id.includes("-")) {
      [country, sport] = id.split("-");
    } else {
      country = id;
    }
  }
  
  // Lazy load for specific country and sport
  if (country && sport) {
    connection.query(
      "SELECT * FROM olympic_winners WHERE country = ? AND sport = ? ORDER BY gold DESC, silver DESC, bronze DESC",
      [country, sport],
      function (err, results) {
        if (err) return res.json({ success: false, err });
        return res.json({ success: true, data: results });
      }
    );
    return;
  }

  // Lazy load for specific country
  if (country && !sport) {
    connection.query(
      "SELECT sport, SUM(gold) as totalGold, SUM(silver) as totalSilver, SUM(bronze) as totalBronze FROM olympic_winners WHERE country = ? GROUP BY sport ORDER BY totalGold DESC, totalSilver DESC, totalBronze DESC",
      [id],
      function (err, results) {
        if (err) return res.json({ success: false, err });
        const groupedData = results.map((row) => ({
          id: `${id}-${row.sport}`,
          group: row.sport,
          gold: row.totalGold,
          silver: row.totalSilver,
          bronze: row.totalBronze,
          children: true,
        }));
        return res.json({ success: true, data: groupedData });
      }
    );
    return;
  }

  // Initial load for countries
  connection.query(
    "SELECT country, SUM(gold) as totalGold, SUM(silver) as totalSilver, SUM(bronze) as totalBronze FROM olympic_winners GROUP BY country ORDER BY totalGold DESC, totalSilver DESC, totalBronze DESC",
    function (err, results) {
      if (err) return res.json({ success: false, err });
      const groupedData = results.map((row) => ({
        id: row.country,
        group: row.country,
        gold: row.totalGold,
        silver: row.totalSilver,
        bronze: row.totalBronze,
        children: true,
      }));
      return res.json({ success: true, data: groupedData });
    }
  );
});
```

Now import the connection variable along with the other imports at the top of the `server.js` file:

```javascript
import { connection } from "../utils/dbConnect.js";
```

This API route handles fetching the Olympic medalist data, including fetching child node data on demand. This replicates the lazy loading functionality of AG Grid. We'll use a Bryntum [TreeGrid](https://bryntum.com/products/grid/docs/api/Grid/view/TreeGrid) to display the tree data where the "country" and "sport" parent nodes will be grouped into a "Group" column in the Bryntum TreeGrid. When a country or sport parent node is expanded by clicking on the dropdown arrow in the Bryntum TreeGrid, the child node data will be fetched from this API endpoint. The `id` query parameter is used to determine which child node to fetch. To see an example of this lazy loading of data, take a look at our [tree load on demand demo](https://bryntum.com/products/grid/examples/treeloadondemand/).

In our SQL queries, we also order the countries, sports, and athletes by the number of medals won.
The possible API responses are structured to have the expected [server response](https://bryntum.com/products/grid/docs/guide/Grid/data/ajaxstore#server-response) when using remote data for a Bryntum Grid. 

Run the local development server and visit the `http://localhost:1338/load` URL on your browser. You should see the Olympic medalist country data displayed in your browser:

![Bryntum Grid - API endpoint response data](data/Grid/images/migration/migrate-ag-grid-to-bryntum/bryntum-api-data.png)

## Updating the frontend

First, install the Bryntum Grid component by following [step 1](https://bryntum.com/products/grid/docs/guide/Grid/quick-start/javascript-npm#access-to-npm-registry) and [step 4](https://bryntum.com/products/grid/docs/guide/Grid/quick-start/javascript-npm#install-component) of our [guide to getting started with Bryntum Grid using npm](https://bryntum.com/products/grid/docs/guide/Grid/quick-start/javascript-npm). 

In the `client/index.html` file, comment out the styles in the `<style>` tag and add the following:

```css
  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: Lato, "Open Sans", Helvetica, Arial, sans-serif;
    font-size: 0.875rem;
  }
  .b-tree-leaf-cell .b-icon:before {
    display: none;
  }
```

The "b-tree-leaf-cell" and "b-icon" class styling will remove the bullet point icon in empty cells of the Group column in the Bryntum TreeGrid.
Now comment out the `<div>` in the `<body>` tag.

In the `client/index.js` file, comment out all the code and add the following lines:

```javascript
import { TreeGrid, AjaxStore } from "@bryntum/grid";
import "@bryntum/grid/grid.stockholm.css";

const store = new AjaxStore({
  readUrl: "/load",
  autoLoad: true,
  tree: true,
  fields: [
    "group",
    "sport",
    "athlete",
    { name: "year", type: "number" },
    { name: "gold", type: "number" },
    { name: "silver", type: "number" },
    { name: "bronze", type: "number" },
  ],
});

const grid = new TreeGrid({
  appendTo: document.body,
  readOnly: true,
  features: {
    stripe: true,
  },
  animateTreeNodeToggle: true,
  store,
  columns: [
    {
      type: "tree",
      text: "Group",
      field: "group",
      flex: 1,
    },
    {
      text: "Athlete",
      field: "athlete",
      flex: 1,
    },
    {
      text: "Year",
      field: "year",
      flex: 1,
    },
    {
      text: "sum(Gold)",
      field: "gold",
      flex: 1,
    },
    {
      text: "sum(Silver)",
      field: "silver",
      flex: 1,
    },
    {
      text: "sum(Bronze)",
      field: "bronze",
      flex: 1,
    },
  ],
});
```

Here we create an instance of the Bryntum [TreeGrid](https://bryntum.com/products/grid/docs/api/Grid/view/TreeGrid) component, which is a [Tree](https://bryntum.com/products/grid/docs/api/Grid/feature/Tree) combined with a Grid. We append it to the document `<body>`. The grid is set to read-only mode so that it can't be edited and we added the [`stripe`](https://bryntum.com/products/grid/docs/api/Grid/feature/Stripe) feature so that the rows will be striped. We set [animateTreeNodeToggle](https://bryntum.com/products/grid/docs/api/Grid/view/GridBase#config-animateTreeNodeToggle) to `true` so that tree branch node expansion and collapse operations will be animated. This config option was added to the [5.6.0 release of Bryntum's UI component suite](https://bryntum.com/blog/whats-new-in-5-6-0/). 
  
 The [AjaxStore](https://bryntum.com/products/grid/docs/api/Core/data/AjaxStore) uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to fetch data from our `"/load"` API endpoint when the page is loaded. We set the `tree` property to `true` to make the store a `tree` store. You can learn more about working with tree data in our guide: [Using tree data](https://bryntum.com/products/grid/docs/guide/Core/data/treedata). We also define the [fields](https://bryntum.com/products/grid/docs/api/Core/data/AjaxStore#config-fields) for tree data store.
 
 The Group column in the TreeGrid's `columns` config has a `type` of "tree". It's a  [TreeColumn](https://bryntum.com/products/grid/docs/api/Grid/column/TreeColumn) that displays the tree data. A TreeGrid must be configured with exactly one TreeColumn.

Our Bryntum TreeGrid uses the Stockholm CSS [theme](https://bryntum.com/products/grid/docs/guide/Grid/customization/styling#using-a-theme). This theme uses Bryntum Grid font files. We need to add a file [loader](https://webpack.js.org/concepts/#loaders) to our Webpack config so that Webpack can handle the font files.  

Install the [`file-loader`](https://www.npmjs.com/package/file-loader) Webpack module:

```bash
npm install --save-dev file-loader
```

In the `webpack.config.js` file, add the following object to the `rules` array in the `module` object:

```javascript
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
```

## Testing the migration implementation

Run the development server:

```bash
npm run dev
```

You'll see the Olympic medalist data in the Bryntum Grid component if you visit http://localhost:1338 in your browser:

![Bryntum Grid with data](data/Grid/images/migration/migrate-ag-grid-to-bryntum/bryntum-grid.png)

## Differences between AG Grid and Bryntum Grid

In doing the migration, we've seen how AG Grid is implemented differently from Bryntum Grid. Let's look at some of the major differences between the two.

###  Columns and cell rendering

Columns are defined in the AG Grid [`gridOptions`](https://www.ag-grid.com/javascript-data-grid/grid-options/) config object using the [`ColDef`](https://www.ag-grid.com/javascript-data-grid/column-definitions/) property. It's an array of column definitions:

```javascript
const gridOptions = {
  columnDefs: [{ field: "athlete" },{ field: "sport" }, { field: "age" }],
  // other grid options ...
};
```

You can create [column groups](https://www.ag-grid.com/javascript-data-grid/column-properties/#reference-columnGroups) using the `children` property. There are various [column properties](https://www.ag-grid.com/javascript-data-grid/column-properties/#reference-filtering) that you can use to configure the columns, such as [`filter`](https://www.ag-grid.com/javascript-data-grid/column-properties/#reference-filtering) and [`aggFunc`](https://www.ag-grid.com/javascript-data-grid/column-properties/#reference-filtering). 

AG Grid creates cell values as text by default. If you want customized HTML rendering, use a [cell renderer](https://www.ag-grid.com/javascript-data-grid/component-cell-renderer/).

In the Bryntum Grid, columns are defined in the [`columns`](https://bryntum.com/products/grid/docs/api/Grid/column/Column) config object. It's an array of column configs:

```javascript
const gridConfig = {
  columns: [
    { field: "athlete", text: "athlete" },
    { field: "sport", text: "sport" },
    { field: "age", text: "age" },
  ],
  // other grid options 
};
```

Each column has config properties such as [`type`](https://bryntum.com/products/grid/docs/api/Grid/column/Column#column-types), which includes [`aggregate`](https://bryntum.com/products/grid/docs/api/Grid/column/AggregateColumn), and [`filterable`](https://bryntum.com/products/grid/docs/api/Grid/column/Column#config-filterable). Filtering only works if [`filter`](https://bryntum.com/products/grid/docs/api/Grid/feature/Filter) or the [`filterBar`](https://bryntum.com/products/grid/docs/api/Grid/feature/FilterBar) feature is enabled. You can [group columns](https://bryntum.com/products/grid/docs/api/Grid/column/Column#grouped-columns-headers) using the `children` property to define child columns on a parent column.

For custom cell rendering, use a [`renderer`](https://bryntum.com/products/grid/docs/api/Grid/column/Column#config-renderer) function. 

### Data loading and saving

AG Grid uses [Row Models](https://www.ag-grid.com/javascript-data-grid/row-models/) to load data into the grid. There are four Row Model types: 

- [Client-Side](https://www.ag-grid.com/javascript-data-grid/client-side-model/)
- [Server-Side](https://www.ag-grid.com/javascript-data-grid/server-side-model/)
- [Infinite](https://www.ag-grid.com/javascript-data-grid/infinite-scrolling/)
- [Viewport](https://www.ag-grid.com/javascript-data-grid/viewport/)

The Client-Side Row Model loads all of the data into the grid at once. The Server-Side Row Model lazy-loads data from the server, which makes it ideal for working with very large datasets.

To configure the grid to use the Server-Side Row Model, set the `rowModelType` property in the `gridOptions` object to "serverSide":

```javascript
const gridOptions = {
  rowModelType: "serverSide",
  // other grid options 
};
```

To fetch data from the Server-Side Row Model, you need to define a [Datasource](https://www.ag-grid.com/javascript-data-grid/server-side-operations-nodejs/#server-side-datasource). It contains a `getRows()` method that accepts request params from the grid and returns data from a fetch request to the grid.

```javascript
const datasource = {
    getRows(params) {
        console.log(JSON.stringify(params.request, null, 1));

        fetch('./olympicWinners/', {
            method: 'post',
            body: JSON.stringify(params.request),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        .then(httpResponse => httpResponse.json())
        .then(response => {
            params.successCallback(response.rows, response.lastRow);
        })
        .catch(error => {
            console.error(error);
            params.failCallback();
        })
    }
};

// register datasource with the grid
gridOptions.api.setServerSideDatasource(datasource);
```

You can set up a [server API endpoint](https://www.ag-grid.com/javascript-data-grid/server-side-operations-nodejs/#server-endpoint) to handle the fetch request.

To save data changes when using the Server-Side Row Model for loading data, you can use [single row updates](https://www.ag-grid.com/javascript-data-grid/server-side-model-updating-single-row/) to update data in specific rows, or [transactions](https://www.ag-grid.com/javascript-data-grid/server-side-model-updating-transactions/). Transactions can be [batched](https://www.ag-grid.com/javascript-data-grid/server-side-model-updating-transactions/#asynchronous-updates) for smoother, more efficient updates. 

When using the Client-Side Row Model for loading data, you can use client-side [single row updates](https://www.ag-grid.com/javascript-data-grid/data-update-single-row-cell/) to update data in specific rows, or [transactions](https://www.ag-grid.com/javascript-data-grid/data-update-transactions/).   


Bryntum Grid has an [AjaxStore](https://bryntum.com/products/grid/docs/api/Core/data/AjaxStore) to simplify loading data from a server and updating the data. It uses the Fetch API to perform CRUD operations using URL strings: 

```javascript
const store = new AjaxStore({
  readUrl: "/load",
  createUrl: "/create",
  updateUrl: "/update",
  deleteUrl: "/delete",
  autoLoad : true,
});
```

Changes to the Bryntum Grid UI will be persisted to the backend. When creating the API endpoints, the Bryntum Grid expects a specific [response structure](https://bryntum.com/products/grid/docs/guide/Grid/data/ajaxstore#server-response).

You can also update the store programmatically:

```javascript
store.add([{ name: "Han" }, { name: "Leia" }]); 
store.commmit();
// -> Posted to server: data = [{ name: "Han" }, { name: "Leia" }];

store.getAt(0).name = "Kylo";
store.getAt(1).name = "Rey";
store.commit();
// -> Posted to server: data = [{ id: 1, name: "Kylo" }, { id: 2, name: "Rey" }];

store.getById(1).remove();
store.getById(2).remove();
store.commit();
// -> Posted to server: data = [1, 2];
```

The [`commit()`](https://bryntum.com/products/grid/docs/api/Core/data/AjaxStore#function-commit) method commits all create, update, and delete data changes to the corresponding AjaxStore URLs.

To lazy load grouped data, you can use a TreeGrid and tree data store. If you set the `children` property of a parent node to `true`, it indicates that the child node data should be lazy loaded when the parent node dropdown arrow is clicked in the TreeGrid. A GET request is made to the `readURL` of the tree data store with the `id` of the parent node clicked as a query parameter. The `id` is used to fetch the child node data from the server. You can learn more about using tree data in our guide: [Using tree data](https://bryntum.com/products/grid/docs/guide/Core/data/treedata).

### Cell editing

To enable [cell editing](https://www.ag-grid.com/javascript-data-grid/cell-editing/) in AG Grid, use the `editable` property in the column definition:

```javascript
const gridOptions = {
  columnDefs: [
    {
      field: "athlete",
      editable: true,
    },
  ],
  // other grid options ...
};
```

You can also enable cell editing on all columns using the `defaultColDef`:

```javascript
columnDefs: [
    defaultColDef: {
      editable: true,
  },
];
```

The type of editor the grid provides depends on the [Cell Data Types](https://www.ag-grid.com/javascript-data-grid/cell-data-types/). [Conditional editing](https://www.ag-grid.com/javascript-data-grid/cell-editing/#conditional-editing) is also possible, and there are various [editing events](https://www.ag-grid.com/javascript-data-grid/cell-editing/#editing-events) that you can use to customize the editing behavior.

The Bryntum Grid cells are editable by default. To disable editing for the whole grid, set the [`readOnly`](https://bryntum.com/products/grid/docs/api/Grid/view/GridBase#property-readOnly) Bryntum Grid config property to `true`. You can also disable editing for specific columns by setting `readOnly` to true for specific columns:

```javascript
const gridConfig = {
  columns: [
    { field: "athlete", text: "athlete", readOnly: true },
  ],
  // other grid options 
};
```

The type of editor the grid provides depends on the [column type](https://bryntum.com/products/grid/docs/api/Grid/column/Column#column-types). Like AG Grid, there are various [editing events](https://bryntum.com/products/grid/docs/api/Grid/view/GridBase#events) that you can use to customize the grid's editing behavior.

### Styling

AG Grid comes with [five different CSS styling themes](https://www.ag-grid.com/javascript-data-grid/themes/) that you can choose from. You can also [customize the CSS styles](https://www.ag-grid.com/javascript-data-grid/global-style-customisation/) or use the [AG Grid Figma Design system](https://www.ag-grid.com/javascript-data-grid/ag-grid-design-system/) to create your own theme.

Bryntum Grid also has [five different CSS styling themes](https://bryntum.com/products/grid/docs/guide/Grid/quick-start/javascript-npm#stylesheet), which use SASS. You can also [create a custom theme](https://bryntum.com/products/grid/docs/guide/Grid/customization/styling#creating-a-theme).

## Next steps

Now that you have a basic Bryntum Grid set up, you can customize it. You can add additional features such as:

- [Custom cell rendering](https://bryntum.com/products/grid/examples/renderers).
- [Export to Excel](https://bryntum.com/products/grid/examples/exporttoexcel/).
- Grouping of [rows](https://bryntum.com/products/grid/examples/grouping) and [headers](https://bryntum.com/products/grid/examples/groupedheaders).
- [Filtering](https://bryntum.com/products/grid/examples/filtering) and [searching](https://bryntum.com/products/grid/examples/search) functionality.

Browse the available Bryntum Grid features [here](https://bryntum.com/products/grid/features/).


<p class="last-modified">Last modified on 2024-05-21 9:04:41</p>