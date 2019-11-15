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

    return data;
  });

  _defineProperty(this, "handleError", function (response) {
    if (!response.data) {
      _this.log.error(1, "The endpoint didn't respond after ".concat(_this.api_timeout, "ms"));

      return {
        name: "SERVER_DOWN",
        message: "The server is currently unavailable"
      };
    }

    if (_this.debug_level >= 2) _this.log.message(1, "Response was of type error"); // Get the result data of the request

    var data = response.data; // Log the error

    _this.log.error(1, data.error.name, data.error.message); // Return the error


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

  _defineProperty(this, "impersonate", function (userId) {
    _this.log.request(0, "Impersonate", userId);

    _this.log.error(1, "Impersonation has not been implemented yet");
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
                if (_this.debug_level == 3) _this.log.result(1, "Token length", token.data.length);
                _this.token = token.data;
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
          order,
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
              order = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : "";

              _this.log.request(0, "Find", entity, position.skip || 0, position.take || 50);

              return _context2.abrupt("return", _this.instance.get("/data/".concat(entity, "?where=").concat(JSON.stringify(where), "&skip=").concat(position.skip, "&take=").concat(position.take, "&order=").concat(order), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 5:
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

  _defineProperty(this, "findRelated",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(entity, id, relation) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this.log.request(0, "Find related of id", entity, id);

              return _context5.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "/").concat(relation), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x8, _x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "save",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(entity, data) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this.log.request(0, "Save", entity);

              return _context6.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "saveRelated",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(entity, entityId, relation, relationId) {
      var data,
          _args7 = arguments;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              data = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : {};

              _this.log.request(0, "Save related", entity, entityId, relation, relationId);

              return _context7.abrupt("return", _this.instance.post("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x13, _x14, _x15, _x16) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "remove",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(entity, id) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _this.log.request(0, "Remove", entity, id);

              return _context8.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x17, _x18) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "config",
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var entity,
          URL,
          _args9 = arguments;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              entity = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : null;
              URL = !entity ? "/config" : "/config/".concat(entity);

              _this.log.request(0, "Config", entity || "global");

              return _context9.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function () {
      return _ref9.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImRlYnVnX2xldmVsIiwibG9nIiwibWVzc2FnZSIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJhcGlfdGltZW91dCIsInJlc3BvbnNlIiwiZGF0YSIsInN1Y2Nlc3MiLCJoYW5kbGVFcnJvciIsInJlc3VsdCIsImVycm9yIiwibmFtZSIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjb25zb2xlIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZ2N5YW4iLCJuIiwiaW5kZW50IiwibG9nc19pbmRlbnQiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcklkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwicG9zdCIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImVudGl0eSIsIndoZXJlIiwicG9zaXRpb24iLCJ0YWtlIiwic2tpcCIsIm9yZGVyIiwiZ2V0IiwiYXV0aEhlYWRlciIsImlkIiwicmVsYXRpb24iLCJlbnRpdHlJZCIsInJlbGF0aW9uSWQiLCJVUkwiLCJFcnJvciIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR01BLEcsR0FDRjs7QUFDQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTtBQUdBO0FBQ0EsYUFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQXJCQSxDQXFCQTs7QUFBQSx1Q0FsQkEsQ0FrQkE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsdUNBSEMsSUFHRDs7QUFBQSxn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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXhRYTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDekIsTUFBSSxDQUFDWixPQUFMLEVBQWMsTUFBTSxJQUFJZ0UsS0FBSixDQUFVLHlCQUFWLENBQU47QUFDZCxPQUFLaEUsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsT0FBSzhDLFFBQUwsR0FBZ0IsS0FBS21CLElBQUwsRUFBaEI7QUFDSCxDLENBRUQ7O0FBQ0E7Ozs7OztlQTRRV2xFLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcclxuaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVzcG9uc2UsIEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gXCIuL2NvbnN0L2NvbG9yc1wiO1xyXG5pbXBvcnQgeyBBcGlQb3NpdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvQXBpUG9zaXRpb25cIjtcclxuXHJcbmNsYXNzIEFQSSB7XHJcbiAgICAvLyAqIFZBUklBQkxFUyAqXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgY29udGFpbnMgdGhlIHRva2VuIG9mIHRoZSB1c2VyICovXHJcbiAgICBwdWJsaWMgdG9rZW4hOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiAwID0gbm9uZSwgMSA9IG5vcm1hbCwgMiA9IGRldGFpbGVkLCAzID0gZGV0YWlsZWQgKyByZXN1bHRzICovXHJcbiAgICBwdWJsaWMgZGVidWdfbGV2ZWw6IG51bWJlciA9IDE7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBFeHRyYSBpbmRlbnQgZm9yIGxvZ3MgKi9cclxuICAgIHB1YmxpYyBsb2dzX2luZGVudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgc3RhcnQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgZW5kIHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgZW5kITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHZhcmlhYmxlIHRoYXQgd2lsbCBjb250YWluIHRoZSBBWElPUyBpbnN0YW5jZSAqL1xyXG4gICAgcHJpdmF0ZSBpbnN0YW5jZTogQXhpb3NJbnN0YW5jZTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gdGhlIENSTSBiYWNrZW5kICovXHJcbiAgICBwcml2YXRlIGFwaV91cmw/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdGltZW91dCB0aW1lIHRvIHRoZSBBUEkgKi9cclxuICAgIHByaXZhdGUgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gICAgLy8gKiBDT05TVFJVQ1RPUiAqXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlfdXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWFwaV91cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIEFQSSB1cmwgaGFzIGJlZW4gc2V0XCIpO1xyXG4gICAgICAgIHRoaXMuYXBpX3VybCA9IGFwaV91cmw7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICogUFJJVkFURSBNRVRIT0RTICpcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEF4aW9zIGluc3RhbmNlIHdpdGggdGhlIFVSTCBhbmQgaGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgQW4gYXhpb3MgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJBeGlvcyBoYXMgYmVlbiBpbnRpdGlhbGl6ZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiB0aGlzLmFwaV91cmwsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMuYXBpX3RpbWVvdXRcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZSA9IChyZXNwb25zZTogQXhpb3NSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIlJlc3BvbnNlIGlzIGJlaW5nIGhhbmRsZWRcIik7XHJcbiAgICAgICAgLy8gR2V0IHRoZSByZXN1bHQgZGF0YSBvZiB0aGUgcmVxdWVzdFxyXG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgLy8gSWYgbm8gc3VjY2VzcywgcmVkaXJlY3QgdG8gdGhlIGVycm9yIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHJldHVybiB0aGlzLmhhbmRsZUVycm9yKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cuc3VjY2VzcygxKTtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgZGF0YS5kYXRhKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSByZXN1bHRpbmcgZGF0YTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChyZXNwb25zZTogQXhpb3NSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKDEsIGBUaGUgZW5kcG9pbnQgZGlkbid0IHJlc3BvbmQgYWZ0ZXIgJHt0aGlzLmFwaV90aW1lb3V0fW1zYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlNFUlZFUl9ET1dOXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlRoZSBzZXJ2ZXIgaXMgY3VycmVudGx5IHVuYXZhaWxhYmxlXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSB3YXMgb2YgdHlwZSBlcnJvclwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBMb2cgdGhlIGVycm9yXHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgZGF0YS5lcnJvci5uYW1lLCBkYXRhLmVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVycm9yXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyb3I7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEN1c3RvbSBsb2dnaW5nIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nID0ge1xyXG4gICAgICAgIGVycm9yOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3JlZH1bRVJST1IgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdWNjZXNzOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnZ3JlZW59W1NVQ0NFU1MgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXF1ZXN0OiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdibHVlfVtBUEkgUkVRVUVTVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3VsdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3llbGxvd31bUkVTVUxUXWAsXHJcbiAgICAgICAgICAgICAgICBtLm1hcChtbSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVJbmRlbnQ6IChuOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiArIHRoaXMubG9nc19pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGF1dGhIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIkdlbmVyYXRlIGF1dGggaGVhZGVyXCIpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vICogUFVCTElDIE1FVEhPRFMgKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdG9kbyBJbXBsZW1lbnQgaW1wZXJzb25hdGlvbiBpbiBiYWNrZW5kXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW1wZXJzb25hdGUgYSB1c2VyXHJcbiAgICAgKiBAcmV0dXJucyBPSyBvciBOT0tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcGVyc29uYXRlID0gKHVzZXJJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkltcGVyc29uYXRlXCIsIHVzZXJJZCk7XHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgXCJJbXBlcnNvbmF0aW9uIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZCB5ZXRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYSBnaXZlbiB1c2VyIGluXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXV0aGVudGlmaWNhdGlvbiB0b2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMb2dpblwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9sb2dpblwiLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAudGhlbih0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgXCJUb2tlbiBsZW5ndGhcIiwgdG9rZW4uZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmRhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICB3aGVyZTogb2JqZWN0ID0ge30sXHJcbiAgICAgICAgcG9zaXRpb246IEFwaVBvc2l0aW9uID0geyB0YWtlOiA1MCwgc2tpcDogMCB9LFxyXG4gICAgICAgIG9yZGVyOiBzdHJpbmcgPSBcIlwiXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZFwiLCBlbnRpdHksIHBvc2l0aW9uLnNraXAgfHwgMCwgcG9zaXRpb24udGFrZSB8fCA1MCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0/d2hlcmU9JHtKU09OLnN0cmluZ2lmeSh3aGVyZSl9JnNraXA9JHtwb3NpdGlvbi5za2lwfSZ0YWtlPSR7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24udGFrZVxyXG4gICAgICAgICAgICAgICAgfSZvcmRlcj0ke29yZGVyfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IG9uZSBlbGVtZW50IG9mIGFuIGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kT25lID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCB3aGVyZTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgb25lXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9L29uZT93aGVyZT0ke0pTT04uc3RyaW5naWZ5KHdoZXJlKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRCeUlkID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgYnkgaWRcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHJlbGF0ZWQgZWxlbWVudHMgb2YgcmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRSZWxhdGVkID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyLCByZWxhdGlvbjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgcmVsYXRlZCBvZiBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vJHtpZH0vJHtyZWxhdGlvbn1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGFuIGVsZW1lbnQgdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBkYXRhOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNhdmUgcmVsYXRlZFwiLCBlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJSZW1vdmVcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbmZpZyA9IGFzeW5jIChlbnRpdHk6IHN0cmluZyB8IG51bGwgPSBudWxsKSA9PiB7XHJcbiAgICAgICAgY29uc3QgVVJMID0gIWVudGl0eSA/IFwiL2NvbmZpZ1wiIDogYC9jb25maWcvJHtlbnRpdHl9YDtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNvbmZpZ1wiLCBlbnRpdHkgfHwgXCJnbG9iYWxcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChVUkwsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEk7XHJcbiJdfQ==