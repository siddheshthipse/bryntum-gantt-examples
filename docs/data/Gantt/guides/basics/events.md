# Listening for events

Bryntums widgets and classes trigger events to notify you of changes. Listening for these events is a crucial part of
writing an application that uses Bryntum Gantt. You have plenty of options for doing this in a way that suites your
application, as detailed below.

## Where to find information on events

In the API docs events are listed at the bottom of each class documentation page, see for example
[Gantt events](#Gantt/view/Gantt#events). You can get there quickly by clicking on the red "e" icon found at the top of
each class (if it is grayed out the class triggers no events). Please note that you can click on an event to expand its
description and reveal any parameters it is triggered with.

## How to listen for events

To catch triggered events you have to add a listener to the object that triggers them. If you for example want to know
when a user clicks on event in the Gantt, then you should add a listener (listen) for the
[`taskClick`](#Gantt/view/Gantt#event-taskClick) event available on
[Gantt](#Gantt/view/Gantt). This can be achieved in multiple ways:

### Setting up listeners during construction

You can add listeners when constructing a new instance of a class by specifying the
[`listeners`](#Core/mixin/Events#config-listeners) config:

```javascript
const gantt = new Gantt({
    // other configs...

    listeners : {
        taskclick : myTaskClickFn
    }
});
```

Because of how JavaScripts this-object works you might want to specify what you expect as this in your listener
function:

```javascript
const gantt = new Gantt({
    listeners : {
        taskClick : () => {
            console.log('clicked');
        }
    }
});
```

When specifying a `thisObj` it is also possible to resolve the function to call by specifying its name as a string:

```javascript
const gantt = new Gantt({
    listeners : {
        taskclick : 'myTaskClickFn',
        thisObj   : this
    }
});
```

It is possible to add multiple listeners in one go:

```javascript
const gantt = new Gantt({
    listeners : {
        taskclick    : 'myTaskClickFn',
        taskdblclick : 'myTaskDblClickFn',
        thisObj      : this
    }
});
```

Thanks to ES6 syntax for member functions you can also specify the function inline in the config in a nice way:

```javascript
const gantt = new Gantt({
    listeners : {
        taskclick() {

        }
    }
});
```

### Adding listeners after construction

You can add listeners to an existing instance using [`addListener`](#Core/mixin/Events#function-addListener) or
[`on`](#Core/mixin/Events#function-on). Both work the same way, `on` is a bit shorter to type:

```javascript
gantt.on('taskclick', () => console.log('click'));
gantt.addListener('taskDblClick', () => console.log('dblclick'));
```

If you need to specify a `thisObj` it is possible as the third argument:

```javascript
gantt.on('taskclick', this.onTaskClick, this);
```

You can also pass multiple listeners as a config object in the same way as when specifying them during construction:

```javascript
gantt.on({
    taskclick    : 'onTaskClick',
    taskdblclick : 'onTaskDblClick',
    thisObj      : this
});
```

### Using "on" functions

Bryntum Gantt also supports directly calling functions that match the "on[EventName]" pattern. We recommend using the
approaches above, but this way of defining listeners can be convenient for small widgets:

```javascript
const gantt = new Gantt({
    onTaskClick() {
        console.log('Task click');
    }
});
```

You can also assign on the fly:

```javascript
gantt.onTaskClick = () => console.log('Task click');
```

## The listener functions

All listener functions are called with a single argument when an event is triggered. This argument is an object that has
at least one property `source`, which is the object that triggered the event. Most events populate the object with
more information, see API docs to find out what. For example `taskclick` has the following:

```javascript
gantt.on({
    taskclick(event) {
        // The taskClick event has the properties for the event
        // Check PI docs for available properties for a certain event 
    }
});
```

## Additional options

The listener config object has some useful properties such as `once` and `prio`:

* `once` allows you to specify a listener that will unregister itself after the first call.
  See [addListener](#Core/mixin/Events#function-addListener) for more details.

```javascript
gantt.on({
    taskclick() {
        // Only called on the first click
    },
    // Call once and then unregister
    once : true
});
```

* `prio` lets you specify a listeners priority, which is used to determine the order in which listeners are called.
  See [addListener](#Core/mixin/Events#function-addListener) for more details.

```javascript
store.on({
    load() {
        // Called before normal load listeners
    },
    // Higher prio is called prior to lower
    prio : 100
});
```

It is possible to catch all events triggered by an object using a `catchAll` function:

```javascript
gantt.on({
    catchAll(event) {
        // Any event triggered on Gantt will pass through here
    }
});
```

## Preventing events

By returning `false` from a listener for an event documented as `preventable` the action that would otherwise be
executed after the event is prevented. These events names are usually prefixed with `before`.

**Sample code:**

```javascript
onBeforeTaskEdit(event) {
    if (someCondition) {
       return false;
    } 
}
```

### Frameworks integration

Check
[Angular](#Gantt/guides/integration/angular/events.md#preventable-events),
[React](#Gantt/guides/integration/react/events.md#preventable-events) and 
[Vue](#Gantt/guides/integration/vue/events.md#preventable-events) framework integration guides for the details.


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>