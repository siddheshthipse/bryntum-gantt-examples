# Displaying data in a Scheduler

Every Bryntum component uses [Store](#Core/data/Store) data containers for holding data. Store is then further
extended to have `ResourceStore` and `EventStore` etc.

Bryntum Scheduler uses the following Stores to hold data.

| Store                    | Data                                       | 
|--------------------------|--------------------------------------------|
| `ResourceStore`          | Holds a collection of resources            |
| `EventStore`             | Holds a collection of events               |
| `AssignmentStore`        | Holds a collection of assignments          |
| `DependencyStore`        | Holds a collection of dependencies         |
| `TimeRangeStore`         | Holds a collection of time ranges          |
| `ResourceTimeRangeStore` | Holds a collection of resource time ranges |

A store uses a [Model](#Core/data/Model) as the blueprint for each row (called record) it holds.

| Store                                                              | Model                                                               | 
|--------------------------------------------------------------------|---------------------------------------------------------------------|
| [`ResourceStore`](#Scheduler/data/ResourceStore)                   | [`ResourceModel`](#Scheduler/model/ResourceModel)                   |
| [`EventStore`](#Scheduler/data/EventStore)                         | [`EventModel`](#Scheduler/model/EventModel)                         |
| [`AssignmentStore`](#Scheduler/data/AssignmentStore)               | [`AssignmentModel`](#Scheduler/model/AssignmentModel)               |
| [`DependencyStore`](#Scheduler/data/DependencyStore)               | [`DependencyModel`](#Scheduler/model/DependencyModel)               |
| [`TimeRangeStore`](#Scheduler/data/TimeRangeStore)                 | [`TimeRangeModel`](#Scheduler/model/TimeRangeModel)                 |
| [`ResourceTimeRangeStore`](#Scheduler/data/ResourceTimeRangeStore) | [`ResourceTimeRangeModel`](#Scheduler/model/ResourceTimeRangeModel) |

Similar to the `Store`, `Model` is also extended as `ResourceModel`, `EventModel` and so on.

## Working with data

Bryntum Scheduler provides multiple ways to work with data, depending on how you use the data.

- Inline data
- Remote data

If you're using inline data, you can put it in the Scheduler instance directly but if you have a backend server, 
you can make an API call to fetch the data. More on this later.


## Schedulers project

Schedulers stores are linked to each other using a project. The project can be thought of as the complete dataset
available to the Scheduler: all events, resources, assignments and dependencies under a single "parent".

The project is responsible for:

* Making the stores available to Scheduler
* Calculating dates and durations using its calculation engine, which happens async
* Keeping references between records up to date (for example which resources an event is assigned to)
* Optionally working as a CrudManager

You will learn more about it in a while while studying _"Using inline data"_.

During normal basic UI usage, you will not need to interact much with the project. But it is worth knowing that it
exists. And if you need it, you access it using `scheduler.project`.

## Creating a Scheduler with data

This sections describes the different basic options you have out of the box to create a scheduler with inline data or by
loading remote data using Ajax.

## Using inline data

If you have inline data, you can supply it directly when creating a scheduler. It is expected to be an array
of JavaScript/JSON objects.

```javascript
const scheduler = new Scheduler({
    resources : [
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        /*...*/
    ],
    
    events : [
        { id : 1, resourceId : 1, name : 'Fight crime', startDate : new Date(2018,4,1,9,00), endDate : new Date(2018,4,1,17,00) },
        { id : 2, resourceId : 1, name : 'Attend banquet', startDate : new Date(2018,4,1,20,00), endDate : new Date(2018,4,1,23,00) },
        { id : 3, resourceId : 2, name : 'Drink beer', startDate : new Date(2018,4,1,9,00), duration : 8, durationUnit : 'hour' },
        /*...*/
    ]
});
```

Another option if you need more control over the stores created is to supply store config objects (for info on available
configs, see [API docs](#Core/data/Store#configs)):

```javascript
const scheduler = new Scheduler({
    resourceStore : {
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            /*...*/
        ] 
    },
    /*...*/
});
```

A third option is to supply an already existing store instance:

```javascript
const resourceStore = new ResourceStore({
    someConfig : "...",
    data       : [
        { id : 1, name : 'Batman' },
        /*...*/
    ]
});

const scheduler = new Scheduler({
    resourceStore
});
```

A fourth is to use projects:

```javascript
// Inline project data
const scheduler = new Scheduler({
  project : {
    eventsData      : [/*...*/],
    resourcesData   : [/*...*/],
    assignmentsData : [/*...*/]
  }
});

// - or -

const project = new ProjectModel({
  eventsData      : [/*...*/],
  resourcesData   : [/*...*/],
  assignmentsData : [/*...*/]
});

const scheduler = new Scheduler({
  project
});
```

This will create a `ResourceStore` and an `EventStore` holding the data. The stores can be accessed later:

```javascript
scheduler.resourceStore.sort('name');
scheduler.eventStore.removeAll();
```

You can also view the data by using:

```javascript
console.log(scheduler.resourceStore.toJSON());
console.log(scheduler.eventStore.toJSON());
```

## Using remote data

Both `ResourceStore` and `EventStore` are based on `AjaxStore`. [AjaxStore](#Core/data/AjaxStore) is a store that can 
load remote data. Similar to inline data, you have multiple options to load remote data.
Either supply a store config containing a `readUrl`:

```javascript
const scheduler = new Scheduler({
    resources : {
        readUrl : 'backend/loadResources.php', 
        autoLoad : true // Load upon creation
    }
});
```

Or create the store prior to creating the scheduler:

```javascript
const resourceStore = new ResourceStore({
   readUrl : 'backend/loadResources.aspx'
});

const scheduler = new Scheduler({
    resourceStore
});

store.load();
```

The data returned from the backend is by default expected to have the following format:

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Batman" }
  ]
}
```

If this approach does not suite your needs you can of course load data in any custom way you want and then plug it into 
an inline store:

```javascript
const scheduler = new Scheduler({
    /*...*/
});

// Using native fetch to load data
const response = await fetch('backend/loadResources.php');
const data = await response.json();

// Maybe do some custom processing before plugging into schedulers store
data.forEach((row, index) => {
    row.index = index;
    row.someValue = Math.random();
    /*...*/
});

// Plug it in as inline data
scheduler.resourceStore.data = data;
```

## Using CrudManager

Scheduler ships with a helpful class called `CrudManager`, that allows you to load (and later sync) multiple stores in a 
single request to the backend. Set it up like this:

```javascript
const scheduler = new Scheduler({
    crudManager : {
        autoLoad : true,
        autoSync : true,
        loadUrl  : 'backend/load.php',
        syncUrl  : 'backend/sync.php'
    }
});
```

For more information, see the [CrudManager guide](#Scheduler/guides/data/crud_manager.md) and the 
[API docs](#Scheduler/data/CrudManager).

## Populating multiple stores at once

If your app doesn't use `CrudManager` (nor `AjaxStore`) to load data, you can still use it to populate all Scheduler 
stores in a single call with data fetched through other means. Depending on your setup, this might be more convenient 
than populating one store at the time.

To enable this, you need to configure your Scheduler with an "inactive" `CrudManager`, by not supplying any urls for it:

```javascript
const scheduler = new Scheduler({
    crudManager : {},
    ...
})
```

You can then populate all stores at once by calling `loadCrudManagerData()`:

```javascript
scheduler.crudManager.loadCrudManagerData(data);
```

The data is expected to follow the `CrudManager` format, with one section per store being populated (can be JSON):

```javascript
{
   resources : {
      rows : [ ... ]
   },
   events : {
      rows : [ ... ]
  },
  // ... more stores ... 
}
```

For example:

```javascript
scheduler.crudManager.loadCrudManagerData({
   events : {
      rows : [
         { id : 1, name : 'Important meeting', startDate : '2053-10-23', duration : 1 }, 
         { id : 2, name : 'Travel', startDate : '2053-10-24', duration : 4 }
      ]
   },
   resources : {
      rows : [
         { id : 1, name : 'Hillinghead' },
         { id : 2, name : 'Hasan' }
      ]
   },
   assignments : {
      rows : [
         { id : 1, resourceId : 1, eventId : 1 },
         { id : 2, resourceId : 1, eventId : 2 },
         { id : 3, resourceId : 2, eventId : 2 }
      ]
   }
});
```

<div class="note">
Note that for SchedulerPro the <code>project</code> is its <code>crudManager</code>. So the above call could be written 
as <code>scheduler.project.loadCrudManagerData(...)</code> instead. 
</div>

## ResourceStore and ResourceModel

As mentioned way up at the top a Scheduler uses a `ResourceStore` to hold instances of `ResourceModel`. In a horizontal
schedule this represents the rows. The model describes what data each record contains (fields). By
default `ResourceModel` defines only three fields:

* name
* eventColor
* eventStyle

The `name` field is what it sounds like, a text field for a resource name. For more information on `eventColor`
and `eventStyle`, read the guide on [Styling](#Scheduler/guides/customization/styling.md).

## EventStore and EventModel

A Scheduler also requires an `EventStore` to hold instances of `EventModel`. Records in this store represents the bars
displayed in the schedule. There are multiple predefined fields, the most important ones being (
see [EventModel in API docs](#Scheduler/model/EventModel) for a complete list):

* `resourceId`  
   Which resource this event is assigned to. Only valid with single assignment.
* `name`  
   Event name, displayed in the event bars by default.
* `startDate`  
   Start date, either as a date or a parseable date string
* `endDate`  
   An event should either have an endDate or a duration. The missing one will be calculated.
* `duration`  
   Duration, added to startDate to determine endDate. Remember to also specify durationUnit
* `durationUnit`  
   The unit in which the duration is given. Needed to make the calculation correct

## Defining additional fields

In many applications you will want to extend the built-in models with additional fields. There is a few different ways
of achieving this, and while this section uses `ResourceModel` for the examples they apply to all models.

### Autogenerated fields

The properties of the first record in your data will be turned into fields on the model:

```javascript
const resourceStore = new ResourceStore({
    data : [
        { name : 'Wolverine', powers : 'Regeneration' },
        { name : 'Deadpool', powers : 'Yes I have, great powers' }   
    ]
});
```

The code above will create a `ResourceStore` with two records, based on a generated `ResourceModel` containing the
added `powers` field (name is already there by default).

### Custom Model

If you need more control over the fields a model contains, you have two options. If you do not need to reuse the Model
you can simply specify the additional fields when creating the store:

```javascript
const resourceStore = new ResourceStore({
    fields : ['powers', 'affiliation'],
    data : [
        { name : 'Wolverine', powers : 'Regeneration' },
        /*...*/
    ]
});
```

You can also create a subclass of a `Model` and define the fields you need on it:

```javascript
class SuperHero extends ResourceModel {
    static get fields() {
        return [
            // New custom fields:
            'powers', 
            'affiliation' 
        ];
    }
}

const resourceStore = new ResourceStore({
    modelClass : SuperHero,
    data : [/*...*/]
}); 
```

See the API docs for [Model](#Core/data/Model) for more information on defining and mapping fields.

### Models are reactive!

Fields are turned into setters on the records, which makes them reactive. For example doing this...

```javascript
const scheduler = new Scheduler({
    events : [
        { id : 3, resourceId : 2, name : 'Drink beer', startDate : new Date(2018,4,1,9,00), duration : 8, durationUnit : 'hour' },
    ]
});

scheduler.eventStore.first.duration = 10; 
```

...will update the scheduler on the fly to giving Wolverine more time to drink beer...


<p class="last-modified">Last modified on 2024-05-21 9:04:59</p>