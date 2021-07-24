(self["webpackChunkownspace"] = self["webpackChunkownspace"] || []).push([["index"],{

/***/ "./src/components/own-space.js":
/*!*************************************!*\
  !*** ./src/components/own-space.js ***!
  \*************************************/
/***/ (() => {

"use strict";
 // react的渲染函数createElement

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var e = React.createElement; // react中类即组件，继承Component

var LikeButton = /*#__PURE__*/function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  var _super = _createSuper(LikeButton);

  // 使用props初始化组件
  function LikeButton(props) {
    var _this;

    _classCallCheck(this, LikeButton);

    _this = _super.call(this, props);
    _this.state = {
      liked: false
    };
    return _this;
  }

  _createClass(LikeButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.liked) {
        return 'You liked this.';
      }

      return e('button', {
        onClick: function onClick() {
          return _this2.setState({
            liked: true
          });
        }
      }, 'Like');
    }
  }]);

  return LikeButton;
}(React.Component);

var domContainer = document.querySelector('#react-container'); // 渲染在dom节点上

ReactDOM.render(e(LikeButton), domContainer);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_own_space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/own-space */ "./src/components/own-space.js");
/* harmony import */ var _components_own_space__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_own_space__WEBPACK_IMPORTED_MODULE_0__);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vd25zcGFjZS8uL3NyYy9jb21wb25lbnRzL293bi1zcGFjZS5qcyJdLCJuYW1lcyI6WyJlIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiTGlrZUJ1dHRvbiIsInByb3BzIiwic3RhdGUiLCJsaWtlZCIsIm9uQ2xpY2siLCJzZXRTdGF0ZSIsIkNvbXBvbmVudCIsImRvbUNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIlJlYWN0RE9NIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Q0FFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsQ0FBQyxHQUFHQyxLQUFLLENBQUNDLGFBQWhCLEMsQ0FFQTs7SUFDTUMsVTs7Ozs7QUFDRjtBQUNBLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2YsOEJBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDVEMsV0FBSyxFQUFFO0FBREUsS0FBYjtBQUZlO0FBS2xCOzs7O1dBRUQsa0JBQVM7QUFBQTs7QUFDTCxVQUFJLEtBQUtELEtBQUwsQ0FBV0MsS0FBZixFQUFzQjtBQUNsQixlQUFPLGlCQUFQO0FBQ0g7O0FBRUQsYUFBT04sQ0FBQyxDQUNKLFFBREksRUFDTTtBQUNOTyxlQUFPLEVBQUU7QUFBQSxpQkFBTSxNQUFJLENBQUNDLFFBQUwsQ0FBYztBQUN6QkYsaUJBQUssRUFBRTtBQURrQixXQUFkLENBQU47QUFBQTtBQURILE9BRE4sRUFNSixNQU5JLENBQVI7QUFRSDs7OztFQXRCb0JMLEtBQUssQ0FBQ1EsUzs7QUF5Qi9CLElBQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLGtCQUF2QixDQUFyQixDLENBQ0E7O0FBQ0FDLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQmQsQ0FBQyxDQUFDRyxVQUFELENBQWpCLEVBQStCTyxZQUEvQixFIiwiZmlsZSI6ImluZGV4LjMwMzM2MTI1MjMxNGNlOTNmNGNiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyByZWFjdOeahOa4suafk+WHveaVsGNyZWF0ZUVsZW1lbnRcbmNvbnN0IGUgPSBSZWFjdC5jcmVhdGVFbGVtZW50O1xuXG4vLyByZWFjdOS4reexu+WNs+e7hOS7tu+8jOe7p+aJv0NvbXBvbmVudFxuY2xhc3MgTGlrZUJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgLy8g5L2/55SocHJvcHPliJ3lp4vljJbnu4Tku7ZcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBsaWtlZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmxpa2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1lvdSBsaWtlZCB0aGlzLic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZShcbiAgICAgICAgICAgICdidXR0b24nLCB7XG4gICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGxpa2VkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnTGlrZSdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IGRvbUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWFjdC1jb250YWluZXInKTtcbi8vIOa4suafk+WcqGRvbeiKgueCueS4ilxuUmVhY3RET00ucmVuZGVyKGUoTGlrZUJ1dHRvbiksIGRvbUNvbnRhaW5lcik7Il0sInNvdXJjZVJvb3QiOiIifQ==