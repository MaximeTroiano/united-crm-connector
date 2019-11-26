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

              return _context3.abrupt("return", _this.instance.get("/list/".concat(listName), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

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

  _defineProperty(this, "createListValue",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(listName, labels) {
      var values,
          _args4 = arguments;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              values = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};

              _this.log.request(0, "List of values", listName);

              return _context4.abrupt("return", _this.instance.post("/list/".concat(listName), {
                labels: labels,
                values: values
              }, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "search",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(entity, search) {
      var position,
          order,
          _args5 = arguments;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              position = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {
                take: 50,
                skip: 0
              };
              order = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : "";

              _this.log.request(0, "Search", entity, search, position.skip || 0, position.take || 50);

              return _context5.abrupt("return", _this.instance.get("/data/".concat(entity, "?search=").concat(search, "&skip=").concat(position.skip, "&take=").concat(position.take, "&order=").concat(order), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findOne",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(entity, where) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this.log.request(0, "Find one", entity);

              return _context6.abrupt("return", _this.instance.get("/data/".concat(entity, "/one?where=").concat(JSON.stringify(where)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x9, _x10) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findById",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(entity, id) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this.log.request(0, "Find by id", entity, id);

              return _context7.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findRelated",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(entity, id, relation) {
      var where,
          order,
          _args8 = arguments;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              where = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
              order = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : "";

              _this.log.request(0, "Find related of id", entity, id);

              return _context8.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "/").concat(relation, "?order=").concat(order), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x13, _x14, _x15) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "save",
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(entity, data) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (_this.onSave) _this.onSave(entity, data);

              _this.log.request(0, "Save", entity);

              return _context9.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(function (result) {
                if (_this.afterSave) _this.afterSave(entity, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x16, _x17) {
      return _ref9.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSave", void 0);

  _defineProperty(this, "afterSave", void 0);

  _defineProperty(this, "saveRelated",
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(entity, entityId, relation, relationId) {
      var data,
          _args10 = arguments;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              data = _args10.length > 4 && _args10[4] !== undefined ? _args10[4] : {};
              if (_this.onSaveRelated) _this.onSaveRelated(entity, entityId, relation, relationId, data);

              _this.log.request(0, "Save related", entity, entityId, relation, relationId);

              return _context10.abrupt("return", _this.instance.post("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x18, _x19, _x20, _x21) {
      return _ref10.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSaveRelated", void 0);

  _defineProperty(this, "deleteRelated",
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(entity, entityId, relation, relationId) {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (_this.onDeleteRelated) _this.onDeleteRelated(entity, entityId, relation, relationId);

              _this.log.request(0, "Delete related", entity, entityId, relation, relationId);

              return _context11.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x22, _x23, _x24, _x25) {
      return _ref11.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onDeleteRelated", void 0);

  _defineProperty(this, "remove",
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(entity, id) {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _this.log.request(0, "Remove", entity, id);

              if (!_this.onRemove) {
                _context12.next = 6;
                break;
              }

              _context12.next = 4;
              return _this.onRemove(entity, id);

            case 4:
              if (_context12.sent) {
                _context12.next = 6;
                break;
              }

              return _context12.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context12.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(function (result) {
                if (_this.afterDelete) _this.afterDelete(entity, id, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x26, _x27) {
      return _ref12.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemove", void 0);

  _defineProperty(this, "afterDelete", void 0);

  _defineProperty(this, "config",
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var entity,
          URL,
          _args13 = arguments;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              entity = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : null;
              URL = !entity ? "/config" : "/config/".concat(entity);

              _this.log.request(0, "Config", entity || "global");

              return _context13.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function () {
      return _ref13.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImRlYnVnX2xldmVsIiwibG9nIiwibWVzc2FnZSIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJhcGlfdGltZW91dCIsInJlc3BvbnNlIiwiZGF0YSIsInN1Y2Nlc3MiLCJoYW5kbGVFcnJvciIsInJlc3VsdCIsImVycm9yIiwibmFtZSIsIm9uRXJyb3IiLCJpIiwiZW5kIiwiRGF0ZSIsImdldFRpbWUiLCJtIiwiY29uc29sZSIsImNyZWF0ZUluZGVudCIsImNvbG9ycyIsImZncmVkIiwic3RhcnQiLCJqb2luIiwicmVzZXQiLCJmZ2dyZWVuIiwicmVxdWVzdCIsImZnYmx1ZSIsImZneWVsbG93IiwibWFwIiwibW0iLCJKU09OIiwic3RyaW5naWZ5IiwiZmdjeWFuIiwibiIsImluZGVudCIsImxvZ3NfaW5kZW50IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ0b2tlbiIsInVzZXJJZCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbnN0YW5jZSIsInBvc3QiLCJ0aGVuIiwiaGFuZGxlUmVzcG9uc2UiLCJsZW5ndGgiLCJlbnRpdHkiLCJ3aGVyZSIsInBvc2l0aW9uIiwidGFrZSIsInNraXAiLCJvcmRlciIsImdldCIsImF1dGhIZWFkZXIiLCJsaXN0TmFtZSIsImxhYmVscyIsInZhbHVlcyIsInNlYXJjaCIsImlkIiwicmVsYXRpb24iLCJvblNhdmUiLCJhZnRlclNhdmUiLCJlbnRpdHlJZCIsInJlbGF0aW9uSWQiLCJvblNhdmVSZWxhdGVkIiwib25EZWxldGVSZWxhdGVkIiwib25SZW1vdmUiLCJhZnRlckRlbGV0ZSIsIlVSTCIsIkVycm9yIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFHTUEsRyxHQUNGOztBQUNBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBO0FB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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFxV2I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPd0MsY0FBQUEsTUFBUCxpRUFBK0IsSUFBL0I7QUFDTnNCLGNBQUFBLEdBRE0sR0FDQSxDQUFDdEIsTUFBRCxHQUFVLFNBQVYscUJBQWlDQSxNQUFqQyxDQURBOztBQUdaLGNBQUEsS0FBSSxDQUFDbEQsR0FBTCxDQUFTNEIsT0FBVCxDQUFpQixDQUFqQixFQUFvQixRQUFwQixFQUE4QnNCLE1BQU0sSUFBSSxRQUF4Qzs7QUFIWSxpREFJTCxLQUFJLENBQUNMLFFBQUwsQ0FDRlcsR0FERSxDQUNFZ0IsR0FERixFQUNPLEtBQUksQ0FBQ2YsVUFBTCxFQURQLEVBRUZWLElBRkUsQ0FFRyxLQUFJLENBQUNDLGNBRlIsV0FHSSxLQUFJLENBQUN0QyxXQUhULENBSks7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FyV2E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ3pCLE1BQUksQ0FBQ1osT0FBTCxFQUFjLE1BQU0sSUFBSTJFLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBQ2QsT0FBSzNFLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUsrQyxRQUFMLEdBQWdCLEtBQUs2QixJQUFMLEVBQWhCO0FBQ0gsQyxDQUVEOztBQUNBOzs7Ozs7ZUF5V1c3RSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcbmltcG9ydCBheGlvcywgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1Jlc3BvbnNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi9jb25zdC9jb2xvcnNcIjtcclxuaW1wb3J0IHsgQXBpUG9zaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL0FwaVBvc2l0aW9uXCI7XHJcblxyXG5jbGFzcyBBUEkge1xyXG4gICAgLy8gKiBWQVJJQUJMRVMgKlxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIGNvbnRhaW5zIHRoZSB0b2tlbiBvZiB0aGUgdXNlciAqL1xyXG4gICAgcHVibGljIHRva2VuITogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gMCA9IG5vbmUsIDEgPSBub3JtYWwsIDIgPSBkZXRhaWxlZCwgMyA9IGRldGFpbGVkICsgcmVzdWx0cyAqL1xyXG4gICAgcHVibGljIGRlYnVnX2xldmVsOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gRXh0cmEgaW5kZW50IGZvciBsb2dzICovXHJcbiAgICBwdWJsaWMgbG9nc19pbmRlbnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIHN0YXJ0IHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgc3RhcnQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIGVuZCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIGVuZCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB2YXJpYWJsZSB0aGF0IHdpbGwgY29udGFpbiB0aGUgQVhJT1MgaW5zdGFuY2UgKi9cclxuICAgIHByaXZhdGUgaW5zdGFuY2U6IEF4aW9zSW5zdGFuY2U7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgVVJMIHRvIHRoZSBDUk0gYmFja2VuZCAqL1xyXG4gICAgcHJpdmF0ZSBhcGlfdXJsPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHRpbWVvdXQgdGltZSB0byB0aGUgQVBJICovXHJcbiAgICBwdWJsaWMgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gICAgLy8gKiBDT05TVFJVQ1RPUiAqXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlfdXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWFwaV91cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIEFQSSB1cmwgaGFzIGJlZW4gc2V0XCIpO1xyXG4gICAgICAgIHRoaXMuYXBpX3VybCA9IGFwaV91cmw7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICogUFJJVkFURSBNRVRIT0RTICpcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEF4aW9zIGluc3RhbmNlIHdpdGggdGhlIFVSTCBhbmQgaGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgQW4gYXhpb3MgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJBeGlvcyBoYXMgYmVlbiBpbnRpdGlhbGl6ZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiB0aGlzLmFwaV91cmwsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMuYXBpX3RpbWVvdXRcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uRXJyb3IhOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSBpcyBiZWluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIHN1Y2Nlc3MsIHJlZGlyZWN0IHRvIHRoZSBlcnJvciBmdW5jdGlvblxyXG4gICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihyZXNwb25zZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLnN1Y2Nlc3MoMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIGRhdGEuZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBgVGhlIGVuZHBvaW50IGRpZG4ndCByZXNwb25kIGFmdGVyICR7dGhpcy5hcGlfdGltZW91dH1tc2ApO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJTRVJWRVJfRE9XTlwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgc2VydmVyIGlzIGN1cnJlbnRseSB1bmF2YWlsYWJsZVwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiUmVzcG9uc2Ugd2FzIG9mIHR5cGUgZXJyb3JcIik7XHJcbiAgICAgICAgLy8gR2V0IHRoZSByZXN1bHQgZGF0YSBvZiB0aGUgcmVxdWVzdFxyXG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgLy8gTG9nIHRoZSBlcnJvclxyXG4gICAgICAgIHRoaXMubG9nLmVycm9yKDEsIGRhdGEuZXJyb3IubmFtZSwgZGF0YS5lcnJvci5tZXNzYWdlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25FcnJvcikgdGhpcy5vbkVycm9yKGRhdGEuZXJyb3IpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVycm9yXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyb3I7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEN1c3RvbSBsb2dnaW5nIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nID0ge1xyXG4gICAgICAgIGVycm9yOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3JlZH1bRVJST1IgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdWNjZXNzOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnZ3JlZW59W1NVQ0NFU1MgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXF1ZXN0OiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdibHVlfVtBUEkgUkVRVUVTVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3VsdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3llbGxvd31bUkVTVUxUXWAsXHJcbiAgICAgICAgICAgICAgICBtLm1hcChtbSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVJbmRlbnQ6IChuOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiArIHRoaXMubG9nc19pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGF1dGhIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIkdlbmVyYXRlIGF1dGggaGVhZGVyXCIpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vICogUFVCTElDIE1FVEhPRFMgKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdG9kbyBJbXBsZW1lbnQgaW1wZXJzb25hdGlvbiBpbiBiYWNrZW5kXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW1wZXJzb25hdGUgYSB1c2VyXHJcbiAgICAgKiBAcmV0dXJucyBPSyBvciBOT0tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcGVyc29uYXRlID0gKHVzZXJJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkltcGVyc29uYXRlXCIsIHVzZXJJZCk7XHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgXCJJbXBlcnNvbmF0aW9uIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZCB5ZXRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYSBnaXZlbiB1c2VyIGluXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXV0aGVudGlmaWNhdGlvbiB0b2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMb2dpblwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9sb2dpblwiLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAudGhlbih0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgXCJUb2tlbiBsZW5ndGhcIiwgdG9rZW4uZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmRhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICB3aGVyZTogb2JqZWN0ID0ge30sXHJcbiAgICAgICAgcG9zaXRpb246IEFwaVBvc2l0aW9uID0geyB0YWtlOiA1MCwgc2tpcDogMCB9LFxyXG4gICAgICAgIG9yZGVyOiBzdHJpbmcgPSBcIlwiXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZFwiLCBlbnRpdHksIHBvc2l0aW9uLnNraXAgfHwgMCwgcG9zaXRpb24udGFrZSB8fCA1MCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0/d2hlcmU9JHtKU09OLnN0cmluZ2lmeSh3aGVyZSl9JnNraXA9JHtwb3NpdGlvbi5za2lwfSZ0YWtlPSR7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24udGFrZVxyXG4gICAgICAgICAgICAgICAgfSZvcmRlcj0ke29yZGVyfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpc3RWYWx1ZXMgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2xpc3QvJHtsaXN0TmFtZX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlTGlzdFZhbHVlID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcsIGxhYmVsczogb2JqZWN0LCB2YWx1ZXM6IG9iamVjdCA9IHt9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3Qgb2YgdmFsdWVzXCIsIGxpc3ROYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2xpc3QvJHtsaXN0TmFtZX1gLCB7IGxhYmVscywgdmFsdWVzIH0sIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHkgd2l0aCBhIHNlYXJjaCBjcml0ZXJpYVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWFyY2ggPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgc2VhcmNoOiBzdHJpbmcsXHJcbiAgICAgICAgcG9zaXRpb246IEFwaVBvc2l0aW9uID0geyB0YWtlOiA1MCwgc2tpcDogMCB9LFxyXG4gICAgICAgIG9yZGVyOiBzdHJpbmcgPSBcIlwiXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2VhcmNoXCIsIGVudGl0eSwgc2VhcmNoLCBwb3NpdGlvbi5za2lwIHx8IDAsIHBvc2l0aW9uLnRha2UgfHwgNTApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9P3NlYXJjaD0ke3NlYXJjaH0mc2tpcD0ke3Bvc2l0aW9uLnNraXB9JnRha2U9JHtwb3NpdGlvbi50YWtlfSZvcmRlcj0ke29yZGVyfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IG9uZSBlbGVtZW50IG9mIGFuIGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kT25lID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCB3aGVyZTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgb25lXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9L29uZT93aGVyZT0ke0pTT04uc3RyaW5naWZ5KHdoZXJlKX1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRCeUlkID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgYnkgaWRcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHJlbGF0ZWQgZWxlbWVudHMgb2YgcmVjb3JkXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICB3aGVyZTogb2JqZWN0ID0ge30sXHJcbiAgICAgICAgb3JkZXI6IHN0cmluZyA9IFwiXCJcclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIHJlbGF0ZWQgb2YgaWRcIiwgZW50aXR5LCBpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvJHtlbnRpdHl9LyR7aWR9LyR7cmVsYXRpb259P29yZGVyPSR7b3JkZXJ9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2F2ZSBhbiBlbGVtZW50IHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vblNhdmUpIHRoaXMub25TYXZlKGVudGl0eSwgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJTYXZlKSB0aGlzLmFmdGVyU2F2ZShlbnRpdHksIGRhdGEsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uU2F2ZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyU2F2ZSE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZVJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlbGF0aW9uSWQ6IG51bWJlcixcclxuICAgICAgICBkYXRhOiBvYmplY3QgPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlUmVsYXRlZCkgdGhpcy5vblNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNhdmUgcmVsYXRlZFwiLCBlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fS8ke2VudGl0eUlkfS8ke3JlbGF0aW9ufS8ke3JlbGF0aW9uSWR9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25TYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVsZXRlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyXHJcbiAgICApID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vbkRlbGV0ZVJlbGF0ZWQpIHRoaXMub25EZWxldGVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkRlbGV0ZSByZWxhdGVkXCIsIGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uRGVsZXRlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiUmVtb3ZlXCIsIGVudGl0eSwgaWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlbW92ZSlcclxuICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5vblJlbW92ZShlbnRpdHksIGlkKSkpIHJldHVybiB0aGlzLmxvZy5lcnJvcigxLCBcIkNhbmNlbGVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGAvZGF0YS8ke2VudGl0eX0vJHtpZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyRGVsZXRlKSB0aGlzLmFmdGVyRGVsZXRlKGVudGl0eSwgaWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uUmVtb3ZlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJEZWxldGUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uZmlnID0gYXN5bmMgKGVudGl0eTogc3RyaW5nIHwgbnVsbCA9IG51bGwpID0+IHtcclxuICAgICAgICBjb25zdCBVUkwgPSAhZW50aXR5ID8gXCIvY29uZmlnXCIgOiBgL2NvbmZpZy8ke2VudGl0eX1gO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiQ29uZmlnXCIsIGVudGl0eSB8fCBcImdsb2JhbFwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFVSTCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSTtcclxuIl19