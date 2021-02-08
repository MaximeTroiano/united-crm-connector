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
              URL += "?nocache=" + new Date().getTime() * Math.random();
              return _context20.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 5:
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

              return _context21.abrupt("return", _this.instance.post("/database/".concat(func), parameters, _this.authHeader({}, {
                timeout: 120000
              })).then(_this.handleResponse)["catch"](_this.handleError));

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

              return _context25.abrupt("return", _this.instance.post("/exec/".concat(functionName), data, _this.authHeader({}, {
                timeout: 120000
              })).then(_this.handleResponse)["catch"](_this.handleError));

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

  _defineProperty(this, "triggerSocket",
  /*#__PURE__*/
  function () {
    var _ref26 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee26(socketIdentifier, data) {
      return regeneratorRuntime.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _this.log.request(0, "Trigger socket", socketIdentifier);

              return _context26.abrupt("return", _this.instance.post("/live-events/".concat(socketIdentifier, "/trigger"), data, _this.authHeader({}, {
                timeout: 120000
              })).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    }));

    return function (_x51, _x52) {
      return _ref26.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getSaasSettings",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee27() {
    return regeneratorRuntime.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _this.log.request(0, "GetSaasSettings");

            return _context27.abrupt("return", _this.instance.get("/saas", {
              headers: {
                secret: "21th6dr/5t1qze3r51F6*<S85G4QE85E1Y6E*"
              }
            }).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImFwaV90aW1lb3V0IiwiZGVidWdfbGV2ZWwiLCJsb2ciLCJtZXNzYWdlIiwiYXhpb3MiLCJjcmVhdGUiLCJiYXNlVVJMIiwidGltZW91dCIsImh0dHBzQWdlbnQiLCJodHRwcyIsIkFnZW50IiwicmVqZWN0VW5hdXRob3JpemVkIiwicmVzcG9uc2UiLCJkYXRhIiwic3VjY2VzcyIsImhhbmRsZUVycm9yIiwicmVzdWx0IiwiZXJyb3IiLCJuYW1lIiwib25FcnJvciIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjb25zb2xlIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZ2N5YW4iLCJuIiwiaW5kZW50IiwibG9nc19pbmRlbnQiLCJleHRyYUhlYWRlcnMiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcklkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwicG9zdCIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImF1dGhIZWFkZXIiLCJlbnRpdHkiLCJvcHRpb25zIiwiZ2V0IiwibGlzdE5hbWUiLCJpZCIsInNlYXJjaCIsImVudGl0eUlkIiwicmVsYXRpb24iLCJyZWxhdGlvbklkIiwib25TYXZlIiwiYWZ0ZXJTYXZlIiwib25TYXZlUmVsYXRlZCIsImFmdGVyU2F2ZVJlbGF0ZWQiLCJvblJlbW92ZVJlbGF0ZWQiLCJhZnRlclJlbW92ZVJlbGF0ZWQiLCJvblJlbW92ZSIsImFmdGVyRGVsZXRlIiwiVVJMIiwiTWF0aCIsInJhbmRvbSIsImZ1bmMiLCJwYXJhbWV0ZXJzIiwiZmlsZURhdGEiLCJmaWxlIiwiZm9sZGVySWQiLCJvblVwbG9hZEZpbGUiLCJ0eXBlIiwiYWZ0ZXJVcGxvYWRGaWxlIiwiZmlsZUlkIiwicmVzcG9uc2VUeXBlIiwicXVlcnkiLCJmdW5jdGlvbk5hbWUiLCJzb2NrZXRJZGVudGlmaWVyIiwic2VjcmV0IiwiRXJyb3IiLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsRyxHQUNGOztBQUNBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBO0FBR0E7QUFDQSxhQUFZQyxPQUFaLEVBQXlEO0FBQUE7O0FBQUEsTUFBNUJDLFdBQTRCLHVFQUFOLElBQU07O0FBQUE7O0FBQUE7O0FBQUEsdUNBckI1QixDQXFCNEI7O0FBQUEsdUNBbEI1QixDQWtCNEI7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsdUNBSDVCLElBRzRCOztBQUFBLGdDQWMxQyxZQUFNO0FBQ2pCLFFBQUksS0FBSSxDQUFDQyxXQUFMLElBQW9CLENBQXhCLEVBQTJCLEtBQUksQ0FBQ0MsR0FBTCxDQUFTQyxPQUFULENBQWlCLENBQWpCLEVBQW9CLDZCQUFwQjtBQUUzQixXQUFPQyxrQkFBTUMsTUFBTixDQUFhO0FBQ2hCQyxNQUFBQSxPQUFPLEVBQUUsS0FBSSxDQUFDUCxPQURFO0FBRWhCUSxNQUFBQSxPQUFPLEVBQUUsS0FBSSxDQUFDUCxXQUZFO0FBR2hCUSxNQUFBQSxVQUFVLEVBQUUsSUFBSUMsa0JBQU1DLEtBQVYsQ0FBZ0I7QUFDeEJDLFFBQUFBLGtCQUFrQixFQUFFO0FBREksT0FBaEI7QUFISSxLQUFiLENBQVA7QUFPSCxHQXhCd0Q7O0FBQUE7O0FBQUEsMENBMkJoQyxVQUFDQyxRQUFELEVBQWtDO0FBQ3ZELFFBQUksS0FBSSxDQUFDWCxXQUFMLElBQW9CLENBQXhCLEVBQTJCLEtBQUksQ0FBQ0MsR0FBTCxDQUFTQyxPQUFULENBQWlCLENBQWpCLEVBQW9CLDJCQUFwQixFQUQ0QixDQUV2RDs7QUFD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QUFBO0FBQUE7QUFBQTtBQUFBLEtBL2pCa0M7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkEra0JoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3JCLFlBQUEsS0FBSSxDQUFDYixHQUFMLENBQVMrQixPQUFULENBQWlCLENBQWpCLEVBQW9CLGlCQUFwQjs7QUFEcUIsK0NBRWQsS0FBSSxDQUFDbUIsUUFBTCxDQUNGUSxHQURFLFVBQ1c7QUFBRWQsY0FBQUEsT0FBTyxFQUFFO0FBQUU2QyxnQkFBQUEsTUFBTSxFQUFFO0FBQVY7QUFBWCxhQURYLEVBRUZyQyxJQUZFLENBRUcsS0FBSSxDQUFDQyxjQUZSLFdBR0ksS0FBSSxDQUFDeEMsV0FIVCxDQUZjOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBL2tCZ0M7O0FBQ3JELE1BQUksQ0FBQ2hCLE9BQUwsRUFBYyxNQUFNLElBQUk2RixLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUVkLE9BQUs3RixPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUVBLE9BQUtvRCxRQUFMLEdBQWdCLEtBQUt5QyxJQUFMLEVBQWhCO0FBQ0gsQyxDQUVEOztBQUNBOzs7Ozs7ZUE4a0JXL0YsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcywgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcclxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4vY29uc3QvY29sb3JzXCI7XHJcblxyXG5jbGFzcyBBUEkge1xyXG4gICAgLy8gKiBWQVJJQUJMRVMgKlxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIGNvbnRhaW5zIHRoZSB0b2tlbiBvZiB0aGUgdXNlciAqL1xyXG4gICAgcHVibGljIHRva2VuITogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gMCA9IG5vbmUsIDEgPSBub3JtYWwsIDIgPSBkZXRhaWxlZCwgMyA9IGRldGFpbGVkICsgcmVzdWx0cyAqL1xyXG4gICAgcHVibGljIGRlYnVnX2xldmVsOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gRXh0cmEgaW5kZW50IGZvciBsb2dzICovXHJcbiAgICBwdWJsaWMgbG9nc19pbmRlbnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIHN0YXJ0IHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgc3RhcnQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIGVuZCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIGVuZCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB2YXJpYWJsZSB0aGF0IHdpbGwgY29udGFpbiB0aGUgQVhJT1MgaW5zdGFuY2UgKi9cclxuICAgIHByaXZhdGUgaW5zdGFuY2U6IEF4aW9zSW5zdGFuY2U7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgVVJMIHRvIHRoZSBDUk0gYmFja2VuZCAqL1xyXG4gICAgcHJpdmF0ZSBhcGlfdXJsPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHRpbWVvdXQgdGltZSB0byB0aGUgQVBJICovXHJcbiAgICBwdWJsaWMgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDMwMDA7XHJcblxyXG4gICAgLy8gKiBDT05TVFJVQ1RPUiAqXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlfdXJsOiBzdHJpbmcsIGFwaV90aW1lb3V0OiBudW1iZXIgPSAzMDAwKSB7XHJcbiAgICAgICAgaWYgKCFhcGlfdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBBUEkgdXJsIGhhcyBiZWVuIHNldFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcGlfdXJsID0gYXBpX3VybDtcclxuICAgICAgICB0aGlzLmFwaV90aW1lb3V0ID0gYXBpX3RpbWVvdXQ7XHJcblxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAqIFBSSVZBVEUgTUVUSE9EUyAqXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBBeGlvcyBpbnN0YW5jZSB3aXRoIHRoZSBVUkwgYW5kIGhlYWRlcnNcclxuICAgICAqIEByZXR1cm5zIEFuIGF4aW9zIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiQXhpb3MgaGFzIGJlZW4gaW50aXRpYWxpemVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcclxuICAgICAgICAgICAgYmFzZVVSTDogdGhpcy5hcGlfdXJsLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLmFwaV90aW1lb3V0LFxyXG4gICAgICAgICAgICBodHRwc0FnZW50OiBuZXcgaHR0cHMuQWdlbnQoe1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBvbkVycm9yITogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlID0gKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiUmVzcG9uc2UgaXMgYmVpbmcgaGFuZGxlZFwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBJZiBubyBzdWNjZXNzLCByZWRpcmVjdCB0byB0aGUgZXJyb3IgZnVuY3Rpb25cclxuICAgICAgICBpZiAoIWRhdGEuc3VjY2VzcykgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLnN1Y2Nlc3MoMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIGRhdGEuZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKDEsIGBTb21ldGhpbmcgaXMgd3Jvbmcgd2l0aCB5b3VyIGludGVybmV0IGNvbm5lY3Rpb25gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0VSVkVSX0RPV05cIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHNlcnZlciBpcyBjdXJyZW50bHkgdW5hdmFpbGFibGVcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm5hbWUgfHwgZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbkVycm9yKSB0aGlzLm9uRXJyb3IoZGF0YS5lcnJvcik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5uYW1lKSByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gZGF0YS5lcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSB3YXMgb2YgdHlwZSBlcnJvclwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcblxyXG4gICAgICAgIC8vIExvZyB0aGUgZXJyb3JcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBkYXRhLmVycm9yLm5hbWUsIGRhdGEuZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgZXJyb3JcclxuICAgICAgICByZXR1cm4gZGF0YS5lcnJvcjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3VzdG9tIGxvZ2dpbmcgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2cgPSB7XHJcbiAgICAgICAgZXJyb3I6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZncmVkfVtFUlJPUiBpbiAke3RoaXMuZW5kIC0gdGhpcy5zdGFydH1tc11gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN1Y2Nlc3M6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdncmVlbn1bU1VDQ0VTUyBpbiAke3RoaXMuZW5kIC0gdGhpcy5zdGFydH1tc11gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlcXVlc3Q6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2JsdWV9W0FQSSBSRVFVRVNUXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVzdWx0OiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZneWVsbG93fVtSRVNVTFRdYCxcclxuICAgICAgICAgICAgICAgIG0ubWFwKChtbSkgPT4gSlNPTi5zdHJpbmdpZnkobW0pKS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1lc3NhZ2U6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdjeWFufVtNRVNTQUdFXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlSW5kZW50OiAobjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbmRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG4gKyB0aGlzLmxvZ3NfaW5kZW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiAgICBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgYXV0aEhlYWRlciA9IChleHRyYUhlYWRlcnM/OiBhbnksIGV4dHJhT3B0aW9uczogYW55ID0ge30pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiR2VuZXJhdGUgYXV0aCBoZWFkZXJcIik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uZXh0cmFPcHRpb25zLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgLi4uZXh0cmFIZWFkZXJzLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vICogUFVCTElDIE1FVEhPRFMgKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdG9kbyBJbXBsZW1lbnQgaW1wZXJzb25hdGlvbiBpbiBiYWNrZW5kXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW1wZXJzb25hdGUgYSB1c2VyXHJcbiAgICAgKiBAcmV0dXJucyBPSyBvciBOT0tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcGVyc29uYXRlID0gKHVzZXJJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkltcGVyc29uYXRlXCIsIHVzZXJJZCk7XHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgXCJJbXBlcnNvbmF0aW9uIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZCB5ZXRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYSBnaXZlbiB1c2VyIGluXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXV0aGVudGlmaWNhdGlvbiB0b2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMb2dpblwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9sb2dpblwiLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAudGhlbigodG9rZW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdG9rZW4uZGF0YSkgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IodG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIFwiVG9rZW4gbGVuZ3RoXCIsIHRva2VuLmRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdlbmVyYXRlIGEgcmVzZXQgcGFzc3dvcmQgdG9rZW4gPT4gVGhpcyBpcyBzZW5kIGJ5IGVtYWlsXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0UGFzc3dvcmQgPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJyZXNldFBhc3N3b3JkXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2F1dGgvcmVzZXRQYXNzd29yZGAsIHsgdXNlcm5hbWUgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgYSByZXNldCBwYXNzd29yZCB0b2tlbiA9PiBUaGlzIGlzIHNlbmQgYnkgZW1haWxcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TmV3UGFzc3dvcmQgPSBhc3luYyAodG9rZW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJzZXROZXdQYXNzd29yZFwiLCB0b2tlbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9hdXRoL3NldE5ld1Bhc3N3b3JkYCwgeyB0b2tlbiwgcGFzc3dvcmQgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZFwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpc3RWYWx1ZXMgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2xpc3RzLyR7bGlzdE5hbWV9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0cyBvZiB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGlzdHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3RzIG9mIHZhbHVlc1wiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvbGlzdHNgLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZUxpc3RWYWx1ZSA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvbGlzdHMvJHtsaXN0TmFtZX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdFZhbHVlID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIGVsZW1lbnQgb2YgbGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9saXN0cy8ke2xpc3ROYW1lfS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHkgd2l0aCBhIHNlYXJjaCBjcml0ZXJpYVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWFyY2ggPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTZWFyY2hcIiwgZW50aXR5LCBzZWFyY2gpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9L3NlYXJjaD9zZWFyY2g9JHtzZWFyY2h9Jm9wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHkgd2l0aCBhIHNlYXJjaCBjcml0ZXJpYVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VzID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb24/OiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZD86IG51bWJlclxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNoYW5nZXNcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvY2hhbmdlcy8ke2VudGl0eX0vJHtlbnRpdHlJZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRPbmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgb25lXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9L29uZT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IG9uZSBlbGVtZW50IG9mIGFuIGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kQnlJZCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlciwgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBieSBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vJHtpZH0/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCByZWxhdGVkIGVsZW1lbnRzIG9mIHJlY29yZFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBpZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgb3B0aW9uczogb2JqZWN0ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIHJlbGF0ZWQgb2YgaWRcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vJHtpZH0vJHtyZWxhdGlvbn0/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHJlbGF0ZWQgZWxlbWVudHMgb2YgcmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRPbmVSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkOiBudW1iZXIsXHJcbiAgICAgICAgb3B0aW9uczogb2JqZWN0ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIG9uZSByZWxhdGVkIG9mIGlkXCIsIGVudGl0eSwgZW50aXR5SWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH0/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICl9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGFuIGVsZW1lbnQgdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2F2ZSkgdGhpcy5vblNhdmUoZW50aXR5LCBkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNhdmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGEvJHtlbnRpdHl9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZSkgdGhpcy5hZnRlclNhdmUoZW50aXR5LCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclNhdmUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGFuIGVsZW1lbnQgdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNpbGVudF9zYXZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGEgcmVsYXRpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkOiBudW1iZXIsXHJcbiAgICAgICAgZGF0YTogb2JqZWN0ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2F2ZVJlbGF0ZWQpIHRoaXMub25TYXZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclNhdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJTYXZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgZGF0YSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25TYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyU2F2ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGEgcmVsYXRpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlclxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkRlbGV0ZSByZWxhdGVkXCIsIGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25SZW1vdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uUmVtb3ZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyUmVtb3ZlUmVsYXRlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyUmVtb3ZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25SZW1vdmVSZWxhdGVkITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJSZW1vdmVSZWxhdGVkITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJSZW1vdmVcIiwgZW50aXR5LCBpZCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uUmVtb3ZlKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uUmVtb3ZlKGVudGl0eSwgaWQpKSkgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlckRlbGV0ZSkgdGhpcy5hZnRlckRlbGV0ZShlbnRpdHksIGlkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyRGVsZXRlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbmZpZyA9IGFzeW5jIChlbnRpdHk6IHN0cmluZyB8IG51bGwgPSBudWxsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNvbmZpZ1wiLCBlbnRpdHkgfHwgXCJnbG9iYWxcIik7XHJcblxyXG4gICAgICAgIGxldCBVUkwgPSAhZW50aXR5ID8gXCIvY29uZmlnXCIgOiBgL2NvbmZpZy8ke2VudGl0eX1gO1xyXG4gICAgICAgIFVSTCArPSBcIj9ub2NhY2hlPVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCkgKiBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoVVJMLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGF0YWJhc2UgPSBhc3luYyAoZnVuYzogc3RyaW5nLCBwYXJhbWV0ZXJzOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJkYXRhYmFzZVwiLCBmdW5jKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhYmFzZS8ke2Z1bmN9YCwgcGFyYW1ldGVycywgdGhpcy5hdXRoSGVhZGVyKHt9LCB7IHRpbWVvdXQ6IDEyMDAwMCB9KSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBVcGxvYWRzIGEgZmlsZSB0byB0aGUgc2VydmVyXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGlkIGV0Y1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBsb2FkRmlsZSA9IGFzeW5jIChmaWxlRGF0YTogYW55LCBmaWxlOiBhbnksIGZvbGRlcklkPzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlVwbG9hZFwiLCBmaWxlRGF0YS5uYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25VcGxvYWRGaWxlKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uVXBsb2FkRmlsZShmaWxlRGF0YSwgZmlsZSwgZm9sZGVySWQpKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZy5lcnJvcigxLCBcIkNhbmNlbGVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChcclxuICAgICAgICAgICAgICAgIGAvZmlsZXNgLFxyXG4gICAgICAgICAgICAgICAgZmlsZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcihcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieC1maWxlLW5hbWVcIjogZmlsZURhdGEubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ4LWZpbGUtdHlwZVwiOiBmaWxlRGF0YS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIngtcmVsYXRpb25cIjogZmlsZURhdGEucmVsYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieC1yZWxhdGlvbi1pZFwiOiBmaWxlRGF0YS5yZWxhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIngtZm9sZGVyLWlkXCI6IGZvbGRlcklkIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHRpbWVvdXQ6IDYwMDAwIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclVwbG9hZEZpbGUpIHRoaXMuYWZ0ZXJVcGxvYWRGaWxlKGZpbGVEYXRhLCBmaWxlLCBmb2xkZXJJZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25VcGxvYWRGaWxlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJVcGxvYWRGaWxlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gRG93bmxvYWRzIGEgZmlsZSBmcm9tIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSBmaWxlIDotKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG93bmxvYWRGaWxlID0gYXN5bmMgKGZpbGVJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkRvd25sb2FkXCIsIGZpbGVJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhL2ZpbGVzLyR7ZmlsZUlkfS9kb3dubG9hZGAsIHRoaXMuYXV0aEhlYWRlcih7fSwgeyByZXNwb25zZVR5cGU6IFwiYmxvYlwiIH0pKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgaWQgZXRjXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVLcGkgPSBhc3luYyAodHlwZTogc3RyaW5nLCBxdWVyeTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNhbGN1bGF0ZSBLUElcIiwgdHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9rcGlgLCB7IHR5cGUsIHF1ZXJ5IH0sIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExhdW5jaGVzIGEgY3VzdG9tIGZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4ZWMgPSBhc3luYyAoZnVuY3Rpb25OYW1lOiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJFeGVjIGZ1bmN0aW9uXCIsIGZ1bmN0aW9uTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9leGVjLyR7ZnVuY3Rpb25OYW1lfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcih7fSwgeyB0aW1lb3V0OiAxMjAwMDAgfSkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gVHJpZ2dlciBzb2NrZXRcclxuICAgICAqIEByZXR1cm5zIE5vdGhpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyaWdnZXJTb2NrZXQgPSBhc3luYyAoc29ja2V0SWRlbnRpZmllcjogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiVHJpZ2dlciBzb2NrZXRcIiwgc29ja2V0SWRlbnRpZmllcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXHJcbiAgICAgICAgICAgICAgICBgL2xpdmUtZXZlbnRzLyR7c29ja2V0SWRlbnRpZmllcn0vdHJpZ2dlcmAsXHJcbiAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKHt9LCB7IHRpbWVvdXQ6IDEyMDAwMCB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBTQUFTIHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNhYXNTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiR2V0U2Fhc1NldHRpbmdzXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9zYWFzYCwgeyBoZWFkZXJzOiB7IHNlY3JldDogXCIyMXRoNmRyLzV0MXF6ZTNyNTFGNio8Uzg1RzRRRTg1RTFZNkUqXCIgfSB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEk7XHJcbiJdfQ==