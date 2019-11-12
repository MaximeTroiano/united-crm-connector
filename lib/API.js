"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _colors = _interopRequireDefault(require("./const/colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var API = // * VARIABLES *

/** @description This variable contains the token of the user */

/** @description 0 = none, 1 = normal, 2 = detailed, 3 = detailed + results */

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

  _defineProperty(this, "start", void 0);

  _defineProperty(this, "end", void 0);

  _defineProperty(this, "instance", void 0);

  _defineProperty(this, "api_url", void 0);

  _defineProperty(this, "api_timeout", 1000);

  _defineProperty(this, "init", function () {
    if (_this.debug_level >= 2) _this.log.message("Axios has been intitialized");
    return _axios["default"].create({
      baseURL: _this.api_url,
      timeout: _this.api_timeout
    });
  });

  _defineProperty(this, "handleResponse", function (response) {
    if (_this.debug_level >= 2) _this.log.message("Response is being handled"); // Get the result data of the request

    var data = response.data; // If no success, redirect to the error function

    if (!data.success) return _this.handleError(response);
    if (_this.debug_level >= 2) _this.log.success();
    if (_this.debug_level == 3) _this.log.result(data.data); // Return the resulting data;

    return data.data;
  });

  _defineProperty(this, "handleError", function (response) {
    if (_this.debug_level >= 2) _this.log.message("Response was of type error"); // Get the result data of the request

    var data = response.data; // Log the error

    _this.log.error(data.error.name, data.error.message); // Return the error


    return data.error;
  });

  _defineProperty(this, "log", {
    error: function error() {
      if (_this.debug_level == 0) return;
      _this.end = new Date().getTime();

      for (var _len = arguments.length, m = new Array(_len), _key = 0; _key < _len; _key++) {
        m[_key] = arguments[_key];
      }

      console.error("    ".concat(_colors["default"].fgred, "[ERROR in ").concat(_this.end - _this.start, "ms]"), m.join(" "), _colors["default"].reset);
    },
    success: function success() {
      if (_this.debug_level == 0) return;
      _this.end = new Date().getTime();

      for (var _len2 = arguments.length, m = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        m[_key2] = arguments[_key2];
      }

      console.error("    ".concat(_colors["default"].fggreen, "[SUCCESS in ").concat(_this.end - _this.start, "ms]"), m.join(" "), _colors["default"].reset);
    },
    request: function request() {
      if (_this.debug_level == 0) return;
      _this.start = new Date().getTime();

      for (var _len3 = arguments.length, m = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        m[_key3] = arguments[_key3];
      }

      console.error("".concat(_colors["default"].fgblue, "[API REQUEST]"), m.join(" "), _colors["default"].reset);
    },
    result: function result() {
      if (_this.debug_level == 0) return;

      for (var _len4 = arguments.length, m = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        m[_key4] = arguments[_key4];
      }

      console.error("    ".concat(_colors["default"].fgyellow, "[RESULT]"), m.map(function (mm) {
        return JSON.stringify(mm);
      }).join(" "), _colors["default"].reset);
    },
    message: function message() {
      if (_this.debug_level == 0) return;

      for (var _len5 = arguments.length, m = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        m[_key5] = arguments[_key5];
      }

      console.error("    ".concat(_colors["default"].fgcyan, "[MESSAGE]"), m.join(" "), _colors["default"].reset);
    }
  });

  _defineProperty(this, "authHeader", function () {
    if (_this.debug_level >= 2) _this.log.message("Generate auth header");
    return {
      headers: {
        Authorization: "Bearer ".concat(_this.token)
      }
    };
  });

  _defineProperty(this, "login", function _callee(username, password) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _this.log.request("Login", username);

            return _context.abrupt("return", _this.instance.post("/auth/login", {
              username: username,
              password: password
            }).then(_this.handleResponse).then(function (token) {
              if (_this.debug_level == 3) _this.log.result("Token length", token.length);
              _this.token = token;
            })["catch"](_this.handleError));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });

  _defineProperty(this, "find", function _callee2(entity) {
    var where,
        position,
        _args2 = arguments;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            where = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            position = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {
              take: 50,
              skip: 0
            };

            _this.log.request("Find", entity, position.skip || 0, position.take || 50);

            return _context2.abrupt("return", _this.instance.get("/data/".concat(entity, "?where=").concat(JSON.stringify(where), "&skip=").concat(position.skip, "&take=").concat(position.take), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  });

  _defineProperty(this, "findOne", function _callee3(entity, where) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _this.log.request("Find one", entity);

            return _context3.abrupt("return", _this.instance.get("/data/".concat(entity, "/one?where=").concat(JSON.stringify(where)), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  });

  _defineProperty(this, "findById", function _callee4(entity, id) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _this.log.request("Find by id", entity, id);

            return _context4.abrupt("return", _this.instance.get("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  });

  _defineProperty(this, "save", function _callee5(entity, data) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _this.log.request("Save", entity);

            return _context5.abrupt("return", _this.instance.post("/data/".concat(entity), data, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  });

  _defineProperty(this, "remove", function _callee6(entity, id) {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _this.log.request("Remove", entity, id);

            return _context6.abrupt("return", _this.instance["delete"]("/data/".concat(entity, "/").concat(id), _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  });

  _defineProperty(this, "config", function _callee7() {
    var entity,
        URL,
        _args7 = arguments;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            entity = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : null;
            URL = !entity ? "/config" : "/config/".concat(entity);

            _this.log.request("Config", entity || "global");

            return _context7.abrupt("return", _this.instance.get(URL, _this.authHeader()).then(_this.handleResponse)["catch"](_this.handleError));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    });
  });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BUEkudHMiXSwibmFtZXMiOlsiQVBJIiwiYXBpX3VybCIsImRlYnVnX2xldmVsIiwibG9nIiwibWVzc2FnZSIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRpbWVvdXQiLCJhcGlfdGltZW91dCIsInJlc3BvbnNlIiwiZGF0YSIsInN1Y2Nlc3MiLCJoYW5kbGVFcnJvciIsInJlc3VsdCIsImVycm9yIiwibmFtZSIsImVuZCIsIkRhdGUiLCJnZXRUaW1lIiwibSIsImNvbnNvbGUiLCJjb2xvcnMiLCJmZ3JlZCIsInN0YXJ0Iiwiam9pbiIsInJlc2V0IiwiZmdncmVlbiIsInJlcXVlc3QiLCJmZ2JsdWUiLCJmZ3llbGxvdyIsIm1hcCIsIm1tIiwiSlNPTiIsInN0cmluZ2lmeSIsImZnY3lhbiIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwidG9rZW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiaW5zdGFuY2UiLCJwb3N0IiwidGhlbiIsImhhbmRsZVJlc3BvbnNlIiwibGVuZ3RoIiwiZW50aXR5Iiwid2hlcmUiLCJwb3NpdGlvbiIsInRha2UiLCJza2lwIiwiZ2V0IiwiYXV0aEhlYWRlciIsImlkIiwiVVJMIiwiRXJyb3IiLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0lBR01BLEcsR0FDRjs7QUFDQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTs7QUFHQTtBQUdBO0FBQ0EsYUFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQWxCQSxDQWtCQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSx1Q0FIQyxJQUdEOztBQUFBLGdDQVdkLFlBQU07QUFDakIsUUFBSSxLQUFJLENBQUNDLFdBQUwsSUFBb0IsQ0FBeEIsRUFBMkIsS0FBSSxDQUFDQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUIsNkJBQWpCO0FBRTNCLFdBQU9DLGtCQUFNQyxNQUFOLENBQWE7QUFDaEJDLE1B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LENBQUNDLGNBRlIsV0FHSSxLQUFJLENBQUMvQixXQUhULENBSks7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FqTWE7O0FBQ3pCLE1BQUksQ0FBQ1osT0FBTCxFQUFjLE1BQU0sSUFBSXNELEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBQ2QsT0FBS3RELE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUt3QyxRQUFMLEdBQWdCLEtBQUtlLElBQUwsRUFBaEI7QUFDSCxDLENBRUQ7O0FBQ0E7Ozs7OztlQXFNV3hELEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXNwb25zZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4vY29uc3QvY29sb3JzXCI7XHJcbmltcG9ydCB7IEFwaVBvc2l0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9BcGlQb3NpdGlvblwiO1xyXG5cclxuY2xhc3MgQVBJIHtcclxuICAgIC8vICogVkFSSUFCTEVTICpcclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhpcyB2YXJpYWJsZSBjb250YWlucyB0aGUgdG9rZW4gb2YgdGhlIHVzZXIgKi9cclxuICAgIHB1YmxpYyB0b2tlbiE6IHN0cmluZztcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIDAgPSBub25lLCAxID0gbm9ybWFsLCAyID0gZGV0YWlsZWQsIDMgPSBkZXRhaWxlZCArIHJlc3VsdHMgKi9cclxuICAgIHB1YmxpYyBkZWJ1Z19sZXZlbDogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgc3RhcnQgdGltZSBvZiBhbnkgcmVxdWVzdCAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydCE6IG51bWJlcjtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoaXMgdmFyaWFibGUgd2lsbCBjb250YWluZSB0aGUgZW5kIHRpbWUgb2YgYW55IHJlcXVlc3QgKi9cclxuICAgIHByaXZhdGUgZW5kITogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBAZGVzY3JpcHRpb24gVGhlIHZhcmlhYmxlIHRoYXQgd2lsbCBjb250YWluIHRoZSBBWElPUyBpbnN0YW5jZSAqL1xyXG4gICAgcHJpdmF0ZSBpbnN0YW5jZTogQXhpb3NJbnN0YW5jZTtcclxuXHJcbiAgICAvKiogQGRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gdGhlIENSTSBiYWNrZW5kICovXHJcbiAgICBwcml2YXRlIGFwaV91cmw/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBkZXNjcmlwdGlvbiBUaGUgdGltZW91dCB0aW1lIHRvIHRoZSBBUEkgKi9cclxuICAgIHByaXZhdGUgYXBpX3RpbWVvdXQ6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gICAgLy8gKiBDT05TVFJVQ1RPUiAqXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlfdXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWFwaV91cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIEFQSSB1cmwgaGFzIGJlZW4gc2V0XCIpO1xyXG4gICAgICAgIHRoaXMuYXBpX3VybCA9IGFwaV91cmw7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICogUFJJVkFURSBNRVRIT0RTICpcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEF4aW9zIGluc3RhbmNlIHdpdGggdGhlIFVSTCBhbmQgaGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgQW4gYXhpb3MgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoXCJBeGlvcyBoYXMgYmVlbiBpbnRpdGlhbGl6ZWRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiB0aGlzLmFwaV91cmwsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMuYXBpX3RpbWVvdXRcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZSA9IChyZXNwb25zZTogQXhpb3NSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZShcIlJlc3BvbnNlIGlzIGJlaW5nIGhhbmRsZWRcIik7XHJcbiAgICAgICAgLy8gR2V0IHRoZSByZXN1bHQgZGF0YSBvZiB0aGUgcmVxdWVzdFxyXG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgLy8gSWYgbm8gc3VjY2VzcywgcmVkaXJlY3QgdG8gdGhlIGVycm9yIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHJldHVybiB0aGlzLmhhbmRsZUVycm9yKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cuc3VjY2VzcygpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID09IDMpIHRoaXMubG9nLnJlc3VsdChkYXRhLmRhdGEpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBkYXRhO1xyXG4gICAgICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnX2xldmVsID49IDIpIHRoaXMubG9nLm1lc3NhZ2UoXCJSZXNwb25zZSB3YXMgb2YgdHlwZSBlcnJvclwiKTtcclxuICAgICAgICAvLyBHZXQgdGhlIHJlc3VsdCBkYXRhIG9mIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAvLyBMb2cgdGhlIGVycm9yXHJcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoZGF0YS5lcnJvci5uYW1lLCBkYXRhLmVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGVycm9yXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZXJyb3I7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEN1c3RvbSBsb2dnaW5nIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nID0ge1xyXG4gICAgICAgIGVycm9yOiAoLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgYCAgICAke2NvbG9ycy5mZ3JlZH1bRVJST1IgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdWNjZXNzOiAoLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgICAgICR7Y29sb3JzLmZnZ3JlZW59W1NVQ0NFU1MgaW4gJHt0aGlzLmVuZCAtIHRoaXMuc3RhcnR9bXNdYCxcclxuICAgICAgICAgICAgICAgIG0uam9pbihcIiBcIiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcnMucmVzZXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXF1ZXN0OiAoLi4ubTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtjb2xvcnMuZmdibHVlfVtBUEkgUkVRVUVTVF1gLCBtLmpvaW4oXCIgXCIpLCBjb2xvcnMucmVzZXQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3VsdDogKC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgYCAgICAke2NvbG9ycy5mZ3llbGxvd31bUkVTVUxUXWAsXHJcbiAgICAgICAgICAgICAgICBtLm1hcChtbSA9PiBKU09OLnN0cmluZ2lmeShtbSkpLmpvaW4oXCIgXCIpLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzLnJlc2V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWVzc2FnZTogKC4uLm06IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAgICAgJHtjb2xvcnMuZmdjeWFufVtNRVNTQUdFXWAsIG0uam9pbihcIiBcIiksIGNvbG9ycy5yZXNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGF1dGhIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdfbGV2ZWwgPj0gMikgdGhpcy5sb2cubWVzc2FnZShcIkdlbmVyYXRlIGF1dGggaGVhZGVyXCIpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vICogUFVCTElDIE1FVEhPRFMgKlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYSBnaXZlbiB1c2VyIGluXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXV0aGVudGlmaWNhdGlvbiB0b2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoXCJMb2dpblwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9sb2dpblwiLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAudGhlbih0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z19sZXZlbCA9PSAzKSB0aGlzLmxvZy5yZXN1bHQoXCJUb2tlbiBsZW5ndGhcIiwgdG9rZW4ubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgdGhlIGxpc3Qgb2YgYW55IGVudGl0eVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5kID0gYXN5bmMgKFxyXG4gICAgICAgIGVudGl0eTogc3RyaW5nLFxyXG4gICAgICAgIHdoZXJlOiBvYmplY3QgPSB7fSxcclxuICAgICAgICBwb3NpdGlvbjogQXBpUG9zaXRpb24gPSB7IHRha2U6IDUwLCBza2lwOiAwIH1cclxuICAgICkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoXCJGaW5kXCIsIGVudGl0eSwgcG9zaXRpb24uc2tpcCB8fCAwLCBwb3NpdGlvbi50YWtlIHx8IDUwKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KFxyXG4gICAgICAgICAgICAgICAgYC9kYXRhLyR7ZW50aXR5fT93aGVyZT0ke0pTT04uc3RyaW5naWZ5KHdoZXJlKX0mc2tpcD0ke3Bvc2l0aW9uLnNraXB9JnRha2U9JHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi50YWtlXHJcbiAgICAgICAgICAgICAgICB9YCxcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aEhlYWRlcigpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXQgb25lIGVsZW1lbnQgb2YgYW4gZW50aXR5XHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbmRPbmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIHdoZXJlOiBvYmplY3QpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KFwiRmluZCBvbmVcIiwgZW50aXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vb25lP3doZXJlPSR7SlNPTi5zdHJpbmdpZnkod2hlcmUpfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEdldCBvbmUgZWxlbWVudCBvZiBhbiBlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmluZEJ5SWQgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KFwiRmluZCBieSBpZFwiLCBlbnRpdHksIGlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICAuZ2V0KGAvZGF0YS8ke2VudGl0eX0vJHtpZH1gLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBTYXZlIGFuIGVsZW1lbnQgdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0aW5nIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoXCJTYXZlXCIsIGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VcclxuICAgICAgICAgICAgLnBvc3QoYC9kYXRhLyR7ZW50aXR5fWAsIGRhdGEsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmUgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcsIGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLmxvZy5yZXF1ZXN0KFwiUmVtb3ZlXCIsIGVudGl0eSwgaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoYC9kYXRhLyR7ZW50aXR5fS8ke2lkfWAsIHRoaXMuYXV0aEhlYWRlcigpKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmhhbmRsZVJlc3BvbnNlKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdGluZyBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25maWcgPSBhc3luYyAoZW50aXR5OiBzdHJpbmcgfCBudWxsID0gbnVsbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFVSTCA9ICFlbnRpdHkgPyBcIi9jb25maWdcIiA6IGAvY29uZmlnLyR7ZW50aXR5fWA7XHJcblxyXG4gICAgICAgIHRoaXMubG9nLnJlcXVlc3QoXCJDb25maWdcIiwgZW50aXR5IHx8IFwiZ2xvYmFsXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgICAgIC5nZXQoVVJMLCB0aGlzLmF1dGhIZWFkZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZXNwb25zZSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJO1xyXG4iXX0=