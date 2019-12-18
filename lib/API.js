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

  _defineProperty(this, "authHeader", function (extraHeaders) {
    if (_this.debug_level >= 2) _this.log.message(1, "Generate auth header");
    return {
      headers: _objectSpread({
        Authorization: "Bearer ".concat(_this.token)
      }, extraHeaders)
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

  _defineProperty(this, "search",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(entity, search) {
      var position,
          order,
          _args6 = arguments;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              position = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {
                take: 50,
                skip: 0
              };
              order = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : "";

              _this.log.request(0, "Search", entity, search, position.skip || 0, position.take || 50);

              return _context6.abrupt("return", _this.instance.get("/data/".concat(entity, "?search=").concat(search, "&skip=").concat(position.skip, "&take=").concat(position.take, "&order=").concat(order), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
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

  _defineProperty(this, "findOne",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(entity, where) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this.log.request(0, "Find one", entity);

              return _context7.abrupt("return", _this.instance.get("/data/".concat(entity, "/one?where=").concat(JSON.stringify(where)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
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

  _defineProperty(this, "findById",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(entity, id) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _this.log.request(0, "Find by id", entity, id);

              return _context8.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x11, _x12) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "findRelated",
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(entity, id, relation) {
      var where,
          order,
          _args9 = arguments;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              where = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
              order = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : "";

              _this.log.request(0, "Find related of id", entity, id);

              return _context9.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id, "/").concat(relation, "?order=").concat(order), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x13, _x14, _x15) {
      return _ref9.apply(this, arguments);
    };
  }());

  _defineProperty(this, "save",
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(entity, data) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (_this.onSave) _this.onSave(entity, data);

              _this.log.request(0, "Save", entity);

              return _context10.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(function (result) {
                if (_this.afterSave) _this.afterSave(entity, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x16, _x17) {
      return _ref10.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSave", void 0);

  _defineProperty(this, "afterSave", void 0);

  _defineProperty(this, "saveRelated",
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(entity, entityId, relation, relationId) {
      var data,
          _args11 = arguments;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              data = _args11.length > 4 && _args11[4] !== undefined ? _args11[4] : {};
              if (_this.onSaveRelated) _this.onSaveRelated(entity, entityId, relation, relationId, data);

              _this.log.request(0, "Save related", entity, entityId, relation, relationId);

              return _context11.abrupt("return", _this.instance.post("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), data, _this.authHeader()).then(function (result) {
                if (_this.afterSaveRelated) _this.afterSaveRelated(entity, entityId, relation, relationId, data, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x18, _x19, _x20, _x21) {
      return _ref11.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onSaveRelated", void 0);

  _defineProperty(this, "afterSaveRelated", void 0);

  _defineProperty(this, "removeRelated",
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(entity, entityId, relation, relationId) {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _this.log.request(0, "Delete related", entity, entityId, relation, relationId);

              if (!_this.onRemoveRelated) {
                _context12.next = 6;
                break;
              }

              _context12.next = 4;
              return _this.onRemoveRelated(entity, entityId, relation, relationId);

            case 4:
              if (_context12.sent) {
                _context12.next = 6;
                break;
              }

              return _context12.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context12.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(entityId, "/").concat(relation, "/").concat(relationId), _this.authHeader()).then(function (result) {
                if (_this.afterRemoveRelated) _this.afterRemoveRelated(entity, entityId, relation, relationId, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x22, _x23, _x24, _x25) {
      return _ref12.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemoveRelated", void 0);

  _defineProperty(this, "afterRemoveRelated", void 0);

  _defineProperty(this, "remove",
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(entity, id) {
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _this.log.request(0, "Remove", entity, id);

              if (!_this.onRemove) {
                _context13.next = 6;
                break;
              }

              _context13.next = 4;
              return _this.onRemove(entity, id);

            case 4:
              if (_context13.sent) {
                _context13.next = 6;
                break;
              }

              return _context13.abrupt("return", _this.log.error(1, "Canceled"));

            case 6:
              return _context13.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(function (result) {
                if (_this.afterDelete) _this.afterDelete(entity, id, result);
                return result;
              }).then(_this.handleResponse)["catch"](_this.handleError));

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x26, _x27) {
      return _ref13.apply(this, arguments);
    };
  }());

  _defineProperty(this, "onRemove", void 0);

  _defineProperty(this, "afterDelete", void 0);

  _defineProperty(this, "config",
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var entity,
          URL,
          _args14 = arguments;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              entity = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : null;

              _this.log.request(0, "Config", entity || "global");

              URL = !entity ? "/config" : "/config/".concat(entity);
              return _context14.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function () {
      return _ref14.apply(this, arguments);
    };
  }());

  _defineProperty(this, "uploadFile",
  /*#__PURE__*/
  function () {
    var _ref15 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15(fileName, chunkBlob, folderId) {
      var data;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _this.log.request(0, "Upload", fileName);

              data = new FormData();
              data.append("file", chunkBlob);
              return _context15.abrupt("return", _this.instance.post("/files", data, _this.authHeader({
                "x-file-name": fileName,
                "x-folder-id": folderId || 0
              })).then(_this.handleResponse)["catch"](_this.handleError));

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function (_x28, _x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }());

  _defineProperty(this, "downloadFile",
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16(fileId) {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _this.log.request(0, "Download", fileId);

              return _context16.abrupt("return", _this.instance.get("/data/files/".concat(fileId, "/download"), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function (_x31) {
      return _ref16.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImRlYnVnX2xldmVsIiwibG9nIiwibWVzc2FnZSIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJhcGlfdGltZW91dCIsInJlc3BvbnNlIiwiZGF0YSIsInN1Y2Nlc3MiLCJoYW5kbGVFcnJvciIsInJlc3VsdCIsImVycm9yIiwibmFtZSIsIm9uRXJyb3IiLCJpIiwiZW5kIiwiRGF0ZSIsImdldFRpbWUiLCJtIiwiY29uc29sZSIsImNyZWF0ZUluZGVudCIsImNvbG9ycyIsImZncmVkIiwic3RhcnQiLCJqb2luIiwicmVzZXQiLCJmZ2dyZWVuIiwicmVxdWVzdCIsImZnYmx1ZSIsImZneWVsbG93IiwibWFwIiwibW0iLCJKU09OIiwic3RyaW5naWZ5IiwiZmdjeWFuIiwibiIsImluZGVudCIsImxvZ3NfaW5kZW50IiwiZXh0cmFIZWFkZXJzIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ0b2tlbiIsInVzZXJJZCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbnN0YW5jZSIsInBvc3QiLCJ0aGVuIiwiaGFuZGxlUmVzcG9uc2UiLCJsZW5ndGgiLCJlbnRpdHkiLCJ3aGVyZSIsInBvc2l0aW9uIiwidGFrZSIsInNraXAiLCJvcmRlciIsImdldCIsImF1dGhIZWFkZXIiLCJsaXN0TmFtZSIsInNlYXJjaCIsImlkIiwicmVsYXRpb24iLCJvblNhdmUiLCJhZnRlclNhdmUiLCJlbnRpdHlJZCIsInJlbGF0aW9uSWQiLCJvblNhdmVSZWxhdGVkIiwiYWZ0ZXJTYXZlUmVsYXRlZCIsIm9uUmVtb3ZlUmVsYXRlZCIsImFmdGVyUmVtb3ZlUmVsYXRlZCIsIm9uUmVtb3ZlIiwiYWZ0ZXJEZWxldGUiLCJVUkwiLCJmaWxlTmFtZSIsImNodW5rQmxvYiIsImZvbGRlcklkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlSWQiLCJFcnJvciIsImluaXQiXSwibWFwcGluZ3Mi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QTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFzYVAsbUJBQU9xRSxNQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbEIsY0FBQSxLQUFJLENBQUMvRSxHQUFMLENBQVM0QixPQUFULENBQWlCLENBQWpCLEVBQW9CLFVBQXBCLEVBQWdDbUQsTUFBaEM7O0FBRGtCLGlEQUdYLEtBQUksQ0FBQ2pDLFFBQUwsQ0FDRlcsR0FERSx1QkFDaUJzQixNQURqQixnQkFDb0MsS0FBSSxDQUFDckIsVUFBTCxFQURwQyxFQUVGVixJQUZFLENBRUcsS0FBSSxDQUFDQyxjQUZSLFdBR0ksS0FBSSxDQUFDdkMsV0FIVCxDQUhXOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBdGFPOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUN6QixNQUFJLENBQUNaLE9BQUwsRUFBYyxNQUFNLElBQUlrRixLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUNkLE9BQUtsRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLZ0QsUUFBTCxHQUFnQixLQUFLbUMsSUFBTCxFQUFoQjtBQUNILEMsQ0FFRDs7QUFDQTs7Ozs7O2VBeWFXcEYsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXNwb25zZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4vY29uc3QvY29sb3JzXCI7XHJcbmltcG9ydCB7IEFwaVBvc2l0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9BcGlQb3NpdGlvblwiO1xyXG5cclxuY2xhc3MgQVBJIHtcclxuICAgIC8vICogVkFSSUFCTEVTICpcclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSBjb250YWlucyB0aGUgdG9rZW4gb2YgdGhlIHVzZXIgKi9cclxuICAgIHB1YmxpYyB0b2tlbiE6IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIDAgPSBub25lLCAxID0gbm9ybWFsLCAyID0gZGV0YWlsZWQsIDMgPSBkZXRhaWxlZCArIHJlc3VsdHMgKi9cclxuICAgIHB1YmxpYyBkZWJ1Z19sZXZlbDogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIEV4dHJhIGluZGVudCBmb3IgbG9ncyAqL1xyXG4gICAgcHVibGljIGxvZ3NfaW5kZW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBzdGFydCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIHN0YXJ0ITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSB3aWxsIGNvbnRhaW5lIHRoZSBlbmQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBlbmQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdmFyaWFibGUgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIEFYSU9TIGluc3RhbmNlICovXHJcbiAgICBwcml2YXRlIGluc3RhbmNlOiBBeGlvc0luc3RhbmNlO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIFVSTCB0byB0aGUgQ1JNIGJhY2tlbmQgKi9cclxuICAgIHByaXZhdGUgYXBpX3VybD86IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB0aW1lb3V0IHRpbWUgdG8gdGhlIEFQSSAqL1xyXG4gICAgcHVibGljIGFwaV90aW1lb3V0OiBudW1iZXIgPSAxMDAwO1xyXG5cclxuICAgIC8vICogQ09OU1RSVUNUT1IgKlxyXG4gICAgY29uc3RydWN0b3IoYXBpX3VybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFhcGlfdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBBUEkgdXJsIGhhcyBiZWVuIHNldFwiKTtcclxuICAgICAgICB0aGlzLmFwaV91cmwgPSBhcGlfdXJsO1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAqIFBSSVZBVEUgTUVUSE9EUyAqXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBBeGlvcyBpbnN0YW5jZSB3aXRoIHRoZSBVUkwgYW5kIGhlYWRlcnNcclxuICAgICAqIEByZXR1cm5zIEFuIGF4aW9zIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiQXhpb3MgaGFzIGJlZW4gaW50aXRpYWxpemVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcclxuICAgICAgICAgICAgYmFzZVVSTDogdGhpcy5hcGlfdXJsLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLmFwaV90aW1lb3V0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBvbkVycm9yITogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlID0gKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiUmVzcG9uc2UgaXMgYmVpbmcgaGFuZGxlZFwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBJZiBubyBzdWNjZXNzLCByZWRpcmVjdCB0byB0aGUgZXJyb3IgZnVuY3Rpb25cclxuICAgICAgICBpZiAoIWRhdGEuc3VjY2VzcykgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5zdWNjZXNzKDEpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDMpIHRoaXMubG9nLnJlc3VsdCgxLCBkYXRhLmRhdGEpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBkYXRhO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yID0gKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgYFRoZSBlbmRwb2ludCBkaWRuJ3QgcmVzcG9uZCBhZnRlciAke3RoaXMuYXBpX3RpbWVvdXR9bXNgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0VSVkVSX0RPV05cIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHNlcnZlciBpcyBjdXJyZW50bHkgdW5hdmFpbGFibGVcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIlJlc3BvbnNlIHdhcyBvZiB0eXBlIGVycm9yXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIExvZyB0aGUgZXJyb3JcclxuICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBkYXRhLmVycm9yLm5hbWUsIGRhdGEuZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHRoaXMub25FcnJvcihkYXRhLmVycm9yKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlcnJvclxyXG4gICAgICAgIHJldHVybiBkYXRhLmVycm9yO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBDdXN0b20gbG9nZ2luZyBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZyA9IHtcclxuICAgICAgICBlcnJvcjogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdyZWR9W0VSUk9SIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VjY2VzczogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2dyZWVufVtTVUNDRVNTIGluICR7dGhpcy5lbmQgLSB0aGlzLnN0YXJ0fW1zXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVxdWVzdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnYmx1ZX1bQVBJIFJFUVVFU1RdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXN1bHQ6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmd5ZWxsb3d9W1JFU1VMVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5tYXAobW0gPT4gSlNPTi5zdHJpbmdpZnkobW0pKS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1lc3NhZ2U6IChpOiBudW1iZXIgPSAwLCAuLi5tOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdjeWFufVtNRVNTQUdFXWAsXHJcbiAgICAgICAgICAgICAgICBtLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlSW5kZW50OiAobjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbmRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG4gKyB0aGlzLmxvZ3NfaW5kZW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiAgICBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRoSGVhZGVyID0gKGV4dHJhSGVhZGVycz86IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJHZW5lcmF0ZSBhdXRoIGhlYWRlclwiKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy50b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgLi4uZXh0cmFIZWFkZXJzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyAqIFBVQkxJQyBNRVRIT0RTICpcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRvZG8gSW1wbGVtZW50IGltcGVyc29uYXRpb24gaW4gYmFja2VuZFxyXG4gICAgICogQGRlc2NyaXB0aW9uIEltcGVyc29uYXRlIGEgdXNlclxyXG4gICAgICogQHJldHVybnMgT0sgb3IgTk9LXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbXBlcnNvbmF0ZSA9ICh1c2VySWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJJbXBlcnNvbmF0ZVwiLCB1c2VySWQpO1xyXG4gICAgICAgIHRoaXMubG9nLmVycm9yKDEsIFwiSW1wZXJzb25hdGlvbiBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWQgeWV0XCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBMb2dzIGEgZ2l2ZW4gdXNlciBpblxyXG4gICAgICogQHJldHVybnMgVGhlIGF1dGhlbnRpZmljYXRpb24gdG9rZW5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZ2luID0gYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTG9naW5cIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KFwiL2F1dGgvbG9naW5cIiwgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLnRoZW4odG9rZW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIFwiVG9rZW4gbGVuZ3RoXCIsIHRva2VuLmRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiBhbnkgZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgd2hlcmU6IG9iamVjdCA9IHt9LFxyXG4gICAgICAgIHBvc2l0aW9uOiBBcGlQb3NpdGlvbiA9IHsgdGFrZTogNTAsIHNraXA6IDAgfSxcclxuICAgICAgICBvcmRlcjogc3RyaW5nID0gXCJcIlxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmRcIiwgZW50aXR5LCBwb3NpdGlvbi5za2lwIHx8IDAsIHBvc2l0aW9uLnRha2UgfHwgNTApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoXHJcbiAgICAgICAgICAgICAgICBgL2RhdGEvJHtlbnRpdHl9P3doZXJlPSR7SlNPTi5zdHJpbmdpZnkod2hlcmUpfSZza2lwPSR7cG9zaXRpb24uc2tpcH0mdGFrZT0ke1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnRha2VcclxuICAgICAgICAgICAgICAgIH0mb3JkZXI9JHtvcmRlcn1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiB2YWx1ZXMgZm9yIGEgbGlzdFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMaXN0VmFsdWVzID0gYXN5bmMgKGxpc3ROYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9saXN0cy8ke2xpc3ROYW1lfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdHMgb2YgdmFsdWVzXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpc3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0cyBvZiB2YWx1ZXNcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2xpc3RzYCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVMaXN0VmFsdWUgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3Qgb2YgdmFsdWVzXCIsIGxpc3ROYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2xpc3RzLyR7bGlzdE5hbWV9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eSB3aXRoIGEgc2VhcmNoIGNyaXRlcmlhXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlYXJjaCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBzZWFyY2g6IHN0cmluZyxcclxuICAgICAgICBwb3NpdGlvbjogQXBpUG9zaXRpb24gPSB7IHRha2U6IDUwLCBza2lwOiAwIH0sXHJcbiAgICAgICAgb3JkZXI6IHN0cmluZyA9IFwiXCJcclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTZWFyY2hcIiwgZW50aXR5LCBzZWFyY2gsIHBvc2l0aW9uLnNraXAgfHwgMCwgcG9zaXRpb24udGFrZSB8fCA1MCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0/c2VhcmNoPSR7c2VhcmNofSZza2lwPSR7cG9zaXRpb24uc2tpcH0mdGFrZT0ke3Bvc2l0aW9uLnRha2V9Jm9yZGVyPSR7b3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRPbmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIHdoZXJlOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBvbmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vb25lP3doZXJlPSR7SlNPTi5zdHJpbmdpZnkod2hlcmUpfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZEJ5SWQgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCBieSBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vJHtpZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgcmVsYXRlZCBlbGVtZW50cyBvZiByZWNvcmRcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZFJlbGF0ZWQgPSBhc3luYyAoXHJcbiAgICAgICAgZW50aXR5OiBzdHJpbmcsXHJcbiAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICByZWxhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHdoZXJlOiBvYmplY3QgPSB7fSxcclxuICAgICAgICBvcmRlcjogc3RyaW5nID0gXCJcIlxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkZpbmQgcmVsYXRlZCBvZiBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vJHtpZH0vJHtyZWxhdGlvbn0/b3JkZXI9JHtvcmRlcn1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGFuIGVsZW1lbnQgdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2F2ZSkgdGhpcy5vblNhdmUoZW50aXR5LCBkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNhdmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGEvJHtlbnRpdHl9YCwgZGF0YSwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlclNhdmUpIHRoaXMuYWZ0ZXJTYXZlKGVudGl0eSwgZGF0YSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25TYXZlITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJTYXZlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2F2ZSBhIHJlbGF0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyLFxyXG4gICAgICAgIGRhdGE6IG9iamVjdCA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vblNhdmVSZWxhdGVkKSB0aGlzLm9uU2F2ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQsIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZSByZWxhdGVkXCIsIGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAucG9zdChgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclNhdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmVSZWxhdGVkITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJTYXZlUmVsYXRlZCE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYSByZWxhdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcmVsYXRpb25JZDogbnVtYmVyXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRGVsZXRlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlbW92ZVJlbGF0ZWQpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkKSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7ZW50aXR5SWR9LyR7cmVsYXRpb259LyR7cmVsYXRpb25JZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyUmVtb3ZlUmVsYXRlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyUmVtb3ZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25SZW1vdmVSZWxhdGVkITogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWZ0ZXJSZW1vdmVSZWxhdGVkITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJSZW1vdmVcIiwgZW50aXR5LCBpZCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uUmVtb3ZlKVxyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCB0aGlzLm9uUmVtb3ZlKGVudGl0eSwgaWQpKSkgcmV0dXJuIHRoaXMubG9nLmVycm9yKDEsIFwiQ2FuY2VsZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJEZWxldGUpIHRoaXMuYWZ0ZXJEZWxldGUoZW50aXR5LCBpZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgb25SZW1vdmUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlckRlbGV0ZSE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25maWcgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcgfCBudWxsID0gbnVsbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJDb25maWdcIiwgZW50aXR5IHx8IFwiZ2xvYmFsXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBVUkwgPSAhZW50aXR5ID8gXCIvY29uZmlnXCIgOiBgL2NvbmZpZy8ke2VudGl0eX1gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoVVJMLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBVcGxvYWRzIGEgZmlsZSB0byB0aGUgc2VydmVyXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGlkIGV0Y1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBsb2FkRmlsZSA9IGFzeW5jIChmaWxlTmFtZTogc3RyaW5nLCBjaHVua0Jsb2I6IGFueSwgZm9sZGVySWQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiVXBsb2FkXCIsIGZpbGVOYW1lKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcImZpbGVcIiwgY2h1bmtCbG9iKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXHJcbiAgICAgICAgICAgICAgICBgL2ZpbGVzYCxcclxuICAgICAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIFwieC1maWxlLW5hbWVcIjogZmlsZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LWZvbGRlci1pZFwiOiBmb2xkZXJJZCB8fCAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBsb2FkcyBhIGZpbGUgdG8gdGhlIHNlcnZlclxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBpZCBldGNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvd25sb2FkRmlsZSA9IGFzeW5jIChmaWxlSWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJEb3dubG9hZFwiLCBmaWxlSWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS9maWxlcy8ke2ZpbGVJZH0vZG93bmxvYWRgLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJO1xyXG4iXX0=