'use strict';

function parse() {
  let tryBlock;
  let catchBlock;
  let catchTok;

  const tryTok = this.expect('try');

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
    this.error('INVALID_TOKEN', `Unexpected token \`${this.peek().type}\` expected \`catch\``, this.peek());

    catchTok = tryTok;
  }

  if (tryBlock == null) {
    return this.emptyBlock(tryTok.line);
  }
  catchBlock = catchBlock || this.emptyBlock(tryTok.line);

  const codeBlockDefaults = {
    type: 'Code',
    buffer: false,
    mustEscape: false,
    isInline: false,
    line: tryTok.line,
    filename: this.filename,
  };

  const nodes = [
    Object.assign({}, codeBlockDefaults, { val: '(function () { var real_pug_html = pug_html; pug_html = ""; try {' }),
    tryBlock,
    Object.assign({}, codeBlockDefaults, { val: '; real_pug_html += pug_html; } catch (e) { pug_html = ""; ' }),
    catchBlock,
    Object.assign({}, codeBlockDefaults, { val: '; real_pug_html += pug_html; }; pug_html = real_pug_html; }).call(this)' }),
  ];

  if (catchTok) {
    nodes[2].line = catchTok.line;
    nodes[4].line = catchTok.line;
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
