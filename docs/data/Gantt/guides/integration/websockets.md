# Sync multiple clients in real-time with WebSockets

Starting from 5.1.0 release Gantt supports live updates via a websocket connection. To
implement this functionality we improved ProjectModel class adding two mixins - 
[ProjectChangeHandlerMixin](#Gantt/model/mixin/ProjectChangeHandlerMixin) and
[ProjectWebSocketHandlerMixin](#Gantt/model/mixin/ProjectWebSocketHandlerMixin) -  specifically
to support websockets. Also, we provide a basic websocket server which can broadcast changes
to clients.

## Server side

You can find our demo server in this repo: https://github.com/bryntum/gantt-websocket-server
It is implemented with NodeJS 14 and can be started as simple as:

```shell
npm i
npm run start
```

### Authentication and authorization

Server manages multiple projects and has simple auth implemented. Before loading the data you should
authenticate using `login` command:

```json
{ "command": "login", "login": "user" }
```

For more info please refer to the websocket server
[readme](https://github.com/bryntum/gantt-websocket-server/blob/main/README.md)

**NOTE**: Please note this is not production-grade software, it is a proof-of-concept built for demo purposes.
If you want to use it in your application we recommend taking over the implementation.

## Client side

To connect a project instance to the websocket server you need to configure it with a server address,
authenticate and set a project id to use.

```javascript
const project = new ProjectModel({
    // Server address config will create a websocket connection
    wsAddress : 'ws://localhost:8080'
});

// Authenticate
project.wsSend('login', { login : 'user' });

// Se target project id, this will also trigger load
project.wsProjectId = 1;
```


<div class="note">Please note, while it is possible to use CrudManager's 
<a href="https://bryntum.com/products/gantt/docs/api/Gantt/model/ProjectModel#config-transport">transport layer</a>
along with websocket connection, we do not recommend it and do not officially support it. You should
pick either one to provide your project with data.</div>

## Protocol

Client and server communicate using a simple protocol. Every message is a stringified JSON object with a
mandatory `command` key and an arbitrary set of data keys. Project itself only uses two commands: `dataset` to
load the data from the server and `projectChanges` to notify server and clients of changes.

### login

First, project requires authentication. Before setting project id project should get authenticated using
a `login` command:

```json
{ "command": "login", "login": "user", "password": "password" }
```

### projects

Project commands require an id of the target project on the server side. Available projects can be listed
using the following command:

```json
{ "command": "projects" }
```

To which server will respond with the following message:

```json
{
  "command": "projects",
  "projects": [
    {
      "id": 1,
      "name": "Project 1"
    },
    {
      "id": 2,
      "name": "Project 2"
    }
  ]
}
```

### dataset

To load the data from the websocket server client sends the following request:

```json
{ "command": "dataset", "project": 1 }
```

To which server responds with:

```json
{
  "command": "dataset",
  "project": 1,
  "dataset": {
    "tasksData": [],
    "resourcesData": [],
    "dependenciesData": [],
    "assignmentsData": [],
    "calendarsData": [],
    "projectMeta": {}
  }
}
```

### projectChange

When data on the client side is changed, project will automatically send the following request
to the websocket server:

```json
{
  "command": "projectChange",
  "project": 1,
  "changes": {
    "tasks": {
      "added": [{
        "$PhantomId": "_generatedModel1",
        "name": "New task"
      }],
      "updated": [{
        "id": 1,
        "name": "New name"
      }],
      "removed": [{
        "id": 2
      }]
    },
    "resources": {},
    "dependencies": {},
    "assignments": {}
  }
}
```

It is the same object as returned by the [project.changes](#Gantt/model/ProjectModel#property-changes) API.
These are only changes made since last `dataset` or `projectChange` message. When client sends these changes
to the server it commits changes to the local project. Server will broadcast this message to all connected
clients.

If changes contain new records, server will generate real ID for them and respond to the client
supplying real ids for new records. Response will also contain entire changes object sent by the client:

```json
{
  "command": "projectChange",
  "project": 1,
  "changes": {
    "tasks": {
      "added": [{
        "$PhantomId": "_generatedModel1",
        "id": 10
      }],
      "updated": [{
        "id": 1,
        "name": "New name"
      }],
      "removed": [{
        "id": 2
      }]
    },
    "resources": {},
    "dependencies": {},
    "assignments": {}
  }
}
```

_You can read more about $PhantomId 
[in this guide](#Gantt/guides/data/crud_manager_project.md#sync-request-structure)_

Same message is going to be passed by the server to all connected clients. But the client which changed the data
will receive response only if it added new records.

## Additional commands

While project only relies on the two commands above, websocket server also implements small set of utility commands which 
make demo appear more alive.

### login

When new client connects to the server, server will broadcast the following message to all connected
clients:

```json
{
  "command": "login",
  "userName": "Charlie"
}
```

Server will update list of connected clients which identify by the name, and will update all clients
with a complete set of clients:

```json
{
  "command": "users",
  "users": ["Charlie"]
}
```

### reset

Once every 30 minutes if nobody works with the project server will reset the data. It will load default dataset
and will broadcast it to all clients forcing them to apply it:

```json
{
  "command": "dataset",
  "dataset": {}
}
```
Dataset message will be followed by `reset` message telling who have reset the data:

```json
{
  "command": "reset",
  "userName": "Server"
}
```

When demo receives this message it will show a toast message with username.

Optionally, a client may reset the data sending following message:

```json
{
  "command": "reset"
}
```

### requestVersionAutoSave ([Versions feature](#SchedulerPro/feature/Versions))

Requests permission to auto-save a version of the project. Allows synchronizing scheduled autosaves initiated by clients.
If auto-save is permitted, the server issues the `versionAutoSaveOK` command in response:

```json
{
  "command": "versionAutoSaveOK",
  "project": 1
}
```
Where `project` matches the `project` ID in the client's request.

### loadVersionContent ([Versions feature](#SchedulerPro/feature/Versions))

```json
{
  "command": "loadVersionContent",
  "project": 1,
  "versionId": 15
}
```

The server issues the following command in response, where `project` and `versionId` match the requested IDs, and
`content` is the JSON version content.

```json
{
  "command": "loadVersionContent",
  "project": 1,
  "versionId": 15,
  "content": { ... }
}
```


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>