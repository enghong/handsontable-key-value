"use strict";

exports.__esModule = true;
exports.default = void 0;

var _common = require("../common");

/**
 * Key-value pair validator.
 *
 * @param {string} value The value to validate.
 * @param {Function} callback The callback to call with `true` if `value` is valid or `false` otherwise.
 */
function keyValueValidator(value, callback) {
  if (value === '') {
    callback(this.allowEmpty);
    return;
  }

  _common.getSourceItem.call(this, this.source, this.keyProperty, value, function (item) {
    return item ? callback(true) : callback(false);
  });
}

var _default = keyValueValidator;
exports.default = _default;