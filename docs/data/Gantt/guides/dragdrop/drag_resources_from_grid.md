# Assigning resources to tasks by dragging from an external grid 

## Intro

Assigning resources can be time-consuming if you are working with a large project. In Bryntum Gantt, we have a cool
demo showing how to assign resources by dragging them from an external [Grid](#Grid/view/Grid) component onto a task. 
<div class="note">Please note, the Grid component is licensed separately from the Gantt component.</div>
This makes resource assignment super easy and in this guide we will show you how the [`drag-resources-from-grid`](../examples/drag-resources-from-grid) 
example was built.

<iframe style="height:400px" src="../examples/drag-resources-from-grid?screenshot&develop=1"></iframe>

## Creating the Gantt and Grid components

In the demo we refer to, there are two main components - the [Gantt](#Gantt/view/Gantt) and the resource [Grid](#Grid/view/Grid).
These are both added to a [Container](#Core/widget/Container) widget, which serves as the main outer widget. 

```javascript
const container = new Container({
    appendTo : 'container',
    items    : [
        {
            type                    : 'gantt',
            project,
            flex                    : 1,
            ref                     : 'gantt',
            resourceImageFolderPath : '../_shared/images/users/',
            subGridConfigs : {
                ...
            },
            columns : [
                { type : 'name', minWidth : 200 },
                { type : 'resourceassignment', width : 200, showAvatars : true },
                { type : 'startdate' },
                { type : 'duration' }
            ]
        },
        {  type : 'splitter' },
        {
            // The type is defined in the ./lib/ResourceGrid.js class
            type  : 'resourcegrid',
            ref   : 'resourceGrid',

            // Gantt stores are contained by a project, pass the resourceStore to the grid to allow it to access resources
            store : project.resourceStore
        }
    ]
});
```

The container lays out its children using basic [flex box CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).

```javascript
#container > .b-container {
    flex-flow : row;
}
```

The Gantt and the Grid are separated by a [Splitter](#Core/widget/Splitter) to allow resizing the elements.

## Configuring the DragHelper

With the two main components visible on the page, it is time to start thinking about the dragging part. The 
[DragHelper](#Core/helper/DragHelper) provides all the drag functionality needed to allow dragging a resource from the
grid and drop it on a Gantt task row. 

In the demo, the Drag functionality is encapsulated in a custom demo subclass of DragHelper. First, a simple skeleton
with some basic configuration is added.

```javascript
import DragHelper from '../../../lib/Core/helper/DragHelper.js';
import Toast from '../../../lib/Core/widget/Toast.js';

export default class Drag extends DragHelper {
    static get configurable() {
        return {
            // This enables a simpler version of listening to events, providing `onDragStart` instead of listening for `dragStart` event
            callOnFunctions      : true,
           
            // Don't drag the actual row element, we clone an image instead
            cloneTarget          : true,
            
            // We size the cloned element using CSS
            autoSizeClonedTarget : false,
            
            // Stack all dragged DOM nodes below the main element
            unifiedProxy         : true,
            
            // Only allow drops on gantt task bars
            dropTargetSelector   : '.b-gantt-task-wrap,.b-gantt .b-grid-row',
            
            // Allow drag of row elements inside the resource grid
            targetSelector       : '.b-grid-row',
            
            // Drag just the avatar, not the full row
            proxySelector        : '.b-resource-avatar',
            
            // The app will provide references to the Gantt and the Grid instances
            gantt                : null,
            grid                 : null
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

    // Drop callback after a mouse up, take action and assign the dragged resource(s) to the task (if the drop valid)
    onDrop({ context }) {
       // TODO
    }

    // Drop callback after a mouse up, take action and transfer the unplanned task to the real EventStore (if it's valid)
    onDropFinalized({ context }) {
        // TODO
    }
}
```

Above, the following configurations are used:
* [`targetSelector`](#Core/helper/DragHelper#config-targetSelector) This is a CSS selector defining what elements can be dragged
* [`cloneTarget`](#Core/helper/DragHelper#config-cloneTarget) We set this to `true` to clone the mouse-down element, and not move the actual grid row.
* [`autoSizeClonedTarget`](#Core/helper/DragHelper#config-autoSizeClonedTarget) We size the drag proxy manually using CSS
* [`unifiedProxy`](#Core/helper/DragHelper#config-unifiedProxy) When dragging multiple items, we collect all extra element drag proxies and place them below the main dragged element
* [`proxySelector`](#Core/helper/DragHelper#config-proxySelector) Instead of dragging the full row element, we only drag the avatar for a nice user experience.
* [`dropTargetSelector`](#Core/helper/DragHelper#config-dropTargetSelector) This is a CSS selector defining where drops are allowed,
  and we set this to `.b-gantt .b-grid-subgrid` which targets any of the Gantt's sub grids (the locked tree section or the timeline section)
* [`callOnFunctions`](#Core/helper/DragHelper#config-callOnFunctions) By setting this to `true`, we will receive onXXX (e.g. onDragStart / onDrop) callbacks which is an easier way of listening for events


## Processing drag start

A drag is deemed started when the pointer has moved more than the configured [dragThreshold](#Core/helper/DragHelper#config-dragThreshold)
(defaults to 5px). At this time the `dragStart` event is fired and if using `callOnFunctions`, the `onDragStart` callback
is called. 

In our demo, at this stage we use the [getRecordFromElement](#Grid/view/Grid#function-getRecordFromElement) 
method to look up the [resource record](#Gantt/model/ResourceModel). If multiple rows are selected, we assign those 
elements to the `relatedElements` of the `context` object provided. 

```javascript
onDragStart({ context }) {
    const
        { grid, gantt } = this,
        { grabbed }     = context;

    // Lookup the resource and save a reference to it so we can access it later
    context.resourceRecord = grid.getRecordFromElement(grabbed);
    // If user selected multiple rows, let the drag helper know about those too
    context.relatedElements = Array.from(grid.element.querySelectorAll(`.b-selected:not([data-id="${grabbed.dataset.id}"])`));

    // If mouse move close to the sides of the Gantt time axis sub grid, trigger scrolling 
    gantt.enableScrollingCloseToEdges(gantt.timeAxisSubGrid);
}
```

## Validating drag actions

In our demo, the main objective in the onDrag callback is to validate the drop. For a resource assignment to be valid,
the resource cannot be already assigned to the task. We use the `context` object provided to every event / callback, 
which has a `valid` boolean which we set to signal drop validity. If the drop position is invalid, a special `b-drag-invalid`
CSS class is added to the dragged element which you can use to style it to let the user know.

```javascript
onDrag({ context, event }) {
    const targetTask = context.taskRecord = this.gantt.resolveTaskRecord(event.target);

    context.valid = Boolean(targetTask && !targetTask.resources.includes(context.resourceRecord));
}
```

A few styles applied to the currently hovered task row and invalid styling of the drag proxy.
```scss
.b-dragging-resource .b-grid-row:hover {
    background : #dddddd33;
}

.b-resource-avatar {
    &.b-drag-invalid {
         background : #D50000;
    }
}
```

## Processing the drop

When a valid drop happens, we do not process the data transfer immediately. Instead we first animate the dragged element
close to its final position which is the resource column cell which has a DIV containing avatars of all assigned resources.

This is done by calling the `animateProxyTo` method on the `DragHelper`. We specify which 
`target` element to transition the dragged element to, and how it should `align` to it. This method returns a Promise that we
`await`, and it resolves when the transition is completed. At this point,
[`dropFinalized`](#Core/helper/DragHelper#event-dropFinalized) event is also fired.

If the drop position is not valid (i.e. resource already assigned), a small toast message is shown.

After the transition has completed, it is time to do the data transfer. As you can
see below, we iterate all selected resource records in the grid and assign the ones not already assigned to the task.

```javascript
async
onDrop({ context }) {
    const
        { gantt, grid }                = this,
        { taskRecord, resourceRecord } = context;
  
    if (context.valid) {
      // Valid drop, provide a point to animate the proxy to before finishing the operation
      const
          resourceAssignmentCell = gantt.getCell({
            column: gantt.columns.get('assignments'),
            record: taskRecord
          }),
          avatarContainer        = resourceAssignmentCell.querySelector('.b-resource-avatar-container');
  
      // Before we finalize the drop and update the task record, transition the element to the target point
      if (avatarContainer) {
          await this.animateProxyTo(avatarContainer, {
            align: 'l0-r0'
          });
      }
  
      grid.selectedRecords.forEach(resourceRecord => {
          if (!taskRecord.resources.includes(resourceRecord)) {
            taskRecord.assign(resourceRecord);
          }
      });
    }
    else if (taskRecord?.resources.includes(resourceRecord)) {
          Toast.show(`Task is already assigned to ${resourceRecord.name}`);
    }
  
    gantt.element.classList.remove('b-dragging-resource');
    gantt.disableScrollingCloseToEdges(gantt.timeAxisSubGrid);
}
```

## The final result

Here is a small video showing the a valid single drop, but also how the validation changes the border to red and aborts
the drop in case the resource is already assigned to the task.

<video controls width="100%">
<source src="Gantt/drag-resources-from-grid.mp4" type="video/mp4">
Sorry, your browser doesn't support embedded videos.
</video>

## Learn more...

Want to learn more about what can be done relating to drag drop with the Bryntum SDKs? Please see these resources:

* [View the `drag-resources-from-grid` demo](../examples/drag-resources-from-grid)
* [View the `drag-from-grid` demo](../examples/drag-from-grid)
* [Read the "Drag from grid" guide](#Gantt/guides/dragdrop/drag_tasks_from_grid.md)
* [DragHelper API docs](#Core/helper/DragHelper)


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>