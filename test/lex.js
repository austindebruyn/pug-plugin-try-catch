'use strict';

var assert = require('assert');
var fs = require('fs');
var lexPlugin = require('../lib/lex');
var lex = require('pug-lexer');
var tryCatch = require('../');

describe('lex', function () {
  it('tokenizes try', function () {
    var src = 'try\n  h1= missingLocal';
    var tokens = lex(src, { plugins: [lexPlugin] });

    assert.deepEqual(tokens[0], { type: 'try', line: 1, col: 1, val: 'try' });
  });

  it('tokenizes catch', function () {
    var src = 'try\ncatch';
    var tokens = lex(src, { plugins: [lexPlugin] });

    assert.deepEqual(tokens[2], { type: 'catch', line: 2, col: 1, val: 'catch' });
  });

  it('captures token positions', function () {
    var src = '.foo\n  try\n    h1= missingLocal';
    var tokens = lex(src, { plugins: [lexPlugin] });

    assert.deepEqual(tokens[2], { type: 'try', line: 2, col: 3, val: 'try' });
  });
});
