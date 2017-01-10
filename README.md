# pug-plugin-try-catch

An extension to the pug templating language to allow for try/catch statements.

## Requirements

Use pug 2.x.

Use node v6.x.

## Installation

`npm install pug-plugin-try-catch`

## Usage

```
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
