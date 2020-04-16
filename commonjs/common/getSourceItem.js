"use strict";

exports.__esModule = true;
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns the item corresponding to a key from a list of items.
 *
 * @param {Object[]} items List of source items.
 * @param {String} keyProperty Name of the key property on a source item.
 * @param {String} keyValue Key of the source item we want to retrieve the display value.
 *
 * @returns {String|null} The display value or `null` if not found.
 */
function _getSourceItem(items, keyProperty, keyValue) {
  var sourceItem = items.find(function (item) {
    var key = item[keyProperty];

    if (keyValue == null || keyValue == '') {
      return key === keyValue;
    }

    var castedKeyValue = keyValue; // HoT will sometimes cast the value to string,
    // so we have to cast it to original type for comparison

    if (_typeof(castedKeyValue) !== _typeof(key)) {
      if (typeof key === 'number') {
        castedKeyValue = Number(keyValue);
      } else if (typeof key === 'boolean') {
        castedKeyValue = keyValue === 'true';
      }
    }

    return key === castedKeyValue;
  });
  return sourceItem;
}
/**
 * Retrieves asynchronously the item corresponding to a key from the source items.
 *
 * @param {Object[]|Function} source List of source items or function returning source items asynchronously.
 * @param {String} keyProperty Name of the key property on a source item.
 * @param {String} keyValue Key of the source item we want to retrieve the display value.
 * @param {Function} callback Callback called when the item lookup is done.
 */


function getSourceItem(source, keyProperty, keyValue, callback) {
  if (typeof source === 'function') {
    source.call(this, null, function (items) {
      callback(_getSourceItem(items, keyProperty, keyValue));
    });
  } else if (Array.isArray(source)) {
    callback(_getSourceItem(source, keyProperty, keyValue));
  } else {
    callback(null);
  }
}

var _default = getSourceItem;
exports.default = _default;