"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _colors = _interopRequireDefault(require("./const/colors"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    return {
      post: function () {
        var _post = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(path, body) {
          var headers,
              response,
              _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  headers = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                  _context.next = 3;
                  return (0, _nodeFetch["default"])("".concat(_this.api_url).concat(path), {
                    method: "POST",
                    headers: _objectSpread({}, headers.headers, {
                      "Content-Type": "application/json"
                    }),
                    body: body && _typeof(body) === "object" ? JSON.stringify(body) : body
                  });

                case 3:
                  response = _context.sent;
                  return _context.abrupt("return", response.json());

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function post(_x, _x2) {
          return _post.apply(this, arguments);
        }

        return post;
      }(),
      get: function () {
        var _get = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(path, headers) {
          var response;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _nodeFetch["default"])("".concat(_this.api_url).concat(path), {
                    method: "GET",
                    headers: _objectSpread({}, headers.headers, {
                      "Content-Type": "application/json"
                    })
                  });

                case 2:
                  response = _context2.sent;
                  return _context2.abrupt("return", response.json());

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function get(_x3, _x4) {
          return _get.apply(this, arguments);
        }

        return get;
      }(),
      "delete": function () {
        var _delete2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(path, headers) {
          var response;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return (0, _nodeFetch["default"])("".concat(_this.api_url).concat(path), {
                    method: "DELETE",
                    headers: _objectSpread({}, headers.headers, {
                      "Content-Type": "application/json"
                    })
                  });

                case 2:
                  response = _context3.sent;
                  return _context3.abrupt("return", response.json());

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function _delete(_x5, _x6) {
          return _delete2.apply(this, arguments);
        }

        return _delete;
      }()
    };
  });

  _defineProperty(this, "onError", void 0);

  _defineProperty(this, "handleResponse", function (data) {
    if (_this.debug_level >= 2) _this.log.message(1, "Response is being handled"); // Get the result data of the request
    // If no success, redirect to the error function

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
    regeneratorRuntime.mark(function _callee4(username, password) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this.log.request(0, "Login", username);

              return _context4.abrupt("return", _this.instance.post("/auth/login", {
                username: username,
                password: password
              }).then(_this.handleResponse).then(function (data) {
                if (!data.success || !data.data.token) return _this.handleError(data.data);
                if (_this.debug_level == 3) _this.log.result(1, "Token length", data.data.token.length);
                _this.token = data.data.token;
                return data;
              })["catch"](_this.handleError));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "resetPassword",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(username) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this.log.request(0, "resetPassword", username);

              return _context5.abrupt("return", _this.instance.post("/auth/resetPassword", {
                username: username
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "setNewPassword",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(token, password) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this.log.request(0, "setNewPassword", token);

              return _context6.abrupt("return", _this.instance.post("/auth/setNewPassword", {
                token: token,
                password: password
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x10, _x11) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "find",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(entity) {
      var options,
          _args7 = arguments;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};

              _this.log.request(0, "Find", entity);

              return _context7.abrupt("return", _this.instance.get("/data/".concat(entity, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x12) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getListValues",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(listName) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _this.log.request(0, "List of values", listName);

              return _context8.abrupt("return", _this.instance.get("/lists/".concat(listName), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x13) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getLists",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _this.log.request(0, "Lists of values");

            return _context9.abrupt("return", _this.instance.get("/lists", _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));

  _defineProperty(this, "saveListValue",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(listName, data) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _this.log.request(0, "List of values", listName);

              return _context10.abrupt("return", _this.instance.post("/lists/".concat(listName), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x14, _x15) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "removeListValue",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(listName, id) {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _this.log.request(0, "Delete element of list of values", listName);

              return _context11.abrupt("return", _this.instance["delete"]("/lists/".concat(listName, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x16, _x17) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "search",
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(entity, search) {
      var options,
          _args12 = arguments;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              options = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {};

              _this.log.request(0, "Search", entity, search);

              return _context12.abrupt("return", _this.instance.get("/data/".concat(entity, "/search?search=").concat(search, "&options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x18, _x19) {
      return _ref9.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOne",
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(entity) {
      var options,
          _args13 = arguments;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              options = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};

              _this.log.request(0, "Find one", entity);

              return _context13.abrupt("return", _this.instance.get("/data/".concat(entity, "/one?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x20) {
      return _ref10.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findById",
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(entity, id) {
      var options,
          _args14 = arguments;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              options = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : {};

              _this.log.request(0, "Find by id", entity, id);

              return _context14.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findRelated",
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15(entity, id, relation) {
      var options,
          _args15 = arguments;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              options = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};

              _this.log.request(0, "Find related of id", entity, id);

              return _context15.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "/").concat(relation, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function (_x23, _x24, _x25) {
      return _ref12.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOneRelated",
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16(entity, entityId, relation, relationId) {
      var options,
          _args16 = arguments;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              options = _args16.length > 4 && _args16[4] !== undefined ? _args16[4] : {};

              _this.log.request(0, "Find one related of id", entity, entityId);

              return _context16.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId, "?options=").concat(JSON.stringify(options)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function (_x26, _x27, _x28, _x29) {
      return _ref13.apply(this, arguments);
    };
  }());

  _defineProperty(this, "save",
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17(entity, data) {
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              if (_this.onSave) _this.onSave(entity, data);

              _this.log.request(0, "Save", entity);

              return _context17.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(function (result) {
                if (_this.afterSave) _this.afterSave(entity, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));

    return function (_x30, _x31) {
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
    regeneratorRuntime.mark(function _callee18(entity, entityId, relation, relationId) {
      var data,
          _args18 = arguments;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              data = _args18.length > 4 && _args18[4] !== undefined ? _args18[4] : {};
              if (_this.onSaveRelated) _this.onSaveRelated(entity, entityId, relation, relationId, data);

              _this.log.request(0, "Save related", entity, entityId, relation, relationId);

              return _context18.abrupt("return", _this.instance.post("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), data, _this.authHeader()).then(function (result) {
                if (_this.afterSaveRelated) _this.afterSaveRelated(entity, entityId, relation, relationId, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function (_x32, _x33, _x34, _x35) {
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
    regeneratorRuntime.mark(function _callee19(entity, entityId, relation, relationId) {
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _this.log.request(0, "Delete related", entity, entityId, relation, relationId);

              if (!_this.onRemoveRelated) {
                _context19.next = 6;
                break;
              }

              _context19.next = 4;
              return _this.onRemoveRelated(entity, entityId, relation, relationId);

            case 4:
              if (_context19.sent) {
                _context19.next = 6;
                break;
              }

              return _context19.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context19.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), _this.authHeader()).then(function (result) {
                if (_this.afterRemoveRelated) _this.afterRemoveRelated(entity, entityId, relation, relationId, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));

    return function (_x36, _x37, _x38, _x39) {
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
    regeneratorRuntime.mark(function _callee20(entity, id) {
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _this.log.request(0, "Remove", entity, id);

              if (!_this.onRemove) {
                _context20.next = 6;
                break;
              }

              _context20.next = 4;
              return _this.onRemove(entity, id);

            case 4:
              if (_context20.sent) {
                _context20.next = 6;
                break;
              }

              return _context20.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context20.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(function (result) {
                if (_this.afterDelete) _this.afterDelete(entity, id, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function (_x40, _x41) {
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
    regeneratorRuntime.mark(function _callee21() {
      var entity,
          URL,
          _args21 = arguments;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              entity = _args21.length > 0 && _args21[0] !== undefined ? _args21[0] : null;

              _this.log.request(0, "Config", entity || "global");

              URL = !entity ? "/config" : "/config/".concat(entity);
              return _context21.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
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
    regeneratorRuntime.mark(function _callee22(func) {
      var parameters,
          _args22 = arguments;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              parameters = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : {};

              _this.log.request(0, "database", func);

              return _context22.abrupt("return", _this.instance.post("/database/".concat(func), parameters, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }));

    return function (_x42) {
      return _ref19.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFile",
  /*#__PURE__*/
  function () {
    var _ref20 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee23(fileData, file, folderId) {
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _this.log.request(0, "Upload", fileData.name);

              if (!_this.onUploadFile) {
                _context23.next = 6;
                break;
              }

              _context23.next = 4;
              return _this.onUploadFile(fileData, file, folderId);

            case 4:
              if (_context23.sent) {
                _context23.next = 6;
                break;
              }

              return _context23.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context23.abrupt("return", _this.instance.post("/files", file, _this.authHeader({
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
              return _context23.stop();
          }
        }
      }, _callee23);
    }));

    return function (_x43, _x44, _x45) {
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
    regeneratorRuntime.mark(function _callee24(fileId) {
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _this.log.request(0, "Download", fileId);

              return _context24.abrupt("return", _this.instance.get("/data/files/".concat(fileId, "/download"), _this.authHeader({}, {
                responseType: "blob"
              })).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }));

    return function (_x46) {
      return _ref21.apply(this, arguments);
    };
  }());

  _defineProperty(this, "calculateKpi",
  /*#__PURE__*/
  function () {
    var _ref22 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee25(type, query) {
      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _this.log.request(0, "Calculate KPI", type);

              return _context25.abrupt("return", _this.instance.post("/kpi", {
                type: type,
                query: query
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    }));

    return function (_x47, _x48) {
      return _ref22.apply(this, arguments);
    };
  }());

  _defineProperty(this, "exec",
  /*#__PURE__*/
  function () {
    var _ref23 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee26(functionName, data) {
      return regeneratorRuntime.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _this.log.request(0, "Exec function", functionName);

              return _context26.abrupt("return", _this.instance.post("/exec/".concat(functionName), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    }));

    return function (_x49, _x50) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImFwaV90aW1lb3V0IiwiZGVidWdfbGV2ZWwiLCJsb2ciLCJtZXNzYWdlIiwicG9zdCIsInBhdGgiLCJib2R5IiwiaGVhZGVycyIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZSIsImpzb24iLCJnZXQiLCJkYXRhIiwic3VjY2VzcyIsImhhbmRsZUVycm9yIiwicmVzdWx0IiwiZXJyb3IiLCJuYW1lIiwib25FcnJvciIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjb25zb2xlIiwiY3JlYXRlSW5kZW50IiwiY29sb3JzIiwiZmdyZWQiLCJzdGFydCIsImpvaW4iLCJyZXNldCIsImZnZ3JlZW4iLCJyZXF1ZXN0IiwiZmdibHVlIiwiZmd5ZWxsb3ciLCJtYXAiLCJtbSIsImZnY3lhbiIsIm4iLCJpbmRlbnQiLCJsb2dzX2luZGVudCIsImV4dHJhSGVhZGVycyIsImV4dHJhT3B0aW9ucyIsIkF1dGhvcml6YXRpb24iLCJ0b2tlbiIsInVzZXJJZCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbnN0YW5jZSIsInRoZW4iLCJoYW5kbGVSZXNwb25zZSIsImxlbmd0aCIsImF1dGhIZWFkZXIiLCJlbnRpdHkiLCJvcHRpb25zIiwibGlzdE5hbWUiLCJpZCIsInNlYXJjaCIsInJlbGF0aW9uIiwiZW50aXR5SWQiLCJyZWxhdGlvbklkIiwib25TYXZlIiwiYWZ0ZXJTYXZlIiwib25TYXZlUmVsYXRlZCIsImFmdGVyU2F2ZVJlbGF0ZWQiLCJvblJlbW92ZVJlbGF0ZWQiLCJhZnRlclJlbW92ZVJlbGF0ZWQiLCJvblJlbW92ZSIsImFmdGVyRGVsZXRlIiwiVVJMIiwiZnVuYyIsInBhcmFtZXRlcnMiLCJmaWxlRGF0YSIsImZpbGUiLCJmb2xkZXJJZCIsIm9uVXBsb2FkRmlsZSIsInR5cGUiLCJhZnRlclVwbG9hZEZpbGUiLCJmaWxlSWQiLCJyZXNwb25zZVR5cGUi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SCxJQUZFLENBRUcsS0FBSSxDQUFDQyxjQUZSLFdBR0ksS0FBSSxDQUFDcEMsV0FIVCxDQUZXOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBMWhCbUM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQXNpQjNDLG1CQUFPbUUsWUFBUCxFQUE2QnJFLElBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVixjQUFBLEtBQUksQ0FBQ1osR0FBTCxDQUFTZ0MsT0FBVCxDQUFpQixDQUFqQixFQUFvQixlQUFwQixFQUFxQ2lELFlBQXJDOztBQURVLGlEQUVILEtBQUksQ0FBQ2pDLFFBQUwsQ0FDRjlDLElBREUsaUJBQ1krRSxZQURaLEdBQzRCckUsSUFENUIsRUFDa0MsS0FBSSxDQUFDd0MsVUFBTCxFQURsQyxFQUVGSCxJQUZFLENBRUcsS0FBSSxDQUFDQyxjQUZSLFdBR0ksS0FBSSxDQUFDcEMsV0FIVCxDQUZHOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBdGlCMkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ3JELE1BQUksQ0FBQ2pCLE9BQUwsRUFBYyxNQUFNLElBQUlxRixLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUVkLE9BQUtyRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUVBLE9BQUtrRCxRQUFMLEdBQWdCLEtBQUttQyxJQUFMLEVBQWhCO0FBQ0gsQyxDQUVEOztBQUNBOzs7Ozs7ZUFxaUJXdkYsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4vY29uc3QvY29sb3JzXCI7XHJcbmltcG9ydCBodHRwcyBmcm9tIFwiaHR0cHNcIjtcclxuaW1wb3J0IGZldGNoIGZyb20gXCJub2RlLWZldGNoXCI7XHJcblxyXG5jbGFzcyBBUEkge1xyXG4gICAgLy8gKiBWQVJJQUJMRVMgKlxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIGNvbnRhaW5zIHRoZSB0b2tlbiBvZiB0aGUgdXNlciAqL1xyXG4gICAgcHVibGljIHRva2VuITogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gMCA9IG5vbmUsIDEgPSBub3JtYWwsIDIgPSBkZXRhaWxlZCwgMyA9IGRldGFpbGVkICsgcmVzdWx0cyAqL1xyXG4gICAgcHVibGljIGRlYnVnX2xldmVsOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gRXh0cmEgaW5kZW50IGZvciBsb2dzICovXHJcbiAgICBwdWJsaWMgbG9nc19pbmRlbnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIHN0YXJ0IHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgc3RhcnQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIGVuZCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIGVuZCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB2YXJpYWJsZSB0aGF0IHdpbGwgY29udGFpbiB0aGUgQVhJT1MgaW5zdGFuY2UgKi9cclxuICAgIHByaXZhdGUgaW5zdGFuY2U6IGFueTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gdGhlIENSTSBiYWNrZW5kICovXHJcbiAgICBwcml2YXRlIGFwaV91cmw/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdGltZW91dCB0aW1lIHRvIHRoZSBBUEkgKi9cclxuICAgIHB1YmxpYyBhcGlfdGltZW91dDogbnVtYmVyID0gMzAwMDtcclxuXHJcbiAgICAvLyAqIENPTlNUUlVDVE9SICpcclxuICAgIGNvbnN0cnVjdG9yKGFwaV91cmw6IHN0cmluZywgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDMwMDApIHtcclxuICAgICAgICBpZiAoIWFwaV91cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIEFQSSB1cmwgaGFzIGJlZW4gc2V0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFwaV91cmwgPSBhcGlfdXJsO1xyXG4gICAgICAgIHRoaXMuYXBpX3RpbWVvdXQgPSBhcGlfdGltZW91dDtcclxuXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICogUFJJVkFURSBNRVRIT0RTICpcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEF4aW9zIGluc3RhbmNlIHdpdGggdGhlIFVSTCBhbmQgaGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgQW4gYXhpb3MgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJBeGlvcyBoYXMgYmVlbiBpbnRpdGlhbGl6ZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBvc3Q6IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IGFueSwgaGVhZGVyczogYW55ID0ge30pID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3RoaXMuYXBpX3VybH0ke3BhdGh9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLmhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keSAmJiB0eXBlb2YgYm9keSA9PT0gXCJvYmplY3RcIiA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogYm9keSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXQ6IGFzeW5jIChwYXRoOiBzdHJpbmcsIGhlYWRlcnM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dGhpcy5hcGlfdXJsfSR7cGF0aH1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgLi4uaGVhZGVycy5oZWFkZXJzLCBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZTogYXN5bmMgKHBhdGg6IHN0cmluZywgaGVhZGVyczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt0aGlzLmFwaV91cmx9JHtwYXRofWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLmhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBvbkVycm9yITogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlID0gKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSBpcyBiZWluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuXHJcbiAgICAgICAgLy8gSWYgbm8gc3VjY2VzcywgcmVkaXJlY3QgdG8gdGhlIGVycm9yIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHJldHVybiB0aGlzLmhhbmRsZUVycm9yKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5zdWNjZXNzKDEpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDMpIHRoaXMubG9nLnJlc3VsdCgxLCBkYXRhLmRhdGEpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBkYXRhO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yID0gKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBgU29tZXRoaW5nIGlzIHdyb25nIHdpdGggeW91ciBpbnRlcm5ldCBjb25uZWN0aW9uYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlNFUlZFUl9ET1dOXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlRoZSBzZXJ2ZXIgaXMgY3VycmVudGx5IHVuYXZhaWxhYmxlXCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5uYW1lIHx8IGRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub25FcnJvcikgdGhpcy5vbkVycm9yKGRhdGEuZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubmFtZSkgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIGRhdGEuZXJyb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiUmVzcG9uc2Ugd2FzIG9mIHR5cGUgZXJyb3JcIik7XHJcbiAgICAgICAgLy8gR2V0IHRoZSByZXN1bHQgZGF0YSBvZiB0aGUgcmVxdWVzdFxyXG5cclxuICAgICAgICAvLyBMb2cgdGhlIGVycm9yXHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgZGF0YS5lcnJvci5uYW1lLCBkYXRhLmVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVycm9yXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyb3I7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEN1c3RvbSBsb2dnaW5nIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nID0ge1xyXG4gICAgICAgIGVycm9yOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3JlZH1bRVJST1IgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdWNjZXNzOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnZ3JlZW59W1NVQ0NFU1MgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXF1ZXN0OiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdibHVlfVtBUEkgUkVRVUVTVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3VsdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3llbGxvd31bUkVTVUxUXWAsXHJcbiAgICAgICAgICAgICAgICBtLm1hcCgobW0pID0+IEpTT04uc3RyaW5naWZ5KG1tKSkuam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXNzYWdlOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnY3lhbn1bTUVTU0FHRV1gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZUluZGVudDogKG46IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5kZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuICsgdGhpcy5sb2dzX2luZGVudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gXCIgICAgXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGF1dGhIZWFkZXIgPSAoZXh0cmFIZWFkZXJzPzogYW55LCBleHRyYU9wdGlvbnM6IGFueSA9IHt9KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIkdlbmVyYXRlIGF1dGggaGVhZGVyXCIpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLmV4dHJhT3B0aW9ucyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YCxcclxuICAgICAgICAgICAgICAgIC4uLmV4dHJhSGVhZGVycyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyAqIFBVQkxJQyBNRVRIT0RTICpcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRvZG8gSW1wbGVtZW50IGltcGVyc29uYXRpb24gaW4gYmFja2VuZFxyXG4gICAgICogQGRlc2NyaXB0aW9uIEltcGVyc29uYXRlIGEgdXNlclxyXG4gICAgICogQHJldHVybnMgT0sgb3IgTk9LXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbXBlcnNvbmF0ZSA9ICh1c2VySWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJJbXBlcnNvbmF0ZVwiLCB1c2VySWQpO1xyXG4gICAgICAgIHRoaXMubG9nLmVycm9yKDEsIFwiSW1wZXJzb25hdGlvbiBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWQgeWV0XCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBMb2dzIGEgZ2l2ZW4gdXNlciBpblxyXG4gICAgICogQHJldHVybnMgVGhlIGF1dGhlbnRpZmljYXRpb24gdG9rZW5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZ2luID0gYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTG9naW5cIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KFwiL2F1dGgvbG9naW5cIiwgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MgfHwgIWRhdGEuZGF0YS50b2tlbikgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IoZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cucmVzdWx0KDEsIFwiVG9rZW4gbGVuZ3RoXCIsIGRhdGEuZGF0YS50b2tlbi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IGRhdGEuZGF0YS50b2tlbjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdlbmVyYXRlIGEgcmVzZXQgcGFzc3dvcmQgdG9rZW4gPT4gVGhpcyBpcyBzZW5kIGJ5IGVtYWlsXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0UGFzc3dvcmQgPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJyZXNldFBhc3N3b3JkXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2F1dGgvcmVzZXRQYXNzd29yZGAsIHsgdXNlcm5hbWUgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgYSByZXNldCBwYXNzd29yZCB0b2tlbiA9PiBUaGlzIGlzIHNlbmQgYnkgZW1haWxcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TmV3UGFzc3dvcmQgPSBhc3luYyAodG9rZW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJzZXROZXdQYXNzd29yZFwiLCB0b2tlbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9hdXRoL3NldE5ld1Bhc3N3b3JkYCwgeyB0b2tlbiwgcGFzc3dvcmQgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZFwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpc3RWYWx1ZXMgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2xpc3RzLyR7bGlzdE5hbWV9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0cyBvZiB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGlzdHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3RzIG9mIHZhbHVlc1wiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvbGlzdHNgLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZUxpc3RWYWx1ZSA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvbGlzdHMvJHtsaXN0TmFtZX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdFZhbHVlID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIGVsZW1lbnQgb2YgbGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9saXN0cy8ke2xpc3ROYW1lfS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHkgd2l0aCBhIHNlYXJjaCBjcml0ZXJpYVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWFyY2ggPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTZWFyY2hcIiwgZW50aXR5LCBzZWFyY2gpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9L3NlYXJjaD9zZWFyY2g9JHtzZWFyY2h9Jm9wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgb3B0aW9uczogb2JqZWN0ID0ge30pID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBvbmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vb25lP29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRCeUlkID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIGJ5IGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHJlbGF0ZWQgZWxlbWVudHMgb2YgcmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICBvcHRpb25zOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgcmVsYXRlZCBvZiBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fS8ke2lkfS8ke3JlbGF0aW9ufT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcmVsYXRlZCBlbGVtZW50cyBvZiByZWNvcmRcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBvcHRpb25zOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgb25lIHJlbGF0ZWQgb2YgaWRcIiwgZW50aXR5LCBlbnRpdHlJZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfT9vcHRpb25zPSR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYW4gZWxlbWVudCB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlKSB0aGlzLm9uU2F2ZShlbnRpdHksIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclNhdmUpIHRoaXMuYWZ0ZXJTYXZlKGVudGl0eSwgZGF0YSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25TYXZlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJTYXZlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2F2ZSBhIHJlbGF0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyLFxyXG4gICAgICAgIGRhdGE6IG9iamVjdCA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vblNhdmVSZWxhdGVkKSB0aGlzLm9uU2F2ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQsIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZSByZWxhdGVkXCIsIGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclNhdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJTYXZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgZGF0YSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25TYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyU2F2ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGEgcmVsYXRpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlclxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkRlbGV0ZSByZWxhdGVkXCIsIGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25SZW1vdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uUmVtb3ZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlJlbW92ZVwiLCBlbnRpdHksIGlkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25SZW1vdmUpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmUoZW50aXR5LCBpZCkpKSByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJEZWxldGUpIHRoaXMuYWZ0ZXJEZWxldGUoZW50aXR5LCBpZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25SZW1vdmUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlckRlbGV0ZSE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25maWcgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcgfCBudWxsID0gbnVsbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJDb25maWdcIiwgZW50aXR5IHx8IFwiZ2xvYmFsXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBVUkwgPSAhZW50aXR5ID8gXCIvY29uZmlnXCIgOiBgL2NvbmZpZy8ke2VudGl0eX1gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoVVJMLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGF0YWJhc2UgPSBhc3luYyAoZnVuYzogc3RyaW5nLCBwYXJhbWV0ZXJzOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJkYXRhYmFzZVwiLCBmdW5jKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhYmFzZS8ke2Z1bmN9YCwgcGFyYW1ldGVycywgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBsb2FkcyBhIGZpbGUgdG8gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBpZCBldGNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwbG9hZEZpbGUgPSBhc3luYyAoZmlsZURhdGE6IGFueSwgZmlsZTogYW55LCBmb2xkZXJJZD86IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJVcGxvYWRcIiwgZmlsZURhdGEubmFtZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uVXBsb2FkRmlsZSlcclxuICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5vblVwbG9hZEZpbGUoZmlsZURhdGEsIGZpbGUsIGZvbGRlcklkKSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXHJcbiAgICAgICAgICAgICAgICBgL2ZpbGVzYCxcclxuICAgICAgICAgICAgICAgIGZpbGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIFwieC1maWxlLW5hbWVcIjogZmlsZURhdGEubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcIngtZmlsZS10eXBlXCI6IGZpbGVEYXRhLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LXJlbGF0aW9uXCI6IGZpbGVEYXRhLnJlbGF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIFwieC1yZWxhdGlvbi1pZFwiOiBmaWxlRGF0YS5yZWxhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwieC1mb2xkZXItaWRcIjogZm9sZGVySWQgfHwgMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclVwbG9hZEZpbGUpIHRoaXMuYWZ0ZXJVcGxvYWRGaWxlKGZpbGVEYXRhLCBmaWxlLCBmb2xkZXJJZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25VcGxvYWRGaWxlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJVcGxvYWRGaWxlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gRG93bmxvYWRzIGEgZmlsZSBmcm9tIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSBmaWxlIDotKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG93bmxvYWRGaWxlID0gYXN5bmMgKGZpbGVJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkRvd25sb2FkXCIsIGZpbGVJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhL2ZpbGVzLyR7ZmlsZUlkfS9kb3dubG9hZGAsIHRoaXMuYXV0aEhlYWRlcih7fSwgeyByZXNwb25zZVR5cGU6IFwiYmxvYlwiIH0pKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgaWQgZXRjXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVLcGkgPSBhc3luYyAodHlwZTogc3RyaW5nLCBxdWVyeTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNhbGN1bGF0ZSBLUElcIiwgdHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9rcGlgLCB7IHR5cGUsIHF1ZXJ5IH0sIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExhdW5jaGVzIGEgY3VzdG9tIGZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4ZWMgPSBhc3luYyAoZnVuY3Rpb25OYW1lOiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJFeGVjIGZ1bmN0aW9uXCIsIGZ1bmN0aW9uTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9leGVjLyR7ZnVuY3Rpb25OYW1lfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEk7XHJcbiJdfQ==