var pug = require('pug');

var src = `
.foo
  try
    p= obj.exists
  catch
    h2 Something busted!
`;

// To use, pass pug-plugin-try-catch into plugins.
var output = pug.compile(src, { plugins: [require('.')]});

console.log(output({ obj: { exists: 'hello world' } }));
// <div class="foo"><p>hello world</p></div>

console.log(output({ obj: null }));
// <div class="foo"><h2>Something busted!</h2></div>
