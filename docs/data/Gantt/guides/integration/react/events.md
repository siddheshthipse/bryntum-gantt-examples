# BryntumGantt events in React

## Listening to events

The conventional React way is used to listen to Bryntum Gantt events. For example, if we want to listen
to `taskClick` event we pass the listener function to `onTaskClick` property. The property name must be in camel 
case and is case sensitive.

```javascript
const taskClickHandler = useCallback(({ selection }) => {
    console.log(selection); // actual logic comes here
});

// ...

return (
    <BryntumGantt
        onTaskClick={taskClickHandler}
        // other properties
    />
)
```

## Preventable events

By returning `false` from a listener for an event documented as `preventable` the action that would otherwise be
executed after the event is prevented. These events names are usually prefixed with `before`.

For example:

```javascript
const App = props => {
    function onBeforeTaskEdit() {
        if (someCondition) {
            return false;
        }
    }

    return (
        <>
            <BryntumGantt
                onBeforeTaskEdit={onBeforeTaskEdit}
            />
        </>
    )
}
```

## Using dataChange event to synchronize data

Bryntum Gantt keeps all data in its stores which are automatically synchronized with the UI and the user actions.
Nevertheless, it is sometimes necessary for the rest of the application to be informed about data changes. For that
it is easiest to use `dataChange` event.

```javascript
const App = props => {
    const syncData = ({ store, action, records }) => {
        console.log(`${store.id} changed. The action was: ${action}. Changed records: `, records);
        // Your sync data logic comes here
    }

    return (
        <BryntumGantt
            ref={ganttRef}
            {...ganttConfig}
            onDataChange={syncData}
        />
    )
}
```

You can find details of all events that are fired by `BryntumGantt` in
the [API documentation](https://bryntum.com/products/gantt/docs/api/Gantt/view/Gantt#events).


<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>