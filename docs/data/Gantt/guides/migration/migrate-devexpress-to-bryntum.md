# Migrating from DevExpress Gantt to Bryntum Gantt

The following guide will help you to migrate your DevExpress Gantt implementation to the Bryntum Gantt alternative. In this guide, we use Fastify to serve API endpoints, Prisma to connect to databases, and React for the frontend. If you're using a different set of packages in your app, you may need to make adjustments to the instructions here.

Here are the steps we'll be following:

- Set up the frontend app.
- Set up the backend API for Bryntum Gantt.
- Prepare the DevExpress API for data export.
- Import data from DevExpress to Bryntum Gantt.

We'll show you how to create a new frontend project in this guide, but if you already have a frontend app you plan to use Bryntum Gantt in, you'll need to adapt your existing project to include the relevant parts.

Likewise, if your existing DevExpress project already has an API data source, you'll need to adjust the examples below to align with your specific data schema. The examples given are lightweight so that there isn’t a lot to go through.

The screenshot below shows the DevExpress Gantt and Bryntum Gantt implementations for comparison.

![DevExpress Gantt](data/Gantt/images/migration/migrate-devexpress-to-bryntum/devexpress.png)

![Bryntum Gantt](data/Gantt/images/migration/migrate-devexpress-to-bryntum/bryntum.png)


## 1. Set up the frontend

The easiest way to set up a frontend to use Bryntum products is to use npm (Node Package Manager). We'll create a basic React frontend app that uses the Bryntum Gantt npm package.

If you do not have npm installed on your computer, please visit [nodejs.org](https://nodejs.org/).

### Access the npm registry

Access the Bryntum Gantt npm registry by following [step 1](https://bryntum.com/products/gantt/docs/guide/Gantt/quick-start/react#access-to-npm-registry)  of the [Bryntum Gantt with React guide](https://bryntum.com/products/gantt/docs/guide/Gantt/quick-start/react).

### Create the application

The next step is to create the client application. In this example, we're creating a React app using the Bryntum `javascript-gantt` template.

In the terminal, from the project folder, type:

```shell
npx create-react-app my-app --template @bryntum/cra-template-javascript-gantt
```

Change `my-app` to your preferred application name.

Now you can install the package dependencies in your application folder:

```shell
cd my-app
npm install
```

Replace the code in `src/GanttConfig.js` with the following code:

```javascript
import { StringHelper } from "@bryntum/gantt";

const ganttConfig = {
  columns: [{ type: "name", field: "name", width: 250 }],
  viewPreset: "weekAndDayLetter",
  barMargin: 10,

  project: {
    transport: {
      load: {
        url: "data/gantt-data.json",
      },
    },
    autoLoad: true,
  },
  taskRenderer({ taskRecord }) {
    if (taskRecord.isLeaf && !taskRecord.isMilestone) {
      return StringHelper.encodeHtml(taskRecord.name);
    }
  },
};

export { ganttConfig };
```

Start the app with `npm start` and visit `http://localhost:3000/`. You should see the Gantt chart displaying the template test data.

![Bryntum Gantt before adding data](data/Gantt/images/migration/migrate-devexpress-to-bryntum/bryntum-gantt.png)

To populate the chart with data from a database, we will need to set up a backend API.

## 2. Set up the backend

The backend API can use any server and data source, but in this example, we will use a Fastify server and connect to a MySQL database using the Prisma ORM package.

Our API will have two endpoints for loading and syncing data between the Gantt chart and the database.

```shell
GET  /load
POST /sync
```

But first we will need to create a new API app and set up a connection to the MySQL database.

### Create the API project

Run `npm init` from the terminal at the location of your API project to generate the `package.json` file.

Now install these dev dependencies:

```shell
npm install typescript ts-node-dev @types/node -D
```

Next, create a file called `tsconfig.json` in the root of your project and add the following to it:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ESNext",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "sourceMap": true,
    "outDir": "build",
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strict": true
  }
}
```

Create a folder called `src` in the root folder of your project and create a file called `index.ts` inside it.

Update your `package.json` file so that it has the following scripts entry:

```json
"scripts": {
  "dev": "ts-node-dev --exit-child ./src/index.ts",
  "start": "tsc && node ./build/index.js"
},
```

### Connect to the database

To set up a connection to the MySQL database, we can install the Prisma ORM package. This will allow us to define the new database's table schema, manage the migrations, and read and write to the database.

From the terminal at the location of your API project, run the following command:

```shell
npm install prisma
```

Now initialize the database config by running the following command:

```shell
npx prisma init
```

This command will create a folder called `prisma` containing a file called `schema.prisma`.

Next, create a new file called `.env` (if the file is not already generated by Prisma) in the root of your project where the connection string to the database can be saved. Make sure to add the `.env` file to your `.gitignore` so that your connection string stays private.

You can add your database connection string to the `.env` file using the following format:

```shell
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASENAME"
```

### Create the Bryntum Gantt database schema

In the file `prisma/schema.prisma`, find the following text. You need to rename the provider to `mysql` if Prisma used `postgresql`:

```javascript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Below that text, we can add the database schema needed for Bryntum Gantt as follows:

