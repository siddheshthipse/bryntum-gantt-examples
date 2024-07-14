# Styling
The Bryntum Gantt is rendered in the DOM using regular HTML and CSS, and can be completely 
styled using CSS/SASS. It ships with both compiled CSS bundles, and the original SCSS files. 
The CSS includes different themes and event colors, which can be used to alter how the 
Gantt and its events look.

You can also programmatically modify the appearance of cells, headers and events using renderers.

## Styling the left grid / table tree section 

The left section of the Gantt is inherited from the [Bryntum Grid](https://bryntum.com/products/grid). Any styling
you want to perform on columns, cells or rows is described 
[here](https://bryntum.com/products/grid/docs/guide/Grid/customization/styling#using-renderers-and-css).

## Styling task bars

### Styling using predefined colors

Bryntum Gantt ships with 17 predefined task colors. Task color can be specified for the entire Gantt or per task. Task
settings overrides the Gantt setting. The following snippet shows how to assign colors:

```javascript
// Make all tasks orange by default
gantt.eventColor = 'orange';
// Make a single task violet:
task.eventColor = 'violet';
```

This demo has one task per available color:

<div class="external-example" data-file="Gantt/guides/customization/colors.js"></div>

Give the <a href="../examples/taskstyles" target="_blank">Task styles</a> demo a shot if you want to try different
colors.

<div class="note">
If you want to control the appearance of tasks using custom CSS we recommend setting <code>eventColor</code> to 
<code>null</code>. This applies very basic styling that is easier to override using CSS.
</div>

### Styling using task data fields

Tasks can be styled in a few different ways. The easiest way is by applying a CSS class using
the [cls](#Gantt/model/TaskModel#field-cls)
data field in the `TaskModel`. You can also apply inline styles through the data using
the [style](#Gantt/model/TaskModel#field-style)
field. See example data below setting background to **red** and adding a myClass CSS class to the task bar element:

```json
{
    "id"          : 13,
    "name"        : "Setup load balancer",
    "percentDone" : 50,
    "style"       : "background:red",
    "cls"         : "myClass",
    "startDate"   : "2022-01-14",
    "duration"    : 3,
    "endDate"     : "2019-01-17"
}
```

### Styling at runtime using the `taskRenderer`

You can also use the [taskRenderer](#Gantt/view/GanttBase#config-taskRenderer) method to apply styles at runtime. This 
method receives a `renderData` parameter which you can use to set:

- `cls` - A CSS class to add to the task bar element
- `wrapperCls` - A CSS class to add to the outer task wrapping element
- `iconCls` - A CSS class representing a task icon element
- `style` - An inline style string (or object) to add to the task bar element
- `indicators` - An array that can be populated with TimeSpan records or their config objects to have them rendered in the 
  task row (See the [indicators](../examples/indicators) demo for more information)

The function return value can be any markup to render inside the task bar.

```javascript
new Gantt({
    taskRenderer({ taskRecord, renderData }) {
        if (taskRecord.endDate < Date.now()) {
            // fade out tasks in the past
            renderData.style = "opacity:0.5";
        }

        // Skip showing names for parent task bars
        return taskRecord.isParent ? '' : taskRecord.name;
    }
});
```

### Styling task bars using predefined colors

Bryntum Gantt ships with a bunch of pre-defined colors. Color can be specified for the entire Gantt or per task. Task
settings overrides Gantt setting. The following snippet shows how to assign colors:

```javascript
// Make all tasks blue by default
gantt.eventColor = 'blue';
// Make a single task violet:
task.eventColor = 'violet';
```

**Note:** If you want to control the appearance of events using custom CSS we recommend setting `eventColor` to `null`.
This applies very basic styling that is easier to override using CSS.

## Rendering custom HTML content inside a task bar

You can fully control the markup of the task bar using the [taskRenderer](#Gantt/view/GanttBase#config-taskRenderer)
method. Below is a demo showing the initials of the assigned resources rendered inside the task bar.

<div class="external-example" data-file="Gantt/guides/customization/taskRenderer.js"></div>

If you instead want to output some data about each time axis tick (like hours worked on a task per day), you can look at
the [custom task bar example](../examples/custom-taskbar) for inspiration:

![Custom task bar](Gantt/custom-taskbar.png "Custom task bar")

## Rendering custom indicator icons inside a task row

You can render icons inside a task row to indicate things like deadline or other important task dates using the 
[indicators](#Gantt/feature/Indicators) feature. Try a live demo of it [here](../examples/indicators)

![Indicators](Gantt/indicators.png "Indicators")

## Styling dependency lines

The inter-task dependencies are rendered as SVG lines which you can easily customize using regular CSS. To change 
the appearance of all dependency lines globally, simply do: 

```css
/* Lines */
.b-sch-dependency {
  stroke       : #000; /* Black lines */
  stroke-width : 2;    /* Slightly thicker */
}

/* Arrow markers */
.b-sch-dependency-arrow {
  fill : #000; /* Black arrows too */
}
```

<div class="external-example" data-file="Gantt/guides/customization/stylingDependencies.js"></div>

To modify individual dependencies, you can use the [cls](#Gantt/model/DependencyModel#field-cls) data field to add a CSS
class to the SVG element representing the dependency:

```json
{
  "id"       : 1,
  "fromTask" : 11,
  "toTask"   : 15,
  "lag"      : 2,
  "cls"      : "important"
}
```

And here is the CSS to change the appearance:

```css
.b-sch-dependency.important {
  stroke       : #e44b4b;
  marker-start : url(#arrowEndCritical);
}

.b-sch-dependency-arrow#arrowEndCritical {
  fill : #e44b4b;
}
```

## Using a theme

The Gantt ships with five themes:
- Stockholm (`gantt.stockholm.css`)
- Classic (`gantt.classic.css`)
- Classic light (`gantt.classic-light.css`)
- Classic dark (`gantt.classic-dark.css`)
- Material (`gantt.material.css`)

Each theme is compiled into a self containing bundle under `build/`. 
Simply include it on page to use it:

```html
<link rel="stylesheet" href="build/gantt.stockholm.css" data-bryntum-theme>
<link rel="stylesheet" href="build/gantt.classic.css" data-bryntum-theme>
<link rel="stylesheet" href="build/gantt.classic-light.css" data-bryntum-theme>
<link rel="stylesheet" href="build/gantt.classic-dark.css" data-bryntum-theme>
<link rel="stylesheet" href="build/gantt.material.css" data-bryntum-theme>
```

You need to add just one of the above themes to implement styling.

<div class="note">

The <code>data-bryntum-theme</code> attribute on the link tag is not strictly required, 
but it allows you to 
programmatically switch the theme at runtime using <code>DomHelper.setTheme()</code>.

</div>

### Comparison of themes

![Classic theme](Gantt/themes/thumb.classic.png "Default theme")
![Classic-Light theme](Gantt/themes/thumb.classic-light.png "Light theme")
![Classic-Dark theme](Gantt/themes/thumb.classic-dark.png "Dark theme")
![Material theme](Gantt/themes/thumb.material.png "Material theme")
![Stockholm theme](Gantt/themes/thumb.stockholm.png "Stockholm theme")

In most of the included examples you can switch theme on the fly by clicking on the gear icon found in the header and
then picking a theme in the dropdown.

![Change theme](Gantt/changing-theme.png "Change theme")

### Combining products

The "normal" themes described above include all the CSS you need to use Gantt and its helper widgets such as Popups,
TextFields and so on. When combining multiple different Bryntum products on a single page using "normal" themes, the
shared styling will be included multiple times.

To avoid this, each theme is available in a version that only has the product specific styling. These are called `thin`
themes (e.g., `gantt.stockholm.thin.css`). When using them you will need to include one
for each used level in the Bryntum product hierarchy (Gantt -> `Core + Grid + Scheduler + Scheduler Pro + Gantt`).

For example to combine Gantt and Calendar using the Stockholm theme, you would include:

- `core.stockholm.thin.css`
- `grid.stockholm.thin.css`
- `scheduler.stockholm.thin.scss`
- `schedulerpro.stockholm.thin.scss`
- `gantt.stockholm.thin.scss`
- `calendar.stockholm.thin.scss`

Which in your html file might look something like this:

```html
<link rel="stylesheet" href="core.stockholm.thin.css" data-bryntum-theme>
<link rel="stylesheet" href="grid.stockholm.thin.css" data-bryntum-theme>
<link rel="stylesheet" href="scheduler.stockholm.thin.css" data-bryntum-theme>
<link rel="stylesheet" href="schedulerpro.stockholm.thin.css" data-bryntum-theme>
<link rel="stylesheet" href="gantt.stockholm.thin.css" data-bryntum-theme>
<link rel="stylesheet" href="calendar.stockholm.thin.css" data-bryntum-theme>
```

<div class="note">

Nothing prevents you from always using thin CSS bundles, but please note that there might be a slight network overhead 
from pulling in multiple CSS files as opposed to a single one with the normal themes.

</div>

## Creating a custom theme

<div class="note">

You can only create custom themes if you have purchased a license.

</div>

Following are two ways to setup a custom theme:

### Via resources folder

Once you download the latest release from our [CustomerZone](https://customerzone.bryntum.com/), 
to create your own theme, follow these steps:

* Copy the `resources` folder to your project.
* Make a copy of an existing theme found under `resources/sass/themes` (e.g. `stockholm.scss`).
* Edit the variables in it to suit your needs. You can reference all the 
  available variables in `resources/sass/variables.scss`, and  
  for color definitions, look into `resources/core-sass/variables.scss`.
* Compile it to CSS and bundle it using your favorite SASS compiler/bundler.
* Include your theme on page (and remove any default theme you where using).

### Via npm

If you have installed Bryntum components via npm, you can follow these steps:

* Make sure you have sass installed ([Sass installation guide](https://sass-lang.com/install/))
* Create a `.scss` file and  add `@import "@bryntum/gantt/source/resources/sass/themes/[theme].scss";` to it. 
Where `[theme]` can be any of the default Bryntum theme (e.g. `stockholm`).
* Before the `@import` line, add `$fa-font-path: "@bryntum/gantt/fonts";`. It will add reference to font-awesome.

That set up the Bryntum theme. You can now overwrite the styling by declaring 
variables before the import.

You can find all the variables at:
- `@bryntum/gantt/source/resources/sass/variables.scss`
- `@bryntum/gantt/source/resources/core-sass/variables.scss`

<div class="note">

Gantt also uses variables from <code>grid-sass</code>, <code>scheduler-sass</code> and <code>schedulerpro-sass</code>, found at <code>node_modules/@bryntum/gantt/source/resources/[grid/scheduler/schedulerpro]-sass/variables.scss</code>

</div>

Lastly, compile it to CSS using your preferred SASS compiler and import it in your `index.html`.

Please see the <a href="../examples/custom-theme/" target="_blank">Theme example</a> for a custom theme in action:

![Custom theme](Gantt/themes/thumb.custom.png "Custom theme")

## Using multiple themes

You can also add a combo box that lets you change the theme at run-time, similar to the examples we have.
To do so, ensure you have multiple themes in a folder (e.g. `/themes`).

<div class="note">

If you're using custom themes, ensure that you change their names in the file 
(<code>resources/core-sass/themes/vars/[theme-name].scss</code>) in order to 
make them work correctly (<code>content : '{"name":"Stockholm"}';</code>).

</div>

Next, you need to add a combo box using `tbar`.

```javascript
import { Gantt, DomHelper } from '@bryntum/gantt';
const gantt = new Gantt({
    // ...gantt data
    tbar : [
        {
            type  : 'combo',
            // list of themes shown in the drop down (combo box)
            items : [
                { text : 'Stockholm', value : 'stockholm' },
                { text : 'Classic', value : 'classic' },
                { text : 'Classic-Light', value : 'classic-light' },
                { text : 'Classic-Dark', value : 'classic-dark' },
                { text : 'Material', value : 'material' }
            ],
            label : 'Theme',
            // default theme
            value : 'material',
            // change theme on selection
            onAction(props) {
                DomHelper.setTheme(props.value);
            }
        }
    ]
});
```

With that being setup, you can switch themes within your application.

## Using renderers and CSS

For performance reasons, scheduled task elements are reused when scrolling, meaning that you should not manipulate them
directly. Instead the contents of cells, headers and tasks can be customized using renderers. Renderers are functions
with access to a cell/header/tasks data (such as style and CSS classes, and in some cases elements). They can
manipulate the data to alter appearances or return a value to have it displayed.

For more information, see the [theme](../examples/theme) demo or check API docs for:
* [Cell renderer](#Grid/column/Column#config-renderer)
* [Column header renderer](#Grid/column/Column#config-headerRenderer)
* [Task renderer](#Gantt/view/Gantt#config-taskRenderer)


<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>