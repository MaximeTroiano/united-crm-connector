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
            _context.next = 7;
            return x.find("users");

          case 7:
            _context.next = 9;
            return x.saveRelated("customers", 1, "employees", 2);

          case 9:
            _context.next = 11;
            return x.findRelated("customers", 1, "employees");

          case 11:
            _context.next = 13;
            return x.save("customers", {
              name: "Maxime's Company",
              vat: "BE0589.625.366"
            });

          case 13:
            company = _context.sent;
            return _context.abrupt("return");

          case 17:
            _context.next = 19;
            return x.findById("customers", company.id);

          case 19:
            _context.next = 21;
            return x.remove("customers", company.id);

          case 21:
            //await x.config("customers");
            //await x.config();
            console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

          case 22:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsImZpbmQiLCJzYXZlUmVsYXRlZCIsImZpbmRSZWxhdGVkIiwic2F2ZSIsIm5hbWUiLCJ2YXQiLCJjb21wYW55IiwiZmluZEJ5SWQiLCJpZCIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFJQSxDQUFDLEdBQUcsSUFBSUMsZUFBSixDQUFRLHVCQUFSLENBQVI7O0FBRUEsSUFBTUMsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1RDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0lDLFlBQUFBLEtBRkssR0FFRyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFGSDtBQUdUUCxZQUFBQSxDQUFDLENBQUNRLFdBQUYsR0FBZ0IsQ0FBaEI7QUFIUztBQUFBLG1CQUtIUixDQUFDLENBQUNTLEtBQUYsQ0FBUSxRQUFSLEVBQWtCLE1BQWxCLENBTEc7O0FBQUE7QUFBQTtBQUFBLG1CQU9IVCxDQUFDLENBQUNVLElBQUYsQ0FBTyxPQUFQLENBUEc7O0FBQUE7QUFBQTtBQUFBLG1CQVNIVixDQUFDLENBQUNXLFdBQUYsQ0FBYyxXQUFkLEVBQTJCLENBQTNCLEVBQThCLFdBQTlCLEVBQTJDLENBQTNDLENBVEc7O0FBQUE7QUFBQTtBQUFBLG1CQVdIWCxDQUFDLENBQUNZLFdBQUYsQ0FBYyxXQUFkLEVBQTJCLENBQTNCLEVBQThCLFdBQTlCLENBWEc7O0FBQUE7QUFBQTtBQUFBLG1CQWVXWixDQUFDLENBQUNhLElBQUYsQ0FBTyxXQUFQLEVBQW9CO0FBQUVDLGNBQUFBLElBQUksRUFBRSxrQkFBUjtBQUE0QkMsY0FBQUEsR0FBRyxFQUFFO0FBQWpDLGFBQXBCLENBZlg7O0FBQUE7QUFlTEMsWUFBQUEsT0FmSztBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkFxQkhoQixDQUFDLENBQUNpQixRQUFGLENBQVcsV0FBWCxFQUF3QkQsT0FBTyxDQUFDRSxFQUFoQyxDQXJCRzs7QUFBQTtBQUFBO0FBQUEsbUJBdUJIbEIsQ0FBQyxDQUFDbUIsTUFBRixDQUFTLFdBQVQsRUFBc0JILE9BQU8sQ0FBQ0UsRUFBOUIsQ0F2Qkc7O0FBQUE7QUF5QlQ7QUFFQTtBQUVBZixZQUFBQSxPQUFPLENBQUNDLEdBQVIsK0JBQW1DLElBQUlFLElBQUosR0FBV0MsT0FBWCxLQUF1QkYsS0FBMUQ7O0FBN0JTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUpILElBQUk7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUFnQ0FBLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVBJIGZyb20gXCIuL0FQSVwiO1xyXG5cclxubGV0IHggPSBuZXcgQVBJKFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCIpO1xyXG5cclxuY29uc3QgdGVzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiW1RFU1RdIFN0YXJ0ZWRcIik7XHJcbiAgICBsZXQgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIHguZGVidWdfbGV2ZWwgPSAzO1xyXG5cclxuICAgIGF3YWl0IHgubG9naW4oXCJNYXhpbWVcIiwgXCJ0ZXN0XCIpO1xyXG5cclxuICAgIGF3YWl0IHguZmluZChcInVzZXJzXCIpO1xyXG5cclxuICAgIGF3YWl0IHguc2F2ZVJlbGF0ZWQoXCJjdXN0b21lcnNcIiwgMSwgXCJlbXBsb3llZXNcIiwgMik7XHJcblxyXG4gICAgYXdhaXQgeC5maW5kUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguaW1wZXJzb25hdGUoMyk7XHJcblxyXG4gICAgbGV0IGNvbXBhbnkgPSBhd2FpdCB4LnNhdmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcIk1heGltZSdzIENvbXBhbnlcIiwgdmF0OiBcIkJFMDU4OS42MjUuMzY2XCIgfSk7XHJcbiAgICByZXR1cm47XHJcbiAgICAvL2F3YWl0IHguZmluZChcImN1c3RvbWVyc1wiKTtcclxuXHJcbiAgICBhd2FpdCB4LmZpbmRPbmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcIk1heGltZSdzIENvbXBhbnlcIiB9KTtcclxuXHJcbiAgICBhd2FpdCB4LmZpbmRCeUlkKFwiY3VzdG9tZXJzXCIsIGNvbXBhbnkuaWQpO1xyXG5cclxuICAgIGF3YWl0IHgucmVtb3ZlKFwiY3VzdG9tZXJzXCIsIGNvbXBhbnkuaWQpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5jb25maWcoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZygpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBbVEVTVFNdIEVuZGVkIGFmdGVyICR7bmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydH1tc2ApO1xyXG59O1xyXG5cclxudGVzdCgpO1xyXG4iXX0=