```javascript
model Task {
  id                     Int       @id @default(autoincrement())
  parentId               Int?
  name                   String?
  startDate              DateTime?
  endDate                DateTime?
  effort                 Float?
  effortUnit             String    @default("hour")
  duration               Float?
  durationUnit           String    @default("day")
  percentDone            Float     @default(0)
  schedulingMode         String?
  note                   String?
  constraintType         String?
  constraintDate         DateTime?
  manuallyScheduled      Boolean?  @default(false)
  unscheduled            Boolean?  @default(false)
  ignoreResourceCalendar Boolean?  @default(false)
  effortDriven           Boolean?  @default(false)
  inactive               Boolean?  @default(false)
  cls                    String?
  iconCls                String?
  color                  String?
  parentIndex            Int       @default(0)
  expanded               Boolean?  @default(false)
  calendar               Int?
  deadline               DateTime?
  direction              String?
}

model Dependency {
  id        Int     @id @default(autoincrement())
  fromEvent Int?
  toEvent   Int?
  type      Int     @default(2)
  cls       String?
  lag       Float   @default(0)
  lagUnit   String  @default("day")
  active    Boolean
  fromSide  String?
  toSide    String?
}

model Resource {
  id       Int     @id @default(autoincrement())
  name     String?
  city     String?
  calendar String?
  image    String?
}

model ResourceAssignment {
  id       Int @id @default(autoincrement())
  resource Int
  event    Int
}
```

After adding the table schemas, you can run the Prisma migration to create those tables on your database:

```shell
npx prisma migrate dev --name init  
```

Now that the database connection and tables are set up, we need to create the API endpoints that the backend will serve the data from.

### Create the API endpoints

You can use any server package to create the API endpoints but in this example we use Fastify, so let’s start by installing it via the terminal command in the root of your API project:


```shell
npm install fastify @fastify/cors @prisma/client
```

In the empty file called `index.ts` that we created earlier, add the following code:


