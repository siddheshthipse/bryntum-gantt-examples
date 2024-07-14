# Bryntum Gantt events in Angular

The Bryntum Gantt events are passed up to the Angular wrapper which makes it possible to listen to them the standard
Angular way.

## Listening to events

The following code demonstrates listening to the `taskClick` event:

Sample code for **app.component.ts:**

```typescript
export class AppComponent implements AfterViewInit {
    onTaskClick(e : {[key:string] : any}) : void {
        console.log('onTaskClick', e);
    }
    // etc.
```

and in **app.component.html:**

```html
<bryntum-gantt
    #gantt
    (onTaskClick) = "onTaskClick($event)"
></bryntum-gantt>
```

Please note that we prefix the capitalized event name with the `on` keyword and that we pass `$event` as
the argument to the listener.

## Preventable events

Also note that Angular's EventEmitter does not relay return values, something that all Bryntum events flagged as
`async` or `preventable` relies on. To work around this you should in Angular instead of returning a value as the
docs state, set the `returnValue` flag on the passed event.

Code for **app.component.ts:**

```typescript
onBeforeTaskEdit(event: any): void {
    event.returnValue = false;
}
```

## Asynchronous events

For `async` listeners it gets more complicated, we currently recommend using a `Promise` in Angular. 
Code for **app.component.ts:**

```typescript
async onBeforeShow(event): void {
    event.returnValue = new Promise(resolve => {
        processing.then(result => resolve(result));
    });
}
```

## Event listeners

Another valid (and for preventable and async listeners often easier to use) method is to pass a
[`listeners`](https://bryntum.com/products/gantt/docs/api/Core/mixin/Events#config-listeners)
config object to the Angular wrapper. For example:

**app.config.ts:**

```typescript
export const ganttConfig = {
    listeners : {
        beforeTaskEdit(e) {
            console.log('cellClick', e);
        }
    },
    // etc
```

**app.component.html:**

```html
<bryntum-gantt
    #gantt
    [listeners] = "ganttConfig.listeners!"
></bryntum-gantt>
```

Please note that we use unprefixed event names in this case.

### Using dataChange event to synchronize data

Bryntum Gantt keeps all data in its stores which are automatically synchronized with the UI and the user actions.
Nevertheless, it is sometimes necessary for the rest of the application to be informed about data changes. For that
it is easiest to use `dataChange` event.

**app.component.html:**

```html
<bryntum-gantt
    #gantt
    (onDataChange) = "syncData($event)"
></bryntum-gantt>
```

**app.component.ts:**

```typescript
export class AppComponent {

    syncData({ store, action, records } : { store : Store; action : String; records : Model[]}) : void {
        console.log(`${store.id} changed. The action was: ${action}. Changed records: `, records);
        // Your sync data logic comes here
    }

    // ...
}
```


<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>