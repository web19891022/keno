'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _canUseDom = require('can-use-dom');

var _canUseDom2 = _interopRequireDefault(_canUseDom);

var _FacebookProvider = require('./FacebookProvider');

var _FacebookProvider2 = _interopRequireDefault(_FacebookProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parser = (_temp = _class = function (_Component) {
  _inherits(Parser, _Component);

  function Parser() {
    _classCallCheck(this, Parser);

    return _possibleConstructorReturn(this, (Parser.__proto__ || Object.getPrototypeOf(Parser)).apply(this, arguments));
  }

  _createClass(Parser, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!_canUseDom2.default) {
        return;
      }

      this.context.facebook.whenReady(function (err, facebook) {
        if (err) {
          return;
        }

        facebook.parse(_this2.container, function () {});
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var className = this.props.className;


      return _react2.default.createElement(
        'div',
        { className: className, ref: function ref(c) {
            _this3.container = c;
          } },
        this.renderComponent()
      );
    }
  }]);

  return Parser;
}(_react.Component), _class.propTypes = {
  className: _react.PropTypes.string
}, _class.contextTypes = _extends({}, _FacebookProvider2.default.childContextTypes), _temp);
exports.default = Parser;