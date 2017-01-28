'use strict';

module.exports = {
  func: function () {
    throw new Error();
  },
  goodfunc: function () {
    return 'ok!';
  }
};
