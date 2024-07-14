# BryntumCore events in React

## Listening to events

The conventional React way is used to listen to Bryntum Core events. For example, if we want to listen
to `eventClick` event we pass the listener function to `onEventClick` property. The property name must be in camel 
case and is case sensitive.

```javascript
const eventClickHandler = useCallback(({ selection }) => {
    console.log(selection); // actual logic comes here
});

// ...

return (
    <BryntumCore
        onEventClick={eventClickHandler}
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
    function onBeforeEventEdit() {
        if (someCondition) {
            return false;
        }
    }

    return (
        <>
            <BryntumCore
                onBeforeEventEdit={onBeforeEventEdit}
            />
        </>
    )
}
```

## Using dataChange event to synchronize data

Bryntum Core keeps all data in its stores which are automatically synchronized with the UI and the user actions.
Nevertheless, it is sometimes necessary for the rest of the application to be informed about data changes. For that
it is easiest to use `dataChange` event.

```javascript
const App = props => {
    const syncData = ({ store, action, records }) => {
        console.log(`${store.id} changed. The action was: ${action}. Changed records: `, records);
        // Your sync data logic comes here
    }

    return (
        <BryntumCore
            ref={coreRef}
            {...coreConfig}
            onDataChange={syncData}
        />
    )
}
```

You can find details of all events that are fired by `BryntumCore` in
the [API documentation](https://bryntum.com/products/core/docs/api/Core/view/Core#events).


<p class="last-modified">Last modified on 2024-05-21 9:10:47</p>