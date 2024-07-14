# Customizing keyboard shortcuts

Keyboard shortcuts are easily customized. Provide a `keyMap` config object with the keyboard key or combination as the
property name, and the action (function name) as value. Key combinations are case-insensitive.

```javascript
const taskBoard = new Gantt({
    keyMap: {
        // Changing keyboard indent/outdent
        i : 'indent',
        o : 'outdent',
        
        // Removes mappings for original keys
        'Alt+Shift+ArrowRight' : null,
        'Alt+Shift+ArrowLeft'  : null,
    }
});
```
Modifier keys (`Ctrl`, `Alt`, `Shift`) are also supported. Please note that `Ctrl` is the equivalent to `Command` and
`Alt` is the equivalent to `Option` for Mac users.

```javascript
const taskBoard = new Gantt({
    keyMap: {
        'Ctrl+i' : 'indent',
        'Ctrl+o' : 'outdent',
    }
});
```

## Multi-action combinations

A keyboard combination can sometimes be used for multiple actions across different components and different features.
For most of these cases only one of the action handlers will recognize the action as something it will apply its logic
to. However, some actions do collide. And for that there is a prioritization configuration property named `weight` 
built-in to the keyMap functionality.

```javascript
// Example of a configuration with a weight
const gantt = new Gantt({
    keyMap: {
        'Space': { handler: 'myCustomAction', weight: 100 }
    } 
});
```

Please note that customizing these keyboard shortcuts can have side effects not intended and not always easily 
recognizable. A quick way to get the complete list of active keyboard shortcuts is when the Gantt has finished its 
configuration process, log out the value of the property `keyMap` of the Gantt instance object.

If you know what you are doing, the `weight` configuration can be a tool to configure more actions for the same keyboard
combination. The colliding actions will be put in an array sorted by the largest `weight` last. The actions will then be
called from beginning to end, until one not returns `false`. Not providing a `weight` puts the action on the top of the
queue.

```javascript
const gantt = new Gantt({
    feature: {
        tree: { // Tree feature
            keyMap : {
                // Instead of using a string action, use an object with a
                // handler and a weight property.
                ' ' : { handler: 'toggleCollapseByKey', weight: 1000}
                // This will affect the Tree feature's Space keyboard shortcut
                // to (probably) be called last of all actions on Space.
            }
        }
    }
});
```

Removing a weighted keyboard combination action is almost always safe to do:

```javascript
const gantt = new Gantt({
    keyMap: {
        // Changing keyboard navigation in the grid part to respond
        // to WASD keys.
        w : 'navigateUp',
        a : 'navigateLeft',
        s : 'navigateDown',
        d : 'navigateRight',
        
        // Removes mappings for arrow keys. These all have a weight, 
        // but removal is safe to do
        ArrowUp    : null,
        ArrowLeft  : null,
        ArrowDown  : null,
        ArrowRight : null
    }
});
```

## Adding new keyboard combination actions

If you want to run a function by a keyboard combination it is very easy to set up using the keyMap configuration. Either
add a new function to your Gantt class, use an existing function from the API or just provide a function or a function
handle in the configuration.

```javascript
const gantt = new Gantt({
    keyMap : {
        // This is a function from the existing Gantt API
        'Ctrl+T'       : 'addSubTask',

        // This is a function provided directly in the configuration object
        'Ctrl+O'       : () => location.href = './logout'
    }
});

class MyGantt extends Gantt {
    static configurable = {
        keyMap: {
            // This function must be available on the Gantt subclass
            'Ctrl+Shift+M' : 'sendReminderEmail',
        }
    };
    
    sendReminderEmail(){
        myApi.post('./sendmail');
    }
}
```

If the current keyboard shortcut has multiple actions, and you want actions after your action to be called, the function
should return `false`. This will make the keyMap functionality continue calling the other actions until one not returns
`false`.

```javascript
class myGantt extends Gantt {
    static configurable = {
        keyMap: {
            'Enter': { action: 'openSomething', weight : 0 }
        }
    }
    
    openSomething(){
        new Something(this.selectedRecords).open();
        // Return false to continue calling other Enter actions
        // (probably opens the Task editor)
        return false;
    }
}
```


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>