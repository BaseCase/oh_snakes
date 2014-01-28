#!/usr/local/bin/node

var stitch = require('stitch');
var minify = require('uglify-js').minify;
var fs = require('fs');


var tasks = {
  concat: function() {
    var package = stitch.createPackage({
      paths: [__dirname + '/src']
    });

    package.compile(function(err, source) {
      fs.writeFile('snaeks.js', source, function(err) {
        if (err) throw err;
        console.log('Compiled snaeks.js');
        runNextTask();
      });
    });
  },

  compress: function() {
    var minified = minify('snaeks.js');
    fs.writeFile('snaeks.js', minified.code, function(err) {
      if (err) throw err;
      console.log('Minified snaeks.js');
      runNextTask();
    });
  }
};


var commands = process.argv.slice(2);

// default task if none specified in args: concat then minify
if (!commands.length) {
  commands = ['concat', 'compress'];
}

function runNextTask() {
  var task = commands.shift();
  if (typeof(task) !== 'undefined') {
    tasks[task]();
  }
}

runNextTask();

