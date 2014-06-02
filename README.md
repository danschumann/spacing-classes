#spacing-classes

  Stylus mixin, inspired by Bootstrap, to add margin and padding css helper classes.

## What's it do?


Makes adding padding and margins a class based thing in cases where a custom class is overkill.

Basically: __It supplies a bunch of helper classes_

see the [default output](https://github.com/danschumann/spacing-classes/blob/master/spacing-classes.css)

 ```css
@media (min-width: 992px) {
  .pad-md-top-3 {
    padding-top: 3px;
  }
  
  .pad-md-left-3 {
    padding-left: 3px;
  }
  
  // ...

}
```


## Instalation

```bash
$ npm install spacing-classes
```

## Javascript API

spacing classes relies on stylus to work, though included are CSS files that you can pull directly.

```javascript
var connect = require('connect')
  , stylus = require('stylus')
  , spacingClasses = require('nib');
  
spacingClasses.compile({sizes: [2, 5, 10, 20]});

var server = connect();

function compile(str, path) {
  return stylus(str)
	.set('filename', path)
	.set('compress', true)
	.use(spacingClasses());
}

server.use(stylus.middleware({
	src: __dirname
  , compile: compile
}));
```

## Stylus API

  To print the classes in a css file:

  ```css
  @import 'spacing-classes'
  ```




## Customizing 

These are the default settings.

Pass one or more of these attributes to `spacingClasses.compile()`.

The following would be identical to not compiling at all ( as they are the defaults ), or compiling with no options.

```javascript
var settings    = {
directions: [ 'top', 'left', 'right', 'bottom', '' ],
sizes:      [ 3, 7, 15, 22, 30 ],
screens: {
  xs: null,
  sm: 768,
  md: 992,
  lg: 1200,
},
types: [
  {key: 'pad', cssType: 'padding'},
  {key: 'marg', cssType: 'margin'},
  {key: 'marg', cssType: 'margin', inverse: true},
],
};

spacingClasses = require('spacing-classes')
spacingClasses.compile(settings);

```

#### inverse: true (optional)

Note the `inverse: true` on the 3rd type.

add `-inv` to the end of a margin class to get __negative__ amounts

```css
marg-xs-top-3-inv {
  margin-top: -3px
}
```
