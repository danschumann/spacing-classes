var
  // We build stylus code and let stylus do the extra formatting for us
  join        = require('path').join,
  fs          = require('fs'),
  stylus      = require('stylus'),
  styl        = '',
  indent      = '',
  _           = require('underscore'),
  directions  = [ 'top', 'left', 'right', 'bottom', '' ],
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
      indent = '  ';
    } else {
      indent = '';
    };


    _.each(sizes, function(pixels) {
      _.each(directions, function(dir) {
        if (dir)
          dir = '-' + dir;
        styl += '\n' + indent + '.' + type + '-' + screenSize + dir + '-' + pixels + (inverse ? '-inv' : '');
        styl += '\n  ' + indent + cssType + dir + ': ' + (inverse ? '-' : '') + pixels + 'px';
      });

    });

  })
}

make('sp-in', 'padding')
make('sp-out', 'margin')
make('sp-out', 'margin', true)

stylus.render(styl, function(err, css) {
  console.log(err, css);

  fs.writeFile(join(__dirname, 'output.css'), css);
  
})

stylus.render(styl, {compress: true}, function(err, css) {
  console.log(err, css);

  fs.writeFile(join(__dirname, 'output.min.css'), css);
  
})
