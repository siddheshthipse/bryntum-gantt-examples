# Replacing the Task menu

Bryntum Gantt ships with built-in context menus for the locked grid column headers, the timeaxis header, tasks,
and for locked grid cells which represent tasks. Depending on your needs, you might either want to customize them
(see the "Customize context menus" guide) or replace them entirely.
This guide shows how to replace the Task menu with a custom implementation using Bootstrap, but the same is true for
the locked grid column headers menu and for the timeaxis header menu.
Also, the same general principles should apply whichever framework you are using.

The result of this guide can be seen in the `custom-taskmenu` demo.

## Step 1 - Create a custom context menu

How this is done will vary greatly depending on which UI framework etc. you are using. For the purpose of this guide, we
are using Bootstrap 4. With Bootstrap the context menu is defined in HTML on the page, using `dropdown-menu`
which we will display when needed. Here is an example of the menus used in the demo, added to `index.html`:

```html
<div id="customTaskMenu" class="dropdown-menu">
	<button class="dropdown-item" type="button" data-ref="move">1 day ahead</button>
	<button class="dropdown-item" type="button" data-ref="edit">Edit</button>
	<button class="dropdown-item" type="button" data-ref="remove">Remove</button>
</div>
```

## Step 2 - Show and hide the custom menu

The easiest way to show a custom menu is to leave the built-in `TaskMenu` feature enabled,
listen for when it is about to be shown, prevent that and show your own instead. Using this approach,
you will get all data related to the context menu.

```javascript
const gantt = new Gantt({
    listeners : {
        taskMenuBeforeShow() {
            // Show custom task menu here
            // ...

            // Prevent built-in task menu
            return false;
        }
    }
})
```

In case you are going to have more than one custom menu, you need to make sure there is no other context menu visible at the same time:

```javascript
taskMenuBeforeShow({ taskRecord, event }) {

    // Hide all visible context menus
    $('.dropdown-menu:visible').hide();

    // Set position, and show custom task menu
    $('#customTaskMenu').css({ top : event.y, left : event.x }).show();

    // Prevent built-in task menu
    return false;
}
```

To hide custom Bootstrap menus:

```javascript
// Hide all visible context menus by global click
$(document).on('click', () => {
    $('.dropdown-menu:visible').hide();
});
```

## Step 3 - Link data to the custom task menu

The listener used above to show the context menu is called with data retrieved from the target element among its arguments.
Depending on the menu it can have different arguments. You can always check out the documentation to see what data is available.
For example, in case of Task menu you can see `taskRecord` among its arguments.
You can pass the data you need to the custom context menu. How to implement it depends on the UI framework
you are using, for Bootstrap we have to set task record id to menu element `dataset`.

```javascript
taskMenuBeforeShow({ taskRecord, event }) {

    // Hide all visible context menus
    $('.dropdown-menu:visible').hide();

    // Set data, set position, and show custom task menu
    $('#customTaskMenu').data({
        taskId : taskRecord.id
    }).css({
        top  : event.y,
        left : event.x
    }).show();

    // Prevent built-in task menu
    return false;
}
```

<img src="Gantt/custom-task-menu.png" alt="Custom Task menu"/>

## Step 4 - Process menu item click

When the user clicks on a menu item, you need to catch this and process the action. Depending on requested functionality,
you might have different action implementations. But general workflow is next. You need to extract data from the custom
menu element `dataset`, recognize what menu item is clicked, and call some Gantt API to perform the action.

For our Bootstrap demo, it can look like this:

```javascript
$('#customTaskMenu button').on('click', function () {
    const
        taskId     = $(this).parent().data('taskId'),
        taskRecord = gantt.taskStore.getById(taskId),
        ref        = $(this).data('ref');

    switch (ref) {
        // "1 day ahead" menu item implementation
        case 'move':
            taskRecord.shift(1, 'day');
            break;

        // "Edit" menu item implementation
        case 'edit':
            gantt.editTask(taskRecord);
            break;

        // "Remove" menu item implementation
        case 'remove':
            gantt.taskStore.remove(taskId);
            break;
    }
});
```

And thats it, be sure to check the `custom-taskmenu` demo out!


<p class="last-modified">Last modified on 2024-05-21 9:04:33</p>