'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var pug = require('pug');
var tryCatch = require('../');

describe('parse', function () {

});

describe('acceptance', function () {
  var files = fs.readdirSync(path.join(__dirname, 'acceptance'));
  files = files.filter(fname => fname.match(/\.pug$/));

  files.forEach(function (fname) {
    var absPath = path.join(__dirname, '/acceptance/', fname);
    var src = fs.readFileSync(absPath);
    var expected = fs.readFileSync(absPath + '.expected').toString().trim();
    var locals = {};
    try {
      fs.statSync(absPath + '.js');
      locals = require(absPath + '.js');
    }
    catch (e) {}

    it(fname, function () {
      var output = pug.compile(src, { plugins: [tryCatch] })(locals);
      assert.equal(output, expected);
    });
  });
});
