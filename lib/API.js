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

  _defineProperty(this, "findOne",
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(entity) {
      var options,
          _args10 = arguments;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};

              _this.log.request(0, "Find one", entity);

              return _context10.abrupt("return", _this.instance.get("/data/".concat(entity, "/one?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x14) {
      return _ref10.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findById",
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(entity, id) {
      var options,
          _args11 = arguments;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              options = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};

              _this.log.request(0, "Find by id", entity, id);

              return _context11.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x15, _x16) {
      return _ref11.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findRelated",
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(entity, id, relation) {
      var options,
          _args12 = arguments;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              options = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};

              _this.log.request(0, "Find related of id", entity, id);

              return _context12.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "/").concat(relation, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x17, _x18, _x19) {
      return _ref12.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOneRelated",
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(entity, entityId, relation, relationId) {
      var options,
          _args13 = arguments;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              options = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : {};

              _this.log.request(0, "Find one related of id", entity, entityId);

              return _context13.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x20, _x21, _x22, _x23) {
      return _ref13.apply(this, arguments);
    };
  }());

  _defineProperty(this, "save",
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(entity, data) {
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (_this.onSave) _this.onSave(entity, data);

              _this.log.request(0, "Save", entity);

              return _context14.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(function (result) {
                if (_this.afterSave) _this.afterSave(entity, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x24, _x25) {
      return _ref14.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSave", void 0);

  _defineProperty(this, "afterSave", void 0);

  _defineProperty(this, "saveRelated",
  /*#__PURE__*/
  function () {
    var _ref15 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15(entity, entityId, relation, relationId) {
      var data,
          _args15 = arguments;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              data = _args15.length > 4 && _args15[4] !== undefined ? _args15[4] : {};
              if (_this.onSaveRelated) _this.onSaveRelated(entity, entityId, relation, relationId, data);

              _this.log.request(0, "Save related", entity, entityId, relation, relationId);

              return _context15.abrupt("return", _this.instance.post("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), data, _this.authHeader()).then(function (result) {
                if (_this.afterSaveRelated) _this.afterSaveRelated(entity, entityId, relation, relationId, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function (_x26, _x27, _x28, _x29) {
      return _ref15.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSaveRelated", void 0);

  _defineProperty(this, "afterSaveRelated", void 0);

  _defineProperty(this, "removeRelated",
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16(entity, entityId, relation, relationId) {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _this.log.request(0, "Delete related", entity, entityId, relation, relationId);

              if (!_this.onRemoveRelated) {
                _context16.next = 6;
                break;
              }

              _context16.next = 4;
              return _this.onRemoveRelated(entity, entityId, relation, relationId);

            case 4:
              if (_context16.sent) {
                _context16.next = 6;
                break;
              }

              return _context16.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context16.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), _this.authHeader()).then(function (result) {
                if (_this.afterRemoveRelated) _this.afterRemoveRelated(entity, entityId, relation, relationId, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function (_x30, _x31, _x32, _x33) {
      return _ref16.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemoveRelated", void 0);

  _defineProperty(this, "afterRemoveRelated", void 0);

  _defineProperty(this, "remove",
  /*#__PURE__*/
  function () {
    var _ref17 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17(entity, id) {
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _this.log.request(0, "Remove", entity, id);

              if (!_this.onRemove) {
                _context17.next = 6;
                break;
              }

              _context17.next = 4;
              return _this.onRemove(entity, id);

            case 4:
              if (_context17.sent) {
                _context17.next = 6;
                break;
              }

              return _context17.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context17.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(function (result) {
                if (_this.afterDelete) _this.afterDelete(entity, id, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));

    return function (_x34, _x35) {
      return _ref17.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemove", void 0);

  _defineProperty(this, "afterDelete", void 0);

  _defineProperty(this, "config",
  /*#__PURE__*/
  function () {
    var _ref18 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var entity,
          URL,
          _args18 = arguments;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              entity = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : null;

              _this.log.request(0, "Config", entity || "global");

              URL = !entity ? "/config" : "/config/".concat(entity);
              return _context18.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function () {
      return _ref18.apply(this, arguments);
    };
  }());

  _defineProperty(this, "database",
  /*#__PURE__*/
  function () {
    var _ref19 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19(func) {
      var parameters,
          _args19 = arguments;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              parameters = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : {};

              _this.log.request(0, "database", func);

              return _context19.abrupt("return", _this.instance.post("/database/".concat(func), parameters, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));

    return function (_x36) {
      return _ref19.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFile",
  /*#__PURE__*/
  function () {
    var _ref20 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20(fileData, file, folderId) {
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _this.log.request(0, "Upload", fileData.name);

              if (!_this.onUploadFile) {
                _context20.next = 6;
                break;
              }

              _context20.next = 4;
              return _this.onUploadFile(fileData, file, folderId);

            case 4:
              if (_context20.sent) {
                _context20.next = 6;
                break;
              }

              return _context20.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context20.abrupt("return", _this.instance.post("/files", file, _this.authHeader({
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
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function (_x37, _x38, _x39) {
      return _ref20.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onUploadFile", void 0);

  _defineProperty(this, "afterUploadFile", void 0);

  _defineProperty(this, "downloadFile",
  /*#__PURE__*/
  function () {
    var _ref21 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21(fileId) {
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _this.log.request(0, "Download", fileId);

              return _context21.abrupt("return", _this.instance.get("/data/files/".concat(fileId, "/download"), _this.authHeader({}, {
                responseType: "blob"
              })).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }));

    return function (_x40) {
      return _ref21.apply(this, arguments);
    };
  }());

  _defineProperty(this, "calculateKpi",
  /*#__PURE__*/
  function () {
    var _ref22 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee22(type, query) {
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _this.log.request(0, "Calculate KPI", type);

              return _context22.abrupt("return", _this.instance.post("/kpi", {
                type: type,
                query: query
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }));

    return function (_x41, _x42) {
      return _ref22.apply(this, arguments);
    };
  }());

  _defineProperty(this, "exec",
  /*#__PURE__*/
  function () {
    var _ref23 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee23(functionName, data) {
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _this.log.request(0, "Exec function", functionName);

              return _context23.abrupt("return", _this.instance.post("/exec/".concat(functionName), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    }));

    return function (_x43, _x44) {
      return _ref23.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImFwaV90aW1lb3V0IiwiZGVidWdfbGV2ZWwiLCJsb2ciLCJtZXNzYWdlIiwiYXhpb3MiLCJjcmVhdGUiLCJiYXNlVVJMIiwidGltZW91dCIsImh0dHBzQWdlbnQiLCJodHRwcyIsIkFnZW50IiwicmVqZWN0VW5hdXRob3JpemVkIiwicmVzcG9uc2UiLCJkYXRhIiwic3VjY2VzcyIsImhhbmRsZUVycm9yIiwicmVzdWx0IiwiZXJyb3IiLCJuYW1lIiwib25FcnJvciIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjb25zb2xlIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZ2N5YW4iLCJuIiwiaW5kZW50IiwibG9nc19pbmRlbnQiLCJleHRyYUhlYWRlcnMiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcklkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwicG9zdCIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImF1dGhIZWFkZXIiLCJlbnRpdHkiLCJvcHRpb25zIiwiZ2V0IiwibGlzdE5hbWUiLCJpZCIsInNlYXJjaCIsInJlbGF0aW9uIiwiZW50aXR5SWQiLCJyZWxhdGlvbklkIiwib25TYXZlIiwiYWZ0ZXJTYXZlIiwib25TYXZlUmVsYXRlZCIsImFmdGVyU2F2ZVJlbGF0ZWQiLCJvblJlbW92ZVJlbGF0ZWQiLCJhZnRlclJlbW92ZVJlbGF0ZWQiLCJvblJlbW92ZSIsImFmdGVyRGVsZXRlIiwiVVJMIiwiZnVuYyIsInBhcmFtZXRlcnMiLCJmaWxlRGF0YSIsImZpbGUiLCJmb2xkZXJJZCIsIm9uVXBsb2FkRmlsZSIsInR5cGUiLCJhZnRlclVwbG9hZEZpbGUiLCJmaWxlSWQiLCJyZXNwb25zZVR5cGUiLCJxdWVyeSIsImZ1bmN0aW9uTmFtZSIsIkVycm9yIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBR01BLEcsR0FDRjs7QUFDQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTtBQUdBO0FBQ0EsYUFBWUMsT0FBWixFQUF5RDtBQUFBOztBQUFBLE1BQTVCQyxXQUE0Qix1RUFBTixJQUFNOztBQUFBOztBQUFBOztBQUFBLHVDQXJCNUIsQ0FxQjRCOztBQUFBLHVDQWxCNUIsQ0FrQjRCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQUg1QixJQUc0Qjs7QUFBQSxnQ0FjMUMsWUFBTTtBQUNqQixRQUFJLEtBQUksQ0FBQ0MsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiw2QkFBcEI7QUFFM0IsV0FBT0Msa0JBQU1DLE1BQU4sQ0FBYTtBQUNoQkMsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsT0FERTtBQUVoQlEsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsV0FGRTtBQUdoQlEsTUFBQUEsVUFBVSxFQUFFLElBQUlDLGtCQUFNQyxLQUFWLENBQWdCO0FBQ3hCQyxRQUFBQSxrQkFBa0IsRUFBRTtBQURJLE9BQWhCO0FBSEksS0FBYixDQUFQO0FBT0gsR0F4QndEOztBQUFBOztBQUFBLDBDQTJCaEMsVUFBQ0MsUUFBRCxFQUFrQztBQUN2RCxRQUFJLEtBQUksQ0FBQ1gsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiwyQkFBcEIsRUFENEIsQ0FFdkQ7O0FBQ0EsUUFBSVUsSUFBSSxHQUFHRCxRQUFRLENBQUNDLElBQXBCLENBSHVELENB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QSxLQUFJLENBQUNYLEdBQUwsQ0FBUytCLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0IsZUFBcEIsRUFBcUNzRCxZQUFyQzs7QUFEVSxpREFFSCxLQUFJLENBQUNuQyxRQUFMLENBQ0ZDLElBREUsaUJBQ1lrQyxZQURaLEdBQzRCMUUsSUFENUIsRUFDa0MsS0FBSSxDQUFDNEMsVUFBTCxFQURsQyxFQUVGSCxJQUZFLENBRUcsS0FBSSxDQUFDQyxjQUZSLFdBR0ksS0FBSSxDQUFDeEMsV0FIVCxDQUZHOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBaGhCMkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ3JELE1BQUksQ0FBQ2hCLE9BQUwsRUFBYyxNQUFNLElBQUl5RixLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUVkLE9BQUt6RixPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUVBLE9BQUtvRCxRQUFMLEdBQWdCLEtBQUtxQyxJQUFMLEVBQWhCO0FBQ0gsQyxDQUVEOztBQUNBOzs7Ozs7ZUErZ0JXM0YsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXNwb25zZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4vY29uc3QvY29sb3JzXCI7XHJcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcclxuaW1wb3J0IHsgQXBpUG9zaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL0FwaVBvc2l0aW9uXCI7XHJcblxyXG5jbGFzcyBBUEkge1xyXG4gICAgLy8gKiBWQVJJQUJMRVMgKlxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIGNvbnRhaW5zIHRoZSB0b2tlbiBvZiB0aGUgdXNlciAqL1xyXG4gICAgcHVibGljIHRva2VuITogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gMCA9IG5vbmUsIDEgPSBub3JtYWwsIDIgPSBkZXRhaWxlZCwgMyA9IGRldGFpbGVkICsgcmVzdWx0cyAqL1xyXG4gICAgcHVibGljIGRlYnVnX2xldmVsOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gRXh0cmEgaW5kZW50IGZvciBsb2dzICovXHJcbiAgICBwdWJsaWMgbG9nc19pbmRlbnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIHN0YXJ0IHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgc3RhcnQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIGVuZCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIGVuZCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB2YXJpYWJsZSB0aGF0IHdpbGwgY29udGFpbiB0aGUgQVhJT1MgaW5zdGFuY2UgKi9cclxuICAgIHByaXZhdGUgaW5zdGFuY2U6IEF4aW9zSW5zdGFuY2U7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgVVJMIHRvIHRoZSBDUk0gYmFja2VuZCAqL1xyXG4gICAgcHJpdmF0ZSBhcGlfdXJsPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHRpbWVvdXQgdGltZSB0byB0aGUgQVBJICovXHJcbiAgICBwdWJsaWMgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDMwMDA7XHJcblxyXG4gICAgLy8gKiBDT05TVFJVQ1RPUiAqXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlfdXJsOiBzdHJpbmcsIGFwaV90aW1lb3V0OiBudW1iZXIgPSAzMDAwKSB7XHJcbiAgICAgICAgaWYgKCFhcGlfdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBBUEkgdXJsIGhhcyBiZWVuIHNldFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcGlfdXJsID0gYXBpX3VybDtcclxuICAgICAgICB0aGlzLmFwaV90aW1lb3V0ID0gYXBpX3RpbWVvdXQ7XHJcblxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAqIFBSSVZBVEUgTUVUSE9EUyAqXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBBeGlvcyBpbnN0YW5jZSB3aXRoIHRoZSBVUkwgYW5kIGhlYWRlcnNcclxuICAgICAqIEByZXR1cm5zIEFuIGF4aW9zIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiQXhpb3MgaGFzIGJlZW4gaW50aXRpYWxpemVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcclxuICAgICAgICAgICAgYmFzZVVSTDogdGhpcy5hcGlfdXJsLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLmFwaV90aW1lb3V0LFxyXG4gICAgICAgICAgICBodHRwc0FnZW50OiBuZXcgaHR0cHMuQWdlbnQoe1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBvbkVycm9yITogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlID0gKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiUmVzcG9uc2UgaXMgYmVpbmcgaGFuZGxlZFwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBJZiBubyBzdWNjZXNzLCByZWRpcmVjdCB0byB0aGUgZXJyb3IgZnVuY3Rpb25cclxuICAgICAgICBpZiAoIWRhdGEuc3VjY2VzcykgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLnN1Y2Nlc3MoMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIGRhdGEuZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKDEsIGBTb21ldGhpbmcgaXMgd3Jvbmcgd2l0aCB5b3VyIGludGVybmV0IGNvbm5lY3Rpb25gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0VSVkVSX0RPV05cIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHNlcnZlciBpcyBjdXJyZW50bHkgdW5hdmFpbGFibGVcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm5hbWUgfHwgZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbkVycm9yKSB0aGlzLm9uRXJyb3IoZGF0YS5lcnJvcik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5uYW1lKSByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gZGF0YS5lcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSB3YXMgb2YgdHlwZSBlcnJvclwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcblxyXG4gICAgICAgIC8vIExvZyB0aGUgZXJyb3JcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBkYXRhLmVycm9yLm5hbWUsIGRhdGEuZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgZXJyb3JcclxuICAgICAgICByZXR1cm4gZGF0YS5lcnJvcjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3VzdG9tIGxvZ2dpbmcgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2cgPSB7XHJcbiAgICAgICAgZXJyb3I6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZncmVkfVtFUlJPUiBpbiAke3RoaXMuZW5kIC0gdGhpcy5zdGFydH1tc11gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN1Y2Nlc3M6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdncmVlbn1bU1VDQ0VTUyBpbiAke3RoaXMuZW5kIC0gdGhpcy5zdGFydH1tc11gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlcXVlc3Q6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2JsdWV9W0FQSSBSRVFVRVNUXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVzdWx0OiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZneWVsbG93fVtSRVNVTFRdYCxcclxuICAgICAgICAgICAgICAgIG0ubWFwKChtbSkgPT4gSlNPTi5zdHJpbmdpZnkobW0pKS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1lc3NhZ2U6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdjeWFufVtNRVNTQUdFXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlSW5kZW50OiAobjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbmRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG4gKyB0aGlzLmxvZ3NfaW5kZW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiAgICBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgYXV0aEhlYWRlciA9IChleHRyYUhlYWRlcnM/OiBhbnksIGV4dHJhT3B0aW9uczogYW55ID0ge30pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiR2VuZXJhdGUgYXV0aCBoZWFkZXJcIik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uZXh0cmFPcHRpb25zLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgLi4uZXh0cmFIZWFkZXJzLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vICogUFVCTElDIE1FVEhPRFMgKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdG9kbyBJbXBsZW1lbnQgaW1wZXJzb25hdGlvbiBpbiBiYWNrZW5kXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW1wZXJzb25hdGUgYSB1c2VyXHJcbiAgICAgKiBAcmV0dXJucyBPSyBvciBOT0tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcGVyc29uYXRlID0gKHVzZXJJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkltcGVyc29uYXRlXCIsIHVzZXJJZCk7XHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgXCJJbXBlcnNvbmF0aW9uIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZCB5ZXRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYSBnaXZlbiB1c2VyIGluXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXV0aGVudGlmaWNhdGlvbiB0b2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMb2dpblwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9sb2dpblwiLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAudGhlbigodG9rZW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdG9rZW4uZGF0YSkgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IodG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIFwiVG9rZW4gbGVuZ3RoXCIsIHRva2VuLmRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdlbmVyYXRlIGEgcmVzZXQgcGFzc3dvcmQgdG9rZW4gPT4gVGhpcyBpcyBzZW5kIGJ5IGVtYWlsXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0UGFzc3dvcmQgPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJyZXNldFBhc3N3b3JkXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2F1dGgvcmVzZXRQYXNzd29yZGAsIHsgdXNlcm5hbWUgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgYSByZXNldCBwYXNzd29yZCB0b2tlbiA9PiBUaGlzIGlzIHNlbmQgYnkgZW1haWxcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TmV3UGFzc3dvcmQgPSBhc3luYyAodG9rZW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJzZXROZXdQYXNzd29yZFwiLCB0b2tlbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9hdXRoL3NldE5ld1Bhc3N3b3JkYCwgeyB0b2tlbiwgcGFzc3dvcmQgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZFwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpc3RWYWx1ZXMgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2xpc3RzLyR7bGlzdE5hbWV9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0cyBvZiB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGlzdHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3RzIG9mIHZhbHVlc1wiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvbGlzdHNgLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZUxpc3RWYWx1ZSA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvbGlzdHMvJHtsaXN0TmFtZX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdFZhbHVlID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIGVsZW1lbnQgb2YgbGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9saXN0cy8ke2xpc3ROYW1lfS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHkgd2l0aCBhIHNlYXJjaCBjcml0ZXJpYVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWFyY2ggPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTZWFyY2hcIiwgZW50aXR5LCBzZWFyY2gpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9L3NlYXJjaD9zZWFyY2g9JHtzZWFyY2h9Jm9wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBvbmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vb25lP29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRCeUlkID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIGJ5IGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHJlbGF0ZWQgZWxlbWVudHMgb2YgcmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICBvcHRpb25zOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgcmVsYXRlZCBvZiBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fS8ke2lkfS8ke3JlbGF0aW9ufT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcmVsYXRlZCBlbGVtZW50cyBvZiByZWNvcmRcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBvcHRpb25zOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgb25lIHJlbGF0ZWQgb2YgaWRcIiwgZW50aXR5LCBlbnRpdHlJZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYW4gZWxlbWVudCB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlKSB0aGlzLm9uU2F2ZShlbnRpdHksIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJTYXZlKSB0aGlzLmFmdGVyU2F2ZShlbnRpdHksIGRhdGEsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uU2F2ZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyU2F2ZSE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBkYXRhOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlUmVsYXRlZCkgdGhpcy5vblNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNhdmUgcmVsYXRlZFwiLCBlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmVSZWxhdGVkITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJTYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlbW92ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlJlbW92ZVwiLCBlbnRpdHksIGlkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25SZW1vdmUpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmUoZW50aXR5LCBpZCkpKSByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyRGVsZXRlKSB0aGlzLmFmdGVyRGVsZXRlKGVudGl0eSwgaWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uUmVtb3ZlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJEZWxldGUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uZmlnID0gYXN5bmMgKGVudGl0eTogc3RyaW5nIHwgbnVsbCA9IG51bGwpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ29uZmlnXCIsIGVudGl0eSB8fCBcImdsb2JhbFwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgVVJMID0gIWVudGl0eSA/IFwiL2NvbmZpZ1wiIDogYC9jb25maWcvJHtlbnRpdHl9YDtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFVSTCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRhdGFiYXNlID0gYXN5bmMgKGZ1bmM6IHN0cmluZywgcGFyYW1ldGVyczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiZGF0YWJhc2VcIiwgZnVuYyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YWJhc2UvJHtmdW5jfWAsIHBhcmFtZXRlcnMsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgaWQgZXRjXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGxvYWRGaWxlID0gYXN5bmMgKGZpbGVEYXRhOiBhbnksIGZpbGU6IGFueSwgZm9sZGVySWQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiVXBsb2FkXCIsIGZpbGVEYXRhLm5hbWUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblVwbG9hZEZpbGUpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25VcGxvYWRGaWxlKGZpbGVEYXRhLCBmaWxlLCBmb2xkZXJJZCkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KFxyXG4gICAgICAgICAgICAgICAgYC9maWxlc2AsXHJcbiAgICAgICAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBcIngtZmlsZS1uYW1lXCI6IGZpbGVEYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LWZpbGUtdHlwZVwiOiBmaWxlRGF0YS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwieC1yZWxhdGlvblwiOiBmaWxlRGF0YS5yZWxhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBcIngtcmVsYXRpb24taWRcIjogZmlsZURhdGEucmVsYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICBcIngtZm9sZGVyLWlkXCI6IGZvbGRlcklkIHx8IDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyVXBsb2FkRmlsZSkgdGhpcy5hZnRlclVwbG9hZEZpbGUoZmlsZURhdGEsIGZpbGUsIGZvbGRlcklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblVwbG9hZEZpbGUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclVwbG9hZEZpbGUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBEb3dubG9hZHMgYSBmaWxlIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIGZpbGUgOi0pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZEZpbGUgPSBhc3luYyAoZmlsZUlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRG93bmxvYWRcIiwgZmlsZUlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvZmlsZXMvJHtmaWxlSWR9L2Rvd25sb2FkYCwgdGhpcy5hdXRoSGVhZGVyKHt9LCB7IHJlc3BvbnNlVHlwZTogXCJibG9iXCIgfSkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBsb2FkcyBhIGZpbGUgdG8gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBpZCBldGNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUtwaSA9IGFzeW5jICh0eXBlOiBzdHJpbmcsIHF1ZXJ5OiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ2FsY3VsYXRlIEtQSVwiLCB0eXBlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2twaWAsIHsgdHlwZSwgcXVlcnkgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTGF1bmNoZXMgYSBjdXN0b20gZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXhlYyA9IGFzeW5jIChmdW5jdGlvbk5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkV4ZWMgZnVuY3Rpb25cIiwgZnVuY3Rpb25OYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2V4ZWMvJHtmdW5jdGlvbk5hbWV9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSTtcclxuIl19