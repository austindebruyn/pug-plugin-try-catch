var assign = require('object-assign');

function parse() {
  var tryBlock, catchBlock;
  var tryTok, catchTok;

  tryTok = this.expect('try');

  if (this.peek().type === 'indent') {
    tryBlock = this.block();
  }

  for (;;) {
    if (this.peek().type === 'newline') {
      this.expect('newline');
    } else if (this.peek().type === 'catch') {
      catchTok = this.expect('catch');

      if (this.peek().type === 'indent') {
        catchBlock = this.block();
      }
      break;
    } else {
      break;
    }
  }

  if (catchTok == null) {
    this.error('INVALID_TOKEN', 'Unexpected token `' + this.peek().type + '` expected `catch`', this.peek());

    catchTok = tryTok;
  }

  if (tryBlock == null) {
    return this.emptyBlock(tryTok.line);
  }
  catchBlock = catchBlock || this.emptyBlock(tryTok.line);

  var codeBlockDefaults = {
    type: 'Code',
    buffer: false,
    mustEscape: false,
    isInline: false,
    line: tryTok.line,
    filename: this.filename
  };

  var nodes = [
    assign({}, codeBlockDefaults, { val: 'try { pug_html += function(pug_html){' }),
    tryBlock,
    assign({}, codeBlockDefaults, { val: "; return pug_html; }('') } catch (e) {", }),
    catchBlock,
    assign({}, codeBlockDefaults, { val: ';}' })
  ];

  if (catchTok) {
    nodes[2].line = nodes[4].line = catchTok.line;
  }

  return nodes;
}

module.exports = {
  expressionTokens: {
    try: function parseTry(parser) {
      return parse.call(parser);
    },
  },
};
