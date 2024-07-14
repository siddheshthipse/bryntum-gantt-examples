# Displaying data in a Grid

Every Bryntum component uses [Store](#Core/data/Store) data containers for holding data.

A store uses a [Model](#Core/data/Model) as the blueprint for each row (called record) it holds.

In this section, the focus will be on the fundamental process of presenting data within the Grid. 
For a comprehensive understanding of the Store and its functionalities, 
refer to [Using a store](#Core/guides/data/storebasics.md).

This section outlines the available approaches to populate a Grid with data, that includes two methods:
- Using inline data
- Using remote data

## Using inline data

If you have inline data, you can supply it directly when creating a grid:

<div class="framework-tabs">
<div data-name="js">

```javascript
const grid = new Grid({
    columns : [/*...*/],
    data : [
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        /*...*/
    ] 
});
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const [data, setData] = useState([
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        ...
    ]);

    return <BryntumGrid data={data} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :data="data" />
```

```javascript
export default {
  setup() {
    return {
      data : reactive([
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        ...
      ])
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [data]="data"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    data = [
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        ...
    ]
}
```

</div>
</div>

This will create a store holding the data. The store can be accessed through the store property:

<div class="framework-tabs">
<div data-name="js">

```javascript
grid.store.sort('name');
```

</div>
<div data-name="react">

```javascript
grid.gridInstance.store.sort('name');
```

</div>
<div data-name="vue">

```javascript
grid.gridInstance.store.sort('name');
```

</div>
<div data-name="angular">

```typescript
grid.gridInstance.store.sort('name');
```

</div>
</div>

Another option if you need to configure the store is to supply a store config object (for info on available configs, see
API docs for [Store](#Core/data/Store#configs)):

<div class="framework-tabs">
<div data-name="js">

```javascript
const grid = new Grid({
    store : {
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            ...
        ] 
    }
});
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const [store, setStore] = useState({
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            ...
        ] 
    });

    return <BryntumgRid store={store} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :store="store" />
```

```javascript
export default {
  setup() {
    return {
      store : reactive({
          sorters : [
              { field : 'name' }
          ],
          data : [
              { id : 1, name : 'Batman' },
              ...
          ]
      })
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [store]="store"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    store = {
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            ...
        ] 
    }
}
```

</div>
</div>

A third option is to supply an already existing `Store` instance:

<div class="framework-tabs">
<div data-name="js">

```javascript
const store = new Store({
   someConfig : "...",
   data : [
       { id : 1, name : 'Batman' },
       /*...*/
   ]  
});

const grid = new Grid({
   store
});
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const myStore = new Store({
       someConfig : "...",
       data : [
           { id : 1, name : 'Batman' },
           /*...*/
       ]
    });

    const [store, setStore] = useState(myStore);

    return <bryntum-grid store={store} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :store="store" />
```

```javascript
export default {
  setup() {
    const myStore = new Store({
       someConfig : "...",
       data : [
           { id : 1, name : 'Batman' },
           /*...*/
       ]
    });

    return {
      store : myStore
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [store]="store"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    store = new Store({
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            ...
        ] 
    })
}
```

</div>
</div>


Inline data is expected to be an array of JavaScript objects. If no model/fields are defined for the store (more info
below) the properties of the first entry in the array are used as fields (`id` and `name` in the examples above).

## Using remote data

The base Store class only handles inline data. If you want to load remote data, use an [AjaxStore](#Grid/guides/data/ajaxstore.md) in its place. As with
inline data you have different options on how to set it up. Either supply a store config containing a `readUrl`:

<div class="framework-tabs">
<div data-name="js">

```javascript
const grid = new Grid({
    store : {
        // When Grid finds readUrl in the store config it will create an AjaxStore
        readUrl : 'backend/load.php',
        // Load upon creation
        autoLoad : true 
    }
});
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const [store, setStore] = useState({
        // When Grid finds readUrl in the store config it will create an AjaxStore
        readUrl : 'backend/load.php',
        // Load upon creation
        autoLoad : true 
    });

    return <bryntum-grid store={store} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :store="store" />
```

```javascript
export default {
  setup() {
    return {
      store : reactive({
         // When Grid finds readUrl in the store config it will create an AjaxStore
         readUrl : 'backend/load.php',
         // Load upon creation
         autoLoad : true
      })
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [store]="store"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    store = {
        // When Grid finds readUrl in the store config it will create an AjaxStore
        readUrl : 'backend/load.php',
        // Load upon creation
        autoLoad : true 
    }
}
```

</div>
</div>

Or create the store prior to creating the grid:

<div class="framework-tabs">
<div data-name="js">

```javascript
const store = new AjaxStore({
   readUrl : 'backend/load.aspx'
});

const grid = new Grid({
   store
});

store.load();
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const myStore = new AjaxStore({
        readUrl : 'backend/load.aspx'
    });

    return <bryntum-grid store={myStore} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :store="store" />
```

```javascript
export default {
  setup() {
    const myStore = new AjaxStore({
        readUrl : 'backend/load.aspx'
    });

    return {
      store : myStore
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [store]="store"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    store = new AjaxStore({
        readUrl : 'backend/load.aspx'
    })
}
```

</div>
</div>

The data returned from the backend is expected to have the following format:

```json
{
    "success" : true,
    "data" : [  
        { "id" : 1, "name" : "Batman" },
        { "..." : "..." }
    ]
}
```

If `AjaxStore` does not suite your needs you can of course load data any custom way you want and then plug it into an 
inline store:

```javascript
const grid = new Grid({
    columns : [/*...*/]
});

// Using native fetch to load data
const response = await fetch('backend/load.php');
const data = await response.json();

// Maybe do some custom processing before plugging into grids store
data.forEach((row, index) => {
    row.index = index;
    row.someValue = Math.random();
    /*...*/
});

// Plug it in as inline data
grid.store.data = data;
```

<p class="last-modified">Last modified on 2024-05-21 9:04:41</p>