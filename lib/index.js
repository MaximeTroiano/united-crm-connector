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
            return x.createListValue("lov_employees_contract", {
              en: "Test"
            }, {
              description: "This means a test contract"
            });

          case 9:
            _context.next = 11;
            return x.createListValue("lov_employees_contract", {
              en: "None"
            });

          case 11:
            _context.next = 13;
            return x.getListValues("lov_employees_contract");

          case 13:
            _context.next = 15;
            return x.login("sdjfh", "sjdfhk");

          case 15:
            _context.next = 17;
            return x.save("customers", {
              name: "gaëtan's Company",
              vat: "BE0589.625.366"
            });

          case 17:
            company = _context.sent;
            _context.next = 20;
            return x.search("customers", "Maxime");

          case 20:
            //await x.remove("customers", company.data.id);
            //await x.config("customers");
            //await x.config();
            console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

          case 21:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsIm9uRXJyb3IiLCJlcnJvciIsIm9uU2F2ZSIsImVudGl0eSIsImRhdGEiLCJjcmVhdGVMaXN0VmFsdWUiLCJlbiIsImRlc2NyaXB0aW9uIiwiZ2V0TGlzdFZhbHVlcyIsInNhdmUiLCJuYW1lIiwidmF0IiwiY29tcGFueSIsInNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFJQSxDQUFDLEdBQUcsSUFBSUMsZUFBSixDQUFRLHVCQUFSLENBQVI7O0FBRUEsSUFBTUMsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1RDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0lDLFlBQUFBLEtBRkssR0FFRyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFGSDtBQUdUUCxZQUFBQSxDQUFDLENBQUNRLFdBQUYsR0FBZ0IsQ0FBaEI7QUFIUztBQUFBLG1CQUtIUixDQUFDLENBQUNTLEtBQUYsQ0FBUSxRQUFSLEVBQWtCLE1BQWxCLENBTEc7O0FBQUE7QUFPVFQsWUFBQUEsQ0FBQyxDQUFDVSxPQUFGLEdBQVksVUFBQ0MsS0FBRCxFQUFnQjtBQUN4QlIsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUNBQVosRUFBbURPLEtBQW5EO0FBQ0gsYUFGRDs7QUFJQVgsWUFBQUEsQ0FBQyxDQUFDWSxNQUFGLEdBQVcsVUFBQ0MsTUFBRCxFQUFpQkMsSUFBakIsRUFBa0M7QUFDekNYLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaLEVBQW9DUyxNQUFwQyxFQUE0Q0MsSUFBNUM7QUFDSCxhQUZEOztBQVhTO0FBQUEsbUJBZUhkLENBQUMsQ0FBQ2UsZUFBRixDQUNGLHdCQURFLEVBRUY7QUFBRUMsY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFGRSxFQUdGO0FBQUVDLGNBQUFBLFdBQVcsRUFBRTtBQUFmLGFBSEUsQ0FmRzs7QUFBQTtBQUFBO0FBQUEsbUJBb0JIakIsQ0FBQyxDQUFDZSxlQUFGLENBQWtCLHdCQUFsQixFQUE0QztBQUFFQyxjQUFBQSxFQUFFLEVBQUU7QUFBTixhQUE1QyxDQXBCRzs7QUFBQTtBQUFBO0FBQUEsbUJBc0JIaEIsQ0FBQyxDQUFDa0IsYUFBRixDQUFnQix3QkFBaEIsQ0F0Qkc7O0FBQUE7QUFBQTtBQUFBLG1CQXdCSGxCLENBQUMsQ0FBQ1MsS0FBRixDQUFRLE9BQVIsRUFBaUIsUUFBakIsQ0F4Qkc7O0FBQUE7QUFBQTtBQUFBLG1CQWtDV1QsQ0FBQyxDQUFDbUIsSUFBRixDQUFPLFdBQVAsRUFBb0I7QUFBRUMsY0FBQUEsSUFBSSxFQUFFLGtCQUFSO0FBQTRCQyxjQUFBQSxHQUFHLEVBQUU7QUFBakMsYUFBcEIsQ0FsQ1g7O0FBQUE7QUFrQ0xDLFlBQUFBLE9BbENLO0FBQUE7QUFBQSxtQkF5Q0h0QixDQUFDLENBQUN1QixNQUFGLENBQVMsV0FBVCxFQUFzQixRQUF0QixDQXpDRzs7QUFBQTtBQTJDVDtBQUVBO0FBRUE7QUFFQXBCLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUiwrQkFBbUMsSUFBSUUsSUFBSixHQUFXQyxPQUFYLEtBQXVCRixLQUExRDs7QUFqRFM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBSkgsSUFBSTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQW9EQUEsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBUEkgZnJvbSBcIi4vQVBJXCI7XHJcblxyXG5sZXQgeCA9IG5ldyBBUEkoXCJodHRwOi8vbG9jYWxob3N0OjQwMDBcIik7XHJcblxyXG5jb25zdCB0ZXN0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJbVEVTVF0gU3RhcnRlZFwiKTtcclxuICAgIGxldCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgeC5kZWJ1Z19sZXZlbCA9IDM7XHJcblxyXG4gICAgYXdhaXQgeC5sb2dpbihcIk1heGltZVwiLCBcInRlc3RcIik7XHJcblxyXG4gICAgeC5vbkVycm9yID0gKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1c3RvbSBlcnJvciBoYW5kbGluZyBpcyB3b3JraW5nICEhXCIsIGVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgeC5vblNhdmUgPSAoZW50aXR5OiBzdHJpbmcsIGRhdGE6IG9iamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VzdG9tIHNhdmUgZnVuY3Rpb25cIiwgZW50aXR5LCBkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgYXdhaXQgeC5jcmVhdGVMaXN0VmFsdWUoXHJcbiAgICAgICAgXCJsb3ZfZW1wbG95ZWVzX2NvbnRyYWN0XCIsXHJcbiAgICAgICAgeyBlbjogXCJUZXN0XCIgfSxcclxuICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIlRoaXMgbWVhbnMgYSB0ZXN0IGNvbnRyYWN0XCIgfVxyXG4gICAgKTtcclxuICAgIGF3YWl0IHguY3JlYXRlTGlzdFZhbHVlKFwibG92X2VtcGxveWVlc19jb250cmFjdFwiLCB7IGVuOiBcIk5vbmVcIiB9KTtcclxuXHJcbiAgICBhd2FpdCB4LmdldExpc3RWYWx1ZXMoXCJsb3ZfZW1wbG95ZWVzX2NvbnRyYWN0XCIpO1xyXG5cclxuICAgIGF3YWl0IHgubG9naW4oXCJzZGpmaFwiLCBcInNqZGZoa1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZChcInVzZXJzXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5zYXZlUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiLCAyKTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZFJlbGF0ZWQoXCJjdXN0b21lcnNcIiwgMSwgXCJlbXBsb3llZXNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmltcGVyc29uYXRlKDMpO1xyXG5cclxuICAgIGxldCBjb21wYW55ID0gYXdhaXQgeC5zYXZlKFwiY3VzdG9tZXJzXCIsIHsgbmFtZTogXCJnYcOrdGFuJ3MgQ29tcGFueVwiLCB2YXQ6IFwiQkUwNTg5LjYyNS4zNjZcIiB9KTtcclxuICAgIC8vYXdhaXQgeC5maW5kKFwiY3VzdG9tZXJzXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kT25lKFwiY3VzdG9tZXJzXCIsIHsgbmFtZTogXCJNYXhpbWUncyBDb21wYW55XCIgfSk7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmRCeUlkKFwiY3VzdG9tZXJzXCIsIGNvbXBhbnkuZGF0YS5pZCk7XHJcblxyXG4gICAgYXdhaXQgeC5zZWFyY2goXCJjdXN0b21lcnNcIiwgXCJNYXhpbWVcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LnJlbW92ZShcImN1c3RvbWVyc1wiLCBjb21wYW55LmRhdGEuaWQpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5jb25maWcoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZygpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBbVEVTVFNdIEVuZGVkIGFmdGVyICR7bmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydH1tc2ApO1xyXG59O1xyXG5cclxudGVzdCgpO1xyXG4iXX0=