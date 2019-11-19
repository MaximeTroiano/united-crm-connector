"use strict";

var _API = _interopRequireDefault(require("./API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var x = new _API["default"]("http://localhost:4000");

var test =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var start, company;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("[TEST] Started");
            start = new Date().getTime();
            x.debug_level = 3;
            _context.next = 5;
            return x.login("Maxime", "test");

          case 5:
            x.onError = function (error) {
              console.log("Custom error handling is working !!", error);
            };

            x.onSave = function (entity, data) {
              console.log("Custom save function", entity, data);
            };

            _context.next = 9;
            return x.login("sdjfh", "sjdfhk");

          case 9:
            _context.next = 11;
            return x.save("customers", {
              name: "gaëtan's Company",
              vat: "BE0589.625.366"
            });

          case 11:
            company = _context.sent;
            _context.next = 14;
            return x.search("customers", "Maxime");

          case 14:
            //await x.remove("customers", company.data.id);
            //await x.config("customers");
            //await x.config();
            console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function test() {
    return _ref.apply(this, arguments);
  };
}();

test();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsIm9uRXJyb3IiLCJlcnJvciIsIm9uU2F2ZSIsImVudGl0eSIsImRhdGEiLCJzYXZlIiwibmFtZSIsInZhdCIsImNvbXBhbnkiLCJzZWFyY2giXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBSUEsQ0FBQyxHQUFHLElBQUlDLGVBQUosQ0FBUSx1QkFBUixDQUFSOztBQUVBLElBQU1DLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNUQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQUNJQyxZQUFBQSxLQUZLLEdBRUcsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBRkg7QUFHVFAsWUFBQUEsQ0FBQyxDQUFDUSxXQUFGLEdBQWdCLENBQWhCO0FBSFM7QUFBQSxtQkFLSFIsQ0FBQyxDQUFDUyxLQUFGLENBQVEsUUFBUixFQUFrQixNQUFsQixDQUxHOztBQUFBO0FBT1RULFlBQUFBLENBQUMsQ0FBQ1UsT0FBRixHQUFZLFVBQUNDLEtBQUQsRUFBZ0I7QUFDeEJSLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFDQUFaLEVBQW1ETyxLQUFuRDtBQUNILGFBRkQ7O0FBSUFYLFlBQUFBLENBQUMsQ0FBQ1ksTUFBRixHQUFXLFVBQUNDLE1BQUQsRUFBaUJDLElBQWpCLEVBQWtDO0FBQ3pDWCxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ1MsTUFBcEMsRUFBNENDLElBQTVDO0FBQ0gsYUFGRDs7QUFYUztBQUFBLG1CQWVIZCxDQUFDLENBQUNTLEtBQUYsQ0FBUSxPQUFSLEVBQWlCLFFBQWpCLENBZkc7O0FBQUE7QUFBQTtBQUFBLG1CQXlCV1QsQ0FBQyxDQUFDZSxJQUFGLENBQU8sV0FBUCxFQUFvQjtBQUFFQyxjQUFBQSxJQUFJLEVBQUUsa0JBQVI7QUFBNEJDLGNBQUFBLEdBQUcsRUFBRTtBQUFqQyxhQUFwQixDQXpCWDs7QUFBQTtBQXlCTEMsWUFBQUEsT0F6Qks7QUFBQTtBQUFBLG1CQWdDSGxCLENBQUMsQ0FBQ21CLE1BQUYsQ0FBUyxXQUFULEVBQXNCLFFBQXRCLENBaENHOztBQUFBO0FBa0NUO0FBRUE7QUFFQTtBQUVBaEIsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLCtCQUFtQyxJQUFJRSxJQUFKLEdBQVdDLE9BQVgsS0FBdUJGLEtBQTFEOztBQXhDUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKSCxJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBMkNBQSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFQSSBmcm9tIFwiLi9BUElcIjtcclxuXHJcbmxldCB4ID0gbmV3IEFQSShcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMFwiKTtcclxuXHJcbmNvbnN0IHRlc3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIltURVNUXSBTdGFydGVkXCIpO1xyXG4gICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB4LmRlYnVnX2xldmVsID0gMztcclxuXHJcbiAgICBhd2FpdCB4LmxvZ2luKFwiTWF4aW1lXCIsIFwidGVzdFwiKTtcclxuXHJcbiAgICB4Lm9uRXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VzdG9tIGVycm9yIGhhbmRsaW5nIGlzIHdvcmtpbmcgISFcIiwgZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4Lm9uU2F2ZSA9IChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXN0b20gc2F2ZSBmdW5jdGlvblwiLCBlbnRpdHksIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhd2FpdCB4LmxvZ2luKFwic2RqZmhcIiwgXCJzamRmaGtcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmQoXCJ1c2Vyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguc2F2ZVJlbGF0ZWQoXCJjdXN0b21lcnNcIiwgMSwgXCJlbXBsb3llZXNcIiwgMik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmRSZWxhdGVkKFwiY3VzdG9tZXJzXCIsIDEsIFwiZW1wbG95ZWVzXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5pbXBlcnNvbmF0ZSgzKTtcclxuXHJcbiAgICBsZXQgY29tcGFueSA9IGF3YWl0IHguc2F2ZShcImN1c3RvbWVyc1wiLCB7IG5hbWU6IFwiZ2HDq3RhbidzIENvbXBhbnlcIiwgdmF0OiBcIkJFMDU4OS42MjUuMzY2XCIgfSk7XHJcbiAgICAvL2F3YWl0IHguZmluZChcImN1c3RvbWVyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZE9uZShcImN1c3RvbWVyc1wiLCB7IG5hbWU6IFwiTWF4aW1lJ3MgQ29tcGFueVwiIH0pO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kQnlJZChcImN1c3RvbWVyc1wiLCBjb21wYW55LmRhdGEuaWQpO1xyXG5cclxuICAgIGF3YWl0IHguc2VhcmNoKFwiY3VzdG9tZXJzXCIsIFwiTWF4aW1lXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5yZW1vdmUoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICAvL2F3YWl0IHguY29uZmlnKFwiY3VzdG9tZXJzXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5jb25maWcoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgW1RFU1RTXSBFbmRlZCBhZnRlciAke25ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnR9bXNgKTtcclxufTtcclxuXHJcbnRlc3QoKTtcclxuIl19