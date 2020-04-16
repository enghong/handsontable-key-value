"use strict";

exports.__esModule = true;
exports.default = void 0;

var _editors = require("./editors");

var _renderers = require("./renderers");

var _validators = require("./validators");

var registerKeyValueType = function registerKeyValueType(Handsontable) {
  Handsontable.editors.registerEditor('key-value', _editors.KeyValueEditor);
  Handsontable.renderers.registerRenderer('key-value', _renderers.keyValueRenderer);
  Handsontable.validators.registerValidator('key-value', _validators.keyValueValidator);
  Handsontable.cellTypes.registerCellType('key-value', {
    editor: _editors.KeyValueEditor,
    renderer: _renderers.keyValueRenderer,
    validator: _validators.keyValueValidator,
    allowInvalid: false
  });
};

var _default = registerKeyValueType;
exports.default = _default;