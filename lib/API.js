"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

var _colors = _interopRequireDefault(require("./const/colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var API = // * VARIABLES *

/** @description This variable contains the token of the user */

/** @description 0 = none, 1 = normal, 2 = detailed, 3 = detailed + results */

/** @description Extra indent for logs */

/** @description This variable will containe the start time of any request */

/** @description This variable will containe the end time of any request */

/** @description The variable that will contain the AXIOS instance */

/** @description The URL to the CRM backend */

/** @description The timeout time to the API */
// * CONSTRUCTOR *
function API(api_url) {
  var _this = this;

  _classCallCheck(this, API);

  _defineProperty(this, "token", void 0);

  _defineProperty(this, "debug_level", 1);

  _defineProperty(this, "logs_indent", 0);

  _defineProperty(this, "start", void 0);

  _defineProperty(this, "end", void 0);

  _defineProperty(this, "instance", void 0);

  _defineProperty(this, "api_url", void 0);

  _defineProperty(this, "api_timeout", 1000);

  _defineProperty(this, "init", function () {
    if (_this.debug_level >= 2) _this.log.message(1, "Axios has been intitialized");
    return _axios["default"].create({
      baseURL: _this.api_url,
      timeout: _this.api_timeout
    });
  });

  _defineProperty(this, "handleResponse", function (response) {
    if (_this.debug_level >= 2) _this.log.message(1, "Response is being handled"); // Get the result data of the request

    var data = response.data; // If no success, redirect to the error function

    if (!data.success) return _this.handleError(response);
    if (_this.debug_level >= 2) _this.log.success(1);
    if (_this.debug_level == 3) _this.log.result(1, data.data); // Return the resulting data;

    return data.data;
  });

  _defineProperty(this, "handleError", function (response) {
    if (_this.debug_level >= 2) _this.log.message(1, "Response was of type error"); // Get the result data of the request

    var data = response.data; // Log the error

    _this.log.error(data.error.name, data.error.message); // Return the error


    return data.error;
  });

  _defineProperty(this, "log", {
    error: function error() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (_this.debug_level == 0) return;
      _this.end = new Date().getTime();

      for (var _len = arguments.length, m = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        m[_key - 1] = arguments[_key];
      }

      console.log(_this.log.createIndent(i), "".concat(_colors["default"].fgred, "[ERROR in ").concat(_this.end - _this.start, "ms]"), m.join(" "), _colors["default"].reset);
    },
    success: function success() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (_this.debug_level == 0) return;
      _this.end = new Date().getTime();

      for (var _len2 = arguments.length, m = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        m[_key2 - 1] = arguments[_key2];
      }

      console.log(_this.log.createIndent(i), "".concat(_colors["default"].fggreen, "[SUCCESS in ").concat(_this.end - _this.start, "ms]"), m.join(" "), _colors["default"].reset);
    },
    request: function request() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (_this.debug_level == 0) return;
      _this.start = new Date().getTime();

      for (var _len3 = arguments.length, m = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        m[_key3 - 1] = arguments[_key3];
      }

      console.log(_this.log.createIndent(i), "".concat(_colors["default"].fgblue, "[API REQUEST]"), m.join(" "), _colors["default"].reset);
    },
    result: function result() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (_this.debug_level == 0) return;

      for (var _len4 = arguments.length, m = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        m[_key4 - 1] = arguments[_key4];
      }

      console.log(_this.log.createIndent(i), "".concat(_colors["default"].fgyellow, "[RESULT]"), m.map(function (mm) {
        return JSON.stringify(mm);
      }).join(" "), _colors["default"].reset);
    },
    message: function message() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (_this.debug_level == 0) return;

      for (var _len5 = arguments.length, m = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        m[_key5 - 1] = arguments[_key5];
      }

      console.log(_this.log.createIndent(i), "".concat(_colors["default"].fgcyan, "[MESSAGE]"), m.join(" "), _colors["default"].reset);
    },
    createIndent: function createIndent(n) {
      var indent = "";

      for (var i = 0; i < n + _this.logs_indent; i++) {
        indent += "    ";
      }

      return indent;
    }
  });

  _defineProperty(this, "authHeader", function () {
    if (_this.debug_level >= 2) _this.log.message(1, "Generate auth header");
    return {
      headers: {
        Authorization: "Bearer ".concat(_this.token)
      }
    };
  });

  _defineProperty(this, "login",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(username, password) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.log.request(0, "Login", username);

              return _context.abrupt("return", _this.instance.post("/auth/login", {
                username: username,
                password: password
              }).then(_this.handleResponse).then(function (token) {
                if (_this.debug_level == 3) _this.log.result(1, "Token length", token.length);
                _this.token = token;
                return token;
              })["catch"](_this.handleError));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "find",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(entity) {
      var where,
          position,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              where = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              position = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {
                take: 50,
                skip: 0
              };

              _this.log.request(0, "Find", entity, position.skip || 0, position.take || 50);

              return _context2.abrupt("return", _this.instance.get("/data/".concat(entity, "?where=").concat(JSON.stringify(where), "&skip=").concat(position.skip, "&take=").concat(position.take), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOne",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(entity, where) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.log.request(0, "Find one", entity);

              return _context3.abrupt("return", _this.instance.get("/data/".concat(entity, "/one?where=").concat(JSON.stringify(where)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findById",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(entity, id) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this.log.request(0, "Find by id", entity, id);

              return _context4.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "save",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(entity, data) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this.log.request(0, "Save", entity);

              return _context5.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "remove",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(entity, id) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this.log.request(0, "Remove", entity, id);

              return _context6.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "config",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var entity,
          URL,
          _args7 = arguments;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              entity = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : null;
              URL = !entity ? "/config" : "/config/".concat(entity);

              _this.log.request(0, "Config", entity || "global");

              return _context7.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function () {
      return _ref7.apply(this, arguments);
    };
  }());

  if (!api_url) throw new Error("No API url has been set");
  this.api_url = api_url;
  this.instance = this.init();
} // * PRIVATE METHODS *

/**
 * @description Init the Axios instance with the URL and headers
 * @returns An axios instance
 */
;

var _default = API;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImRlYnVnX2xldmVsIiwibG9nIiwibWVzc2FnZSIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJhcGlfdGltZW91dCIsInJlc3BvbnNlIiwiZGF0YSIsInN1Y2Nlc3MiLCJoYW5kbGVFcnJvciIsInJlc3VsdCIsImVycm9yIiwibmFtZSIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjb25zb2xlIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZ2N5YW4iLCJuIiwiaW5kZW50IiwibG9nc19pbmRlbnQiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwicG9zdCIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImVudGl0eSIsIndoZXJlIiwicG9zaXRpb24iLCJ0YWtlIiwic2tpcCIsImdldCIsImF1dGhIZWFkZXIiLCJpZCIsIlVSTCIsIkVycm9yIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFHTUEsRyxHQUNGOztBQUNBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBO0FBR0E7QUFDQSxhQUFZQyxPQUFaLEVBQTZCO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsdUNBckJBLENBcUJBOztBQUFBLHVDQWxCQSxDQWtCQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSx1Q0FIQyxJQUdEOztBQUFBLGdDQVdkLFlBQU07QUFDakIsUUFBSSxLQUFJLENBQUNDLFdBQUwsSUFBb0IsQ0FBeEIsRUFB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YjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU9zQyxjQUFBQSxNQUFQLDhEQUErQixJQUEvQjtBQUNOUSxjQUFBQSxHQURNLEdBQ0EsQ0FBQ1IsTUFBRCxHQUFVLFNBQVYscUJBQWlDQSxNQUFqQyxDQURBOztBQUdaLGNBQUEsS0FBSSxDQUFDaEQsR0FBTCxDQUFTMkIsT0FBVCxDQUFpQixDQUFqQixFQUFvQixRQUFwQixFQUE4QnFCLE1BQU0sSUFBSSxRQUF4Qzs7QUFIWSxnREFJTCxLQUFJLENBQUNMLFFBQUwsQ0FDRlUsR0FERSxDQUNFRyxHQURGLEVBQ08sS0FBSSxDQUFDRixVQUFMLEVBRFAsRUFFRlQsSUFGRSxDQUVHLEtBQUksQ0FBQ0MsY0FGUixXQUdJLEtBQUksQ0FBQ3BDLFdBSFQsQ0FKSzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXZOYTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDekIsTUFBSSxDQUFDWixPQUFMLEVBQWMsTUFBTSxJQUFJMkQsS0FBSixDQUFVLHlCQUFWLENBQU47QUFDZCxPQUFLM0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsT0FBSzZDLFFBQUwsR0FBZ0IsS0FBS2UsSUFBTCxFQUFoQjtBQUNILEMsQ0FFRDs7QUFDQTs7Ozs7O2VBMk5XN0QsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXNwb25zZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4vY29uc3QvY29sb3JzXCI7XHJcbmltcG9ydCB7IEFwaVBvc2l0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9BcGlQb3NpdGlvblwiO1xyXG5cclxuY2xhc3MgQVBJIHtcclxuICAgIC8vICogVkFSSUFCTEVTICpcclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSBjb250YWlucyB0aGUgdG9rZW4gb2YgdGhlIHVzZXIgKi9cclxuICAgIHB1YmxpYyB0b2tlbiE6IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIDAgPSBub25lLCAxID0gbm9ybWFsLCAyID0gZGV0YWlsZWQsIDMgPSBkZXRhaWxlZCArIHJlc3VsdHMgKi9cclxuICAgIHB1YmxpYyBkZWJ1Z19sZXZlbDogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIEV4dHJhIGluZGVudCBmb3IgbG9ncyAqL1xyXG4gICAgcHVibGljIGxvZ3NfaW5kZW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBzdGFydCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIHN0YXJ0ITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBlbmQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBlbmQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdmFyaWFibGUgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIEFYSU9TIGluc3RhbmNlICovXHJcbiAgICBwcml2YXRlIGluc3RhbmNlOiBBeGlvc0luc3RhbmNlO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIFVSTCB0byB0aGUgQ1JNIGJhY2tlbmQgKi9cclxuICAgIHByaXZhdGUgYXBpX3VybD86IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB0aW1lb3V0IHRpbWUgdG8gdGhlIEFQSSAqL1xyXG4gICAgcHJpdmF0ZSBhcGlfdGltZW91dDogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgICAvLyAqIENPTlNUUlVDVE9SICpcclxuICAgIGNvbnN0cnVjdG9yKGFwaV91cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghYXBpX3VybCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gQVBJIHVybCBoYXMgYmVlbiBzZXRcIik7XHJcbiAgICAgICAgdGhpcy5hcGlfdXJsID0gYXBpX3VybDtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gKiBQUklWQVRFIE1FVEhPRFMgKlxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgQXhpb3MgaW5zdGFuY2Ugd2l0aCB0aGUgVVJMIGFuZCBoZWFkZXJzXHJcbiAgICAgKiBAcmV0dXJucyBBbiBheGlvcyBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIkF4aW9zIGhhcyBiZWVuIGludGl0aWFsaXplZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGJhc2VVUkw6IHRoaXMuYXBpX3VybCxcclxuICAgICAgICAgICAgdGltZW91dDogdGhpcy5hcGlfdGltZW91dFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlID0gKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiUmVzcG9uc2UgaXMgYmVpbmcgaGFuZGxlZFwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBJZiBubyBzdWNjZXNzLCByZWRpcmVjdCB0byB0aGUgZXJyb3IgZnVuY3Rpb25cclxuICAgICAgICBpZiAoIWRhdGEuc3VjY2VzcykgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5zdWNjZXNzKDEpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDMpIHRoaXMubG9nLnJlc3VsdCgxLCBkYXRhLmRhdGEpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBkYXRhO1xyXG4gICAgICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSB3YXMgb2YgdHlwZSBlcnJvclwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBMb2cgdGhlIGVycm9yXHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoZGF0YS5lcnJvci5uYW1lLCBkYXRhLmVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVycm9yXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyb3I7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEN1c3RvbSBsb2dnaW5nIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nID0ge1xyXG4gICAgICAgIGVycm9yOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3JlZH1bRVJST1IgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdWNjZXNzOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnZ3JlZW59W1NVQ0NFU1MgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXF1ZXN0OiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdibHVlfVtBUEkgUkVRVUVTVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3VsdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3llbGxvd31bUkVTVUxUXWAsXHJcbiAgICAgICAgICAgICAgICBtLm1hcChtbSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVJbmRlbnQ6IChuOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiArIHRoaXMubG9nc19pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGF1dGhIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIkdlbmVyYXRlIGF1dGggaGVhZGVyXCIpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vICogUFVCTElDIE1FVEhPRFMgKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYSBnaXZlbiB1c2VyIGluXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXV0aGVudGlmaWNhdGlvbiB0b2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMb2dpblwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9sb2dpblwiLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAudGhlbih0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgXCJUb2tlbiBsZW5ndGhcIiwgdG9rZW4ubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIHdoZXJlOiBvYmplY3QgPSB7fSxcclxuICAgICAgICBwb3NpdGlvbjogQXBpUG9zaXRpb24gPSB7IHRha2U6IDUwLCBza2lwOiAwIH1cclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kXCIsIGVudGl0eSwgcG9zaXRpb24uc2tpcCB8fCAwLCBwb3NpdGlvbi50YWtlIHx8IDUwKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fT93aGVyZT0ke0pTT04uc3RyaW5naWZ5KHdoZXJlKX0mc2tpcD0ke3Bvc2l0aW9uLnNraXB9JnRha2U9JHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi50YWtlXHJcbiAgICAgICAgICAgICAgICB9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRPbmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIHdoZXJlOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBvbmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vb25lP3doZXJlPSR7SlNPTi5zdHJpbmdpZnkod2hlcmUpfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZEJ5SWQgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBieSBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vJHtpZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGFuIGVsZW1lbnQgdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiUmVtb3ZlXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25maWcgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcgfCBudWxsID0gbnVsbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFVSTCA9ICFlbnRpdHkgPyBcIi9jb25maWdcIiA6IGAvY29uZmlnLyR7ZW50aXR5fWA7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJDb25maWdcIiwgZW50aXR5IHx8IFwiZ2xvYmFsXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoVVJMLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJO1xyXG4iXX0=