'use strict';

const codeGen = require('pug-code-gen');

function parseTryy() {
  let tryBlock;
  let catchBlock;
  const tok = this.expect('try');
  const node = {
    type: 'Code',
    val: ';',
    buffer: true,
    mustEscape: false,
    isInline: false,
    line: tok.line,
    filename: this.filename,
  };

  if (this.peek().type === 'indent') {
    tryBlock = this.block();
  }

  for (;;) {
    if (this.peek().type === 'newline') {
      this.expect('newline');
    } else if (this.peek().type === 'catch') {
      this.expect('catch');

      if (this.peek().type === 'indent') {
        catchBlock = this.block();
      }
      break;
    } else {
      break;
    }
  }

  if (!tryBlock) {
    return this.emptyBlock(tok.line);
  }
  catchBlock = catchBlock || this.emptyBlock(tok.line);

  node.val = `
    (function(){
      var ret;
      try{
        ret=(${codeGen(tryBlock)}(locals));
      }
      catch(e){
        ret=(${codeGen(catchBlock)}(locals));
      }
      return ret;
    }())
  `;

  return node;
}

module.exports = {
  expressionTokens: {
    try: function parseTry(parser) {
      return parseTryy.call(parser);
    },
  },
};
