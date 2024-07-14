# Dragging unplanned tasks from an external grid 

## Intro

A popular way of adding unplanned tasks to a project is to list them in an external data grid and use drag drop to place
them in the WBS tree hierarchy. With the Bryntum Gantt this is super easy to achieve and in this guide we will show you how
the [`drag-from-grid`](../examples/drag-from-grid?) example was built. **Please note**, the Grid component is licensed 
separately from the Gantt component.

<iframe style="height:400px" src="../examples/drag-from-grid?screenshot&develop=1"></iframe>

## Creating the Gantt and Grid components

In the demo we refer to, we use a [Container](#Core/widget/Container) to host our two main components. 

```javascript
const container = new Container({
    appendTo : 'container', // The id where the Container will be rendered into
    items    : [
        {
            // The type of each Bryntum widget can be found in the class page in the API docs (top right corner) 
            type    : 'gantt',
            project,
            flex    : 1,
            columns : [
                { type : 'name', width : 250 },
                { type : 'startdate' },
                { type : 'duration' }
            ]
        },
        { type : 'splitter' },
        {
            // The type is defined in the ./lib/UnplannedGrid.js class
            type  : 'unplannedgrid',
            ref   : 'unplannedGrid',
            width : 300,
            cls   : 'unplannedTasks',
            store     : {
                // Use the same data model as the Gantt task store
                modelClass : project.taskStore.modelClass,
                readUrl    : 'data/unplanned.json',
                autoLoad   : true
            }
        }
    ]
});
```

The grid uses a plain flat store, which is configured to use the same `modelClass` as the Gantt - the [TaskModel](#Gantt/model/TaskModel).

The container lays out its children using basic [flex box CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).

```css
#container > .b-container {
    flex-flow : row;
}
```

The Gantt and the Grid are separated by a [Splitter](#Core/widget/Splitter) to allow resizing the elements.

## Configuring the DragHelper

With the two main components added to the page, it is time to start thinking about the dragging. The 
[DragHelper](#Core/helper/DragHelper) will provide the drag functionality to allow rows to be dragged from the unplanned 
grid and dropped on the Gantt element. 

In the demo, the Drag functionality is encapsulated in a custom demo subclass of DragHelper. First, a simple skeleton
with some basic configuration is added.

```
import DragHelper from '../../../lib/Core/helper/DragHelper.js';

export default class Drag extends DragHelper {
    static get configurable() {
        return {
            // Don't drag the actual row element, clone it
            cloneTarget        : true,
            
            // Only allow drops on the gantt area
            dropTargetSelector : '.b-gantt .b-grid-subgrid',
            
            // Only allow drag of row elements inside on the unplanned grid
            targetSelector     : '.b-grid-row:not(.b-group-row)',
            
            // This enables a simpler version of listening to events, providing "onDragStart" instead of listening for "dragStart" event
            callOnFunctions    : true`,
            
            // The app will provide references to the Gantt and the Grid instances
            gantt              : null,
            grid               : null
        };
    }

    // Drag start callback 
    onDragStart({ context }) {
       // TODO
    }

    // Drag callback called every mouse move
    onDrag({ event, context }) {
       // TODO
    }

    // Drop callback after a mouse up, take action and transfer the unplanned task to the real EventStore (if it's valid)
    onDrop({ context }) {
       // TODO
    }
};
```

Above, the following configurations are used:
* [`cloneTarget`](#Core/helper/DragHelper#config-cloneTarget) We set this to `true` to clone the mouse-down element, and not move the actual grid row.
* [`targetSelector`](#Core/helper/DragHelper#config-targetSelector) This is a CSS selector defining what elements are draggable, we set it to `.b-grid-row:not(.b-group-row)`
* [`dropTargetSelector`](#Core/helper/DragHelper#config-dropTargetSelector) This is a CSS selector defining where drops are allowed, 
 and we set this to `.b-gantt .b-grid-subgrid` which targets any of the Gantt's sub grids (the locked tree section or the timeline section) 
* [`callOnFunctions`](#Core/helper/DragHelper#config-callOnFunctions) By setting this to `true`, we will receive onXXX (e.g. onDragStart / onDrop) callbacks which is an easier way of listening for events

## Processing drag start

A drag is deemed started when the pointer has moved more than the configured [dragThreshold](#Core/helper/DragHelper#config-dragThreshold)
(defaults to 5px). At this time the `dragStart` event is fired and if using `callOnFunctions`, the `onDragStart` callback
is called. 

In our demo, at this stage we do not want to do too much - only adapt the Grid and Gantt a bit. For the grid,
we just ensure any ongoing cell edit is finalized. And for the Gantt, we enable scrolling when moving mouse close to edges,
to ensure user can reach all parts of the tree. We also disable the [TaskTooltip](#Gantt/feature/TaskTooltip) feature so
it does not show tooltips while we drag over the timeline.

```javascript
onDragStart({ context }) {
    const { grid, gantt } = this;

    // Stop any ongoing cell editing
    grid.features.cellEdit.finishEditing();

    gantt.enableScrollingCloseToEdges(gantt.subGrids.locked);

    // Prevent tooltips from showing while dragging
    gantt.features.taskTooltip.disabled = true;
}
```

## Processing drag actions to highlight drop point 

In our demo, the main objective in the onDrag callback is to highlight to the user where the task drop will take place
(see `highlightRow` below). This requires that we locate the parent node and the child node to insert before. This is done using the code 
below, and we cache both properties to use them in the onDrop method. A special `context` object is also provided to 
every event / callback, which has a `valid` boolean indicating drop validity.

```javascript
onDrag({ event, context }) {
    const
        me        = this,
        { gantt } = me,
        overRow   = context.valid && context.target && gantt.getRowFromElement(context.target);

    context.highlightRow?.removeCls('drag-from-grid-target-task-before');

    if (!context.valid) {
        return;
    }

    if (overRow) {
        const
            verticalMiddle = overRow.getRectangle('normal').center.y,
            dataIndex      = overRow.dataIndex,
            // Drop after row below if mouse is in bottom half of hovered row
            after          = event.clientY > verticalMiddle,
            overTask       = gantt.taskStore.getAt(dataIndex);

        context.insertBefore = after ? gantt.taskStore.getAt(dataIndex + 1) : overTask;
        context.parent       = (context.insertBefore || overTask).parent;

        if (context.insertBefore) {
            const highlightRow = context.highlightRow = gantt.rowManager.getRowFor(context.insertBefore);
            highlightRow.addCls('drag-from-grid-target-task-before');
        }
    }
    else {
        context.parent = gantt.taskStore.rootNode;
    }
}
```

## Processing the drop

When a valid drop happens, all we have to do is to remove the dragged record from the unplanned grid store then add it
to the Gantt [task store](#Gantt/data/TaskStore). And lastly, we need to revert changes made in `onDragStart`. 

```javascript
onDrop({ context }) {
    const
        { gantt, grid }                                        = this,
        { valid, highlightRow, parent, insertBefore, grabbed } = context;

    // If drop was done in a valid location, add the task to Gantt's task store
    if (valid) {
        const unplannedTask = grid.getRecordFromElement(grabbed);

        // Remove unplanned task from its current store
        grid.store.remove(unplannedTask);

        // Insert it to Gantt's task store
        parent.insertChild(unplannedTask, insertBefore);
    }

    gantt.disableScrollingCloseToEdges(gantt.timeAxisSubGrid);

    highlightRow?.removeCls('drag-from-grid-target-task-before');
    gantt.features.taskTooltip.disabled = false;
}
```

## The final result

Here is a small video showing the final result

<video controls width="100%">
<source src="Gantt/drag-task-from-grid.mp4" type="video/mp4">
Sorry, your browser doesn't support embedded videos.
</video>

## Learn more...

Want to learn more about what can be done relating to drag drop with the Bryntum SDKs? Please see these resources:

* [View the `drag-from-grid` demo](../examples/drag-from-grid)
* [View the `drag-resources-from-grid` demo](../examples/drag-resources-from-grid)
* [Read the "Drag resources from grid" guide](#Gantt/guides/dragdrop/drag_resources_from_grid.md)
* [DragHelper API docs](#Core/helper/DragHelper)


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>