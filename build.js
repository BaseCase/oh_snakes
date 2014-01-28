#!/usr/local/bin/node

var stitch = require('stitch');
var minify = require('uglify-js').minify;
var fs = require('fs');


var args = process.argv.slice(2);
if (args.indexOf('dev') >= 0) {
  concat();
} else {
  concat(compress);
}


function concat(callback) {
  var package = stitch.createPackage({
    paths: [__dirname + '/src']
  });

  package.compile(function(err, source) {
    fs.writeFile('snaeks.js', source, function(err) {
      if (err) throw err;
      console.log('Compiled snaeks.js');
      if (callback) callback();
    });
  });
}

function compress(callback) {
  var minified = minify('snaeks.js');
  fs.writeFile('snaeks.js', minified.code, function(err) {
    if (err) throw err;
    console.log('Minified snaeks.js');
    if (callback) callback();
  });
}

