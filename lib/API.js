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

  _defineProperty(this, "start", void 0);

  _defineProperty(this, "end", void 0);

  _defineProperty(this, "instance", void 0);

  _defineProperty(this, "api_url", void 0);

  _defineProperty(this, "api_timeout", 1000);

  _defineProperty(this, "init", function () {
    if (_this.debug_level >= 2) _this.log.message("Axios has been intitialized");
    return _axios["default"].create({
      baseURL: _this.api_url,
      timeout: _this.api_timeout
    });
  });

  _defineProperty(this, "handleResponse", function (response) {
    if (_this.debug_level >= 2) _this.log.message("Response is being handled"); // Get the result data of the request

    var data = response.data; // If no success, redirect to the error function

    if (!data.success) return _this.handleError(response);
    if (_this.debug_level >= 2) _this.log.success();
    if (_this.debug_level == 3) _this.log.result(data.data); // Return the resulting data;

    return data.data;
  });

  _defineProperty(this, "handleError", function (response) {
    if (_this.debug_level >= 2) _this.log.message("Response was of type error"); // Get the result data of the request

    var data = response.data; // Log the error

    _this.log.error(data.error.name, data.error.message); // Return the error


    return data.error;
  });

  _defineProperty(this, "log", {
    error: function error() {
      if (_this.debug_level == 0) return;
      _this.end = new Date().getTime();

      for (var _len = arguments.length, m = new Array(_len), _key = 0; _key < _len; _key++) {
        m[_key] = arguments[_key];
      }

      console.error("    ".concat(_colors["default"].fgred, "[ERROR in ").concat(_this.end - _this.start, "ms]"), m.join(" "), _colors["default"].reset);
    },
    success: function success() {
      if (_this.debug_level == 0) return;
      _this.end = new Date().getTime();

      for (var _len2 = arguments.length, m = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        m[_key2] = arguments[_key2];
      }

      console.error("    ".concat(_colors["default"].fggreen, "[SUCCESS in ").concat(_this.end - _this.start, "ms]"), m.join(" "), _colors["default"].reset);
    },
    request: function request() {
      if (_this.debug_level == 0) return;
      _this.start = new Date().getTime();

      for (var _len3 = arguments.length, m = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        m[_key3] = arguments[_key3];
      }

      console.error("".concat(_colors["default"].fgblue, "[API REQUEST]"), m.join(" "), _colors["default"].reset);
    },
    result: function result() {
      if (_this.debug_level == 0) return;

      for (var _len4 = arguments.length, m = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        m[_key4] = arguments[_key4];
      }

      console.error("    ".concat(_colors["default"].fgyellow, "[RESULT]"), m.map(function (mm) {
        return JSON.stringify(mm);
      }).join(" "), _colors["default"].reset);
    },
    message: function message() {
      if (_this.debug_level == 0) return;

      for (var _len5 = arguments.length, m = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        m[_key5] = arguments[_key5];
      }

      console.error("    ".concat(_colors["default"].fgcyan, "[MESSAGE]"), m.join(" "), _colors["default"].reset);
    }
  });

  _defineProperty(this, "authHeader", function () {
    if (_this.debug_level >= 2) _this.log.message("Generate auth header");
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
              _this.log.request("Login", username);

              return _context.abrupt("return", _this.instance.post("/auth/login", {
                username: username,
                password: password
              }).then(_this.handleResponse).then(function (token) {
                if (_this.debug_level == 3) _this.log.result("Token length", token.length);
                _this.token = token;
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

              _this.log.request("Find", entity, position.skip || 0, position.take || 50);

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
              _this.log.request("Find one", entity);

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
              _this.log.request("Find by id", entity, id);

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
              _this.log.request("Save", entity);

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
              _this.log.request("Remove", entity, id);

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

              _this.log.request("Config", entity || "global");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImRlYnVnX2xldmVsIiwibG9nIiwibWVzc2FnZSIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJhcGlfdGltZW91dCIsInJlc3BvbnNlIiwiZGF0YSIsInN1Y2Nlc3MiLCJoYW5kbGVFcnJvciIsInJlc3VsdCIsImVycm9yIiwibmFtZSIsImVuZCIsIkRhdGUiLCJnZXRUaW1lIiwibSIsImNvbnNvbGUiLCJjb2xvcnMiLCJmZ3JlZCIsInN0YXJ0Iiwiam9pbiIsInJlc2V0IiwiZmdncmVlbiIsInJlcXVlc3QiLCJmZ2JsdWUiLCJmZ3llbGxvdyIsIm1hcCIsIm1tIiwiSlNPTiIsInN0cmluZ2lmeSIsImZnY3lhbiIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwidG9rZW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiaW5zdGFuY2UiLCJwb3N0IiwidGhlbiIsImhhbmRsZVJlc3BvbnNlIiwibGVuZ3RoIiwiZW50aXR5Iiwid2hlcmUiLCJwb3NpdGlvbiIsInRha2UiLCJza2lwIiwiZ2V0IiwiYXV0aEhlYWRlciIsImlkIiwiVVJMIiwiRXJyb3IiLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdNQSxHLEdBQ0Y7O0FBQ0E7O0FBR0E7O0FBR0E7O0FBR0E7O0FBR0E7O0FBR0E7O0FBR0E7QUFHQTtBQUNBLGFBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSx1Q0FsQkEsQ0FrQkE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsdUNBSEMsSUFHRDs7QUFBQSxnQ0FXZCxZQUFNO0FBQ2pCLFFBQUksS0FBSSxDQUFDQyxXQUFMLElBQW9CLENBQXhCLEVBQTJCLEtBQUksQ0FBQ0MsR0FBTCxDQUFTQyxPQUFULENBQWlCLDZCQUFqQjtBQUUzQixXQUFPQyxrQkFBTUMsTUFBTixDQUFh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QUFBO0FBQUEsNEJBaU1iO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBT2lDLGNBQUFBLE1BQVAsOERBQStCLElBQS9CO0FBQ05RLGNBQUFBLEdBRE0sR0FDQSxDQUFDUixNQUFELEdBQVUsU0FBVixxQkFBaUNBLE1BQWpDLENBREE7O0FBR1osY0FBQSxLQUFJLENBQUMzQyxHQUFMLENBQVN5QixPQUFULENBQWlCLFFBQWpCLEVBQTJCa0IsTUFBTSxJQUFJLFFBQXJDOztBQUhZLGdEQUlMLEtBQUksQ0FBQ0wsUUFBTCxDQUNGVSxHQURFLENBQ0VHLEdBREYsRUFDTyxLQUFJLENBQUNGLFVBQUwsRUFEUCxFQUVGVCxJQUZFLENBRUcsS0FBSSxDQUFDQyxjQUZSLFdBR0ksS0FBSSxDQUFDL0IsV0FIVCxDQUpLOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBak1hOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUN6QixNQUFJLENBQUNaLE9BQUwsRUFBYyxNQUFNLElBQUlzRCxLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUNkLE9BQUt0RCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLd0MsUUFBTCxHQUFnQixLQUFLZSxJQUFMLEVBQWhCO0FBQ0gsQyxDQUVEOztBQUNBOzs7Ozs7ZUFxTVd4RCxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcbmltcG9ydCBheGlvcywgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1Jlc3BvbnNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi9jb25zdC9jb2xvcnNcIjtcclxuaW1wb3J0IHsgQXBpUG9zaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL0FwaVBvc2l0aW9uXCI7XHJcblxyXG5jbGFzcyBBUEkge1xyXG4gICAgLy8gKiBWQVJJQUJMRVMgKlxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIGNvbnRhaW5zIHRoZSB0b2tlbiBvZiB0aGUgdXNlciAqL1xyXG4gICAgcHVibGljIHRva2VuITogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gMCA9IG5vbmUsIDEgPSBub3JtYWwsIDIgPSBkZXRhaWxlZCwgMyA9IGRldGFpbGVkICsgcmVzdWx0cyAqL1xyXG4gICAgcHVibGljIGRlYnVnX2xldmVsOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBzdGFydCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIHN0YXJ0ITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBlbmQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBlbmQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdmFyaWFibGUgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIEFYSU9TIGluc3RhbmNlICovXHJcbiAgICBwcml2YXRlIGluc3RhbmNlOiBBeGlvc0luc3RhbmNlO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIFVSTCB0byB0aGUgQ1JNIGJhY2tlbmQgKi9cclxuICAgIHByaXZhdGUgYXBpX3VybD86IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB0aW1lb3V0IHRpbWUgdG8gdGhlIEFQSSAqL1xyXG4gICAgcHJpdmF0ZSBhcGlfdGltZW91dDogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgICAvLyAqIENPTlNUUlVDVE9SICpcclxuICAgIGNvbnN0cnVjdG9yKGFwaV91cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghYXBpX3VybCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gQVBJIHVybCBoYXMgYmVlbiBzZXRcIik7XHJcbiAgICAgICAgdGhpcy5hcGlfdXJsID0gYXBpX3VybDtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gKiBQUklWQVRFIE1FVEhPRFMgKlxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgQXhpb3MgaW5zdGFuY2Ugd2l0aCB0aGUgVVJMIGFuZCBoZWFkZXJzXHJcbiAgICAgKiBAcmV0dXJucyBBbiBheGlvcyBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZShcIkF4aW9zIGhhcyBiZWVuIGludGl0aWFsaXplZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGJhc2VVUkw6IHRoaXMuYXBpX3VybCxcclxuICAgICAgICAgICAgdGltZW91dDogdGhpcy5hcGlfdGltZW91dFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlID0gKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKFwiUmVzcG9uc2UgaXMgYmVpbmcgaGFuZGxlZFwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBJZiBubyBzdWNjZXNzLCByZWRpcmVjdCB0byB0aGUgZXJyb3IgZnVuY3Rpb25cclxuICAgICAgICBpZiAoIWRhdGEuc3VjY2VzcykgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5zdWNjZXNzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KGRhdGEuZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChyZXNwb25zZTogQXhpb3NSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZShcIlJlc3BvbnNlIHdhcyBvZiB0eXBlIGVycm9yXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIExvZyB0aGUgZXJyb3JcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcihkYXRhLmVycm9yLm5hbWUsIGRhdGEuZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgZXJyb3JcclxuICAgICAgICByZXR1cm4gZGF0YS5lcnJvcjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3VzdG9tIGxvZ2dpbmcgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2cgPSB7XHJcbiAgICAgICAgZXJyb3I6ICguLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgICAgICR7Y29sb3JzLmZncmVkfVtFUlJPUiBpbiAke3RoaXMuZW5kIC0gdGhpcy5zdGFydH1tc11gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN1Y2Nlc3M6ICguLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgICAgICAgIGAgICAgJHtjb2xvcnMuZmdncmVlbn1bU1VDQ0VTUyBpbiAke3RoaXMuZW5kIC0gdGhpcy5zdGFydH1tc11gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlcXVlc3Q6ICguLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke2NvbG9ycy5mZ2JsdWV9W0FQSSBSRVFVRVNUXWAsIG0uam9pbihcIiBcIiksIGNvbG9ycy5yZXNldCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVzdWx0OiAoLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgICAgICR7Y29sb3JzLmZneWVsbG93fVtSRVNVTFRdYCxcclxuICAgICAgICAgICAgICAgIG0ubWFwKG1tID0+IEpTT04uc3RyaW5naWZ5KG1tKSkuam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXNzYWdlOiAoLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCAgICAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCwgbS5qb2luKFwiIFwiKSwgY29sb3JzLnJlc2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgYXV0aEhlYWRlciA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKFwiR2VuZXJhdGUgYXV0aCBoZWFkZXJcIik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gKiBQVUJMSUMgTUVUSE9EUyAqXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTG9ncyBhIGdpdmVuIHVzZXIgaW5cclxuICAgICAqIEByZXR1cm5zIFRoZSBhdXRoZW50aWZpY2F0aW9uIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2dpbiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdChcIkxvZ2luXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChcIi9hdXRoL2xvZ2luXCIsIHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC50aGVuKHRva2VuID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDMpIHRoaXMubG9nLnJlc3VsdChcIlRva2VuIGxlbmd0aFwiLCB0b2tlbi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiBhbnkgZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgd2hlcmU6IG9iamVjdCA9IHt9LFxyXG4gICAgICAgIHBvc2l0aW9uOiBBcGlQb3NpdGlvbiA9IHsgdGFrZTogNTAsIHNraXA6IDAgfVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdChcIkZpbmRcIiwgZW50aXR5LCBwb3NpdGlvbi5za2lwIHx8IDAsIHBvc2l0aW9uLnRha2UgfHwgNTApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9P3doZXJlPSR7SlNPTi5zdHJpbmdpZnkod2hlcmUpfSZza2lwPSR7cG9zaXRpb24uc2tpcH0mdGFrZT0ke1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnRha2VcclxuICAgICAgICAgICAgICAgIH1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgd2hlcmU6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoXCJGaW5kIG9uZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS9vbmU/d2hlcmU9JHtKU09OLnN0cmluZ2lmeSh3aGVyZSl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IG9uZSBlbGVtZW50IG9mIGFuIGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kQnlJZCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoXCJGaW5kIGJ5IGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYW4gZWxlbWVudCB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdChcIlNhdmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGEvJHtlbnRpdHl9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoXCJSZW1vdmVcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbmZpZyA9IGFzeW5jIChlbnRpdHk6IHN0cmluZyB8IG51bGwgPSBudWxsKSA9PiB7XHJcbiAgICAgICAgY29uc3QgVVJMID0gIWVudGl0eSA/IFwiL2NvbmZpZ1wiIDogYC9jb25maWcvJHtlbnRpdHl9YDtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdChcIkNvbmZpZ1wiLCBlbnRpdHkgfHwgXCJnbG9iYWxcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChVUkwsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEk7XHJcbiJdfQ==