```typescript
import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const prisma = new PrismaClient();
const server = fastify();

server.register(cors, {
  origin: "*",
});

server.get("/load", async (_req: any, _res: any) => {
  const tasks = await prisma.task.findMany();
  const dependency = await prisma.dependency.findMany();
  const resource = await prisma.resource.findMany();
  const resourceAssignment = await prisma.resourceAssignment.findMany();
  _res.send({
    success: true,
    tasks: {
      rows: tasks,
    },
    dependencies: {
      rows: dependency,
    },
    resources: {
      rows: resource,
    },
    assignments: {
      rows: resourceAssignment,
    },
  });
});

server.post("/sync", async (_req: any, _res: any) => {
  const { requestId, tasks, dependencies, resources, assignments } = _req.body;
  try {
    const response = {
      requestId,
      success: true,
      tasks: { rows: [] },
      dependencies: { rows: [] },
      resources: { rows: [] },
      assignments: { rows: [] },
    };
    // if task changes are passed
    if (tasks) {
      const rows = await applyTableChanges(prisma.task, tasks);
      // if got some new data to update client
      if (rows) {
        response.tasks = { rows };
      }
    }
    // if dependency changes are passed
    if (dependencies) {
      const rows = await applyTableChanges(prisma.dependency, dependencies);
      // if got some new data to update client
      if (rows) {
        response.dependencies = { rows };
      }
    }

    // if resource changes are passed
    if (resources) {
      const rows = await applyTableChanges(prisma.resource, resources);
      // if got some new data to update client
      if (rows) {
        response.resources = { rows };
      }
    }

    // if assignment changes are passed
    if (assignments) {
      const rows = await applyTableChanges(
        prisma.resourceAssignment,
        assignments
      );
      // if got some new data to update client
      if (rows) {
        response.assignments = { rows };
      }
    }
    _res.send(response);
  } catch (error: any) {
    console.log(error);
    _res.send({
      requestId,
      success: false,
      // pass raw exception message to the client as-is
      // please replace with something more human readable before using this on production systems
      message: error.message,
    });
  }
});

async function applyTableChanges(table: any, changes: any) {
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

function createOperation(added: any, table: any) {
  return Promise.all(
    added.map(async (record) => {
      const { $PhantomId, baselines, from, to, segments, ...data } = record;
      const result = await table.create({ data, select: { id: true } });
      return { $PhantomId, id: result.id };
    })
  );
}

function updateOperation(updated: any, table: any) {
  return Promise.all(
    // destructuring to skip fake "$PhantomId" column
    // and a few other columns just for the sake of this demo code simplification
    updated.map(
      ({ $PhantomId, id, baselines, from, to, segments, ...data }) => {
        return table.update({
          where: { id },
          data,
        });
      }
    )
  );
}

function deleteOperation(deleted, table) {
  return Promise.all(
    deleted.map(({ id }) => {
      return table.delete({
        where: { id },
      });
    })
  );
}

server.listen({ port: 8181, host: "0.0.0.0" }, (err: any, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
```

You can start the backend server using the following terminal command:

```shell
npm run dev
```

Note that the server is listening on port 8181 of localhost in this example.



## 3. Prepare to export data from DevExpress


If your DevExpress Gantt project already has an API serving data for your chart, you may only need to make small adjustments to this process.

However, if you need to create new API endpoints on the DevExpress side, you can use the same method we used earlier to connect to MySQL using Fastify and Prisma.

In this example, we will connect to a Postgres database.


### Create the export database connection

Using the same steps as part 2, create a new project, install and initialize Prisma, and create the `.env` file to save the connection string to (remember to add the `.env` file to your `.gitignore`).

Your `package.json` file should look something like this:

```json
{
  "name": "fastify-devexpress",
  "version": "1.0.0",
  "scripts": {
    "dev": "ts-node-dev --exit-child ./src/index.ts",
    "start": "tsc && node ./build/index.js"
  },
  "devDependencies": {
    "@types/node": "^18.15.11",
    "ts-node": "^10.9.1",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.4"
  },
  "dependencies": {
    "@fastify/cors": "^8.2.1",
    "@prisma/client": "^4.12.0",
    "fastify": "^4.15.0",
    "prisma": "^4.12.0"
  }
}
```

This time, the connection string in the `.env` file will follow the following format:


```shell
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Next, you need to add the DevExpress Gantt database models to the `prisma/schema.prisma` file of your DevExpress API project. The full file should look like this:

```javascript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Task {
  id           Int       @id
  parent_id    Int?
  title        String
  description  String?
  start        DateTime
  end          DateTime
  actual_start DateTime?
  actual_end   DateTime?
  progress     Int
  employees    String?
}

model Dependency {
  id           Int @id
  parent_id    Int
  dependent_id Int
  type         Int
}

model Resource {
  id   Int    @id
  name String
}

