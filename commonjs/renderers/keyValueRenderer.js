"use strict";

exports.__esModule = true;
exports.default = void 0;

var _handsontable = _interopRequireDefault(require("handsontable"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Key-value pair renderer.
 *
 * @param {Object} instance Currently processed Handsontable instance.
 * @param {HTMLElement} td Currently rendered cell TD element.
 * @param {Number} row Row index.
 * @param {Number} col Column index.
 * @param {String|Number} prop Column index or property name.
 * @param {String} value Cell contents.
 * @param {Object} cellProperties Currently processed cell properties object, containing the cell's metadata.
 */
function keyValueRenderer(instance, td, row, col, prop, value, cellProperties) {
  var _this = this;

  var colIndex = instance.toPhysicalColumn(col);
  var columnSettings = instance.getSettings().columns[colIndex];

  _common.getDisplayValue.call(cellProperties, columnSettings.source, columnSettings.keyProperty, columnSettings.valueProperty, value, function (displayValue) {
    _handsontable.default.renderers.getRenderer('dropdown').apply(_this, [instance, td, row, col, prop, displayValue !== null ? displayValue : value, cellProperties]);
  });
}

var _default = keyValueRenderer;
exports.default = _default;