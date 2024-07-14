# Styling
The Bryntum Grid is rendered in the DOM using regular HTML and CSS, and can be completely 
styled using CSS/SASS. It ships with both compiled CSS bundles, and the original SCSS files. 
The CSS includes different themes and event colors, which can be used to alter how the 
Grid and its events look.

You can also programmatically modify the appearance of cells, headers and events using renderers.

## Using a theme

The Grid ships with five themes:
- Stockholm (`grid.stockholm.css`)
- Classic (`grid.classic.css`)
- Classic light (`grid.classic-light.css`)
- Classic dark (`grid.classic-dark.css`)
- Material (`grid.material.css`)

Each theme is compiled into a self containing bundle under `build/`. 
Simply include it on page to use it:

```html
<link rel="stylesheet" href="build/grid.stockholm.css" data-bryntum-theme>
<link rel="stylesheet" href="build/grid.classic.css" data-bryntum-theme>
<link rel="stylesheet" href="build/grid.classic-light.css" data-bryntum-theme>
<link rel="stylesheet" href="build/grid.classic-dark.css" data-bryntum-theme>
<link rel="stylesheet" href="build/grid.material.css" data-bryntum-theme>
```

You need to add just one of the above themes to implement styling.

<div class="note">

The <code>data-bryntum-theme</code> attribute on the link tag is not strictly required, 
but it allows you to 
programmatically switch the theme at runtime using <code>DomHelper.setTheme()</code>.

</div>

### Comparison of themes

![Classic theme](Grid/themes/thumb.classic.png "Default theme")
![Classic-Light theme](Grid/themes/thumb.classic-light.png "Light theme")
![Classic-Dark theme](Grid/themes/thumb.classic-dark.png "Dark theme")
![Material theme](Grid/themes/thumb.material.png "Material theme")
![Stockholm theme](Grid/themes/thumb.stockholm.png "Stockholm theme")

In most of the included examples you can switch theme on the fly by clicking on the gear icon found in the header and
then picking a theme in the dropdown.

![Change theme](Grid/changing-theme.png "Change theme")

### Combining products

The "normal" themes described above include all the CSS you need to use Grid and its helper widgets such as Popups,
TextFields and so on. When combining multiple different Bryntum products on a single page using "normal" themes, the
shared styling will be included multiple times.

To avoid this, each theme is available in a version that only has the product specific styling. These are called `thin`
themes (e.g., `grid.stockholm.thin.css`). When using them you will need to include one
for each used level in the Bryntum product hierarchy (Grid -> `Core + Grid`, Scheduler -> `Core + Grid + Scheduler`).

For example to combine Grid and Scheduler using the Stockholm theme, you would include:

- `core.stockholm.thin.css`
- `grid.stockholm.thin.css`
- `scheduler.stockholm.thin.scss`

Which in your html file might look something like this:

```html
<link rel="stylesheet" href="core.stockholm.thin.css" data-bryntum-theme>
<link rel="stylesheet" href="grid.stockholm.thin.css" data-bryntum-theme>
<link rel="stylesheet" href="scheduler.stockholm.thin.css" data-bryntum-theme>
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
* Create a `.scss` file and  add `@import "@bryntum/grid/source/resources/sass/themes/[theme].scss";` to it. 
Where `[theme]` can be any of the default Bryntum theme (e.g. `stockholm`).
* Before the `@import` line, add `$fa-font-path: "@bryntum/grid/fonts";`. It will add reference to font-awesome.

That set up the Bryntum theme. You can now overwrite the styling by declaring 
variables before the import.

You can find all the variables at:
- `@bryntum/grid/source/resources/sass/variables.scss`
- `@bryntum/grid/source/resources/core-sass/variables.scss`

Lastly, compile it to CSS using your preferred SASS compiler and import it in your `index.html`.

Please see <a href="../examples/theme/" target="_blank">Theme example</a> for a custom theme in action:

![Custom theme](Grid/themes/thumb.custom.png "Custom theme")

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
import { Grid, DomHelper } from '@bryntum/grid';
const grid = new Grid({
    // ...grid data
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

Contents of both cells and header can be customized using renderers. Renderers are functions with access to a cell/headers
data and elements. They can manipulate the element directly or return a value to have it displayed.

For more information, see the demo below or check API docs for Column.

<div class="external-example" data-file="Grid/guides/styling/renderers.js"></div>

```javascript
const grid = new Grid({
    columns : [
        {
            text     : 'Name',
            field    : 'firstName',
            flex     : 1,
            renderer : ({ value }) => `My name is ${value}!`
        },
        {
            text  : 'City', // Can be any column to style rows
            field : 'city',
            width : 100,
            renderer({ row, record, value }) {
                // Color only odd rows
                row.eachElement(el => el.style.background = row.index % 2 === 0 ? '#b2ffe9' : '#ffffff');

                return value;
            }
        },
        {
            type           : 'number',
            text           : 'Age',
            field          : 'age',
            width          : 80,
            cellCls        : 'age',
            align          : 'center',
            htmlEncode     : false,
            headerRenderer(column, header) {
                header.style.color = '#1E88E5';
                header.style.fontWeight = '700';
                return '- AGE -';
            },
            renderer       : ({ value }) => `<i class="b-fa ${value < 40 ? 'b-fa-child' : 'b-fa-male'}"></i>`
        },
        {
            text       : 'Color',
            field      : 'color',
            cls        : 'color',
            flex       : 1,
            htmlEncode : false,
            icon       : 'b-fa b-fa-brush',
            renderer({ value, cellElement }) {
                cellElement.innerHTML = '<div class="color-box"></div>' + value;
                cellElement.firstElementChild.style.cssText = `
                    margin-right: .5em;
                    width: 1em;
                    height: 1em;
                    border-radius: .2em;
                    background-color: ${value};
                `;
            }
        }
    ],
});
```


<p class="last-modified">Last modified on 2024-05-21 9:10:56</p>