model ResourceAssignment {
  id          Int @id
  task_id     Int
  resource_id Int
}
```

If your DevExpress database has different names for certain properties or tables, you can update the Prisma schema to reflect the schema of your database.

Generate the prisma client by running the following command:

```shell
npx prisma generate
```

### Create export API endpoints

Now that we have a connection to the DevExpress database through Prisma, we can serve the data from it via Fastify.

Place the following code in the `index.ts` file of your new project:

```typescript
import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const prisma = new PrismaClient();
const server = fastify();

server.register(cors, {
  origin: "*",
});

server.get("/resources", async (_req: any, _res: any) => {
  return await prisma.resource.findMany();
});

server.get("/tasks", async (_req: any, _res: any) => {
  return await prisma.task.findMany();
});

server.get("/resourceAssignments", async (_req: any, _res: any) => {
  return await prisma.resourceAssignment.findMany();
});

server.get("/dependencies", async (_req: any, _res: any) => {
  return await prisma.dependency.findMany();
});

server.listen({ port: 8080, host: "0.0.0.0" }, (err: any, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
```


Make sure you have an API endpoint that returns data for all of the following: `tasks`, `resources`, `resourceAssignments`, and `dependencies`.

Now you can run the backend server using the following terminal command:

```shell
npm run dev
```

This should allow us to import data from the `localhost:8080` endpoint into the Bryntum Gantt backend project we created.

## 4. Import the data

The data we need to import should now be exposed by the API we created in step 3 that connects to a DevExpress Postgres database.

Now we can create a script that will get the data from that endpoint and save it to the Bryntum Gantt MySQL database.

First, install the following npm package that will allow us to make HTTP requests to the DevExpress API:

```shell
npm install axios
```

### Create the import script

In the `src` folder of your Bryntum Gantt API project, create a new file called `import-data.ts` and add the following code to it:

```typescript
import { PrismaClient } from "@prisma/client";

const axios = require("axios");

const prisma = new PrismaClient();

const headers = {
  "Content-Type": "application/json",
};

const _dataSource_logInserts = true;
const _dataSource_ApiEndpoint = "http://127.0.0.1:8080/";
const _dataSource_TasksRoute = "tasks";
const _dataSource_ResourcesRoute = "resources";
const _dataSource_DependenciesRoute = "dependencies";
const _dataSource_ResourceAssignmentsRoute = "resourceAssignments";

const fetchTasks = () => {
  return axios
    .get(`${_dataSource_ApiEndpoint}${_dataSource_TasksRoute}`, { headers })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error(error);
    });
};

const fetchResources = () => {
  return axios
    .get(`${_dataSource_ApiEndpoint}${_dataSource_ResourcesRoute}`, { headers })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error(error);
    });
};

const fetchDependencies = () => {
  return axios
    .get(`${_dataSource_ApiEndpoint}${_dataSource_DependenciesRoute}`, {
      headers,
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error(error);
    });
};

const fetchResourceAssignments = () => {
  return axios
    .get(`${_dataSource_ApiEndpoint}${_dataSource_ResourceAssignmentsRoute}`, {
      headers,
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error(error);
    });
};

