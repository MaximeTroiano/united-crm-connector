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
    var start;
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

            _context.next = 8;
            return x.login("sdjfh", "sjdfhk");

          case 8:
            _context.next = 10;
            return x.search("customers", "Maxime");

          case 10:
            //await x.remove("customers", company.data.id);
            //await x.config("customers");
            //await x.config();
            console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

          case 11:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsIm9uRXJyb3IiLCJlcnJvciIsInNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFJQSxDQUFDLEdBQUcsSUFBSUMsZUFBSixDQUFRLHVCQUFSLENBQVI7O0FBRUEsSUFBTUMsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1RDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0lDLFlBQUFBLEtBRkssR0FFRyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFGSDtBQUdUUCxZQUFBQSxDQUFDLENBQUNRLFdBQUYsR0FBZ0IsQ0FBaEI7QUFIUztBQUFBLG1CQUtIUixDQUFDLENBQUNTLEtBQUYsQ0FBUSxRQUFSLEVBQWtCLE1BQWxCLENBTEc7O0FBQUE7QUFPVFQsWUFBQUEsQ0FBQyxDQUFDVSxPQUFGLEdBQVksVUFBU0MsS0FBVCxFQUFxQjtBQUM3QlIsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUNBQVosRUFBbURPLEtBQW5EO0FBQ0gsYUFGRDs7QUFQUztBQUFBLG1CQVdIWCxDQUFDLENBQUNTLEtBQUYsQ0FBUSxPQUFSLEVBQWlCLFFBQWpCLENBWEc7O0FBQUE7QUFBQTtBQUFBLG1CQTRCSFQsQ0FBQyxDQUFDWSxNQUFGLENBQVMsV0FBVCxFQUFzQixRQUF0QixDQTVCRzs7QUFBQTtBQThCVDtBQUVBO0FBRUE7QUFFQVQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLCtCQUFtQyxJQUFJRSxJQUFKLEdBQVdDLE9BQVgsS0FBdUJGLEtBQTFEOztBQXBDUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKSCxJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBdUNBQSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFQSSBmcm9tIFwiLi9BUElcIjtcclxuXHJcbmxldCB4ID0gbmV3IEFQSShcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMFwiKTtcclxuXHJcbmNvbnN0IHRlc3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIltURVNUXSBTdGFydGVkXCIpO1xyXG4gICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB4LmRlYnVnX2xldmVsID0gMztcclxuXHJcbiAgICBhd2FpdCB4LmxvZ2luKFwiTWF4aW1lXCIsIFwidGVzdFwiKTtcclxuXHJcbiAgICB4Lm9uRXJyb3IgPSBmdW5jdGlvbihlcnJvcjogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXN0b20gZXJyb3IgaGFuZGxpbmcgaXMgd29ya2luZyAhIVwiLCBlcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIGF3YWl0IHgubG9naW4oXCJzZGpmaFwiLCBcInNqZGZoa1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZChcInVzZXJzXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5zYXZlUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiLCAyKTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZFJlbGF0ZWQoXCJjdXN0b21lcnNcIiwgMSwgXCJlbXBsb3llZXNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmltcGVyc29uYXRlKDMpO1xyXG5cclxuICAgIC8vbGV0IGNvbXBhbnkgPSBhd2FpdCB4LnNhdmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcImdhw6t0YW4ncyBDb21wYW55XCIsIHZhdDogXCJCRTA1ODkuNjI1LjM2NlwiIH0pO1xyXG4gICAgLy9hd2FpdCB4LmZpbmQoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmRPbmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcIk1heGltZSdzIENvbXBhbnlcIiB9KTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZEJ5SWQoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICBhd2FpdCB4LnNlYXJjaChcImN1c3RvbWVyc1wiLCBcIk1heGltZVwiKTtcclxuXHJcbiAgICAvL2F3YWl0IHgucmVtb3ZlKFwiY3VzdG9tZXJzXCIsIGNvbXBhbnkuZGF0YS5pZCk7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZyhcImN1c3RvbWVyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguY29uZmlnKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFtURVNUU10gRW5kZWQgYWZ0ZXIgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0fW1zYCk7XHJcbn07XHJcblxyXG50ZXN0KCk7XHJcbiJdfQ==