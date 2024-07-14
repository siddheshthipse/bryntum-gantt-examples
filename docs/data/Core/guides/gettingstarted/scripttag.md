# Loading using `<script>`

## Include script and CSS

To include Bryntum Core on your page using a plain old script tag, just include a tag like the following before
including any script that uses the core:

```html
<script type="text/javascript" src="path-to-core/core.umd.js"></script>
```

Also include the CSS for the theme you want to use:

```html
<link rel="stylesheet" type="text/css" href="path-to-core/core.[theme].css" data-bryntum-theme>
```

## Use it in your code

From your scripts you can access our classes in the global bryntum namespace:

```javascript
var core = new bryntum.core.Core();
```



<p class="last-modified">Last modified on 2024-05-21 9:10:47</p>