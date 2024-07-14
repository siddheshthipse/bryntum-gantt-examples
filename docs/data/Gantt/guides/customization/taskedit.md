# Customizing the task editor

Bryntum Gantt ships with a built-in [TaskEditor](#Gantt/widget/TaskEditor),
double-click the task in the demo below to see it in action:

<div class="external-example" data-file="Gantt/guides/taskedit/basic.js"></div>

The editor can be customized, turned off or replaced with your own editor.

## Turning the editor off entirely

The task editor is supplied by a feature called [TaskEdit](#Gantt/feature/TaskEdit), which is enabled by default.
To turn it off, configure the feature with `false`:

```javascript
const gantt = new Gantt({
    features : {
        taskEdit : false
    }
});
```

## Enabling or disabling the editor

You can also enable or disable the editor programmatically, perhaps as a response to a login:

```javascript
const gantt = new Gantt({
    features : {
        taskEdit : {
            // Start disabled
            disabled : true
        }
    }
});

// To enable
gantt.features.taskEdit.disabled = false;

// To disable again
gantt.features.taskEdit.disabled = true;
```

Try it in the demo below:

<div class="external-example" data-file="Gantt/guides/taskedit/disable.js"></div>

## Customizing the tabs and the fields

The Task editor contains tabs by default. Each tab is a container with built-in widgets: text fields, grids, etc.
Existing tabs can be changed or removed and new tabs can be added, as well as existing fields in the tabs can be changed
or removed and new fields can be added. This is handled using the [`items`](#Gantt/feature/TaskEdit#config-items)
config of the feature.

### Default tabs and fields

Here is the list of the built-in tabs

| Tab ref           | Text         | Weight | Description                                                                         |
|-------------------|--------------|--------|-------------------------------------------------------------------------------------|
| `generalTab`      | General      | 100    | Shows basic configuration: name, start/end dates, duration, percent done, effort.   |
| `predecessorsTab` | Predecessors | 200    | Shows a grid with incoming dependencies                                             |
| `successorsTab`   | Successors   | 300    | Shows a grid with outgoing dependencies                                             |
| `resourcesTab`    | Resources    | 400    | Shows a grid with assigned resources to the selected task                           |
| `advancedTab`     | Advanced     | 500    | Shows advanced configuration: assigned calendar, scheduling mode, constraints, etc. |
| `notesTab`        | Notes        | 600    | Shows a text area to add notes to the selected task                                 |

### General tab

General tab contains fields for basic configurations

| Field ref     | Type          | Text       | Weight | Description                                                        |
|---------------|---------------|------------|--------|--------------------------------------------------------------------|
| `name`        | TextField     | Name       | 100    | Task name                                                          |
| `percentDone` | NumberField   | % Complete | 200    | Shows what part of task is done already in percentage              |
| `effort`      | DurationField | Effort     | 300    | Shows how much working time is required to complete the whole task |
| `divider`     | Widget        |            | 400    | Visual splitter between 2 groups of fields                         |
| `startDate`   | DateField     | Start      | 500    | Shows when the task begins                                         |
| `endDate`     | DateField     | Finish     | 600    | Shows when the task ends                                           |
| `duration`    | NumberField   | Duration   | 700    | Shows how long the task is                                         |

### Predecessors tab

Predecessors tab contains a grid with incoming dependencies and controls to remove/add dependencies

| Widget ref | Type    | Weight | Description                                                                                      |
|------------|---------|--------|--------------------------------------------------------------------------------------------------|
| `grid`     | Grid    | 100    | Shows predecessors task name, dependency type and lag                                            |
| `toolbar`  | Toolbar | 200    | Shows control buttons                                                                            |
| \>`add`    | Button  | 210    | Adds a new dummy predecessor. Then need to select a task from the list in the name column editor |
| \>`remove` | Button  | 220    | Removes selected incoming dependency                                                             |

<dl class="foot-note">
    <dt>></dt><dd>first level of submenu</dd>
</dl>

### Successors tab

Successors tab contains a grid with outgoing dependencies and controls to remove/add dependencies

| Widget ref | Type    | Weight | Description                                                                                    |
|------------|---------|--------|------------------------------------------------------------------------------------------------|
| `grid`     | Grid    | 100    | Shows successors task name, dependency type and lag                                            |
| `toolbar`  | Toolbar | 200    | Shows control buttons                                                                          |
| \>`add`    | Button  | 210    | Adds a new dummy successor. Then need to select a task from the list in the name column editor |
| \>`remove` | Button  | 220    | Removes selected outgoing dependency                                                           |

<dl class="foot-note">
    <dt>></dt><dd>first level of submenu</dd>
</dl>

### Resources tab

Resources tab contains a grid with assignments

| Widget ref | Type    | Weight | Description                                                                                                                           |
|------------|---------|--------|---------------------------------------------------------------------------------------------------------------------------------------|
| `grid`     | Grid    | 100    | Shows assignments resource name and assigned units (100 means that the assigned resource spends 100% of its working time to the task) |
| `toolbar`  | Toolbar | 200    | Shows control buttons                                                                                                                 |
| \>`add`    | Button  | 210    | Adds a new dummy assignment. Then need to select a resource from the list in the name column editor                                   |
| \>`remove` | Button  | 220    | Removes selected assignment                                                                                                           |

<dl class="foot-note">
    <dt>></dt><dd>first level of submenu</dd>
</dl>

### Advanced tab

Advanced tab contains additional task scheduling options

| Field ref                     | Type      | Weight | Description                                                                                                                  |
|-------------------------------|-----------|--------|------------------------------------------------------------------------------------------------------------------------------|
| `calendarField`               | Combo     | 100    | Shows a list of available calendars for this task                                                                            |
| `manuallyScheduledField`      | Checkbox  | 200    | If checked, the task is not considered in scheduling                                                                         |
| `schedulingModeField`         | Combo     | 300    | Shows a list of available scheduling modes for this task                                                                     |
| `effortDrivenField`           | Checkbox  | 400    | If checked, the effort of the task is kept intact, and the duration is updated. Works when scheduling mode is "Fixed Units". |
| `divider`                     | Widget    | 500    | Visual splitter between 2 groups of fields                                                                                   |
| `constraintTypeField`         | Combo     | 600    | Shows a list of available constraints for this task                                                                          |
| `constraintDateField`         | DateField | 700    | Shows a date for the selected constraint type                                                                                |
| `rollupField`                 | Checkbox  | 800    | If checked, shows a bar below the parent task. Works when the "Rollup" feature is enabled.                                   |
| `inactiveField`               | Checkbox  | 900    | Allows to inactivate the task so it won't take part in the scheduling process.                                               |
| `ignoreResourceCalendarField` | Checkbox  | 1000   | If checked the task ignores the assigned resource calendars when scheduling                                                  |

### Notes tab

Notes tab contains a text area to show notes

| Field ref   | Type          | Weight | Description                                     |
|-------------|---------------|--------|-------------------------------------------------|
| `noteField` | TextAreaField | 100    | Shows a text area to add text notes to the task |

### Removing default tabs and fields

To remove a built-in tab or field, specify its `ref` as `false` in the `items` config:

```javascript
const gantt = new Gantt({
    features : {
        taskEdit : {
            items : {
                generalTab      : {
                    items : {
                        // Remove "% Complete","Effort", and the divider in the "General" tab
                        percentDone : false,
                        effort      : false,
                        divider     : false
                    }
                },
                // Remove all tabs except the "General" tab
                notesTab        : false,
                predecessorsTab : false,
                successorsTab   : false,
                resourcesTab    : false,
                advancedTab     : false
            }
        }
    }
})
```

This demo has "% Complete" and "Effort" fields removed in the "General" tab, as well as
"Predecessors", "Successors", "Resources", "Advanced", and "Notes" tabs removed:

<div class="external-example" data-file="Gantt/guides/taskedit/remove.js"></div>

### Customize default tabs and fields

To customize a built-in tab or field, use its `ref` as the key in the `items` config and specify the configs you want
to change (they will be merged with the tabs or fields default configs correspondingly).

The order of the default fields is determined by a `weight`. The higher the `weight`, the further down they are
displayed. See the tables above for the default weights.

For example to change the label of the `percentDone` and rename "General" tab:

```javascript
const gantt = new Gantt({
    features : {
        taskEdit : {
            items : {
                generalTab      : {
                    // Rename "General" tab
                    title : 'Main',
                    items : {
                        // Rename "% Complete" field to "Status"
                        percentDone : {
                            label : 'Status'
                        }
                    }
                }
            }
        }
    }
})
```

Try it out in this demo:

<div class="external-example" data-file="Gantt/guides/taskedit/label.js"></div>

### Add custom tabs and fields

Custom fields are added in the same way as you used to customize the built-in ones, add new properties to the `items`
config of the feature to add new tabs. Add new properties to the `items` config of the tab to add new fields.
The key you choose to use for your tabs and fields will be used as its `ref`, through
which it can be accessed later.

Here we add a custom field to "General" tab and create a custom tab with a field that shows the task name:

```javascript
const gantt = new Gantt({
    features : {
        taskEdit : {
            items : {
                generalTab : {
                    items : {
                        // Add new field to the last position
                        newGeneralField : {
                            type   : 'textfield',
                            weight : 710,
                            label  : 'New field in General Tab',
                            // Name of the field matches data field name, so value is loaded/saved automatically
                            name   : 'custom'
                        }
                    }
                },
                // Add a custom tab to the first position
                newTab     : {
                    // Tab is a FormTab by default
                    title  : 'New tab',
                    weight : 90,
                    items  : {
                        newTabField : {
                            type   : 'textfield',
                            weight : 710,
                            label  : 'New field in New Tab',
                            // Name of the field matches data field name, so value is loaded/saved automatically.
                            // In this case it is equal to the Task "name" field.
                            name   : 'name'
                        }
                    }
                }
            }
        }
    }
})
```

Try the custom tab here:

<div class="external-example" data-file="Gantt/guides/taskedit/tab.js"></div>

## Replacing the Task editor

The easiest way to show a custom editor is to leave the built-in editor enabled, listen for when it is about to open,
prevent that and show your own instead. Using this approach, you will catch the different paths leading to the editor
being show without having to address them one by one (double-click, enter, drag create etc.).

Here is a simple implementation of the Task editor using our basic Popup component with a TextField and a Button inside.
We set the task name to the text field and write it back to the record on the button click:

```javascript
const gantt = new Gantt({
    listeners : {
        beforeTaskEdit({ taskRecord, taskElement }) {
            // Show custom editor here!
            const editor = WidgetHelper.openPopup(taskElement, {
                closeAction : 'destroy',
                items       : {
                    name : {
                        type  : 'textfield',
                        label : 'Name',
                        value : taskRecord.name
                    },
                    save : {
                        type    : 'button',
                        text    : 'Save',
                        color   : 'b-green',
                        onClick : () => {
                            taskRecord.name = editor.widgetMap.name.value;
                            editor.close();
                        }
                    }
                }
            });

            // Prevent built-in editor
            return false;
        }
    }
})
```

This custom task editor is shown in action here:

<div class="external-example" data-file="Gantt/guides/taskedit/replace.js"></div>

## Update custom fields state and data

Task Editor uses `items` configuration only once during first initialization. If you need to refresh data in combobox or hide/show fields depending on your business logic on editor reopen, use [beforeTaskEditShow](#Gantt/feature/TaskEdit#event-beforeTaskEditShow) event:

```javascript
const gantt = new Gantt({
    features : {
        taskEdit : {
            items : {
                equipment : {
                    // custom field configuration
                },
                volume : {
                    // custom field configuration
                }
            }
        }
    },
    listeners : {
        beforeTaskEditShow({ editor, taskRecord }) {
            const
                equipmentCombo = editor.widgetMap.equipment,
                volumeField = editor.widgetMap.volume;

            // update data in combo list
            equipmentCombo.items = this.equipmentStore.getRange();
            // update field visibility state
            volumeField.hidden = !taskRecord.hasVolume;
        }
    }
});
```



<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>