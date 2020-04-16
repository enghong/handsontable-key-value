"use strict";

exports.__esModule = true;
exports.default = void 0;

var _handsontable = _interopRequireDefault(require("handsontable"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _Handsontable$dom = _handsontable.default.dom,
    getCaretPosition = _Handsontable$dom.getCaretPosition,
    getSelectionEndPosition = _Handsontable$dom.getSelectionEndPosition,
    setCaretPosition = _Handsontable$dom.setCaretPosition;

var KeyValueEditor =
/*#__PURE__*/
function (_Handsontable$editors) {
  _inherits(KeyValueEditor, _Handsontable$editors);

  function KeyValueEditor() {
    _classCallCheck(this, KeyValueEditor);

    return _possibleConstructorReturn(this, _getPrototypeOf(KeyValueEditor).apply(this, arguments));
  }

  _createClass(KeyValueEditor, [{
    key: "prepare",
    value: function prepare(row, col, prop, td, originalValue, cellProperties) {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        args[_key - 6] = arguments[_key];
      }

      (_get2 = _get(_getPrototypeOf(KeyValueEditor.prototype), "prepare", this)).call.apply(_get2, [this, row, col, prop, td, originalValue, cellProperties].concat(args));

      this.cellProperties.strict = true; // Force strict mode (key-value context)
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var selection = this.htEditor.getSelectedLast();

      if (selection) {
        return this.htEditor.getSourceDataAtRow(selection[0])[this.cellProperties.keyProperty];
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this = this;

      if (this.state === 'STATE_EDITING') {
        var colIndex = this.instance.toPhysicalColumn(this.col);
        var columnSettings = this.instance.getSettings().columns[colIndex];

        _common.getDisplayValue.call(this.cellProperties, columnSettings.source, columnSettings.keyProperty, columnSettings.valueProperty, value, function (displayValue) {
          _get(_getPrototypeOf(KeyValueEditor.prototype), "setValue", _this).apply(_this, [displayValue !== null ? displayValue : value]);
        });
      }
    }
  }, {
    key: "queryChoices",
    value: function queryChoices(query) {
      var _this2 = this;

      this.query = query;
      var source = this.cellProperties.source;

      if (typeof source === 'function') {
        source.call(this.cellProperties, query, function (choices) {
          _this2.rawChoices = choices;

          _this2.updateChoicesList(choices);
        });
      } else if (Array.isArray(source)) {
        this.rawChoices = source;
        this.updateChoicesList(source);
      } else {
        this.updateChoicesList([]);
      }
    }
  }, {
    key: "open",
    value: function open() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(_getPrototypeOf(KeyValueEditor.prototype), "open", this).call(this, args); // Autocomplete actually creates a HOT-in-HOT instance, in which we load objects as data.
      // Update this HOT-in-HOT instance settings so that only the display value column is shown.


      var choicesListHot = this.htEditor.getInstance();
      choicesListHot.updateSettings({
        columns: [{
          data: this.cellProperties.valueProperty
        }]
      });
    }
  }, {
    key: "updateChoicesList",
    value: function updateChoicesList(choicesList) {
      // Almost a copy-paste of the `updateChoicesList` of `AutocompleteEditor`.
      // We just changed some parts so that the relevance algorithm is applied on the display values.
      var pos = getCaretPosition(this.TEXTAREA);
      var endPos = getSelectionEndPosition(this.TEXTAREA);
      var sortByRelevanceSetting = this.cellProperties.sortByRelevance;
      var filterSetting = this.cellProperties.filter;
      var valuePropertySetting = this.cellProperties.valueProperty;
      var orderByRelevance = null;
      var highlightIndex = null;
      var choices = choicesList;

      if (sortByRelevanceSetting) {
        orderByRelevance = KeyValueEditor.sortByRelevance(this.stripValueIfNeeded(this.TEXTAREA.value), choicesList.map(function (choice) {
          return choice[valuePropertySetting];
        }), this.cellProperties.filteringCaseSensitive);
      }

      var orderByRelevanceLength = Array.isArray(orderByRelevance) ? orderByRelevance.length : 0;

      if (filterSetting === false) {
        if (orderByRelevanceLength) {
          // eslint-disable-next-line prefer-destructuring
          highlightIndex = orderByRelevance[0];
        }
      } else {
        var sorted = [];

        for (var i = 0, choicesCount = choices.length; i < choicesCount; i++) {
          if (sortByRelevanceSetting && orderByRelevanceLength <= i) {
            break;
          }

          if (orderByRelevanceLength) {
            sorted.push(choices[orderByRelevance[i]]);
          } else {
            sorted.push(choices[i]);
          }
        }

        highlightIndex = 0;
        choices = sorted;
      }

      this.strippedChoices = choices;
      this.htEditor.loadData(choices);
      this.updateDropdownHeight();
      this.flipDropdownIfNeeded();
      this.highlightBestMatchingChoice(highlightIndex);
      this.instance.listen(false);
      setCaretPosition(this.TEXTAREA, pos, pos === endPos ? void 0 : endPos);
    }
  }]);

  return KeyValueEditor;
}(_handsontable.default.editors.AutocompleteEditor);

var _default = KeyValueEditor;
exports.default = _default;