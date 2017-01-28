'use strict';

var assert = require('assert');
var lexPlugin = require('../lib/lex');
var parsePlugin = require('../lib/parse');
var parse = require('pug-parser');
var lex = require('pug-lexer');

describe('parse', function () {
  it('throws error on missing catch', function () {
    var src = 'try\n  h1 value\nhello';
    var tokens = lex(src, { plugins: [lexPlugin] });

    assert.throws(() => parse(tokens, { plugins: [parsePlugin] }), 'Unexpected token `text` expected `catch`');
  });
});
