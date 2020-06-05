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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImFwaV90aW1lb3V0IiwiZGVidWdfbGV2ZWwiLCJsb2ciLCJtZXNzYWdlIiwiYXhpb3MiLCJjcmVhdGUiLCJiYXNlVVJMIiwidGltZW91dCIsImh0dHBzQWdlbnQiLCJodHRwcyIsIkFnZW50IiwicmVqZWN0VW5hdXRob3JpemVkIiwicmVzcG9uc2UiLCJkYXRhIiwic3VjY2VzcyIsImhhbmRsZUVycm9yIiwicmVzdWx0IiwiZXJyb3IiLCJuYW1lIiwib25FcnJvciIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjb25zb2xlIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZ2N5YW4iLCJuIiwiaW5kZW50IiwibG9nc19pbmRlbnQiLCJleHRyYUhlYWRlcnMiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcklkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwicG9zdCIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImVudGl0eSIsIm9wdGlvbnMiLCJnZXQiLCJhdXRoSGVhZGVyIiwibGlzdE5hbWUiLCJpZCIsInNlYXJjaCIsInJlbGF0aW9uIiwiZW50aXR5SWQiLCJyZWxhdGlvbklkIiwib25TYXZlIiwiYWZ0ZXJTYXZlIiwib25TYXZlUmVsYXRlZCIsImFmdGVyU2F2ZVJlbGF0ZWQiLCJvblJlbW92ZVJlbGF0ZWQiLCJhZnRlclJlbW92ZVJlbGF0ZWQiLCJvblJlbW92ZSIsImFmdGVyRGVsZXRlIiwiVVJMIiwiZnVuYyIsInBhcmFtZXRlcnMiLCJmaWxlRGF0YSIsImZpbGUiLCJmb2xkZXJJZCIsIm9uVXBsb2FkRmlsZSIsInR5cGUiLCJhZnRlclVwbG9hZEZpbGUiLCJmaWxlSWQiLCJyZXNwb25zZVR5cGUiLCJxdWVyeSIsImZ1bmN0aW9uTmFtZSIsIkVycm9yIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBR01BLEcsR0FDRjs7QUFDQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTtBQUdBO0FBQ0EsYUFBWUMsT0FBWixFQUF5RDtBQUFBOztBQUFBLE1BQTVCQyxXQUE0Qix1RUFBTixJQUFNOztBQUFBOztBQUFBOztBQUFBLHVDQXJCNUIsQ0FxQjRCOztBQUFBLHVDQWxCNUIsQ0FrQjRCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQUg1QixJQUc0Qjs7QUFBQSxnQ0FjMUMsWUFBTTtBQUNqQixRQUFJLEtBQUksQ0FBQ0MsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiw2QkFBcEI7QUFFM0IsV0FBT0Msa0JBQU1DLE1BQU4sQ0FBYTtBQUNoQkMsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsT0FERTtBQUVoQlEsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsV0FGRTtBQUdoQlEsTUFBQUEsVUFBVSxFQUFFLElBQUlDLGtCQUFNQyxLQUFWLENBQWdCO0FBQ3hCQyxRQUFBQSxrQkFBa0IsRUFBRTtBQURJLE9BQWhCO0FBSEksS0FBYixDQUFQO0FBT0gsR0F4QndEOztBQUFBOztBQUFBLDBDQTJCaEMsVUFBQ0MsUUFBRCxFQUFrQztBQUN2RCxRQUFJLEtBQUksQ0FBQ1gsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiwyQkFBcEIsRUFENEIsQ0FFdkQ7O0FBQ0EsUUFBSVUsSUFBSSxHQUFHRCxRQUFRLENBQUNDLElBQXBCLENBSHVELENB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QW9CLGVBQXBCLEVBQXFDc0QsWUFBckM7O0FBRFUsaURBRUgsS0FBSSxDQUFDbkMsUUFBTCxDQUNGQyxJQURFLGlCQUNZa0MsWUFEWixHQUM0QjFFLElBRDVCLEVBQ2tDLEtBQUksQ0FBQytDLFVBQUwsRUFEbEMsRUFFRk4sSUFGRSxDQUVHLEtBQUksQ0FBQ0MsY0FGUixXQUdJLEtBQUksQ0FBQ3hDLFdBSFQsQ0FGRzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQW5mMkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ3JELE1BQUksQ0FBQ2hCLE9BQUwsRUFBYyxNQUFNLElBQUl5RixLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUVkLE9BQUt6RixPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUVBLE9BQUtvRCxRQUFMLEdBQWdCLEtBQUtxQyxJQUFMLEVBQWhCO0FBQ0gsQyxDQUVEOztBQUNBOzs7Ozs7ZUFrZlczRixHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcbmltcG9ydCBheGlvcywgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1Jlc3BvbnNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi9jb25zdC9jb2xvcnNcIjtcclxuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xyXG5pbXBvcnQgeyBBcGlQb3NpdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvQXBpUG9zaXRpb25cIjtcclxuXHJcbmNsYXNzIEFQSSB7XHJcbiAgICAvLyAqIFZBUklBQkxFUyAqXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgY29udGFpbnMgdGhlIHRva2VuIG9mIHRoZSB1c2VyICovXHJcbiAgICBwdWJsaWMgdG9rZW4hOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiAwID0gbm9uZSwgMSA9IG5vcm1hbCwgMiA9IGRldGFpbGVkLCAzID0gZGV0YWlsZWQgKyByZXN1bHRzICovXHJcbiAgICBwdWJsaWMgZGVidWdfbGV2ZWw6IG51bWJlciA9IDE7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBFeHRyYSBpbmRlbnQgZm9yIGxvZ3MgKi9cclxuICAgIHB1YmxpYyBsb2dzX2luZGVudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgc3RhcnQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgZW5kIHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgZW5kITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHZhcmlhYmxlIHRoYXQgd2lsbCBjb250YWluIHRoZSBBWElPUyBpbnN0YW5jZSAqL1xyXG4gICAgcHJpdmF0ZSBpbnN0YW5jZTogQXhpb3NJbnN0YW5jZTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gdGhlIENSTSBiYWNrZW5kICovXHJcbiAgICBwcml2YXRlIGFwaV91cmw/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdGltZW91dCB0aW1lIHRvIHRoZSBBUEkgKi9cclxuICAgIHB1YmxpYyBhcGlfdGltZW91dDogbnVtYmVyID0gMzAwMDtcclxuXHJcbiAgICAvLyAqIENPTlNUUlVDVE9SICpcclxuICAgIGNvbnN0cnVjdG9yKGFwaV91cmw6IHN0cmluZywgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDMwMDApIHtcclxuICAgICAgICBpZiAoIWFwaV91cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIEFQSSB1cmwgaGFzIGJlZW4gc2V0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFwaV91cmwgPSBhcGlfdXJsO1xyXG4gICAgICAgIHRoaXMuYXBpX3RpbWVvdXQgPSBhcGlfdGltZW91dDtcclxuXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICogUFJJVkFURSBNRVRIT0RTICpcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEF4aW9zIGluc3RhbmNlIHdpdGggdGhlIFVSTCBhbmQgaGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgQW4gYXhpb3MgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJBeGlvcyBoYXMgYmVlbiBpbnRpdGlhbGl6ZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiB0aGlzLmFwaV91cmwsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMuYXBpX3RpbWVvdXQsXHJcbiAgICAgICAgICAgIGh0dHBzQWdlbnQ6IG5ldyBodHRwcy5BZ2VudCh7XHJcbiAgICAgICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uRXJyb3IhOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSBpcyBiZWluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIHN1Y2Nlc3MsIHJlZGlyZWN0IHRvIHRoZSBlcnJvciBmdW5jdGlvblxyXG4gICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihyZXNwb25zZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLnN1Y2Nlc3MoMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIGRhdGEuZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBgVGhlIGVuZHBvaW50IGRpZG4ndCByZXNwb25kIGFmdGVyICR7dGhpcy5hcGlfdGltZW91dH1tc2ApO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJTRVJWRVJfRE9XTlwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgc2VydmVyIGlzIGN1cnJlbnRseSB1bmF2YWlsYWJsZVwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIlJlc3BvbnNlIHdhcyBvZiB0eXBlIGVycm9yXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIExvZyB0aGUgZXJyb3JcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBkYXRhLmVycm9yLm5hbWUsIGRhdGEuZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHRoaXMub25FcnJvcihkYXRhLmVycm9yKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlcnJvclxyXG4gICAgICAgIHJldHVybiBkYXRhLmVycm9yO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBDdXN0b20gbG9nZ2luZyBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZyA9IHtcclxuICAgICAgICBlcnJvcjogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdyZWR9W0VSUk9SIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VjY2VzczogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2dyZWVufVtTVUNDRVNTIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVxdWVzdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnYmx1ZX1bQVBJIFJFUVVFU1RdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXN1bHQ6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmd5ZWxsb3d9W1JFU1VMVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5tYXAoKG1tKSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVJbmRlbnQ6IChuOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiArIHRoaXMubG9nc19pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRoSGVhZGVyID0gKGV4dHJhSGVhZGVycz86IGFueSwgZXh0cmFPcHRpb25zOiBhbnkgPSB7fSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJHZW5lcmF0ZSBhdXRoIGhlYWRlclwiKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5leHRyYU9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAuLi5leHRyYUhlYWRlcnMsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gKiBQVUJMSUMgTUVUSE9EUyAqXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0b2RvIEltcGxlbWVudCBpbXBlcnNvbmF0aW9uIGluIGJhY2tlbmRcclxuICAgICAqIEBkZXNjcmlwdGlvbiBJbXBlcnNvbmF0ZSBhIHVzZXJcclxuICAgICAqIEByZXR1cm5zIE9LIG9yIE5PS1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW1wZXJzb25hdGUgPSAodXNlcklkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiSW1wZXJzb25hdGVcIiwgdXNlcklkKTtcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBcIkltcGVyc29uYXRpb24gaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkIHlldFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTG9ncyBhIGdpdmVuIHVzZXIgaW5cclxuICAgICAqIEByZXR1cm5zIFRoZSBhdXRoZW50aWZpY2F0aW9uIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2dpbiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxvZ2luXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChcIi9hdXRoL2xvZ2luXCIsIHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIFwiVG9rZW4gbGVuZ3RoXCIsIHRva2VuLmRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiBhbnkgZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmQgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmRcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiB2YWx1ZXMgZm9yIGEgbGlzdFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMaXN0VmFsdWVzID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9saXN0cy8ke2xpc3ROYW1lfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdHMgb2YgdmFsdWVzXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpc3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0cyBvZiB2YWx1ZXNcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2xpc3RzYCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVMaXN0VmFsdWUgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3Qgb2YgdmFsdWVzXCIsIGxpc3ROYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2xpc3RzLyR7bGlzdE5hbWV9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUxpc3RWYWx1ZSA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nLCBpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkRlbGV0ZSBlbGVtZW50IG9mIGxpc3Qgb2YgdmFsdWVzXCIsIGxpc3ROYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGAvbGlzdHMvJHtsaXN0TmFtZX0vJHtpZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiBhbnkgZW50aXR5IHdpdGggYSBzZWFyY2ggY3JpdGVyaWFcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VhcmNoID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2VhcmNoXCIsIGVudGl0eSwgc2VhcmNoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fS9zZWFyY2g/c2VhcmNoPSR7c2VhcmNofSZvcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRPbmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgb25lXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9L29uZT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IG9uZSBlbGVtZW50IG9mIGFuIGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kQnlJZCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlciwgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBieSBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vJHtpZH0/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCByZWxhdGVkIGVsZW1lbnRzIG9mIHJlY29yZFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBpZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgb3B0aW9uczogb2JqZWN0ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIHJlbGF0ZWQgb2YgaWRcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vJHtpZH0vJHtyZWxhdGlvbn0/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHJlbGF0ZWQgZWxlbWVudHMgb2YgcmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRPbmVSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkOiBudW1iZXIsXHJcbiAgICAgICAgb3B0aW9uczogb2JqZWN0ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIG9uZSByZWxhdGVkIG9mIGlkXCIsIGVudGl0eSwgZW50aXR5SWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH0/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICl9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGFuIGVsZW1lbnQgdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2F2ZSkgdGhpcy5vblNhdmUoZW50aXR5LCBkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNhdmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGEvJHtlbnRpdHl9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZSkgdGhpcy5hZnRlclNhdmUoZW50aXR5LCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclNhdmUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGEgcmVsYXRpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkOiBudW1iZXIsXHJcbiAgICAgICAgZGF0YTogb2JqZWN0ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2F2ZVJlbGF0ZWQpIHRoaXMub25TYXZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclNhdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJTYXZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgZGF0YSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25TYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyU2F2ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGEgcmVsYXRpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlclxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkRlbGV0ZSByZWxhdGVkXCIsIGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25SZW1vdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uUmVtb3ZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyUmVtb3ZlUmVsYXRlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyUmVtb3ZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25SZW1vdmVSZWxhdGVkITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJSZW1vdmVSZWxhdGVkITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJSZW1vdmVcIiwgZW50aXR5LCBpZCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uUmVtb3ZlKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uUmVtb3ZlKGVudGl0eSwgaWQpKSkgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlckRlbGV0ZSkgdGhpcy5hZnRlckRlbGV0ZShlbnRpdHksIGlkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyRGVsZXRlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbmZpZyA9IGFzeW5jIChlbnRpdHk6IHN0cmluZyB8IG51bGwgPSBudWxsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNvbmZpZ1wiLCBlbnRpdHkgfHwgXCJnbG9iYWxcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IFVSTCA9ICFlbnRpdHkgPyBcIi9jb25maWdcIiA6IGAvY29uZmlnLyR7ZW50aXR5fWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChVUkwsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkYXRhYmFzZSA9IGFzeW5jIChmdW5jOiBzdHJpbmcsIHBhcmFtZXRlcnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcImRhdGFiYXNlXCIsIGZ1bmMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGFiYXNlLyR7ZnVuY31gLCBwYXJhbWV0ZXJzLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBVcGxvYWRzIGEgZmlsZSB0byB0aGUgc2VydmVyXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGlkIGV0Y1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBsb2FkRmlsZSA9IGFzeW5jIChmaWxlRGF0YTogYW55LCBmaWxlOiBhbnksIGZvbGRlcklkPzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlVwbG9hZFwiLCBmaWxlRGF0YS5uYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25VcGxvYWRGaWxlKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uVXBsb2FkRmlsZShmaWxlRGF0YSwgZmlsZSwgZm9sZGVySWQpKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZy5lcnJvcigxLCBcIkNhbmNlbGVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChcclxuICAgICAgICAgICAgICAgIGAvZmlsZXNgLFxyXG4gICAgICAgICAgICAgICAgZmlsZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LWZpbGUtbmFtZVwiOiBmaWxlRGF0YS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwieC1maWxlLXR5cGVcIjogZmlsZURhdGEudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBcIngtcmVsYXRpb25cIjogZmlsZURhdGEucmVsYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LXJlbGF0aW9uLWlkXCI6IGZpbGVEYXRhLnJlbGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LWZvbGRlci1pZFwiOiBmb2xkZXJJZCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclVwbG9hZEZpbGUpIHRoaXMuYWZ0ZXJVcGxvYWRGaWxlKGZpbGVEYXRhLCBmaWxlLCBmb2xkZXJJZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25VcGxvYWRGaWxlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJVcGxvYWRGaWxlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gRG93bmxvYWRzIGEgZmlsZSBmcm9tIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSBmaWxlIDotKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG93bmxvYWRGaWxlID0gYXN5bmMgKGZpbGVJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkRvd25sb2FkXCIsIGZpbGVJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhL2ZpbGVzLyR7ZmlsZUlkfS9kb3dubG9hZGAsIHRoaXMuYXV0aEhlYWRlcih7fSwgeyByZXNwb25zZVR5cGU6IFwiYmxvYlwiIH0pKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgaWQgZXRjXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVLcGkgPSBhc3luYyAodHlwZTogc3RyaW5nLCBxdWVyeTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNhbGN1bGF0ZSBLUElcIiwgdHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9rcGlgLCB7IHR5cGUsIHF1ZXJ5IH0sIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExhdW5jaGVzIGEgY3VzdG9tIGZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4ZWMgPSBhc3luYyAoZnVuY3Rpb25OYW1lOiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJFeGVjIGZ1bmN0aW9uXCIsIGZ1bmN0aW9uTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9leGVjLyR7ZnVuY3Rpb25OYW1lfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEk7XHJcbiJdfQ==