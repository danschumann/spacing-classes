var
  // We build stylus code and let stylus do the extra formatting for us
  join        = require('path').join,
  fs          = require('fs'),
  stylus      = require('stylus'),
  styl        = '',
  indent      = '',
  _           = require('underscore');

function make (type, cssType, inverse, settings, important) {
  _.each(settings.screens, function(minWidth, screenSize) {

    if (minWidth) {
      styl += '\n@media (min-width: ' + minWidth + 'px)';
      indent = '  ';
    } else {
      indent = '';
    };


    _.each(settings.sizes, function(pixels) {
      _.each(settings.directions, function(dir) {
        if (dir)
          dir = '-' + dir;
        styl += '\n' + indent + '.' + type + '-' + screenSize + dir + '-' + pixels + (inverse ? '-inv' : '');
        styl += '\n  ' + indent + cssType + dir + ': ' + (inverse ? '-' : '') +
          pixels + 'px' + (important && '!important' || '');

      });

    });

  })
}

console.log(styl);

module.exports = function(opts){

  var settings    = {
    important: false,
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

  if (opts)
    _.extend(settings, opts);

  // We create the string
  styl = '/*! https://github.com/danschumann/spacing-classes/ */';
  // each time gets appended
  _.each(settings.types, function(t){
    // type.important overrides settings.important if it is defined
    make(t.key, t.cssType, t.inverse, settings, t.important || (t.important !== false && settings.important))
  });

  fs.writeFileSync(join(__dirname, 'spacing-classes.styl'), styl);

  stylus.render(styl, function(err, css) {
    fs.writeFileSync(join(__dirname, 'spacing-classes.css'), css);
  });

  stylus.render(styl, {compress: true}, function(err, css) {
    fs.writeFileSync(join(__dirname, 'spacing-classes.min.css'), css);
  });

}
