# Migrate from Syncfusion Gantt to Bryntum Gantt


In this tutorial, we will guide you through the process of migrating your existing [Syncfusion Gantt](https://www.syncfusion.com/javascript-ui-controls/js-gantt-chart) implementation to [Bryntum Gantt](https://bryntum.com/products/gantt/). Both of these commercial project management tools help in scheduling tasks, but if you are looking for a change, [more features](https://bryntum.com/products/gantt/examples/), or want to explore Bryntum Gantt, we have got you covered.

We will cover the following steps to set up a Bryntum Gantt chart and migrate data from a MySQL database used by Syncfusion Gantt:

- Make a new project.
- Migrate the database to the Bryntum Gantt data structure.
- Set up the server side.
- Set up the client side.
- Test the migration implementation.

So whether you want to switch to Bryntum Gantt or simply want to explore its features, let's dive into the migration process.

## Getting started

To begin the migration process, we will use an existing Syncfusion starter project that uses JavaScript on the client
side and Node.js with REST API endpoints on the server side. These endpoints interact with a MySQL client to perform
CRUD operations on the database. Depending on your implementation, your code may differ slightly, depending on which
client-side technology you are using (such as [React](https://www.syncfusion.com/react-components) or
[Angular](https://www.syncfusion.com/angular-components)).

⚠️ We take [Syncfusion starter](https://github.com/bryntum/syncfusion-gantt-starter) application as a starting point
and describe migrating it to Bryntum Gantt component. So if you want to follow the guide steps exactly please clone
[that repository](https://github.com/bryntum/syncfusion-gantt-starter) first and install the application following
instructions from its `README.md` file

After completing the migration, the Bryntum Gantt chart should display the same data as the original Syncfusion Gantt chart.

![Initial Syncfusion Gantt Data](data/Gantt/images/migration/migrate-syncfusion-to-bryntum/initial-sync-data.png)

## Make a new project

The Syncfusion Gantt project's file structure is quite different from the Bryntum file structure. So instead of
changing the Syncfusion code, we will create a new folder for our Bryntum Gantt project.

In the root directory of your project, run the following command to make the files necessary for the Bryntum Gantt:

```bash
mkdir bryntum-gantt && { cd bryntum-gantt; touch server.js package.json .env; mkdir public; cd public; touch index.html app.js; cd ..;}
```

Populate the `.env` file with the same contents as the `.env` you created for the Syncfusion Gantt. It should look something like this:

```bash
PORT=1337
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD='<your-password>'
DB_DATABASE='syncfusion'
```

Next, populate the `package.json` file we just created with the following:

```json
{
  "name": "bryntum-gantt",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "dependencies": {
    "body-parser": "^1.19.1",
    "dotenv": "^16.0.3",
    "express": "^4.17.2",
    "mysql2": "^2.3.3"
  },
  "license": "ISC"
}
```

Run `npm install` to install the appropriate packages for the project.
Now when we've initialized our project we can start migrating data from the existing Syncfusion application to our new
Bryntum Gantt project.

## Migrate the database to the Bryntum Gantt data structure

To begin our migration to Bryntum Gantt, we'll migrate the existing database to Bryntum data structure.
In order to do that we'll make new tables for Bryntum Gantt and then import data from the existing table made for Syncfusion gantt to the new tables.

### Create database tables compatible with Bryntum Gantt

If you followed the instructions in the `README.md` file, you will have configured your database already and populated it with some data.

The `syncTasks` table should look like this:

![Syncfusion SQL Table](data/Gantt/images/migration/migrate-syncfusion-to-bryntum/sync-table.png)

We will now create two separate tables with a schema compatible with the Bryntum Gantt chart implementation.

Run the following query to create the `tasks` table for our tasks data:

```sql
CREATE TABLE `tasks`
(
    `id`                     int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `parentId`               int(11)               DEFAULT NULL,
    `name`                   varchar(255)          DEFAULT NULL,
    `startDate`              datetime              DEFAULT NULL,
    `endDate`                datetime              DEFAULT NULL,
    `effort`                 float(11, 2)          DEFAULT NULL,
    `effortUnit`             varchar(255)          DEFAULT 'hour',
    `duration`               float(11, 2) unsigned DEFAULT NULL,
    `durationUnit`           varchar(255)          DEFAULT 'day',
    `percentDone`            float(11, 2) unsigned DEFAULT 0,
    `schedulingMode`         varchar(255)          DEFAULT 'Normal',
    `note`                   text                  DEFAULT NULL,
    `constraintType`         varchar(255)          DEFAULT NULL,
    `constraintDate`         datetime              DEFAULT NULL,
    `manuallyScheduled`      tinyint               DEFAULT 0,
    `unscheduled`            tinyint               DEFAULT 0,
    `ignoreResourceCalendar` tinyint               DEFAULT 0,
    `effortDriven`           tinyint               DEFAULT 0,
    `inactive`               tinyint               DEFAULT 0,
    `cls`                    varchar(255)          DEFAULT NULL,
    `iconCls`                varchar(255)          DEFAULT NULL,
    `color`                  varchar(255)          DEFAULT NULL,
    `parentIndex`            int(11)               DEFAULT 0,
    `expanded`               tinyint               DEFAULT 0,
    `calendar`               int(11)               DEFAULT NULL,
    `deadline`               datetime              DEFAULT NULL,
    `direction`              varchar(255)          DEFAULT NULL,
    INDEX (`parentId`),
    CONSTRAINT `fk_tasks_tasks` FOREIGN KEY (`parentId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
    INDEX (`calendar`)
) ENGINE = INNODB AUTO_INCREMENT = 1;
```

The Bryntum Gantt has more features than the Syncfusion Gantt, which is why there are many columns in the table.

Create the `dependencies` table with the following query:

```sql
CREATE TABLE `dependencies`
(
    `id`        int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fromEvent` int(11)      DEFAULT NULL,
    `toEvent`   int(11)      DEFAULT NULL,
    `type`      int(11)      DEFAULT 2,
    `cls`       varchar(255) DEFAULT NULL,
    `lag`       float(11, 2) DEFAULT 0,
    `lagUnit`   varchar(255) DEFAULT 'day',
    `active`    tinyint      DEFAULT 1,
    `fromSide`  varchar(255) DEFAULT NULL,
    `toSide`    varchar(255) DEFAULT NULL,
    INDEX (`fromEvent`),
    CONSTRAINT `fk_dependencies_tasks` FOREIGN KEY (`fromEvent`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
    INDEX (`toEvent`),
    CONSTRAINT `fk_dependencies_tasks1` FOREIGN KEY (`toEvent`) REFERENCES `tasks` (`id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1;
```

### Migrate the existing Syncfusion data into the new tables

Moving tasks data from `syncTasks` to `tasks` table is pretty straightforward.
But the dependency data for Bryntum is more complex than in Syncfusion. Whereas Bryntum uses its own table with multiple
columns of data that can be used to inform the creation of a dependency, Syncfusion stores a string with some
instructions on how to form the dependency in the `Predecessor` column of the database.

Because of this difference, we will need to do some formatting of the data from the Syncfusion `Predecessor` column
before adding the data to our Bryntum `dependencies` table.

Create a file called `migrate_data.js` in the root directory of the Syncfusion project and add the following to it:

```js
import mysql from 'mysql2/promise';
import { config } from 'dotenv';

// load parameters from .env file to process.env
config();

const predecessorRegExp = /\s*(\d+)\s*(?:(SS|SF|FS|FF)(?:\s*([-+]?\d+)\s*)?)?,?/g;
// dependency type Syncfusion => Bryntum mapping
const typeMap = { SS: 0, SF: 1, FS: 2, FF: 3 };

async function importData() {
  const db = await mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
  });

  console.log('Migrating tasks...');

  await db.query(`
      INSERT INTO tasks (
          id,
          parentId,
          name,
          startDate,
          endDate,
          effort,
          duration,
          percentDone,
          constraintType,
          constraintDate,
          parentIndex,
          expanded
      )
      SELECT
          TaskID,
          IF(ParentID = 0, NULL, ParentID),
          TaskName,
          StartDate,
          DATE_ADD(StartDate, INTERVAL Duration DAY),
          Duration * 24,
          Duration,
          Progress * 100,
          'startnoearlierthan',
          StartDate,
          ParentID,
          1
      FROM syncTasks
  `);

  console.log('Migrating dependencies...');

  // get tasks with predecessors
  const [tasks] = await db.query(`SELECT * FROM syncTasks WHERE Predecessor != \'\' and Predecessor is not null`);

  let parts, promises = [];

  for (const { TaskID, Predecessor } of tasks) {
    // split and parse comma separated predecessors
    while (parts = predecessorRegExp.exec(Predecessor)) {
      promises.push(db.query('INSERT INTO dependencies SET ?', {
        fromEvent : parseInt(parts[1]),
        toEvent   : TaskID,
        type      : typeMap[parts[2]] || 2,
        lag       : parseFloat(parts[3] || 0)
      }));
    }
  }

  // wait till all insertions are done and close db connection
  await Promise.all(promises);

  db.close();
}

importData();
```

This script will insert the existing tasks and dependencies from the `syncTasks` table into the newly created `tasks`
and `dependencies` table.
Open terminal in the project root folder and run the command:

```bash
node migrate_data.js
```

⚠️ Please note that Bryntum Gantt out of the box operates more data models than we just made (resources, assignments,
calendars, segments etc). We don't make the tables for all of them here to simplify the guide. To support other
models on the database level please see the `sql/setup.sql` file included with the Bryntum Gantt `php` demo.

Now when the database is ready we can start implementing the server side code.

## Set up the server side

Import the relevant libraries by adding the following lines to the top of the `server.js` file:

```js
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
```

Now set up the express web-framework and database connection by adding the following code to `server.js`

```js
const port = process.env.PORT || 1337;
const app = express();

dotenv.config();

global.__dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/gantt', express.static(path.join(__dirname, '/node_modules/@bryntum/gantt')));
app.use(bodyParser.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.listen(port, () => {
  console.log("Server is running on port " + port + "...");
});
```

The above code creates a web-server using `express` library and mounts `public` folder as web-root
and Bryntum Gantt package folder as `/gantt/` path (Bryntum Gantt package is not installed yet we'll handle that later
when working on the client-side). The code also configures the server to parse JSON passed in requests body,
makes a database connection pool and then starts the server on `1337` port.

### Set up data loading endpoint

Let's make a new route on the server that will handle HTTP GET requests to `/load` path.
The handler will read data from the tables we've created and respond it to the client, Add the following code to
the bottom of `server.js`:

```js
// Read
app.get("/load", async (req, res) => {
  try {
    const [[tasks], [dependencies]] = await Promise.all([
      db.query("SELECT * FROM tasks"),
      db.query("SELECT * FROM dependencies"),
    ]);
    res.send({
      success: true,
      tasks: {
        rows: tasks,
      },
      dependencies: {
        rows: dependencies,
      }
    });
  } catch (error) {
    res.send({
      success: false,
      // pass raw exception message to the client as-is
      // please replace with something more human readable before using this on production systems
      message: error.message
    });
  }
});
```

Now to make sure the code works open a terminal in the project root folder and run:

```bash
node server.js
```

You should see `Server is running on port 1337...` message in console. Open
[http://localhost:1337/load](http://localhost:1337/load) URL in a browser and you should see data in JSON format.

### Set up changes saving endpoint

Let's make another route on the server that will handle HTTP POST requests to `/sync` path.
The client-side Bryntum library will make a POST request to the `/sync` endpoint when changes are made, to keep the
data in the database in sync with the client-side UI.

Add the following HTTP POST `/sync` route to the bottom of `server.js`:

```js
// Create, Update, Delete (Tasks & Dependencies)
app.post("/sync", async function (req, res) {
  const { requestId, tasks, dependencies } = req.body;
  try {
    const response = { requestId, success : true };
    // if task changes are passed
    if (tasks) {
      const rows = await applyTableChanges('tasks', tasks)
      // if got some new data to update client
      if (rows) {
        response.tasks = { rows };
      }
    }
    // if dependency changes are passed
    if (dependencies) {
      const rows = await applyTableChanges('dependencies', dependencies)
      // if got some new data to update client
      if (rows) {
        response.dependencies = { rows };
      }
    }
    res.send(response);
  }
  catch (error) {
    res.send({
      requestId,
      success : false,
      // pass raw exception message to the client as-is
      // please replace with something more human readable before using this on production systems
      message : error.message
    });
  }
});
```

Define the `applyTableChanges` function at the bottom of the `server.js` file:

```js
async function applyTableChanges(table, changes) {
  let rows;
  if (changes.added) {
    rows = await createOperation(changes.added, table);
  }
  if (changes.updated) {
    await updateOperation(changes.updated, table);
  }
  if (changes.removed) {
    await deleteOperation(changes.removed, table);
  }
  // if got some new data to update client
  return rows;
}
```

The code we added will handle the incoming POST request and inspect the request body to determine what action should be taken and on which data model. We first determine which data model to apply a sync request to and then inspect the type of operation to perform. In this case, we check if the sync request body object has a key called `tasks` or `dependencies` and then call the `applyTableChanges` function. In the `applyTableChanges` function we check if the change operation is an `added`, `updated` or `removed` operation in which case we perform the relevant create, update or delete query using the MySQL client.

Define the `createOperation` function at the bottom of `server.js`:

```js
function createOperation(added, table) {
  return Promise.all(
    added.map(async record => {
      // destructuring to skip fake "$PhantomId" column
      // and few other columns just for the sake of this demo code simplification
      const { $PhantomId, baselines, from, to, segments, ...data } = record;
      // insert record
      const [result] = await db.query('INSERT INTO ?? set ?', [table, data]);
      // report to the client that we changed the record identifier
      return { $PhantomId, id : result.insertId };
    })
  );
}
```


⚠️ The `$PhantomId` is a phantom identifier. It’s an auto-generated, unique client-side value that’s used to identify
a record. You should not persist it on the server.
You can read more about it in the [docs](https://bryntum.com/docs/gantt/guide/Scheduler/data/crud_manager#saving-data).

⚠️ As you might notice we skip certain fields (namely `baselines, from, to, segments`) persisting in the above code.
We do that intentionally to simplify the guide. If your application needs some of those fields you'll need to add
their support to the code later.

Add the `updateOperation` and `deleteOperation` functions to the bottom of the `server.js` file:

```js
function updateOperation(updated, table) {
  return Promise.all(
    // destructuring to skip fake "$PhantomId" column
    // and few other columns just for the sake of this demo code simplification
    updated.map(({ $PhantomId, id, baselines, from, to, segments, ...data }) => {
      return db.query('UPDATE ?? set ? where id = ?', [table, data, id]);
    })
  );
}
```

```js
function deleteOperation(deleted, table) {
  return db.query(`DELETE FROM ${table} WHERE id in (?)`, deleted.map(({ id }) => id));
}
```

The API endpoints have now been successfully implemented and we are ready to make basic client-side code

## Set up the client side

Now when server-side part is ready we'll implement the client-side code.

Install Bryntum Gantt by following
[step 1](https://bryntum.com/products/gantt/docs/guide/Gantt/quick-start/javascript-npm#access-to-npm-registry) and
[step 4](https://bryntum.com/products/gantt/docs/guide/Gantt/quick-start/javascript-npm#install-component) of the
[vanilla JavaScript with npm set-up guide](https://bryntum.com/products/gantt/docs/guide/Gantt/quick-start/javascript-npm).

Open the `public/index.html` file and add the following code to link to the Bryntum stylesheets and give our Gantt some
additional styling:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Syncfusion to Bryntum Gantt Migration - vanilla JS</title>
  <link rel="stylesheet" href="./gantt/gantt.stockholm.css" data-bryntum-theme>
  <style>
    body {
      height: 100vh;
    }
  </style>
</head>
<body>
<script type="module" src="app.js"></script>
</body>
</html>
```

Next, we will set up the Gantt component. Add the following code inside `public/app.js`:

```js
import { Gantt, ProjectModel } from './gantt/gantt.module.js';

// create project which will provide data to the Gantt
const project = new ProjectModel({
  taskStore : {
    transformFlatData : true
  },
  loadUrl: '/load', // URL for data loading
  syncUrl: '/sync', // URL for data saving
  autoLoad: true,
  autoSync: true
});

// create the Bryntum Gantt instance and append to body
const gantt = new Gantt({
  appendTo: document.body,
  project,
  columns: [
    { type: 'name', width: 250, text: 'Tasks' },
    { type: 'startdate' },
    { type: 'duration' },
  ]
});
```

We have now imported the Bryntum Gantt component from the library and set it up to load data from the `/load` endpoint.
We also specify that the `/sync` endpoint will be used when any create, update, or delete operation takes place,
to keep the client and database in sync.

## Test the migration implementation

Once you have completed the migration, it's time to test the implementation. Here's how you can test it:

- Open the `bryntum-gantt` folder in the terminal.
- Run the following command (stop and restart if you had the server running):

```bash
node server.js
```

Then after opening [http://localhost:1337](http://localhost:1337) URL in a browser you should see the migrated data
from the Syncfusion Gantt chart loaded into the Bryntum Gantt chart. You can now take advantage of Bryntum Gantt's
extensive features and customization options to manage your project effectively.

Congratulations! You have successfully migrated your existing Syncfusion Gantt implementation to Bryntum Gantt. If
you encounter any issues or have any questions, please let us know in the comments below.

![Final Bryntum Gantt](data/Gantt/images/migration/migrate-syncfusion-to-bryntum/bryntum-gantt-final.png)


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>