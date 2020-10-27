"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _https = _interopRequireDefault(require("https"));

require("regenerator-runtime/runtime");

var _colors = _interopRequireDefault(require("./const/colors"));

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

    if (!data.success) return _this.handleError(data);
    if (_this.debug_level >= 2) _this.log.success(1);
    if (_this.debug_level == 3) _this.log.result(1, data.data); // Return the resulting data;

    return data;
  });

  _defineProperty(this, "handleError", function (data) {
    if (!data) {
      _this.log.error(1, "Something is wrong with your internet connection");

      return {
        name: "SERVER_DOWN",
        message: "The server is currently unavailable"
      };
    }

    if (data.name || data.error) {
      if (_this.onError) _this.onError(data.error);
      if (data.name) return data;else return data.error;
    }

    if (_this.debug_level >= 2) _this.log.message(1, "Response was of type error"); // Get the result data of the request
    // Log the error

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

  _defineProperty(this, "resetPassword",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(username) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.log.request(0, "resetPassword", username);

              return _context2.abrupt("return", _this.instance.post("/auth/resetPassword", {
                username: username
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
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

  _defineProperty(this, "setNewPassword",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(token, password) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.log.request(0, "setNewPassword", token);

              return _context3.abrupt("return", _this.instance.post("/auth/setNewPassword", {
                token: token,
                password: password
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

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

  _defineProperty(this, "find",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(entity) {
      var options,
          _args4 = arguments;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};

              _this.log.request(0, "Find", entity);

              return _context4.abrupt("return", _this.instance.get("/data/".concat(entity, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x6) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getListValues",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(listName) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this.log.request(0, "List of values", listName);

              return _context5.abrupt("return", _this.instance.get("/lists/".concat(listName), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x7) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getLists",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _this.log.request(0, "Lists of values");

            return _context6.abrupt("return", _this.instance.get("/lists", _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));

  _defineProperty(this, "saveListValue",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(listName, data) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this.log.request(0, "List of values", listName);

              return _context7.abrupt("return", _this.instance.post("/lists/".concat(listName), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x8, _x9) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "removeListValue",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(listName, id) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _this.log.request(0, "Delete element of list of values", listName);

              return _context8.abrupt("return", _this.instance["delete"]("/lists/".concat(listName, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x10, _x11) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "search",
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(entity, search) {
      var options,
          _args9 = arguments;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              options = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};

              _this.log.request(0, "Search", entity, search);

              return _context9.abrupt("return", _this.instance.get("/data/".concat(entity, "/search?search=").concat(search, "&options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

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

  _defineProperty(this, "changes",
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(entity, entityId, relation, relationId) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _this.log.request(0, "Changes", entity);

              return _context10.abrupt("return", _this.instance.get("/changes/".concat(entity, "/").concat(entityId), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x14, _x15, _x16, _x17) {
      return _ref10.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOne",
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(entity) {
      var options,
          _args11 = arguments;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};

              _this.log.request(0, "Find one", entity);

              return _context11.abrupt("return", _this.instance.get("/data/".concat(entity, "/one?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x18) {
      return _ref11.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findById",
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(entity, id) {
      var options,
          _args12 = arguments;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              options = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {};

              _this.log.request(0, "Find by id", entity, id);

              return _context12.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x19, _x20) {
      return _ref12.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findRelated",
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(entity, id, relation) {
      var options,
          _args13 = arguments;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              options = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};

              _this.log.request(0, "Find related of id", entity, id);

              return _context13.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "/").concat(relation, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x21, _x22, _x23) {
      return _ref13.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOneRelated",
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(entity, entityId, relation, relationId) {
      var options,
          _args14 = arguments;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              options = _args14.length > 4 && _args14[4] !== undefined ? _args14[4] : {};

              _this.log.request(0, "Find one related of id", entity, entityId);

              return _context14.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x24, _x25, _x26, _x27) {
      return _ref14.apply(this, arguments);
    };
  }());

  _defineProperty(this, "save",
  /*#__PURE__*/
  function () {
    var _ref15 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15(entity, data) {
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (_this.onSave) _this.onSave(entity, data);

              _this.log.request(0, "Save", entity);

              return _context15.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(function (result) {
                if (_this.afterSave) _this.afterSave(entity, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function (_x28, _x29) {
      return _ref15.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSave", void 0);

  _defineProperty(this, "afterSave", void 0);

  _defineProperty(this, "silent_save",
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16(entity, data) {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _this.log.request(0, "Save", entity);

              return _context16.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(function (result) {
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function (_x30, _x31) {
      return _ref16.apply(this, arguments);
    };
  }());

  _defineProperty(this, "saveRelated",
  /*#__PURE__*/
  function () {
    var _ref17 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17(entity, entityId, relation, relationId) {
      var data,
          _args17 = arguments;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              data = _args17.length > 4 && _args17[4] !== undefined ? _args17[4] : {};
              if (_this.onSaveRelated) _this.onSaveRelated(entity, entityId, relation, relationId, data);

              _this.log.request(0, "Save related", entity, entityId, relation, relationId);

              return _context17.abrupt("return", _this.instance.post("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), data, _this.authHeader()).then(function (result) {
                if (_this.afterSaveRelated) _this.afterSaveRelated(entity, entityId, relation, relationId, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));

    return function (_x32, _x33, _x34, _x35) {
      return _ref17.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSaveRelated", void 0);

  _defineProperty(this, "afterSaveRelated", void 0);

  _defineProperty(this, "removeRelated",
  /*#__PURE__*/
  function () {
    var _ref18 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18(entity, entityId, relation, relationId) {
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _this.log.request(0, "Delete related", entity, entityId, relation, relationId);

              if (!_this.onRemoveRelated) {
                _context18.next = 6;
                break;
              }

              _context18.next = 4;
              return _this.onRemoveRelated(entity, entityId, relation, relationId);

            case 4:
              if (_context18.sent) {
                _context18.next = 6;
                break;
              }

              return _context18.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context18.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), _this.authHeader()).then(function (result) {
                if (_this.afterRemoveRelated) _this.afterRemoveRelated(entity, entityId, relation, relationId, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function (_x36, _x37, _x38, _x39) {
      return _ref18.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemoveRelated", void 0);

  _defineProperty(this, "afterRemoveRelated", void 0);

  _defineProperty(this, "remove",
  /*#__PURE__*/
  function () {
    var _ref19 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19(entity, id) {
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _this.log.request(0, "Remove", entity, id);

              if (!_this.onRemove) {
                _context19.next = 6;
                break;
              }

              _context19.next = 4;
              return _this.onRemove(entity, id);

            case 4:
              if (_context19.sent) {
                _context19.next = 6;
                break;
              }

              return _context19.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context19.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(function (result) {
                if (_this.afterDelete) _this.afterDelete(entity, id, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));

    return function (_x40, _x41) {
      return _ref19.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemove", void 0);

  _defineProperty(this, "afterDelete", void 0);

  _defineProperty(this, "config",
  /*#__PURE__*/
  function () {
    var _ref20 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var entity,
          URL,
          _args20 = arguments;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              entity = _args20.length > 0 && _args20[0] !== undefined ? _args20[0] : null;

              _this.log.request(0, "Config", entity || "global");

              URL = !entity ? "/config" : "/config/".concat(entity);
              return _context20.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function () {
      return _ref20.apply(this, arguments);
    };
  }());

  _defineProperty(this, "database",
  /*#__PURE__*/
  function () {
    var _ref21 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21(func) {
      var parameters,
          _args21 = arguments;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              parameters = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : {};

              _this.log.request(0, "database", func);

              return _context21.abrupt("return", _this.instance.post("/database/".concat(func), parameters, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }));

    return function (_x42) {
      return _ref21.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFile",
  /*#__PURE__*/
  function () {
    var _ref22 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee22(fileData, file, folderId) {
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _this.log.request(0, "Upload", fileData.name);

              if (!_this.onUploadFile) {
                _context22.next = 6;
                break;
              }

              _context22.next = 4;
              return _this.onUploadFile(fileData, file, folderId);

            case 4:
              if (_context22.sent) {
                _context22.next = 6;
                break;
              }

              return _context22.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context22.abrupt("return", _this.instance.post("/files", file, _this.authHeader({
                "x-file-name": fileData.name,
                "x-file-type": fileData.type,
                "x-relation": fileData.relation,
                "x-relation-id": fileData.relationId,
                "x-folder-id": folderId || 0
              }, {
                timeout: 60000
              })).then(function (result) {
                if (_this.afterUploadFile) _this.afterUploadFile(fileData, file, folderId, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }));

    return function (_x43, _x44, _x45) {
      return _ref22.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onUploadFile", void 0);

  _defineProperty(this, "afterUploadFile", void 0);

  _defineProperty(this, "downloadFile",
  /*#__PURE__*/
  function () {
    var _ref23 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee23(fileId) {
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _this.log.request(0, "Download", fileId);

              return _context23.abrupt("return", _this.instance.get("/data/files/".concat(fileId, "/download"), _this.authHeader({}, {
                responseType: "blob"
              })).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    }));

    return function (_x46) {
      return _ref23.apply(this, arguments);
    };
  }());

  _defineProperty(this, "calculateKpi",
  /*#__PURE__*/
  function () {
    var _ref24 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee24(type, query) {
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _this.log.request(0, "Calculate KPI", type);

              return _context24.abrupt("return", _this.instance.post("/kpi", {
                type: type,
                query: query
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }));

    return function (_x47, _x48) {
      return _ref24.apply(this, arguments);
    };
  }());

  _defineProperty(this, "exec",
  /*#__PURE__*/
  function () {
    var _ref25 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee25(functionName, data) {
      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _this.log.request(0, "Exec function", functionName);

              return _context25.abrupt("return", _this.instance.post("/exec/".concat(functionName), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    }));

    return function (_x49, _x50) {
      return _ref25.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getSaasSettings",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee26() {
    return regeneratorRuntime.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _this.log.request(0, "GetSaasSettings");

            return _context26.abrupt("return", _this.instance.get("/saas", {
              headers: {
                secret: "21th6dr/5t1qze3r51F6*<S85G4QE85E1Y6E*"
              }
            }).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  })));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImFwaV90aW1lb3V0IiwiZGVidWdfbGV2ZWwiLCJsb2ciLCJtZXNzYWdlIiwiYXhpb3MiLCJjcmVhdGUiLCJiYXNlVVJMIiwidGltZW91dCIsImh0dHBzQWdlbnQiLCJodHRwcyIsIkFnZW50IiwicmVqZWN0VW5hdXRob3JpemVkIiwicmVzcG9uc2UiLCJkYXRhIiwic3VjY2VzcyIsImhhbmRsZUVycm9yIiwicmVzdWx0IiwiZXJyb3IiLCJuYW1lIiwib25FcnJvciIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjb25zb2xlIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZ2N5YW4iLCJuIiwiaW5kZW50IiwibG9nc19pbmRlbnQiLCJleHRyYUhlYWRlcnMiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcklkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwicG9zdCIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImF1dGhIZWFkZXIiLCJlbnRpdHkiLCJvcHRpb25zIiwiZ2V0IiwibGlzdE5hbWUiLCJpZCIsInNlYXJjaCIsImVudGl0eUlkIiwicmVsYXRpb24iLCJyZWxhdGlvbklkIiwib25TYXZlIiwiYWZ0ZXJTYXZlIiwib25TYXZlUmVsYXRlZCIsImFmdGVyU2F2ZVJlbGF0ZWQiLCJvblJlbW92ZVJlbGF0ZWQiLCJhZnRlclJlbW92ZVJlbGF0ZWQiLCJvblJlbW92ZSIsImFmdGVyRGVsZXRlIiwiVVJMIiwiZnVuYyIsInBhcmFtZXRlcnMiLCJmaWxlRGF0YSIsImZpbGUiLCJmb2xkZXJJZCIsIm9uVXBsb2FkRmlsZSIsInR5cGUiLCJhZnRlclVwbG9hZEZpbGUiLCJmaWxlSWQiLCJyZXNwb25zZVR5cGUiLCJxdWVyeSIsImZ1bmN0aW9uTmFtZSIsInNlY3JldCIsIkVycm9yIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLEcsR0FDRjs7QUFDQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTtBQUdBO0FBQ0EsYUFBWUMsT0FBWixFQUF5RDtBQUFBOztBQUFBLE1BQTVCQyxXQUE0Qix1RUFBTixJQUFNOztBQUFBOztBQUFBOztBQUFBLHVDQXJCNUIsQ0FxQjRCOztBQUFBLHVDQWxCNUIsQ0FrQjRCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQUg1QixJQUc0Qjs7QUFBQSxnQ0FjMUMsWUFBTTtBQUNqQixRQUFJLEtBQUksQ0FBQ0MsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiw2QkFBcEI7QUFFM0IsV0FBT0Msa0JBQU1DLE1BQU4sQ0FBYTtBQUNoQkMsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsT0FERTtBQUVoQlEsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsV0FGRTtBQUdoQlEsTUFBQUEsVUFBVSxFQUFFLElBQUlDLGtCQUFNQyxLQUFWLENBQWdCO0FBQ3hCQyxRQUFBQSxrQkFBa0IsRUFBRTtBQURJLE9BQWhCO0FBSEksS0FBYixDQUFQO0FBT0gsR0F4QndEOztBQUFBOztBQUFBLDBDQTJCaEMsVUFBQ0MsUUFBRCxFQUFrQztBQUN2RCxRQUFJLEtBQUksQ0FBQ1gsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiwyQkFBcEIsRUFENEIsQ0FFdkQ7O0FBQ0EsUUFBSVUsSUFBSSxHQUFHRCxRQUFRLENBQUNDLElBQXBC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Q0FBQ1gsR0FBTCxDQUFTK0IsT0FBVCxDQUFpQixDQUFqQixFQUFvQixlQUFwQixFQUFxQ3NELFlBQXJDOztBQURVLGlEQUVILEtBQUksQ0FBQ25DLFFBQUwsQ0FDRkMsSUFERSxpQkFDWWtDLFlBRFosR0FDNEIxRSxJQUQ1QixFQUNrQyxLQUFJLENBQUM0QyxVQUFMLEVBRGxDLEVBRUZILElBRkUsQ0FFRyxLQUFJLENBQUNDLGNBRlIsV0FHSSxLQUFJLENBQUN4QyxXQUhULENBRkc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FsakIyQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQThqQmhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDckIsWUFBQSxLQUFJLENBQUNiLEdBQUwsQ0FBUytCLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0IsaUJBQXBCOztBQURxQiwrQ0FFZCxLQUFJLENBQUNtQixRQUFMLENBQ0ZRLEdBREUsVUFDVztBQUFFZCxjQUFBQSxPQUFPLEVBQUU7QUFBRTBDLGdCQUFBQSxNQUFNLEVBQUU7QUFBVjtBQUFYLGFBRFgsRUFFRmxDLElBRkUsQ0FFRyxLQUFJLENBQUNDLGNBRlIsV0FHSSxLQUFJLENBQUN4QyxXQUhULENBRmM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0E5akJnQzs7QUFDckQsTUFBSSxDQUFDaEIsT0FBTCxFQUFjLE1BQU0sSUFBSTBGLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBRWQsT0FBSzFGLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBRUEsT0FBS29ELFFBQUwsR0FBZ0IsS0FBS3NDLElBQUwsRUFBaEI7QUFDSCxDLENBRUQ7O0FBQ0E7Ozs7OztlQTZqQlc1RixHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVzcG9uc2UgfSBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xyXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcclxuaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi9jb25zdC9jb2xvcnNcIjtcclxuXHJcbmNsYXNzIEFQSSB7XHJcbiAgICAvLyAqIFZBUklBQkxFUyAqXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgY29udGFpbnMgdGhlIHRva2VuIG9mIHRoZSB1c2VyICovXHJcbiAgICBwdWJsaWMgdG9rZW4hOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiAwID0gbm9uZSwgMSA9IG5vcm1hbCwgMiA9IGRldGFpbGVkLCAzID0gZGV0YWlsZWQgKyByZXN1bHRzICovXHJcbiAgICBwdWJsaWMgZGVidWdfbGV2ZWw6IG51bWJlciA9IDE7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBFeHRyYSBpbmRlbnQgZm9yIGxvZ3MgKi9cclxuICAgIHB1YmxpYyBsb2dzX2luZGVudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgc3RhcnQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgZW5kIHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgZW5kITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHZhcmlhYmxlIHRoYXQgd2lsbCBjb250YWluIHRoZSBBWElPUyBpbnN0YW5jZSAqL1xyXG4gICAgcHJpdmF0ZSBpbnN0YW5jZTogQXhpb3NJbnN0YW5jZTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gdGhlIENSTSBiYWNrZW5kICovXHJcbiAgICBwcml2YXRlIGFwaV91cmw/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdGltZW91dCB0aW1lIHRvIHRoZSBBUEkgKi9cclxuICAgIHB1YmxpYyBhcGlfdGltZW91dDogbnVtYmVyID0gMzAwMDtcclxuXHJcbiAgICAvLyAqIENPTlNUUlVDVE9SICpcclxuICAgIGNvbnN0cnVjdG9yKGFwaV91cmw6IHN0cmluZywgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDMwMDApIHtcclxuICAgICAgICBpZiAoIWFwaV91cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIEFQSSB1cmwgaGFzIGJlZW4gc2V0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFwaV91cmwgPSBhcGlfdXJsO1xyXG4gICAgICAgIHRoaXMuYXBpX3RpbWVvdXQgPSBhcGlfdGltZW91dDtcclxuXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICogUFJJVkFURSBNRVRIT0RTICpcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEF4aW9zIGluc3RhbmNlIHdpdGggdGhlIFVSTCBhbmQgaGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgQW4gYXhpb3MgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJBeGlvcyBoYXMgYmVlbiBpbnRpdGlhbGl6ZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiB0aGlzLmFwaV91cmwsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMuYXBpX3RpbWVvdXQsXHJcbiAgICAgICAgICAgIGh0dHBzQWdlbnQ6IG5ldyBodHRwcy5BZ2VudCh7XHJcbiAgICAgICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uRXJyb3IhOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSBpcyBiZWluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIHN1Y2Nlc3MsIHJlZGlyZWN0IHRvIHRoZSBlcnJvciBmdW5jdGlvblxyXG4gICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cuc3VjY2VzcygxKTtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgZGF0YS5kYXRhKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSByZXN1bHRpbmcgZGF0YTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgYFNvbWV0aGluZyBpcyB3cm9uZyB3aXRoIHlvdXIgaW50ZXJuZXQgY29ubmVjdGlvbmApO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJTRVJWRVJfRE9XTlwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgc2VydmVyIGlzIGN1cnJlbnRseSB1bmF2YWlsYWJsZVwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubmFtZSB8fCBkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHRoaXMub25FcnJvcihkYXRhLmVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLm5hbWUpIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICBlbHNlIHJldHVybiBkYXRhLmVycm9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIlJlc3BvbnNlIHdhcyBvZiB0eXBlIGVycm9yXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuXHJcbiAgICAgICAgLy8gTG9nIHRoZSBlcnJvclxyXG4gICAgICAgIHRoaXMubG9nLmVycm9yKDEsIGRhdGEuZXJyb3IubmFtZSwgZGF0YS5lcnJvci5tZXNzYWdlKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlcnJvclxyXG4gICAgICAgIHJldHVybiBkYXRhLmVycm9yO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBDdXN0b20gbG9nZ2luZyBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZyA9IHtcclxuICAgICAgICBlcnJvcjogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdyZWR9W0VSUk9SIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VjY2VzczogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2dyZWVufVtTVUNDRVNTIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVxdWVzdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnYmx1ZX1bQVBJIFJFUVVFU1RdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXN1bHQ6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmd5ZWxsb3d9W1JFU1VMVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5tYXAoKG1tKSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVJbmRlbnQ6IChuOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiArIHRoaXMubG9nc19pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRoSGVhZGVyID0gKGV4dHJhSGVhZGVycz86IGFueSwgZXh0cmFPcHRpb25zOiBhbnkgPSB7fSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJHZW5lcmF0ZSBhdXRoIGhlYWRlclwiKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5leHRyYU9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAuLi5leHRyYUhlYWRlcnMsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gKiBQVUJMSUMgTUVUSE9EUyAqXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0b2RvIEltcGxlbWVudCBpbXBlcnNvbmF0aW9uIGluIGJhY2tlbmRcclxuICAgICAqIEBkZXNjcmlwdGlvbiBJbXBlcnNvbmF0ZSBhIHVzZXJcclxuICAgICAqIEByZXR1cm5zIE9LIG9yIE5PS1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW1wZXJzb25hdGUgPSAodXNlcklkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiSW1wZXJzb25hdGVcIiwgdXNlcklkKTtcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBcIkltcGVyc29uYXRpb24gaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkIHlldFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTG9ncyBhIGdpdmVuIHVzZXIgaW5cclxuICAgICAqIEByZXR1cm5zIFRoZSBhdXRoZW50aWZpY2F0aW9uIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2dpbiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxvZ2luXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChcIi9hdXRoL2xvZ2luXCIsIHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbi5kYXRhKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcih0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgXCJUb2tlbiBsZW5ndGhcIiwgdG9rZW4uZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgYSByZXNldCBwYXNzd29yZCB0b2tlbiA9PiBUaGlzIGlzIHNlbmQgYnkgZW1haWxcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRQYXNzd29yZCA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcInJlc2V0UGFzc3dvcmRcIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvYXV0aC9yZXNldFBhc3N3b3JkYCwgeyB1c2VybmFtZSB9LCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZW5lcmF0ZSBhIHJlc2V0IHBhc3N3b3JkIHRva2VuID0+IFRoaXMgaXMgc2VuZCBieSBlbWFpbFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROZXdQYXNzd29yZCA9IGFzeW5jICh0b2tlbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcInNldE5ld1Bhc3N3b3JkXCIsIHRva2VuKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2F1dGgvc2V0TmV3UGFzc3dvcmRgLCB7IHRva2VuLCBwYXNzd29yZCB9LCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGlzdFZhbHVlcyA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3Qgb2YgdmFsdWVzXCIsIGxpc3ROYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvbGlzdHMvJHtsaXN0TmFtZX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3RzIG9mIHZhbHVlc1xyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMaXN0cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdHMgb2YgdmFsdWVzXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9saXN0c2AsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiB2YWx1ZXMgZm9yIGEgbGlzdFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlTGlzdFZhbHVlID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9saXN0cy8ke2xpc3ROYW1lfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiB2YWx1ZXMgZm9yIGEgbGlzdFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0VmFsdWUgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJEZWxldGUgZWxlbWVudCBvZiBsaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2xpc3RzLyR7bGlzdE5hbWV9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eSB3aXRoIGEgc2VhcmNoIGNyaXRlcmlhXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlYXJjaCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNlYXJjaFwiLCBlbnRpdHksIHNlYXJjaCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vc2VhcmNoP3NlYXJjaD0ke3NlYXJjaH0mb3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eSB3aXRoIGEgc2VhcmNoIGNyaXRlcmlhXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZXMgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbj86IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkPzogbnVtYmVyXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ2hhbmdlc1wiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9jaGFuZ2VzLyR7ZW50aXR5fS8ke2VudGl0eUlkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBvbmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vb25lP29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRCeUlkID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIGJ5IGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHJlbGF0ZWQgZWxlbWVudHMgb2YgcmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICBvcHRpb25zOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgcmVsYXRlZCBvZiBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fS8ke2lkfS8ke3JlbGF0aW9ufT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcmVsYXRlZCBlbGVtZW50cyBvZiByZWNvcmRcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBvcHRpb25zOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgb25lIHJlbGF0ZWQgb2YgaWRcIiwgZW50aXR5LCBlbnRpdHlJZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYW4gZWxlbWVudCB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlKSB0aGlzLm9uU2F2ZShlbnRpdHksIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJTYXZlKSB0aGlzLmFmdGVyU2F2ZShlbnRpdHksIGRhdGEsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uU2F2ZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyU2F2ZSE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYW4gZWxlbWVudCB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2lsZW50X3NhdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBkYXRhOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlUmVsYXRlZCkgdGhpcy5vblNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNhdmUgcmVsYXRlZFwiLCBlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmVSZWxhdGVkITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJTYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlbW92ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlJlbW92ZVwiLCBlbnRpdHksIGlkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25SZW1vdmUpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmUoZW50aXR5LCBpZCkpKSByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyRGVsZXRlKSB0aGlzLmFmdGVyRGVsZXRlKGVudGl0eSwgaWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uUmVtb3ZlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJEZWxldGUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uZmlnID0gYXN5bmMgKGVudGl0eTogc3RyaW5nIHwgbnVsbCA9IG51bGwpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ29uZmlnXCIsIGVudGl0eSB8fCBcImdsb2JhbFwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgVVJMID0gIWVudGl0eSA/IFwiL2NvbmZpZ1wiIDogYC9jb25maWcvJHtlbnRpdHl9YDtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFVSTCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRhdGFiYXNlID0gYXN5bmMgKGZ1bmM6IHN0cmluZywgcGFyYW1ldGVyczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiZGF0YWJhc2VcIiwgZnVuYyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YWJhc2UvJHtmdW5jfWAsIHBhcmFtZXRlcnMsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgaWQgZXRjXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGxvYWRGaWxlID0gYXN5bmMgKGZpbGVEYXRhOiBhbnksIGZpbGU6IGFueSwgZm9sZGVySWQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiVXBsb2FkXCIsIGZpbGVEYXRhLm5hbWUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblVwbG9hZEZpbGUpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25VcGxvYWRGaWxlKGZpbGVEYXRhLCBmaWxlLCBmb2xkZXJJZCkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KFxyXG4gICAgICAgICAgICAgICAgYC9maWxlc2AsXHJcbiAgICAgICAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ4LWZpbGUtbmFtZVwiOiBmaWxlRGF0YS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIngtZmlsZS10eXBlXCI6IGZpbGVEYXRhLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieC1yZWxhdGlvblwiOiBmaWxlRGF0YS5yZWxhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ4LXJlbGF0aW9uLWlkXCI6IGZpbGVEYXRhLnJlbGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieC1mb2xkZXItaWRcIjogZm9sZGVySWQgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGltZW91dDogNjAwMDAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyVXBsb2FkRmlsZSkgdGhpcy5hZnRlclVwbG9hZEZpbGUoZmlsZURhdGEsIGZpbGUsIGZvbGRlcklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblVwbG9hZEZpbGUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclVwbG9hZEZpbGUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBEb3dubG9hZHMgYSBmaWxlIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIGZpbGUgOi0pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZEZpbGUgPSBhc3luYyAoZmlsZUlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRG93bmxvYWRcIiwgZmlsZUlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvZmlsZXMvJHtmaWxlSWR9L2Rvd25sb2FkYCwgdGhpcy5hdXRoSGVhZGVyKHt9LCB7IHJlc3BvbnNlVHlwZTogXCJibG9iXCIgfSkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBsb2FkcyBhIGZpbGUgdG8gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBpZCBldGNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUtwaSA9IGFzeW5jICh0eXBlOiBzdHJpbmcsIHF1ZXJ5OiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ2FsY3VsYXRlIEtQSVwiLCB0eXBlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2twaWAsIHsgdHlwZSwgcXVlcnkgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTGF1bmNoZXMgYSBjdXN0b20gZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXhlYyA9IGFzeW5jIChmdW5jdGlvbk5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkV4ZWMgZnVuY3Rpb25cIiwgZnVuY3Rpb25OYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2V4ZWMvJHtmdW5jdGlvbk5hbWV9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBTQUFTIHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNhYXNTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiR2V0U2Fhc1NldHRpbmdzXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9zYWFzYCwgeyBoZWFkZXJzOiB7IHNlY3JldDogXCIyMXRoNmRyLzV0MXF6ZTNyNTFGNio8Uzg1RzRRRTg1RTFZNkUqXCIgfSB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEk7XHJcbiJdfQ==