Promise.all([
  fetchTasks(),
  fetchResources(),
  fetchDependencies(),
  fetchResourceAssignments(),
])
  .then(async (results) => {
    const [tasks, resources, dependencies, resourceAssignments] = results;

    // Map external Task schema to local Task schema
    const mappedTasks = tasks.map((task: any) => {
      return {
        id: task.id,
        parentId: task.parent_id,
        name: task.title,
        startDate: task.start,
        endDate: task.end,
        percentDone: task.progress,
        note: task.description,
        constraintType: "startnoearlierthan",
        constraintDate: task.start,
      };
    });

    // Map external Dependency schema to local Dependency schema
    const mappedDependencies = dependencies.map((dependency: any) => {
      return {
        id: dependency.id,
        from: dependency.parent_id,
        to: dependency.dependent_id,
        active: true,
        type: dependency.type,
      };
    });

    // Map external Resource schema to local Resource schema
    const mappedResources = resources.map((resource: any) => {
      return {
        id: resource.id,
        name: resource.name,
      };
    });

    // Map external ResourceAssignment schema to local ResourceAssignment schema
    const mappedResourceAssignments = resourceAssignments.map(
      (assignment: any) => {
        return {
          id: assignment.id,
          event: assignment.task_id,
          resource: assignment.resource_id,
        };
      }
    );

    // Insert mapped data to the local database
    for (const task of mappedTasks) {
      try {
        const createdTask = await prisma.task.create({ data: task });
        if (_dataSource_logInserts) {
          console.log("Created task:", createdTask);
        }
      } catch (error) {
        console.log("Error creating task:", error);
      }
    }

    for (const dependency of mappedDependencies) {
      try {
        const createdDependency = await prisma.dependency.create({
          data: dependency,
        });
        if (_dataSource_logInserts) {
          console.log("Created dependency:", createdDependency);
        }
      } catch (error) {
        console.log("Error creating dependency:", error);
      }
    }

    for (const resource of mappedResources) {
      try {
        const createdResource = await prisma.resource.create({
          data: resource,
        });
        if (_dataSource_logInserts) {
          console.log("Created resource:", createdResource);
        }
      } catch (error) {
        console.log("Error creating resource:", error);
      }
    }

    for (const resourceAssignment of mappedResourceAssignments) {
      try {
        const createdResourceAssignment =
          await prisma.resourceAssignment.create({ data: resourceAssignment });
        if (_dataSource_logInserts) {
          console.log(
            "Created resource assignment:",
            createdResourceAssignment
          );
        }
      } catch (error) {
        console.log("Error creating resource assignment:", error);
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });
```


Now run the import script using the following terminal command:

```shell
npx ts-node import-data.ts  
```

This will save the DevExpress Gantt data to your Bryntum Gantt database.

### Update the frontend to use imported data

Now that there is data in your Bryntum Gantt database, you can update the frontend project so that the Gantt chart uses the data from your database instead of the static test data it starts with.

In the frontend project, open the file `src/GanttConfig.js` and update it to match the following:

```javascript
import { StringHelper } from "@bryntum/gantt";

const apiBaseUrl = "http://localhost:8181";
const ganttConfig = {
  columns: [
    { type: "name", field: "name", width: 250 },
    {
      type: "date",
      text: "start",
      format: "YYYY-MM-DD",
      field: "startDate",
      width: 100,
    },
    {
      type: "date",
      text: "finish",
      format: "YYYY-MM-DD",
      field: "endDate",
      width: 100,
    },
  ],
  viewPreset: "weekAndDayLetter",
  barMargin: 10,

  project: {
    transport: {
      load: {
        url: `${apiBaseUrl}/load`,
        // remove the line below in production
        // used to omit credentials on localhost to facilitate CORS
        credentials: "omit",
      },
      sync: {
        url: `${apiBaseUrl}/sync`,
        // remove the line below in production
        // used to omit credentials on localhost to facilitate CORS
        credentials: "omit",
      },
    },
    autoSync: true,
    autoLoad: true,
  },
  taskRenderer({ taskRecord }) {
    if (taskRecord.isLeaf && !taskRecord.isMilestone) {
      return StringHelper.encodeHtml(taskRecord.name);
    }
  },
};

export { ganttConfig };
```


The above script uses the API at `http:/localhost:8181/` to load and sync data between the Gantt chart and the database. This is the API we created earlier that connects to MySQL. Here we omit credentials to simplify CORS on localhost, but in production, you should remove those lines and modify the CORS configuration for the Fastify server in the API project. You can follow [this guide](https://github.com/fastify/fastify-cors#readme) to implement CORS with Fastify. 

Now run the backend using the following command from the backend project root folder:

```shell
npm run dev
```

Which should listen on port 8181.

Run the frontend using the following command from the frontend project root folder:

```shell
npm start
```

Which should listen on port 3000.

Visit `http://localhost:3000/` and you should see the Gantt chart using the data you imported.


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>