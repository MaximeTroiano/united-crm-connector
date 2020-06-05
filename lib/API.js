"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

var _colors = _interopRequireDefault(require("./const/colors"));

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

  var api_timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

  _classCallCheck(this, API);

  _defineProperty(this, "token", void 0);

  _defineProperty(this, "debug_level", 1);

  _defineProperty(this, "logs_indent", 0);

  _defineProperty(this, "start", void 0);

  _defineProperty(this, "end", void 0);

  _defineProperty(this, "instance", void 0);

  _defineProperty(this, "api_url", void 0);

  _defineProperty(this, "api_timeout", 3000);

  _defineProperty(this, "init", function () {
    if (_this.debug_level >= 2) _this.log.message(1, "Axios has been intitialized");
    return _axios["default"].create({
      baseURL: _this.api_url,
      timeout: _this.api_timeout,
      httpsAgent: new _https["default"].Agent({
        rejectUnauthorized: false
      })
    });
  });

  _defineProperty(this, "onError", void 0);

  _defineProperty(this, "handleResponse", function (response) {
    console.log("response", response);
    if (_this.debug_level >= 2) _this.log.message(1, "Response is being handled"); // Get the result data of the request

    var data = response.data; // If no success, redirect to the error function

    if (!data.success) return _this.handleError(data);
    if (_this.debug_level >= 2) _this.log.success(1);
    if (_this.debug_level == 3) _this.log.result(1, data.data); // Return the resulting data;

    return data;
  });

  _defineProperty(this, "handleError", function (data) {
    console.log("data", data);

    if (!data) {
      _this.log.error(1, "The endpoint didn't respond after ".concat(_this.api_timeout, "ms"));

      return {
        name: "SERVER_DOWN",
        message: "The server is currently unavailable"
      };
    }

    if (_this.debug_level >= 2) _this.log.message(1, "Response was of type error"); // Get the result data of the request
    // Log the error

    _this.log.error(1, data.error.name, data.error.message);

    if (_this.onError) _this.onError(data.error); // Return the error

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

  _defineProperty(this, "authHeader", function (extraHeaders) {
    var extraOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (_this.debug_level >= 2) _this.log.message(1, "Generate auth header");
    return _objectSpread({}, extraOptions, {
      headers: _objectSpread({
        Authorization: "Bearer ".concat(_this.token)
      }, extraHeaders)
    });
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
                if (!token.data) return _this.handleError(token);
                if (_this.debug_level == 3) _this.log.result(1, "Token length", token.data.length);
                _this.token = token.data.token;
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
      var options,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

              _this.log.request(0, "Find", entity);

              return _context2.abrupt("return", _this.instance.get("/data/".concat(entity, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
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

  _defineProperty(this, "getListValues",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(listName) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.log.request(0, "List of values", listName);

              return _context3.abrupt("return", _this.instance.get("/lists/".concat(listName), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getLists",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _this.log.request(0, "Lists of values");

            return _context4.abrupt("return", _this.instance.get("/lists", _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));

  _defineProperty(this, "saveListValue",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(listName, data) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this.log.request(0, "List of values", listName);

              return _context5.abrupt("return", _this.instance.post("/lists/".concat(listName), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5, _x6) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "removeListValue",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(listName, id) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this.log.request(0, "Delete element of list of values", listName);

              return _context6.abrupt("return", _this.instance["delete"]("/lists/".concat(listName, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x7, _x8) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "search",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(entity, search) {
      var options,
          _args7 = arguments;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};

              _this.log.request(0, "Search", entity, search);

              return _context7.abrupt("return", _this.instance.get("/data/".concat(entity, "/search?search=").concat(search, "&options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x9, _x10) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOne",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(entity) {
      var options,
          _args8 = arguments;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};

              _this.log.request(0, "Find one", entity);

              return _context8.abrupt("return", _this.instance.get("/data/".concat(entity, "/one?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x11) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findById",
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(entity, id) {
      var options,
          _args9 = arguments;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              options = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};

              _this.log.request(0, "Find by id", entity, id);

              return _context9.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x12, _x13) {
      return _ref9.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findRelated",
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(entity, id, relation) {
      var options,
          _args10 = arguments;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              options = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};

              _this.log.request(0, "Find related of id", entity, id);

              return _context10.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "/").concat(relation, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x14, _x15, _x16) {
      return _ref10.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOneRelated",
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(entity, entityId, relation, relationId) {
      var options,
          _args11 = arguments;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              options = _args11.length > 4 && _args11[4] !== undefined ? _args11[4] : {};

              _this.log.request(0, "Find one related of id", entity, entityId);

              return _context11.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x17, _x18, _x19, _x20) {
      return _ref11.apply(this, arguments);
    };
  }());

  _defineProperty(this, "save",
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(entity, data) {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (_this.onSave) _this.onSave(entity, data);

              _this.log.request(0, "Save", entity);

              return _context12.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(function (result) {
                if (_this.afterSave) _this.afterSave(entity, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x21, _x22) {
      return _ref12.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSave", void 0);

  _defineProperty(this, "afterSave", void 0);

  _defineProperty(this, "saveRelated",
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(entity, entityId, relation, relationId) {
      var data,
          _args13 = arguments;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              data = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : {};
              if (_this.onSaveRelated) _this.onSaveRelated(entity, entityId, relation, relationId, data);

              _this.log.request(0, "Save related", entity, entityId, relation, relationId);

              return _context13.abrupt("return", _this.instance.post("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), data, _this.authHeader()).then(function (result) {
                if (_this.afterSaveRelated) _this.afterSaveRelated(entity, entityId, relation, relationId, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x23, _x24, _x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSaveRelated", void 0);

  _defineProperty(this, "afterSaveRelated", void 0);

  _defineProperty(this, "removeRelated",
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(entity, entityId, relation, relationId) {
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _this.log.request(0, "Delete related", entity, entityId, relation, relationId);

              if (!_this.onRemoveRelated) {
                _context14.next = 6;
                break;
              }

              _context14.next = 4;
              return _this.onRemoveRelated(entity, entityId, relation, relationId);

            case 4:
              if (_context14.sent) {
                _context14.next = 6;
                break;
              }

              return _context14.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context14.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), _this.authHeader()).then(function (result) {
                if (_this.afterRemoveRelated) _this.afterRemoveRelated(entity, entityId, relation, relationId, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x27, _x28, _x29, _x30) {
      return _ref14.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemoveRelated", void 0);

  _defineProperty(this, "afterRemoveRelated", void 0);

  _defineProperty(this, "remove",
  /*#__PURE__*/
  function () {
    var _ref15 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15(entity, id) {
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _this.log.request(0, "Remove", entity, id);

              if (!_this.onRemove) {
                _context15.next = 6;
                break;
              }

              _context15.next = 4;
              return _this.onRemove(entity, id);

            case 4:
              if (_context15.sent) {
                _context15.next = 6;
                break;
              }

              return _context15.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context15.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(function (result) {
                if (_this.afterDelete) _this.afterDelete(entity, id, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function (_x31, _x32) {
      return _ref15.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemove", void 0);

  _defineProperty(this, "afterDelete", void 0);

  _defineProperty(this, "config",
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var entity,
          URL,
          _args16 = arguments;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              entity = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : null;

              _this.log.request(0, "Config", entity || "global");

              URL = !entity ? "/config" : "/config/".concat(entity);
              return _context16.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function () {
      return _ref16.apply(this, arguments);
    };
  }());

  _defineProperty(this, "database",
  /*#__PURE__*/
  function () {
    var _ref17 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17(func) {
      var parameters,
          _args17 = arguments;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              parameters = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : {};

              _this.log.request(0, "database", func);

              return _context17.abrupt("return", _this.instance.post("/database/".concat(func), parameters, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));

    return function (_x33) {
      return _ref17.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFile",
  /*#__PURE__*/
  function () {
    var _ref18 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18(fileData, file, folderId) {
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _this.log.request(0, "Upload", fileData.name);

              if (!_this.onUploadFile) {
                _context18.next = 6;
                break;
              }

              _context18.next = 4;
              return _this.onUploadFile(fileData, file, folderId);

            case 4:
              if (_context18.sent) {
                _context18.next = 6;
                break;
              }

              return _context18.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context18.abrupt("return", _this.instance.post("/files", file, _this.authHeader({
                "x-file-name": fileData.name,
                "x-file-type": fileData.type,
                "x-relation": fileData.relation,
                "x-relation-id": fileData.relationId,
                "x-folder-id": folderId || 0
              })).then(function (result) {
                if (_this.afterUploadFile) _this.afterUploadFile(fileData, file, folderId, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function (_x34, _x35, _x36) {
      return _ref18.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onUploadFile", void 0);

  _defineProperty(this, "afterUploadFile", void 0);

  _defineProperty(this, "downloadFile",
  /*#__PURE__*/
  function () {
    var _ref19 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19(fileId) {
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _this.log.request(0, "Download", fileId);

              return _context19.abrupt("return", _this.instance.get("/data/files/".concat(fileId, "/download"), _this.authHeader({}, {
                responseType: "blob"
              })).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));

    return function (_x37) {
      return _ref19.apply(this, arguments);
    };
  }());

  _defineProperty(this, "calculateKpi",
  /*#__PURE__*/
  function () {
    var _ref20 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20(type, query) {
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _this.log.request(0, "Calculate KPI", type);

              return _context20.abrupt("return", _this.instance.post("/kpi", {
                type: type,
                query: query
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function (_x38, _x39) {
      return _ref20.apply(this, arguments);
    };
  }());

  _defineProperty(this, "exec",
  /*#__PURE__*/
  function () {
    var _ref21 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21(functionName, data) {
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _this.log.request(0, "Exec function", functionName);

              return _context21.abrupt("return", _this.instance.post("/exec/".concat(functionName), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }));

    return function (_x40, _x41) {
      return _ref21.apply(this, arguments);
    };
  }());

  if (!api_url) throw new Error("No API url has been set");
  this.api_url = api_url;
  this.api_timeout = api_timeout;
  this.instance = this.init();
} // * PRIVATE METHODS *

/**
 * @description Init the Axios instance with the URL and headers
 * @returns An axios instance
 */
;

var _default = API;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImFwaV90aW1lb3V0IiwiZGVidWdfbGV2ZWwiLCJsb2ciLCJtZXNzYWdlIiwiYXhpb3MiLCJjcmVhdGUiLCJiYXNlVVJMIiwidGltZW91dCIsImh0dHBzQWdlbnQiLCJodHRwcyIsIkFnZW50IiwicmVqZWN0VW5hdXRob3JpemVkIiwicmVzcG9uc2UiLCJjb25zb2xlIiwiZGF0YSIsInN1Y2Nlc3MiLCJoYW5kbGVFcnJvciIsInJlc3VsdCIsImVycm9yIiwibmFtZSIsIm9uRXJyb3IiLCJpIiwiZW5kIiwiRGF0ZSIsImdldFRpbWUiLCJtIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZ2N5YW4iLCJuIiwiaW5kZW50IiwibG9nc19pbmRlbnQiLCJleHRyYUhlYWRlcnMiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcklkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwicG9zdCIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImVudGl0eSIsIm9wdGlvbnMiLCJnZXQiLCJhdXRoSGVhZGVyIiwibGlzdE5hbWUiLCJpZCIsInNlYXJjaCIsInJlbGF0aW9uIiwiZW50aXR5SWQiLCJyZWxhdGlvbklkIiwib25TYXZlIiwiYWZ0ZXJTYXZlIiwib25TYXZlUmVsYXRlZCIsImFmdGVyU2F2ZVJlbGF0ZWQiLCJvblJlbW92ZVJlbGF0ZWQiLCJhZnRlclJlbW92ZVJlbGF0ZWQiLCJvblJlbW92ZSIsImFmdGVyRGVsZXRlIiwiVVJMIiwiZnVuYyIsInBhcmFtZXRlcnMiLCJmaWxlRGF0YSIsImZpbGUiLCJmb2xkZXJJZCIsIm9uVXBsb2FkRmlsZSIsInR5cGUiLCJhZnRlclVwbG9hZEZpbGUiLCJmaWxlSWQiLCJyZXNwb25zZVR5cGUiLCJxdWVyeSIsImZ1bmN0aW9uTmFtZSIsIkVycm9yIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBR01BLEcsR0FDRjs7QUFDQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTtBQUdBO0FBQ0EsYUFBWUMsT0FBWixFQUF5RDtBQUFBOztBQUFBLE1BQTVCQyxXQUE0Qix1RUFBTixJQUFNOztBQUFBOztBQUFBOztBQUFBLHVDQXJCNUIsQ0FxQjRCOztBQUFBLHVDQWxCNUIsQ0FrQjRCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQUg1QixJQUc0Qjs7QUFBQSxnQ0FjMUMsWUFBTTtBQUNqQixRQUFJLEtBQUksQ0FBQ0MsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiw2QkFBcEI7QUFFM0IsV0FBT0Msa0JBQU1DLE1BQU4sQ0FBYTtBQUNoQkMsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsT0FERTtBQUVoQlEsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsV0FGRTtBQUdoQlEsTUFBQUEsVUFBVSxFQUFFLElBQUlDLGtCQUFNQyxLQUFWLENBQWdCO0FBQ3hCQyxRQUFBQSxrQkFBa0IsRUFBRTtBQURJLE9BQWhCO0FBSEksS0FBYixDQUFQO0FBT0gsR0F4QndEOztBQUFBOztBQUFBLDBDQTJCaEMsVUFBQ0MsUUFBRCxFQUFrQztBQUN2REMsSUFBQUEsT0FBTyxDQUFDWCxHQUFSLENBQVksVUFBWixFQUF3QlUsUUFBeEI7QUFDQSxRQUFJLEtBQUksQ0FBQ1gsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiwyQkFBcEIsRUFGNEIsQ0FH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QUFBQTtBQUFBO0FBQUEsNEJBcWYzQyxtQkFBT3VFLFlBQVAsRUFBNkJ6RSxJQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1YsY0FBQSxLQUFJLENBQUNaLEdBQUwsQ0FBUytCLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0IsZUFBcEIsRUFBcUNzRCxZQUFyQzs7QUFEVSxpREFFSCxLQUFJLENBQUNuQyxRQUFMLENBQ0ZDLElBREUsaUJBQ1lrQyxZQURaLEdBQzRCekUsSUFENUIsRUFDa0MsS0FBSSxDQUFDOEMsVUFBTCxFQURsQyxFQUVGTixJQUZFLENBRUcsS0FBSSxDQUFDQyxjQUZSLFdBR0ksS0FBSSxDQUFDdkMsV0FIVCxDQUZHOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBcmYyQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDckQsTUFBSSxDQUFDakIsT0FBTCxFQUFjLE1BQU0sSUFBSXlGLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBRWQsT0FBS3pGLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBRUEsT0FBS29ELFFBQUwsR0FBZ0IsS0FBS3FDLElBQUwsRUFBaEI7QUFDSCxDLENBRUQ7O0FBQ0E7Ozs7OztlQW9mVzNGLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcclxuaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVzcG9uc2UsIEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gXCIuL2NvbnN0L2NvbG9yc1wiO1xyXG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XHJcbmltcG9ydCB7IEFwaVBvc2l0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9BcGlQb3NpdGlvblwiO1xyXG5cclxuY2xhc3MgQVBJIHtcclxuICAgIC8vICogVkFSSUFCTEVTICpcclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSBjb250YWlucyB0aGUgdG9rZW4gb2YgdGhlIHVzZXIgKi9cclxuICAgIHB1YmxpYyB0b2tlbiE6IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIDAgPSBub25lLCAxID0gbm9ybWFsLCAyID0gZGV0YWlsZWQsIDMgPSBkZXRhaWxlZCArIHJlc3VsdHMgKi9cclxuICAgIHB1YmxpYyBkZWJ1Z19sZXZlbDogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIEV4dHJhIGluZGVudCBmb3IgbG9ncyAqL1xyXG4gICAgcHVibGljIGxvZ3NfaW5kZW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBzdGFydCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIHN0YXJ0ITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBlbmQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBlbmQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdmFyaWFibGUgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIEFYSU9TIGluc3RhbmNlICovXHJcbiAgICBwcml2YXRlIGluc3RhbmNlOiBBeGlvc0luc3RhbmNlO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIFVSTCB0byB0aGUgQ1JNIGJhY2tlbmQgKi9cclxuICAgIHByaXZhdGUgYXBpX3VybD86IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB0aW1lb3V0IHRpbWUgdG8gdGhlIEFQSSAqL1xyXG4gICAgcHVibGljIGFwaV90aW1lb3V0OiBudW1iZXIgPSAzMDAwO1xyXG5cclxuICAgIC8vICogQ09OU1RSVUNUT1IgKlxyXG4gICAgY29uc3RydWN0b3IoYXBpX3VybDogc3RyaW5nLCBhcGlfdGltZW91dDogbnVtYmVyID0gMzAwMCkge1xyXG4gICAgICAgIGlmICghYXBpX3VybCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gQVBJIHVybCBoYXMgYmVlbiBzZXRcIik7XHJcblxyXG4gICAgICAgIHRoaXMuYXBpX3VybCA9IGFwaV91cmw7XHJcbiAgICAgICAgdGhpcy5hcGlfdGltZW91dCA9IGFwaV90aW1lb3V0O1xyXG5cclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gKiBQUklWQVRFIE1FVEhPRFMgKlxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgQXhpb3MgaW5zdGFuY2Ugd2l0aCB0aGUgVVJMIGFuZCBoZWFkZXJzXHJcbiAgICAgKiBAcmV0dXJucyBBbiBheGlvcyBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIkF4aW9zIGhhcyBiZWVuIGludGl0aWFsaXplZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGJhc2VVUkw6IHRoaXMuYXBpX3VybCxcclxuICAgICAgICAgICAgdGltZW91dDogdGhpcy5hcGlfdGltZW91dCxcclxuICAgICAgICAgICAgaHR0cHNBZ2VudDogbmV3IGh0dHBzLkFnZW50KHtcclxuICAgICAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgb25FcnJvciE6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZSA9IChyZXNwb25zZTogQXhpb3NSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIlJlc3BvbnNlIGlzIGJlaW5nIGhhbmRsZWRcIik7XHJcbiAgICAgICAgLy8gR2V0IHRoZSByZXN1bHQgZGF0YSBvZiB0aGUgcmVxdWVzdFxyXG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgLy8gSWYgbm8gc3VjY2VzcywgcmVkaXJlY3QgdG8gdGhlIGVycm9yIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHJldHVybiB0aGlzLmhhbmRsZUVycm9yKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5zdWNjZXNzKDEpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDMpIHRoaXMubG9nLnJlc3VsdCgxLCBkYXRhLmRhdGEpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBkYXRhO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yID0gKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVwiLCBkYXRhKTtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgYFRoZSBlbmRwb2ludCBkaWRuJ3QgcmVzcG9uZCBhZnRlciAke3RoaXMuYXBpX3RpbWVvdXR9bXNgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0VSVkVSX0RPV05cIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHNlcnZlciBpcyBjdXJyZW50bHkgdW5hdmFpbGFibGVcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSB3YXMgb2YgdHlwZSBlcnJvclwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcblxyXG4gICAgICAgIC8vIExvZyB0aGUgZXJyb3JcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBkYXRhLmVycm9yLm5hbWUsIGRhdGEuZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHRoaXMub25FcnJvcihkYXRhLmVycm9yKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlcnJvclxyXG4gICAgICAgIHJldHVybiBkYXRhLmVycm9yO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBDdXN0b20gbG9nZ2luZyBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZyA9IHtcclxuICAgICAgICBlcnJvcjogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdyZWR9W0VSUk9SIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VjY2VzczogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2dyZWVufVtTVUNDRVNTIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVxdWVzdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnYmx1ZX1bQVBJIFJFUVVFU1RdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXN1bHQ6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmd5ZWxsb3d9W1JFU1VMVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5tYXAoKG1tKSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVJbmRlbnQ6IChuOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiArIHRoaXMubG9nc19pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRoSGVhZGVyID0gKGV4dHJhSGVhZGVycz86IGFueSwgZXh0cmFPcHRpb25zOiBhbnkgPSB7fSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJHZW5lcmF0ZSBhdXRoIGhlYWRlclwiKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5leHRyYU9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAuLi5leHRyYUhlYWRlcnMsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gKiBQVUJMSUMgTUVUSE9EUyAqXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0b2RvIEltcGxlbWVudCBpbXBlcnNvbmF0aW9uIGluIGJhY2tlbmRcclxuICAgICAqIEBkZXNjcmlwdGlvbiBJbXBlcnNvbmF0ZSBhIHVzZXJcclxuICAgICAqIEByZXR1cm5zIE9LIG9yIE5PS1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW1wZXJzb25hdGUgPSAodXNlcklkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiSW1wZXJzb25hdGVcIiwgdXNlcklkKTtcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBcIkltcGVyc29uYXRpb24gaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkIHlldFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTG9ncyBhIGdpdmVuIHVzZXIgaW5cclxuICAgICAqIEByZXR1cm5zIFRoZSBhdXRoZW50aWZpY2F0aW9uIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2dpbiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxvZ2luXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChcIi9hdXRoL2xvZ2luXCIsIHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbi5kYXRhKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcih0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgXCJUb2tlbiBsZW5ndGhcIiwgdG9rZW4uZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZFwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpc3RWYWx1ZXMgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2xpc3RzLyR7bGlzdE5hbWV9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0cyBvZiB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGlzdHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3RzIG9mIHZhbHVlc1wiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvbGlzdHNgLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZUxpc3RWYWx1ZSA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvbGlzdHMvJHtsaXN0TmFtZX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdFZhbHVlID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIGVsZW1lbnQgb2YgbGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9saXN0cy8ke2xpc3ROYW1lfS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHkgd2l0aCBhIHNlYXJjaCBjcml0ZXJpYVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWFyY2ggPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTZWFyY2hcIiwgZW50aXR5LCBzZWFyY2gpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9L3NlYXJjaD9zZWFyY2g9JHtzZWFyY2h9Jm9wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBvbmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vb25lP29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRCeUlkID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIGJ5IGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHJlbGF0ZWQgZWxlbWVudHMgb2YgcmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICBvcHRpb25zOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgcmVsYXRlZCBvZiBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fS8ke2lkfS8ke3JlbGF0aW9ufT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcmVsYXRlZCBlbGVtZW50cyBvZiByZWNvcmRcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBvcHRpb25zOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgb25lIHJlbGF0ZWQgb2YgaWRcIiwgZW50aXR5LCBlbnRpdHlJZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYW4gZWxlbWVudCB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlKSB0aGlzLm9uU2F2ZShlbnRpdHksIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJTYXZlKSB0aGlzLmFmdGVyU2F2ZShlbnRpdHksIGRhdGEsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uU2F2ZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyU2F2ZSE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBkYXRhOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlUmVsYXRlZCkgdGhpcy5vblNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNhdmUgcmVsYXRlZFwiLCBlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmVSZWxhdGVkITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJTYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlbW92ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlJlbW92ZVwiLCBlbnRpdHksIGlkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25SZW1vdmUpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmUoZW50aXR5LCBpZCkpKSByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyRGVsZXRlKSB0aGlzLmFmdGVyRGVsZXRlKGVudGl0eSwgaWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uUmVtb3ZlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJEZWxldGUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uZmlnID0gYXN5bmMgKGVudGl0eTogc3RyaW5nIHwgbnVsbCA9IG51bGwpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ29uZmlnXCIsIGVudGl0eSB8fCBcImdsb2JhbFwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgVVJMID0gIWVudGl0eSA/IFwiL2NvbmZpZ1wiIDogYC9jb25maWcvJHtlbnRpdHl9YDtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFVSTCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRhdGFiYXNlID0gYXN5bmMgKGZ1bmM6IHN0cmluZywgcGFyYW1ldGVyczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiZGF0YWJhc2VcIiwgZnVuYyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YWJhc2UvJHtmdW5jfWAsIHBhcmFtZXRlcnMsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgaWQgZXRjXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGxvYWRGaWxlID0gYXN5bmMgKGZpbGVEYXRhOiBhbnksIGZpbGU6IGFueSwgZm9sZGVySWQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiVXBsb2FkXCIsIGZpbGVEYXRhLm5hbWUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblVwbG9hZEZpbGUpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25VcGxvYWRGaWxlKGZpbGVEYXRhLCBmaWxlLCBmb2xkZXJJZCkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KFxyXG4gICAgICAgICAgICAgICAgYC9maWxlc2AsXHJcbiAgICAgICAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBcIngtZmlsZS1uYW1lXCI6IGZpbGVEYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LWZpbGUtdHlwZVwiOiBmaWxlRGF0YS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwieC1yZWxhdGlvblwiOiBmaWxlRGF0YS5yZWxhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBcIngtcmVsYXRpb24taWRcIjogZmlsZURhdGEucmVsYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICBcIngtZm9sZGVyLWlkXCI6IGZvbGRlcklkIHx8IDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyVXBsb2FkRmlsZSkgdGhpcy5hZnRlclVwbG9hZEZpbGUoZmlsZURhdGEsIGZpbGUsIGZvbGRlcklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblVwbG9hZEZpbGUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclVwbG9hZEZpbGUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBEb3dubG9hZHMgYSBmaWxlIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIGZpbGUgOi0pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZEZpbGUgPSBhc3luYyAoZmlsZUlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRG93bmxvYWRcIiwgZmlsZUlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvZmlsZXMvJHtmaWxlSWR9L2Rvd25sb2FkYCwgdGhpcy5hdXRoSGVhZGVyKHt9LCB7IHJlc3BvbnNlVHlwZTogXCJibG9iXCIgfSkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBsb2FkcyBhIGZpbGUgdG8gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBpZCBldGNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUtwaSA9IGFzeW5jICh0eXBlOiBzdHJpbmcsIHF1ZXJ5OiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ2FsY3VsYXRlIEtQSVwiLCB0eXBlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2twaWAsIHsgdHlwZSwgcXVlcnkgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTGF1bmNoZXMgYSBjdXN0b20gZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXhlYyA9IGFzeW5jIChmdW5jdGlvbk5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkV4ZWMgZnVuY3Rpb25cIiwgZnVuY3Rpb25OYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2V4ZWMvJHtmdW5jdGlvbk5hbWV9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSTtcclxuIl19