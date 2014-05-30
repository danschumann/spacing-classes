var
  // We build stylus code and let stylus do the extra formatting for us
  join        = require('path').join,
  fs          = require('fs'),
  stylus      = require('stylus'),
  styl        = '',
  indent      = 0,
  _           = require('underscore'),
  directions  = [ 'top', 'left', 'right', 'down' ],
  sizes       = [ 3, 7, 15, 22, 30 ];

function make (type, cssType, inverse) {
  _.each({
    xs: null,
    sm: 768,
    md: 992,
    lg: 1200,
  }, function(minWidth, screenSize) {

    if (minWidth) {
      styl += '\n@media (min-width: ' + minWidth + 'px)';
    };

    _.each(sizes, function(pixels) {
      _.each(directions, function(dir) {
        styl += '\n  .' + type + '-' + screenSize + '-' + dir + '-' + pixels + (inverse ? '-inv' : '');
        styl += '\n    ' + cssType + '-' + dir + ': ' + (inverse ? '-' : '') + pixels + 'px';
      });

    });

  })
}

make('sp-in', 'padding')
make('sp-out', 'margin')
make('sp-out', 'margin', true)

stylus(styl).render(function(err, css) {
  console.log(err, css);

  fs.writeFile(join(__dirname, 'output.css'), css);
  
})
