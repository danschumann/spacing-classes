// stylus('path').import(require('spacing-classes'));
// we only export the path to import
module.exports = function(styl) {
  styl.include(__dirname);
}

// expose compile method in case they don't want defaults
module.exports.compile = require('./compile')
