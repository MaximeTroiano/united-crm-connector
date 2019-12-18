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
    regeneratorRuntime.mark(function _callee15(fileData, chunkBlob, folderId) {
      var data;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _this.log.request(0, "Upload", fileData.name);

              data = new FormData();
              data.append("file", chunkBlob);
              return _context15.abrupt("return", _this.instance.post("/files", data, _this.authHeader({
                "x-file-name": fileData.name,
                "x-file-type": fileData.type,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImRlYnVnX2xldmVsIiwibG9nIiwibWVzc2FnZSIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJhcGlfdGltZW91dCIsInJlc3BvbnNlIiwiZGF0YSIsInN1Y2Nlc3MiLCJoYW5kbGVFcnJvciIsInJlc3VsdCIsImVycm9yIiwibmFtZSIsIm9uRXJyb3IiLCJpIiwiZW5kIiwiRGF0ZSIsImdldFRpbWUiLCJtIiwiY29uc29sZSIsImNyZWF0ZUluZGVudCIsImNvbG9ycyIsImZncmVkIiwic3RhcnQiLCJqb2luIiwicmVzZXQiLCJmZ2dyZWVuIiwicmVxdWVzdCIsImZnYmx1ZSIsImZneWVsbG93IiwibWFwIiwibW0iLCJKU09OIiwic3RyaW5naWZ5IiwiZmdjeWFuIiwibiIsImluZGVudCIsImxvZ3NfaW5kZW50IiwiZXh0cmFIZWFkZXJzIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ0b2tlbiIsInVzZXJJZCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbnN0YW5jZSIsInBvc3QiLCJ0aGVuIiwiaGFuZGxlUmVzcG9uc2UiLCJsZW5ndGgiLCJlbnRpdHkiLCJ3aGVyZSIsInBvc2l0aW9uIiwidGFrZSIsInNraXAiLCJvcmRlciIsImdldCIsImF1dGhIZWFkZXIiLCJsaXN0TmFtZSIsInNlYXJjaCIsImlkIiwicmVsYXRpb24iLCJvblNhdmUiLCJhZnRlclNhdmUiLCJlbnRpdHlJZCIsInJlbGF0aW9uSWQiLCJvblNhdmVSZWxhdGVkIiwiYWZ0ZXJTYXZlUmVsYXRlZCIsIm9uUmVtb3ZlUmVsYXRlZCIsImFmdGVyUmVtb3ZlUmVsYXRlZCIsIm9uUmVtb3ZlIiwiYWZ0ZXJEZWxldGUiLCJVUkwiLCJmaWxlRGF0YSIsImNodW5rQmxvYiIsImZvbGRlcklkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJ0eXBlIiwiZmlsZUlkIiwiRXJyb3IiLCJpbml0Il0sIm1h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TlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0EvWVM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQXVhUCxtQkFBT3NFLE1BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNsQixjQUFBLEtBQUksQ0FBQ2hGLEdBQUwsQ0FBUzRCLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0IsVUFBcEIsRUFBZ0NvRCxNQUFoQzs7QUFEa0IsaURBR1gsS0FBSSxDQUFDbEMsUUFBTCxDQUNGVyxHQURFLHVCQUNpQnVCLE1BRGpCLGdCQUNvQyxLQUFJLENBQUN0QixVQUFMLEVBRHBDLEVBRUZWLElBRkUsQ0FFRyxLQUFJLENBQUNDLGNBRlIsV0FHSSxLQUFJLENBQUN2QyxXQUhULENBSFc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0F2YU87O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ3pCLE1BQUksQ0FBQ1osT0FBTCxFQUFjLE1BQU0sSUFBSW1GLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBQ2QsT0FBS25GLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUtnRCxRQUFMLEdBQWdCLEtBQUtvQyxJQUFMLEVBQWhCO0FBQ0gsQyxDQUVEOztBQUNBOzs7Ozs7ZUEwYVdyRixHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcbmltcG9ydCBheGlvcywgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1Jlc3BvbnNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi9jb25zdC9jb2xvcnNcIjtcclxuaW1wb3J0IHsgQXBpUG9zaXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL0FwaVBvc2l0aW9uXCI7XHJcblxyXG5jbGFzcyBBUEkge1xyXG4gICAgLy8gKiBWQVJJQUJMRVMgKlxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIGNvbnRhaW5zIHRoZSB0b2tlbiBvZiB0aGUgdXNlciAqL1xyXG4gICAgcHVibGljIHRva2VuITogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gMCA9IG5vbmUsIDEgPSBub3JtYWwsIDIgPSBkZXRhaWxlZCwgMyA9IGRldGFpbGVkICsgcmVzdWx0cyAqL1xyXG4gICAgcHVibGljIGRlYnVnX2xldmVsOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gRXh0cmEgaW5kZW50IGZvciBsb2dzICovXHJcbiAgICBwdWJsaWMgbG9nc19pbmRlbnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIHN0YXJ0IHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgc3RhcnQhOiBudW1iZXI7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGlzIHZhcmlhYmxlIHdpbGwgY29udGFpbmUgdGhlIGVuZCB0aW1lIG9mIGFueSByZXF1ZXN0ICovXHJcbiAgICBwcml2YXRlIGVuZCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSB2YXJpYWJsZSB0aGF0IHdpbGwgY29udGFpbiB0aGUgQVhJT1MgaW5zdGFuY2UgKi9cclxuICAgIHByaXZhdGUgaW5zdGFuY2U6IEF4aW9zSW5zdGFuY2U7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgVVJMIHRvIHRoZSBDUk0gYmFja2VuZCAqL1xyXG4gICAgcHJpdmF0ZSBhcGlfdXJsPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHRpbWVvdXQgdGltZSB0byB0aGUgQVBJICovXHJcbiAgICBwdWJsaWMgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gICAgLy8gKiBDT05TVFJVQ1RPUiAqXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlfdXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWFwaV91cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIEFQSSB1cmwgaGFzIGJlZW4gc2V0XCIpO1xyXG4gICAgICAgIHRoaXMuYXBpX3VybCA9IGFwaV91cmw7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICogUFJJVkFURSBNRVRIT0RTICpcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEF4aW9zIGluc3RhbmNlIHdpdGggdGhlIFVSTCBhbmQgaGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgQW4gYXhpb3MgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJBeGlvcyBoYXMgYmVlbiBpbnRpdGlhbGl6ZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiB0aGlzLmFwaV91cmwsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMuYXBpX3RpbWVvdXRcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIG9uRXJyb3IhOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoMSwgXCJSZXNwb25zZSBpcyBiZWluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgIC8vIEdldCB0aGUgcmVzdWx0IGRhdGEgb2YgdGhlIHJlcXVlc3RcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIHN1Y2Nlc3MsIHJlZGlyZWN0IHRvIHRoZSBlcnJvciBmdW5jdGlvblxyXG4gICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihyZXNwb25zZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLnN1Y2Nlc3MoMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMykgdGhpcy5sb2cucmVzdWx0KDEsIGRhdGEuZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcigxLCBgVGhlIGVuZHBvaW50IGRpZG4ndCByZXNwb25kIGFmdGVyICR7dGhpcy5hcGlfdGltZW91dH1tc2ApO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJTRVJWRVJfRE9XTlwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgc2VydmVyIGlzIGN1cnJlbnRseSB1bmF2YWlsYWJsZVwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA+PSAyKSB0aGlzLmxvZy5tZXNzYWdlKDEsIFwiUmVzcG9uc2Ugd2FzIG9mIHR5cGUgZXJyb3JcIik7XHJcbiAgICAgICAgLy8gR2V0IHRoZSByZXN1bHQgZGF0YSBvZiB0aGUgcmVxdWVzdFxyXG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgLy8gTG9nIHRoZSBlcnJvclxyXG4gICAgICAgIHRoaXMubG9nLmVycm9yKDEsIGRhdGEuZXJyb3IubmFtZSwgZGF0YS5lcnJvci5tZXNzYWdlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25FcnJvcikgdGhpcy5vbkVycm9yKGRhdGEuZXJyb3IpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVycm9yXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyb3I7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEN1c3RvbSBsb2dnaW5nIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nID0ge1xyXG4gICAgICAgIGVycm9yOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3JlZH1bRVJST1IgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdWNjZXNzOiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuY3JlYXRlSW5kZW50KGkpLFxyXG4gICAgICAgICAgICAgICAgYCR7Y29sb3JzLmZnZ3JlZW59W1NVQ0NFU1MgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXF1ZXN0OiAoaTogbnVtYmVyID0gMCwgLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5jcmVhdGVJbmRlbnQoaSksXHJcbiAgICAgICAgICAgICAgICBgJHtjb2xvcnMuZmdibHVlfVtBUEkgUkVRVUVTVF1gLFxyXG4gICAgICAgICAgICAgICAgbS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgICAgIGNvbG9ycy5yZXNldFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3VsdDogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ3llbGxvd31bUkVTVUxUXWAsXHJcbiAgICAgICAgICAgICAgICBtLm1hcChtbSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKGk6IG51bWJlciA9IDAsIC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nLmNyZWF0ZUluZGVudChpKSxcclxuICAgICAgICAgICAgICAgIGAke2NvbG9ycy5mZ2N5YW59W01FU1NBR0VdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVJbmRlbnQ6IChuOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbiArIHRoaXMubG9nc19pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGF1dGhIZWFkZXIgPSAoZXh0cmFIZWFkZXJzPzogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZSgxLCBcIkdlbmVyYXRlIGF1dGggaGVhZGVyXCIpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWAsXHJcbiAgICAgICAgICAgICAgICAuLi5leHRyYUhlYWRlcnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vICogUFVCTElDIE1FVEhPRFMgKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdG9kbyBJbXBsZW1lbnQgaW1wZXJzb25hdGlvbiBpbiBiYWNrZW5kXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gSW1wZXJzb25hdGUgYSB1c2VyXHJcbiAgICAgKiBAcmV0dXJucyBPSyBvciBOT0tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcGVyc29uYXRlID0gKHVzZXJJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkltcGVyc29uYXRlXCIsIHVzZXJJZCk7XHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoMSwgXCJJbXBlcnNvbmF0aW9uIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZCB5ZXRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYSBnaXZlbiB1c2VyIGluXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXV0aGVudGlmaWNhdGlvbiB0b2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMb2dpblwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9sb2dpblwiLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAudGhlbih0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoMSwgXCJUb2tlbiBsZW5ndGhcIiwgdG9rZW4uZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIGFueSBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICB3aGVyZTogb2JqZWN0ID0ge30sXHJcbiAgICAgICAgcG9zaXRpb246IEFwaVBvc2l0aW9uID0geyB0YWtlOiA1MCwgc2tpcDogMCB9LFxyXG4gICAgICAgIG9yZGVyOiBzdHJpbmcgPSBcIlwiXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZFwiLCBlbnRpdHksIHBvc2l0aW9uLnNraXAgfHwgMCwgcG9zaXRpb24udGFrZSB8fCA1MCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChcclxuICAgICAgICAgICAgICAgIGAvZGF0YS8ke2VudGl0eX0/d2hlcmU9JHtKU09OLnN0cmluZ2lmeSh3aGVyZSl9JnNraXA9JHtwb3NpdGlvbi5za2lwfSZ0YWtlPSR7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24udGFrZVxyXG4gICAgICAgICAgICAgICAgfSZvcmRlcj0ke29yZGVyfWAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhIZWFkZXIoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgYSBsaXN0XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpc3RWYWx1ZXMgPSBhc3luYyAobGlzdE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJMaXN0IG9mIHZhbHVlc1wiLCBsaXN0TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2xpc3RzLyR7bGlzdE5hbWV9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IHRoZSBsaXN0cyBvZiB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGlzdHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkxpc3RzIG9mIHZhbHVlc1wiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvbGlzdHNgLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGxpc3RcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZUxpc3RWYWx1ZSA9IGFzeW5jIChsaXN0TmFtZTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiTGlzdCBvZiB2YWx1ZXNcIiwgbGlzdE5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvbGlzdHMvJHtsaXN0TmFtZX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCB0aGUgbGlzdCBvZiBhbnkgZW50aXR5IHdpdGggYSBzZWFyY2ggY3JpdGVyaWFcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VhcmNoID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIHNlYXJjaDogc3RyaW5nLFxyXG4gICAgICAgIHBvc2l0aW9uOiBBcGlQb3NpdGlvbiA9IHsgdGFrZTogNTAsIHNraXA6IDAgfSxcclxuICAgICAgICBvcmRlcjogc3RyaW5nID0gXCJcIlxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlNlYXJjaFwiLCBlbnRpdHksIHNlYXJjaCwgcG9zaXRpb24uc2tpcCB8fCAwLCBwb3NpdGlvbi50YWtlIHx8IDUwKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fT9zZWFyY2g9JHtzZWFyY2h9JnNraXA9JHtwb3NpdGlvbi5za2lwfSZ0YWtlPSR7cG9zaXRpb24udGFrZX0mb3JkZXI9JHtvcmRlcn1gLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZE9uZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgd2hlcmU6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIG9uZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS9vbmU/d2hlcmU9JHtKU09OLnN0cmluZ2lmeSh3aGVyZSl9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0IG9uZSBlbGVtZW50IG9mIGFuIGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kQnlJZCA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJGaW5kIGJ5IGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCByZWxhdGVkIGVsZW1lbnRzIG9mIHJlY29yZFxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kUmVsYXRlZCA9IGFzeW5jIChcclxuICAgICAgICBlbnRpdHk6IHN0cmluZyxcclxuICAgICAgICBpZDogbnVtYmVyLFxyXG4gICAgICAgIHJlbGF0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgd2hlcmU6IG9iamVjdCA9IHt9LFxyXG4gICAgICAgIG9yZGVyOiBzdHJpbmcgPSBcIlwiXHJcbiAgICApID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRmluZCByZWxhdGVkIG9mIGlkXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfS8ke3JlbGF0aW9ufT9vcmRlcj0ke29yZGVyfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFNhdmUgYW4gZWxlbWVudCB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSA9IGFzeW5jIChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25TYXZlKSB0aGlzLm9uU2F2ZShlbnRpdHksIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiU2F2ZVwiLCBlbnRpdHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX1gLCBkYXRhLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyU2F2ZSkgdGhpcy5hZnRlclNhdmUoZW50aXR5LCBkYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblNhdmUhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclNhdmUhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGEgcmVsYXRpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkOiBudW1iZXIsXHJcbiAgICAgICAgZGF0YTogb2JqZWN0ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2F2ZVJlbGF0ZWQpIHRoaXMub25TYXZlUmVsYXRlZChlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCwgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJTYXZlIHJlbGF0ZWRcIiwgZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJTYXZlUmVsYXRlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyU2F2ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQsIGRhdGEsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIG9uU2F2ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclNhdmVSZWxhdGVkITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2F2ZSBhIHJlbGF0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVSZWxhdGVkID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgcmVsYXRpb246IHN0cmluZyxcclxuICAgICAgICByZWxhdGlvbklkOiBudW1iZXJcclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJEZWxldGUgcmVsYXRlZFwiLCBlbnRpdHksIGVudGl0eUlkLCByZWxhdGlvbiwgcmVsYXRpb25JZCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uUmVtb3ZlUmVsYXRlZClcclxuICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5vblJlbW92ZVJlbGF0ZWQoZW50aXR5LCBlbnRpdHlJZCwgcmVsYXRpb24sIHJlbGF0aW9uSWQpKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZy5lcnJvcigxLCBcIkNhbmNlbGVkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGAvZGF0YS8ke2VudGl0eX0vJHtlbnRpdHlJZH0vJHtyZWxhdGlvbn0vJHtyZWxhdGlvbklkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJSZW1vdmVSZWxhdGVkKGVudGl0eSwgZW50aXR5SWQsIHJlbGF0aW9uLCByZWxhdGlvbklkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBhZnRlclJlbW92ZVJlbGF0ZWQhOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlID0gYXN5bmMgKGVudGl0eTogc3RyaW5nLCBpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIlJlbW92ZVwiLCBlbnRpdHksIGlkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25SZW1vdmUpXHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IHRoaXMub25SZW1vdmUoZW50aXR5LCBpZCkpKSByZXR1cm4gdGhpcy5sb2cuZXJyb3IoMSwgXCJDYW5jZWxlZFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShgL2RhdGEvJHtlbnRpdHl9LyR7aWR9YCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZnRlckRlbGV0ZSkgdGhpcy5hZnRlckRlbGV0ZShlbnRpdHksIGlkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBvblJlbW92ZSE6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFmdGVyRGVsZXRlITogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbmZpZyA9IGFzeW5jIChlbnRpdHk6IHN0cmluZyB8IG51bGwgPSBudWxsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2cucmVxdWVzdCgwLCBcIkNvbmZpZ1wiLCBlbnRpdHkgfHwgXCJnbG9iYWxcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IFVSTCA9ICFlbnRpdHkgPyBcIi9jb25maWdcIiA6IGAvY29uZmlnLyR7ZW50aXR5fWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChVUkwsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgaWQgZXRjXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGxvYWRGaWxlID0gYXN5bmMgKGZpbGVEYXRhOiBhbnksIGNodW5rQmxvYjogYW55LCBmb2xkZXJJZD86IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoMCwgXCJVcGxvYWRcIiwgZmlsZURhdGEubmFtZSk7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJmaWxlXCIsIGNodW5rQmxvYik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5wb3N0KFxyXG4gICAgICAgICAgICAgICAgYC9maWxlc2AsXHJcbiAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoSGVhZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBcIngtZmlsZS1uYW1lXCI6IGZpbGVEYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ4LWZpbGUtdHlwZVwiOiBmaWxlRGF0YS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwieC1mb2xkZXItaWRcIjogZm9sZGVySWQgfHwgMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHRpbmcgaWQgZXRjXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZEZpbGUgPSBhc3luYyAoZmlsZUlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KDAsIFwiRG93bmxvYWRcIiwgZmlsZUlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLmdldChgL2RhdGEvZmlsZXMvJHtmaWxlSWR9L2Rvd25sb2FkYCwgdGhpcy5hdXRoSGVhZGVyKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaGFuZGxlUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSTtcclxuIl19