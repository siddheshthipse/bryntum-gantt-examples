# Customizing the Task menu

Bryntum Gantt ships with built-in context menus for the locked grid column headers, the timeaxis header, tasks,
and for locked grid cells which represent tasks. All the context menu features are customizable.
The Gantt is built upon the Grid, so customization of the Header menu can be found in the Grid docs,
customization of the TimeAxis Header menu can be found in the Scheduler docs.
However, the Cell menu provided by the grid is not available in Gantt. The Gantt Task menu overrides it to show
task menu for cells.

Customization of the Task menu is similar to the context menus in Grid and Scheduler
and you will find more details about it in this guide.

Right-click a task, a parent task, and a milestone in the demo below to see it in action:

<div class="external-example" data-file="Gantt/guides/menu/Basic.js"></div>

The menu can be customized, turned off or replaced with your own implementation (see the "Replace context menus" guide).

## Turning the menu off entirely

The task menu is supplied by `TaskMenu` feature. The feature is enabled by default. To turn the feature off, configure it with `false`:

```javascript
const gantt = new Gantt({
    features : {
        // Turn the Task menu off completely, will not be created
        taskMenu : false
    }
});
```

## Enabling or disabling the menu

You can also enable or disable any of the menus programmatically, perhaps depending on user rights.
In case of the Task menu need to configure it with `disabled` property equal to `true`:

```javascript
const gantt = new Gantt({
    features : {
        taskMenu : {
            // The Task menu is created, but starts disabled
            disabled : true
        }
    }
});

// To enable
gantt.features.taskMenu.disabled = false;

// To disable again
gantt.features.taskMenu.disabled = true;
```

Try it in the demo below:

<div class="external-example" data-file="Gantt/guides/menu/DisableFeature.js"></div>

## Customizing the menu items

The menu items in the Task menu can be customized, existing items can be changed or removed, and new items can be added.
This is handled using the `items` config of the feature.

### Default task menu items

Here is the list of menu items provided by the `TaskMenu` feature and populated by the other features:

| Item reference        | Text                 | Weight | Feature    | Enabled by default | Description                                                                                                                                           |
|-----------------------|----------------------|--------|------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `editTask`            | Edit task            | 100    | `TaskEdit` | true               | Shows a submenu to control tasks adding                                                                                                               |
| `search`*             | Search for value     | 200    | `Search`   | false              | Searches the grid for the selected cell text                                                                                                          |
| `filterMenu`*         | Filter               | 400    | `Filter`   | true               | Shows a submenu to control filtering. See [Filter submenu](#Grid/feature/Filter#menu-items).                                                         |
| `add`                 | Add...               | 500    | `TaskMenu` | true               | Shows a submenu to control tasks adding                                                                                                               |
| \>`addTaskAbove`      | Task above           | 510    | `TaskMenu` | true               | Adds a new task above the selected task                                                                                                               |
| \>`addTaskBelow`      | Task below           | 520    | `TaskMenu` | true               | Adds a new task below the selected task                                                                                                               |
| \>`milestone`         | Milestone            | 530    | `TaskMenu` | true               | Adds a new milestone below the selected task                                                                                                          |
| \>`subtask`           | Subtask              | 540    | `TaskMenu` | true               | Turns the selected task into a parent task if it is not a parent task yet. Adds a new task as a child of the selected task.                           |
| \>`successor`         | Successor            | 550    | `TaskMenu` | true               | Adds a new task below the selected task. Creates an "Finish-to-Start" dependency between the selected task and the new one.                           |
| \>`predecessor`       | Predecessor          | 560    | `TaskMenu` | true               | Adds a new task above the selected task. Creates an "Finish-to-Start" dependency between the new task and the selected one.                           |
| `convertToMilestone`  | Convert to milestone | 600    | `TaskMenu` | true               | Turns the selected task into a milestone. Shown for leaf tasks only.                                                                                  |
| `indent`              | Indent               | 700    | `TaskMenu` | true               | Turns the sibling above of the selected task into a parent task if it is not a parent task yet. The selected task becomes a child of the parent task. |
| `outdent`             | Outdent              | 800    | `TaskMenu` | true               | Turns the selected task into a sibling of its parent which goes next to it                                                                            |
| `deleteTask`          | Delete task          | 900    | `TaskMenu` | true               | Removes the selected task record from the store                                                                                                       |
| `linkTasks`           | Add dependencies     | 1000   | `TaskMenu` | true               | Add dependencies between two or more selected tasks                                                                                                  |
| `unlinkTasks`         | Remove dependencies  | 1010   | `TaskMenu` | true               | Removes dependencies between selected tasks                                                                                                          |
| `taskColor`           | Color                | 1100   | `TaskMenu` | false              | Choose background color for the task bar                                                                                                             |

<dl class="foot-note">
    <dt>*</dt><dd>items that are shown for the locked grid cells only</dd>
    <dt>></dt><dd>first level of submenu</dd>
</dl>

### Removing default items

To remove a default item no matter if it is provided by the Task menu feature, or it is provided by another feature,
configure it as `false` in the `items` config of the Task menu feature:

```javascript
const gantt = new Gantt({
    features : {
        taskMenu : {
            items : {
                // Remove "Edit task" item provided by TaskEdit feature
                editTask : false
            }
        }
    }
});
```

To remove a default subitem, configure the parent item `menu` and set corresponding items to `false`:

```javascript
const gantt = new Gantt({
    features : {
        taskMenu : {
            items : {
                add : {
                    menu : {
                        // Remove "Task above", "Subtask", "Successor", and "Predecessor" subitems of the "Add..." menu item
                        addTaskAbove : false,
                        subtask      : false,
                        successor    : false,
                        predecessor  : false
                    }
                }
            }
        }
    }
});
```

<div class="external-example" data-file="Gantt/guides/menu/DisableItems.js"></div>

### Customize default items

The default items can be customized by supplying config objects for them in the `items` config of the menu feature.
These config objects will be merged with their default configs. Similar to removing default items, it does not matter,
if the item is provided by the menu feature or not.

The order of the default items is determined by the `weight` property. The higher the `weight`, the further down they are
displayed. See the table above for the default weights.

For example, to rename "Edit task" item and move it to the bottom of the list of items:

```javascript
const gantt = new Gantt({
    features : {
        taskMenu : {
            items : {
                // Rename "Delete task" item
                deleteTask : {
                    text   : 'Delete'
                },
                // Rename and move "Edit task" item to be below "Delete task" item (900)
                editTask : {
                    text   : 'Update',
                    weight : 910
                }
            }
        }
    }
});
```

Try it out in this demo:

<div class="external-example" data-file="Gantt/guides/menu/CustomizeItems.js"></div>

### Add custom items

Custom items are added in the same way as you customize the built-in ones, add new properties to the `items`
config of the menu feature to add new items. The key you choose to use for your item will be used as its `ref`,
through which it can be accessed later.

Here we add a custom item to the task menu to move the selected task 1 hour forward:

```javascript
const gantt = new Gantt({
    features : {
        taskMenu : {
            items : {
                // Custom reference to the new menu item
                moveForward : {
                    text   : 'Move 1 hour ahead',
                    weight : 90, // Add the item to the top
                    onItem : ({ taskRecord }) => {
                        taskRecord.shift(1, 'hour');
                    }
                }
            }
        }
    }
});
```

Try the custom task item here:

<div class="external-example" data-file="Gantt/guides/menu/AddItems.js"></div>

### Dynamic items processing

If you need to control items visibility or text depending on a dynamic condition, for example user authentication,
or user access rights, you can mutate `items` in `processItems` hook provided by the menu.

Here we disable "Delete task" and "Edit task" items based on a condition:

```javascript
let accessGranted = false;

const gantt = new Gantt({
    features : {
        taskMenu : {
            // Process task items before showing the menu
            processItems({ items, taskRecord }) {
                // Not possible to edit or delete tasks if there are no rights for it
                if (!accessGranted) {
                    items.editTask = false;
                    items.deleteTask = false;
                }
            }
        }
    }
});
```

See it in action in this demo:

<div class="external-example" data-file="Gantt/guides/menu/Dynamic.js"></div>


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>