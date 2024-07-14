# Loading using `<script>`

## Include script and CSS

To include Bryntum Gantt on your page using a plain old script tag, just include a tag like the following before
including any script that uses the gantt:

```html
<script type="text/javascript" src="path-to-gantt/gantt.umd.js"></script>
```

Also include the CSS for the theme you want to use:

```html
<link rel="stylesheet" type="text/css" href="path-to-gantt/gantt.[theme].css" data-bryntum-theme>
```

## Use it in your code

From your scripts you can access our classes in the global bryntum namespace:

```javascript
var gantt = new bryntum.gantt.Gantt();
```

For a complete example, check out the <a href="../examples/scripttag/" target="_blank">scripttag example</a>.



<p class="last-modified">Last modified on 2024-05-21 9:52:23</p>