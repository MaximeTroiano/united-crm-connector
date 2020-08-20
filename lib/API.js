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
              }, {
                timeout: 60000
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

  _defineProperty(this, "getSaasSettings",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee24() {
    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _this.log.request(0, "GetSaasSettings");

            return _context24.abrupt("return", _this.instance.get("/saas", {
              headers: {
                secret: "21th6dr/5t1qze3r51F6*<S85G4QE85E1Y6E*"
              }
            }).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImFwaV90aW1lb3V0IiwiZGVidWdfbGV2ZWwiLCJsb2ciLCJtZXNzYWdlIiwiYXhpb3MiLCJjcmVhdGUiLCJiYXNlVVJMIiwidGltZW91dCIsImh0dHBzQWdlbnQiLCJodHRwcyIsIkFnZW50IiwicmVqZWN0VW5hdXRob3JpemVkIiwicmVzcG9uc2UiLCJkYXRhIiwic3VjY2VzcyIsImhhbmRsZUVycm9yIiwicmVzdWx0IiwiZXJyb3IiLCJuYW1lIiwib25FcnJvciIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjb25zb2xlIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZ2N5YW4iLCJuIiwiaW5kZW50IiwibG9nc19pbmRlbnQiLCJleHRyYUhlYWRlcnMiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcklkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwicG9zdCIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImF1dGhIZWFkZXIiLCJlbnRpdHkiLCJvcHRpb25zIiwiZ2V0IiwibGlzdE5hbWUiLCJpZCIsInNlYXJjaCIsInJlbGF0aW9uIiwiZW50aXR5SWQiLCJyZWxhdGlvbklkIiwib25TYXZlIiwiYWZ0ZXJTYXZlIiwib25TYXZlUmVsYXRlZCIsImFmdGVyU2F2ZVJlbGF0ZWQiLCJvblJlbW92ZVJlbGF0ZWQiLCJhZnRlclJlbW92ZVJlbGF0ZWQiLCJvblJlbW92ZSIsImFmdGVyRGVsZXRlIiwiVVJMIiwiZnVuYyIsInBhcmFtZXRlcnMiLCJmaWxlRGF0YSIsImZpbGUiLCJmb2xkZXJJZCIsIm9uVXBsb2FkRmlsZSIsInR5cGUiLCJhZnRlclVwbG9hZEZpbGUiLCJmaWxlSWQiLCJyZXNwb25zZVR5cGUiLCJxdWVyeSIsImZ1bmN0aW9uTmFtZSIsInNlY3JldCIsIkVycm9yIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBR01BLEcsR0FDRjs7QUFDQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTtBQUdBO0FBQ0EsYUFBWUMsT0FBWixFQUF5RDtBQUFBOztBQUFBLE1BQTVCQyxXQUE0Qix1RUFBTixJQUFNOztBQUFBOztBQUFBOztBQUFBLHVDQXJCNUIsQ0FxQjRCOztBQUFBLHVDQWxCNUIsQ0FrQjRCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQUg1QixJQUc0Qjs7QUFBQSxnQ0FjMUMsWUFBTTtBQUNqQixRQUFJLEtBQUksQ0FBQ0MsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiw2QkFBcEI7QUFFM0IsV0FBT0Msa0JBQU1DLE1BQU4sQ0FBYTtBQUNoQkMsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsT0FERTtBQUVoQlEsTUFBQUEsT0FBTyxFQUFFLEtBQUksQ0FBQ1AsV0FGRTtBQUdoQlEsTUFBQUEsVUFBVSxFQUFFLElBQUlDLGtCQUFNQyxLQUFWLENBQWdCO0FBQ3hCQyxRQUFBQSxrQkFBa0IsRUFBRTtBQURJLE9BQWhCO0FBSEksS0FBYixDQUFQO0FBT0gsR0F4QndEOztBQUFBOztBQUFBLDBDQTJCaEMsVUFBQ0MsUUFBRCxFQUFrQztBQUN2RCxRQUFJLEtBQUksQ0FBQ1gsV0FBTCxJQUFvQixDQUF4QixFQUEyQixLQUFJLENBQUNDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQiwyQkFBcEIsRUFENEIsQ0FFdkQ7O0FBQ0EsUUFBSVUsSUFBSSxHQUFHRCxRQUFRLENBQUNDLElBQXBC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YXRvci1ydW50aW1lL3J1bnRpbWVcIjtcclxuaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVzcG9uc2UgfSBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi9jb25zdC9jb2xvcnNcIjtcclxuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xyXG5pbXBvcnQgeyBBcGlQb3NpdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvQXBpUG9zaXRpb25cIjtcclxuXHJcbmNsYXNzIEFQSSB7XHJcbiAgICAvLyAqIFZBUklBQkxFUyAqXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgY29udGFpbnMgdGhlIHRva2VuIG9mIHRoZSB1c2VyICovXHJcbiAgICBwdWJsaWMgdG9rZW4hOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiAwID0gbm9uZSwgMSA9IG5vcm1hbCwgMiA9IGRldGFpbGVkLCAzID0gZGV0YWlsZWQgKyByZXN1bHRzICovXHJcbiAgICBwdWJsaWMgZGVidWdfbGV2ZWw6IG51bWJlciA9IDE7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBFeHRyYSBpbmRlbnQgZm9yIGxvZ3MgKi9cclxuICAgIHB1YmxpYyBsb2dzX2luZGVudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgc3RhcnQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgZW5kIHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgZW5kITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHZhcmlhYmxlIHRoYXQgd2lsbCBjb250YWluIHRoZSBBWElPUyBpbnN0YW5jZSAqL1xyXG4gICAgcHJpdmF0ZSBpbnN0YW5jZTogQXhpb3NJbnN0YW5jZTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gdGhlIENSTSBiYWNrZW5kICovXHJcbiAgICBwcml2YXRlIGFwaV91cmw/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdGltZW91dCB0aW1lIHRvIHRoZSBBUEkgKi9cclxuICAgIHB1YmxpYyBhcGlfdGltZW91dDogbnVtYmVyID0gMzAwMDtcclxuXHJcbiAgICAvLyAqIENPTlNUUlVDVE9SICpcclxuICAgIGNvbnN0cnVjdG9yKGFwaV91cmw6IHN0cmluZywgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDMwMDApIHtcclxuICAgICAgICBpZiAoIWFwaV91cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIEFQSSB1cmwgaGFzIGJlZW4gc2V0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFwaV91cmwgPSBhcGlfdXJsO1xyXG4gICAgICAgIHRoaXMuYXBpX3RpbWVvdXQgPSBhcGlfdGltZW91dDtcclxuXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICogUFJJVkFURSBNRVRIT0RTICpcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEF4aW9zIGluc3RhbmNlIHdpdGggdGhlIFVSTCBhbmQgaGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgQW4gYXhpb3MgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJBeGlvcyBoYXMgYmVlbiBpbnRpdGlhbGl6ZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiB0aGlzLmFwaV91cmwsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMuYXBpX3RpbWVvdXQsXHJcbiAgICAgICAgICAgIGh0dHBzQWdlbnQ6IG5ldyBodHRwcy5BZ2VudCh7XHJcbiAgICAgICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uRXJyb3IhOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSBpcyBiZWluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIHN1Y2Nlc3MsIHJlZGlyZWN0IHRvIHRoZSBlcnJvciBmdW5jdGlvblxyXG4gICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cuc3VjY2VzcygxKTtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgZGF0YS5kYXRhKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSByZXN1bHRpbmcgZGF0YTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgYFNvbWV0aGluZyBpcyB3cm9uZyB3aXRoIHlvdXIgaW50ZXJuZXQgY29ubmVjdGlvbmApO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJTRVJWRVJfRE9XTlwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgc2VydmVyIGlzIGN1cnJlbnRseSB1bmF2YWlsYWJsZVwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubmFtZSB8fCBkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHRoaXMub25FcnJvcihkYXRhLmVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLm5hbWUpIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICBlbHNlIHJldHVybiBkYXRhLmVycm9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIlJlc3BvbnNlIHdhcyBvZiB0eXBlIGVycm9yXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuXHJcbiAgICAgICAgLy8gTG9nIHRoZSBlcnJvclxyXG4gICAgICAgIHRoaXMubG9nLmVycm9yKDEsIGRhdGEuZXJyb3IubmFtZSwgZGF0YS5lcnJvci5tZXNzYWdlKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlcnJvclxyXG4gICAgICAgIHJldHVybiBkYXRhLmVycm9yO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBDdXN0b20gbG9nZ2luZyBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZyA9IHtcclxuICAgICAgICBlcnJvcjogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdyZWR9W0VSUk9SIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VjY2VzczogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2dyZWVufVtTVUNDRVNTIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVxdWVzdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnYmx1ZX1bQVBJIFJFUVVFU1RdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXN1bHQ6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmd5ZWxsb3d9W1JFU1VMVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5tYXAoKG1tKSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVJbmRlbnQ6IChuOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiArIHRoaXMubG9nc19pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRoSGVhZGVyID0gKGV4dHJhSGVhZGVycz86IGFueSwgZXh0cmFPcHRpb25zOiBhbnkgPSB7fSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJHZW5lcmF0ZSBhdXRoIGhlYWRlclwiKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5leHRyYU9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAuLi5leHRyYUhlYWRlcnMsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gKiBQVUJMSUMgTUVUSE9EUyAqXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0b2RvIEltcGxlbWVudCBpbXBlcnNvbmF0aW9uIGluIGJhY2tlbmRcclxuICAgICAqIEBkZXNjcmlwdGlvbiBJbXBlcnNvbmF0ZSBhIHVzZXJcclxuICAgICAqIEByZXR1cm5zIE9LIG9yIE5PS1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW1wZXJzb25hdGUgPSAodXNlcklkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiSW1wZXJzb25hdGVcIiwgdXNlcklkKTtcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBcIkltcGVyc29uYXRpb24gaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkIHlldFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTG9ncyBhIGdpdmVuIHVzZXIgaW5cclxuICAgICAqIEByZXR1cm5zIFRoZSBhdXRoZW50aWZpY2F0aW9uIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2dpbiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxvZ2luXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChcIi9hdXRoL2xvZ2luXCIsIHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbi5kYXRhKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcih0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgXCJUb2tlbiBsZW5ndGhcIiwgdG9rZW4uZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgYSByZXNldCBwYXNzd29yZCB0b2tlbiA9PiBUaGlzIGlzIHNlbmQgYnkgZW1haWxcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRQYXNzd29yZCA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcInJlc2V0UGFzc3dvcmRcIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvYXV0aC9yZXNldFBhc3N3b3JkYCwgeyB1c2VybmFtZSB9LCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZW5lcmF0ZSBhIHJlc2V0IHBhc3N3b3JkIHRva2VuID0+IFRoaXMgaXMgc2VuZCBieSBlbWFpbFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROZXdQYXNzd29yZCA9IGFzeW5jICh0b2tlbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcInNldE5ld1Bhc3N3b3JkXCIsIHRva2VuKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2F1dGgvc2V0TmV3UGFzc3dvcmRgLCB7IHRva2VuLCBwYXNzd29yZCB9LCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGlzdFZhbHVlcyA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3Qgb2YgdmFsdWVzXCIsIGxpc3ROYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvbGlzdHMvJHtsaXN0TmFtZX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3RzIG9mIHZhbHVlc1xyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMaXN0cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdHMgb2YgdmFsdWVzXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9saXN0c2AsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiB2YWx1ZXMgZm9yIGEgbGlzdFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlTGlzdFZhbHVlID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9saXN0cy8ke2xpc3ROYW1lfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiB2YWx1ZXMgZm9yIGEgbGlzdFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0VmFsdWUgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJEZWxldGUgZWxlbWVudCBvZiBsaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2xpc3RzLyR7bGlzdE5hbWV9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eSB3aXRoIGEgc2VhcmNoIGNyaXRlcmlhXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlYXJjaCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNlYXJjaFwiLCBlbnRpdHksIHNlYXJjaCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vc2VhcmNoP3NlYXJjaD0ke3NlYXJjaH0mb3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IG9uZSBlbGVtZW50IG9mIGFuIGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kT25lID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIG9uZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS9vbmU/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZEJ5SWQgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgYnkgaWRcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9LyR7aWR9P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcmVsYXRlZCBlbGVtZW50cyBvZiByZWNvcmRcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZFJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIG9wdGlvbnM6IG9iamVjdCA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCByZWxhdGVkIG9mIGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9LyR7aWR9LyR7cmVsYXRpb259P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCByZWxhdGVkIGVsZW1lbnRzIG9mIHJlY29yZFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kT25lUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyLFxyXG4gICAgICAgIG9wdGlvbnM6IG9iamVjdCA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBvbmUgcmVsYXRlZCBvZiBpZFwiLCBlbnRpdHksIGVudGl0eUlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICApfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2F2ZSBhbiBlbGVtZW50IHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vblNhdmUpIHRoaXMub25TYXZlKGVudGl0eSwgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclNhdmUpIHRoaXMuYWZ0ZXJTYXZlKGVudGl0eSwgZGF0YSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25TYXZlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJTYXZlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2F2ZSBhIHJlbGF0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyLFxyXG4gICAgICAgIGRhdGE6IG9iamVjdCA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vblNhdmVSZWxhdGVkKSB0aGlzLm9uU2F2ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQsIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZSByZWxhdGVkXCIsIGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJTYXZlUmVsYXRlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyU2F2ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQsIGRhdGEsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uU2F2ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclNhdmVSZWxhdGVkITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2F2ZSBhIHJlbGF0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkOiBudW1iZXJcclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJEZWxldGUgcmVsYXRlZFwiLCBlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uUmVtb3ZlUmVsYXRlZClcclxuICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5vblJlbW92ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZy5lcnJvcigxLCBcIkNhbmNlbGVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclJlbW92ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclJlbW92ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uUmVtb3ZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyUmVtb3ZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiUmVtb3ZlXCIsIGVudGl0eSwgaWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlbW92ZSlcclxuICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5vblJlbW92ZShlbnRpdHksIGlkKSkpIHJldHVybiB0aGlzLmxvZy5lcnJvcigxLCBcIkNhbmNlbGVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGAvZGF0YS8ke2VudGl0eX0vJHtpZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJEZWxldGUpIHRoaXMuYWZ0ZXJEZWxldGUoZW50aXR5LCBpZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25SZW1vdmUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlckRlbGV0ZSE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25maWcgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcgfCBudWxsID0gbnVsbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJDb25maWdcIiwgZW50aXR5IHx8IFwiZ2xvYmFsXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBVUkwgPSAhZW50aXR5ID8gXCIvY29uZmlnXCIgOiBgL2NvbmZpZy8ke2VudGl0eX1gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoVVJMLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGF0YWJhc2UgPSBhc3luYyAoZnVuYzogc3RyaW5nLCBwYXJhbWV0ZXJzOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJkYXRhYmFzZVwiLCBmdW5jKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhYmFzZS8ke2Z1bmN9YCwgcGFyYW1ldGVycywgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBsb2FkcyBhIGZpbGUgdG8gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBpZCBldGNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwbG9hZEZpbGUgPSBhc3luYyAoZmlsZURhdGE6IGFueSwgZmlsZTogYW55LCBmb2xkZXJJZD86IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJVcGxvYWRcIiwgZmlsZURhdGEubmFtZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uVXBsb2FkRmlsZSlcclxuICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5vblVwbG9hZEZpbGUoZmlsZURhdGEsIGZpbGUsIGZvbGRlcklkKSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXHJcbiAgICAgICAgICAgICAgICBgL2ZpbGVzYCxcclxuICAgICAgICAgICAgICAgIGZpbGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIngtZmlsZS1uYW1lXCI6IGZpbGVEYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieC1maWxlLXR5cGVcIjogZmlsZURhdGEudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ4LXJlbGF0aW9uXCI6IGZpbGVEYXRhLnJlbGF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIngtcmVsYXRpb24taWRcIjogZmlsZURhdGEucmVsYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ4LWZvbGRlci1pZFwiOiBmb2xkZXJJZCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aW1lb3V0OiA2MDAwMCB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJVcGxvYWRGaWxlKSB0aGlzLmFmdGVyVXBsb2FkRmlsZShmaWxlRGF0YSwgZmlsZSwgZm9sZGVySWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uVXBsb2FkRmlsZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyVXBsb2FkRmlsZSE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIERvd25sb2FkcyBhIGZpbGUgZnJvbSB0aGUgc2VydmVyXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgZmlsZSA6LSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvd25sb2FkRmlsZSA9IGFzeW5jIChmaWxlSWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJEb3dubG9hZFwiLCBmaWxlSWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS9maWxlcy8ke2ZpbGVJZH0vZG93bmxvYWRgLCB0aGlzLmF1dGhIZWFkZXIoe30sIHsgcmVzcG9uc2VUeXBlOiBcImJsb2JcIiB9KSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBVcGxvYWRzIGEgZmlsZSB0byB0aGUgc2VydmVyXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGlkIGV0Y1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlS3BpID0gYXN5bmMgKHR5cGU6IHN0cmluZywgcXVlcnk6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJDYWxjdWxhdGUgS1BJXCIsIHR5cGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAva3BpYCwgeyB0eXBlLCBxdWVyeSB9LCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBMYXVuY2hlcyBhIGN1c3RvbSBmdW5jdGlvblxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBleGVjID0gYXN5bmMgKGZ1bmN0aW9uTmFtZTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRXhlYyBmdW5jdGlvblwiLCBmdW5jdGlvbk5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZXhlYy8ke2Z1bmN0aW9uTmFtZX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIFNBQVMgc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2Fhc1NldHRpbmdzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJHZXRTYWFzU2V0dGluZ3NcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL3NhYXNgLCB7IGhlYWRlcnM6IHsgc2VjcmV0OiBcIjIxdGg2ZHIvNXQxcXplM3I1MUY2KjxTODVHNFFFODVFMVk2RSpcIiB9IH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSTtcclxuIl19