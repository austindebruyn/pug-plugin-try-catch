# pug-plugin-try-catch

[![Dependency Status](https://img.shields.io/david/pugjs/pug.svg?style=flat)](https://david-dm.org/pugjs/pug)
[![Build Status](https://travis-ci.org/austindebruyn/breadcrumble.svg?branch=master)](https://travis-ci.org/austindebruyn/breadcrumble)
[![NPM version](https://img.shields.io/npm/v/pug-plugin-try-catch.svg?style=flat)](https://www.npmjs.com/package/pug-plugin-try-catch)

An extension to the pug templating language to allow for try/catch statements.

## Requirements

Use pug 2.x.

Use node v6.x.

## Installation

`$ npm install --save pug-plugin-try-catch`

## Usage

```javascript
var pug = require('pug');

var src = `
.foo
  try
    p= obj.exists
  catch
    h2 Something busted!
`;

// To use, pass pug-plugin-try-catch into plugins.
var output = pug.compile(src, { plugins: [require('pug-plugin-try-catch')]});

console.log(output({ obj: { exists: 'hello world' } }));
// <div class="foo"><p>hello world</p></div>

console.log(output({ obj: null }));
// <div class="foo"><h2>Something busted!</h2></div>

```

## License

MIT
