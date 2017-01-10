'use strict';

function scanTryCatch() {
  const tok = this.scanEndOfLine(/^(try|catch)/, 'try');

  if (tok) {
    tok.type = tok.val;
    this.tokens.push(tok);
  }
}

module.exports = {
  advance: function advance(lex) {
    scanTryCatch.call(lex);
  },
};
