"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _colors = _interopRequireDefault(require("./const/colors"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
              _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  headers = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                  return _context.abrupt("return", (0, _nodeFetch["default"])("".concat(_this.api_url).concat(path), {
                    method: "POST",
                    headers: _objectSpread({}, headers.headers, {
                      "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(body)
                  }).then(function (response) {
                    return response.json();
                  })["catch"](function (e) {
                    return console.log(e);
                  }));

                case 2:
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
                  console.log("headers", _objectSpread({}, headers, {
                    "Content-Type": "application/json"
                  }));
                  _context2.next = 3;
                  return (0, _nodeFetch["default"])("".concat(_this.api_url).concat(path), {
                    method: "GET",
                    headers: _objectSpread({}, headers.headers, {
                      "Content-Type": "application/json"
                    })
                  });

                case 3:
                  response = _context2.sent;
                  return _context2.abrupt("return", response.json());

                case 5:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImFwaV90aW1lb3V0IiwiZGVidWdfbGV2ZWwiLCJsb2ciLCJtZXNzYWdlIiwicG9zdCIsInBhdGgiLCJib2R5IiwiaGVhZGVycyIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZSIsImNvbnNvbGUiLCJnZXQiLCJkYXRhIiwic3VjY2VzcyIsImhhbmRsZUVycm9yIiwicmVzdWx0IiwiZXJyb3IiLCJuYW1lIiwib25FcnJvciIsImkiLCJlbmQiLCJEYXRlIiwiZ2V0VGltZSIsIm0iLCJjcmVhdGVJbmRlbnQiLCJjb2xvcnMiLCJmZ3JlZCIsInN0YXJ0Iiwiam9pbiIsInJlc2V0IiwiZmdncmVlbiIsInJlcXVlc3QiLCJmZ2JsdWUiLCJmZ3llbGxvdyIsIm1hcCIsIm1tIiwiZmdjeWFuIiwibiIsImluZGVudCIsImxvZ3NfaW5kZW50IiwiZXh0cmFIZWFkZXJzIiwiZXh0cmFPcHRpb25zIiwiQXV0aG9yaXphdGlvbiIsInRva2VuIiwidXNlcklkIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluc3RhbmNlIiwiaGFuZGxlUmVzcG9uc2UiLCJsZW5ndGgiLCJhdXRoSGVhZGVyIiwiZW50aXR5Iiwib3B0aW9ucyIsImxpc3ROYW1lIiwiaWQiLCJzZWFyY2giLCJyZWxhdGlvbiIsImVudGl0eUlkIiwicmVsYXRpb25JZCIsIm9uU2F2ZSIsImFmdGVyU2F2ZSIsIm9uU2F2ZVJlbGF0ZWQiLCJhZnRlclNhdmVSZWxhdGVkIiwib25SZW1vdmVSZWxhdGVkIiwiYWZ0ZXJSZW1vdmVSZWxhdGVkIiwib25SZW1vdmUiLCJhZnRlckRlbGV0ZSIsIlVSTCIsImZ1bmMiLCJwYXJhbWV0ZXJzIiwiZmlsZURhdGEiLCJmaWxlIiwiZm9sZGVySWQiLCJvblVwbG9hZEZpbGUiLCJ0eXBlIiwiYWZ0ZXJVcGxvYWRGaWxlIiwiZmlsZUlkIiwicmVzcG9uc2VU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IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgY29sb3JzIGZyb20gXCIuL2NvbnN0L2NvbG9yc1wiO1xyXG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XHJcbmltcG9ydCBmZXRjaCBmcm9tIFwibm9kZS1mZXRjaFwiO1xyXG5cclxuY2xhc3MgQVBJIHtcclxuICAgIC8vICogVkFSSUFCTEVTICpcclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSBjb250YWlucyB0aGUgdG9rZW4gb2YgdGhlIHVzZXIgKi9cclxuICAgIHB1YmxpYyB0b2tlbiE6IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIDAgPSBub25lLCAxID0gbm9ybWFsLCAyID0gZGV0YWlsZWQsIDMgPSBkZXRhaWxlZCArIHJlc3VsdHMgKi9cclxuICAgIHB1YmxpYyBkZWJ1Z19sZXZlbDogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIEV4dHJhIGluZGVudCBmb3IgbG9ncyAqL1xyXG4gICAgcHVibGljIGxvZ3NfaW5kZW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBzdGFydCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIHN0YXJ0ITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBlbmQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBlbmQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdmFyaWFibGUgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIEFYSU9TIGluc3RhbmNlICovXHJcbiAgICBwcml2YXRlIGluc3RhbmNlOiBhbnk7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgVVJMIHRvIHRoZSBDUk0gYmFja2VuZCAqL1xyXG4gICAgcHJpdmF0ZSBhcGlfdXJsPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHRpbWVvdXQgdGltZSB0byB0aGUgQVBJICovXHJcbiAgICBwdWJsaWMgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDMwMDA7XHJcblxyXG4gICAgLy8gKiBDT05TVFJVQ1RPUiAqXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlfdXJsOiBzdHJpbmcsIGFwaV90aW1lb3V0OiBudW1iZXIgPSAzMDAwKSB7XHJcbiAgICAgICAgaWYgKCFhcGlfdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBBUEkgdXJsIGhhcyBiZWVuIHNldFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcGlfdXJsID0gYXBpX3VybDtcclxuICAgICAgICB0aGlzLmFwaV90aW1lb3V0ID0gYXBpX3RpbWVvdXQ7XHJcblxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAqIFBSSVZBVEUgTUVUSE9EUyAqXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBBeGlvcyBpbnN0YW5jZSB3aXRoIHRoZSBVUkwgYW5kIGhlYWRlcnNcclxuICAgICAqIEByZXR1cm5zIEFuIGF4aW9zIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiQXhpb3MgaGFzIGJlZW4gaW50aXRpYWxpemVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwb3N0OiBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBhbnksIGhlYWRlcnM6IGFueSA9IHt9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlfdXJsfSR7cGF0aH1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IC4uLmhlYWRlcnMuaGVhZGVycywgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiBjb25zb2xlLmxvZyhlKSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXQ6IGFzeW5jIChwYXRoOiBzdHJpbmcsIGhlYWRlcnM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFkZXJzXCIsIHsgLi4uaGVhZGVycywgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt0aGlzLmFwaV91cmx9JHtwYXRofWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLmhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZGVsZXRlOiBhc3luYyAocGF0aDogc3RyaW5nLCBoZWFkZXJzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3RoaXMuYXBpX3VybH0ke3BhdGh9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IC4uLmhlYWRlcnMuaGVhZGVycywgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uRXJyb3IhOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UgPSAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIlJlc3BvbnNlIGlzIGJlaW5nIGhhbmRsZWRcIik7XHJcbiAgICAgICAgLy8gR2V0IHRoZSByZXN1bHQgZGF0YSBvZiB0aGUgcmVxdWVzdFxyXG5cclxuICAgICAgICAvLyBJZiBubyBzdWNjZXNzLCByZWRpcmVjdCB0byB0aGUgZXJyb3IgZnVuY3Rpb25cclxuICAgICAgICBpZiAoIWRhdGEuc3VjY2VzcykgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLnN1Y2Nlc3MoMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIGRhdGEuZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKDEsIGBTb21ldGhpbmcgaXMgd3Jvbmcgd2l0aCB5b3VyIGludGVybmV0IGNvbm5lY3Rpb25gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0VSVkVSX0RPV05cIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHNlcnZlciBpcyBjdXJyZW50bHkgdW5hdmFpbGFibGVcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm5hbWUgfHwgZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbkVycm9yKSB0aGlzLm9uRXJyb3IoZGF0YS5lcnJvcik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5uYW1lKSByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gZGF0YS5lcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSB3YXMgb2YgdHlwZSBlcnJvclwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcblxyXG4gICAgICAgIC8vIExvZyB0aGUgZXJyb3JcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBkYXRhLmVycm9yLm5hbWUsIGRhdGEuZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgZXJyb3JcclxuICAgICAgICByZXR1cm4gZGF0YS5lcnJvcjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3VzdG9tIGxvZ2dpbmcgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2cgPSB7XHJcbiAgICAgICAgZXJyb3I6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZncmVkfVtFUlJPUiBpbiAke3RoaXMuZW5kIC0gdGhpcy5zdGFydH1tc11gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN1Y2Nlc3M6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdncmVlbn1bU1VDQ0VTUyBpbiAke3RoaXMuZW5kIC0gdGhpcy5zdGFydH1tc11gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlcXVlc3Q6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2JsdWV9W0FQSSBSRVFVRVNUXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVzdWx0OiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZneWVsbG93fVtSRVNVTFRdYCxcclxuICAgICAgICAgICAgICAgIG0ubWFwKChtbSkgPT4gSlNPTi5zdHJpbmdpZnkobW0pKS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1lc3NhZ2U6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdjeWFufVtNRVNTQUdFXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlSW5kZW50OiAobjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbmRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG4gKyB0aGlzLmxvZ3NfaW5kZW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiAgICBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgYXV0aEhlYWRlciA9IChleHRyYUhlYWRlcnM/OiBhbnksIGV4dHJhT3B0aW9uczogYW55ID0ge30pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiR2VuZXJhdGUgYXV0aCBoZWFkZXJcIik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uZXh0cmFPcHRpb25zLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgLi4uZXh0cmFIZWFkZXJzLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vICogUFVCTElDIE1FVEhPRFMgKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdG9kbyBJbXBsZW1lbnQgaW1wZXJzb25hdGlvbiBpbiBiYWNrZW5kXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW1wZXJzb25hdGUgYSB1c2VyXHJcbiAgICAgKiBAcmV0dXJucyBPSyBvciBOT0tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcGVyc29uYXRlID0gKHVzZXJJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkltcGVyc29uYXRlXCIsIHVzZXJJZCk7XHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgXCJJbXBlcnNvbmF0aW9uIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZCB5ZXRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYSBnaXZlbiB1c2VyIGluXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXV0aGVudGlmaWNhdGlvbiB0b2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMb2dpblwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9sb2dpblwiLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3VjY2VzcyB8fCAhZGF0YS5kYXRhLnRva2VuKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5yZXN1bHQoMSwgXCJUb2tlbiBsZW5ndGhcIiwgZGF0YS5kYXRhLnRva2VuLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gZGF0YS5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgYSByZXNldCBwYXNzd29yZCB0b2tlbiA9PiBUaGlzIGlzIHNlbmQgYnkgZW1haWxcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRQYXNzd29yZCA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcInJlc2V0UGFzc3dvcmRcIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvYXV0aC9yZXNldFBhc3N3b3JkYCwgeyB1c2VybmFtZSB9LCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZW5lcmF0ZSBhIHJlc2V0IHBhc3N3b3JkIHRva2VuID0+IFRoaXMgaXMgc2VuZCBieSBlbWFpbFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROZXdQYXNzd29yZCA9IGFzeW5jICh0b2tlbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcInNldE5ld1Bhc3N3b3JkXCIsIHRva2VuKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2F1dGgvc2V0TmV3UGFzc3dvcmRgLCB7IHRva2VuLCBwYXNzd29yZCB9LCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGlzdFZhbHVlcyA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3Qgb2YgdmFsdWVzXCIsIGxpc3ROYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvbGlzdHMvJHtsaXN0TmFtZX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3RzIG9mIHZhbHVlc1xyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMaXN0cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdHMgb2YgdmFsdWVzXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9saXN0c2AsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiB2YWx1ZXMgZm9yIGEgbGlzdFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlTGlzdFZhbHVlID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9saXN0cy8ke2xpc3ROYW1lfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiB2YWx1ZXMgZm9yIGEgbGlzdFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0VmFsdWUgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJEZWxldGUgZWxlbWVudCBvZiBsaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2xpc3RzLyR7bGlzdE5hbWV9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eSB3aXRoIGEgc2VhcmNoIGNyaXRlcmlhXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlYXJjaCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNlYXJjaFwiLCBlbnRpdHksIHNlYXJjaCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0vc2VhcmNoP3NlYXJjaD0ke3NlYXJjaH0mb3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IG9uZSBlbGVtZW50IG9mIGFuIGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kT25lID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBvcHRpb25zOiBvYmplY3QgPSB7fSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIG9uZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS9vbmU/b3B0aW9ucz0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZEJ5SWQgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIsIG9wdGlvbnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgYnkgaWRcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9LyR7aWR9P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcmVsYXRlZCBlbGVtZW50cyBvZiByZWNvcmRcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZFJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIG9wdGlvbnM6IG9iamVjdCA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCByZWxhdGVkIG9mIGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9LyR7aWR9LyR7cmVsYXRpb259P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCByZWxhdGVkIGVsZW1lbnRzIG9mIHJlY29yZFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kT25lUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyLFxyXG4gICAgICAgIG9wdGlvbnM6IG9iamVjdCA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBvbmUgcmVsYXRlZCBvZiBpZFwiLCBlbnRpdHksIGVudGl0eUlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9P29wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICApfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2F2ZSBhbiBlbGVtZW50IHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vblNhdmUpIHRoaXMub25TYXZlKGVudGl0eSwgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZSkgdGhpcy5hZnRlclNhdmUoZW50aXR5LCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclNhdmUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGEgcmVsYXRpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkOiBudW1iZXIsXHJcbiAgICAgICAgZGF0YTogb2JqZWN0ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2F2ZVJlbGF0ZWQpIHRoaXMub25TYXZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmVSZWxhdGVkITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJTYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlbW92ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclJlbW92ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclJlbW92ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uUmVtb3ZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyUmVtb3ZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiUmVtb3ZlXCIsIGVudGl0eSwgaWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlbW92ZSlcclxuICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5vblJlbW92ZShlbnRpdHksIGlkKSkpIHJldHVybiB0aGlzLmxvZy5lcnJvcigxLCBcIkNhbmNlbGVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGAvZGF0YS8ke2VudGl0eX0vJHtpZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlckRlbGV0ZSkgdGhpcy5hZnRlckRlbGV0ZShlbnRpdHksIGlkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyRGVsZXRlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbmZpZyA9IGFzeW5jIChlbnRpdHk6IHN0cmluZyB8IG51bGwgPSBudWxsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNvbmZpZ1wiLCBlbnRpdHkgfHwgXCJnbG9iYWxcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IFVSTCA9ICFlbnRpdHkgPyBcIi9jb25maWdcIiA6IGAvY29uZmlnLyR7ZW50aXR5fWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChVUkwsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkYXRhYmFzZSA9IGFzeW5jIChmdW5jOiBzdHJpbmcsIHBhcmFtZXRlcnM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcImRhdGFiYXNlXCIsIGZ1bmMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGFiYXNlLyR7ZnVuY31gLCBwYXJhbWV0ZXJzLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBVcGxvYWRzIGEgZmlsZSB0byB0aGUgc2VydmVyXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGlkIGV0Y1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBsb2FkRmlsZSA9IGFzeW5jIChmaWxlRGF0YTogYW55LCBmaWxlOiBhbnksIGZvbGRlcklkPzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlVwbG9hZFwiLCBmaWxlRGF0YS5uYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25VcGxvYWRGaWxlKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uVXBsb2FkRmlsZShmaWxlRGF0YSwgZmlsZSwgZm9sZGVySWQpKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZy5lcnJvcigxLCBcIkNhbmNlbGVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChcclxuICAgICAgICAgICAgICAgIGAvZmlsZXNgLFxyXG4gICAgICAgICAgICAgICAgZmlsZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LWZpbGUtbmFtZVwiOiBmaWxlRGF0YS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwieC1maWxlLXR5cGVcIjogZmlsZURhdGEudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBcIngtcmVsYXRpb25cIjogZmlsZURhdGEucmVsYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LXJlbGF0aW9uLWlkXCI6IGZpbGVEYXRhLnJlbGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LWZvbGRlci1pZFwiOiBmb2xkZXJJZCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyVXBsb2FkRmlsZSkgdGhpcy5hZnRlclVwbG9hZEZpbGUoZmlsZURhdGEsIGZpbGUsIGZvbGRlcklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblVwbG9hZEZpbGUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclVwbG9hZEZpbGUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBEb3dubG9hZHMgYSBmaWxlIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIGZpbGUgOi0pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZEZpbGUgPSBhc3luYyAoZmlsZUlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRG93bmxvYWRcIiwgZmlsZUlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvZmlsZXMvJHtmaWxlSWR9L2Rvd25sb2FkYCwgdGhpcy5hdXRoSGVhZGVyKHt9LCB7IHJlc3BvbnNlVHlwZTogXCJibG9iXCIgfSkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBsb2FkcyBhIGZpbGUgdG8gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBpZCBldGNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUtwaSA9IGFzeW5jICh0eXBlOiBzdHJpbmcsIHF1ZXJ5OiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ2FsY3VsYXRlIEtQSVwiLCB0eXBlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2twaWAsIHsgdHlwZSwgcXVlcnkgfSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTGF1bmNoZXMgYSBjdXN0b20gZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXhlYyA9IGFzeW5jIChmdW5jdGlvbk5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkV4ZWMgZnVuY3Rpb25cIiwgZnVuY3Rpb25OYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2V4ZWMvJHtmdW5jdGlvbk5hbWV9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSTtcclxuIl19