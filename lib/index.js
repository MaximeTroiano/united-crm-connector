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
            return x.save("customers", {
              name: "Maxime's Company",
              vat: "BE0589.625.366"
            });

          case 7:
            company = _context.sent;
            _context.next = 10;
            return x.findOne("customers", {
              name: "Maxime's Company"
            });

          case 10:
            _context.next = 12;
            return x.findById("customers", company.id);

          case 12:
            _context.next = 14;
            return x.remove("customers", company.id);

          case 14:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsInNhdmUiLCJuYW1lIiwidmF0IiwiY29tcGFueSIsImZpbmRPbmUiLCJmaW5kQnlJZCIsImlkIiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQUVBLElBQUlBLENBQUMsR0FBRyxJQUFJQyxlQUFKLENBQVEsdUJBQVIsQ0FBUjs7QUFFQSxJQUFNQyxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVEMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7QUFDSUMsWUFBQUEsS0FGSyxHQUVHLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUZIO0FBR1RQLFlBQUFBLENBQUMsQ0FBQ1EsV0FBRixHQUFnQixDQUFoQjtBQUhTO0FBQUEsbUJBS0hSLENBQUMsQ0FBQ1MsS0FBRixDQUFRLFFBQVIsRUFBa0IsTUFBbEIsQ0FMRzs7QUFBQTtBQUFBO0FBQUEsbUJBT1dULENBQUMsQ0FBQ1UsSUFBRixDQUFPLFdBQVAsRUFBb0I7QUFBRUMsY0FBQUEsSUFBSSxFQUFFLGtCQUFSO0FBQTRCQyxjQUFBQSxHQUFHLEVBQUU7QUFBakMsYUFBcEIsQ0FQWDs7QUFBQTtBQU9MQyxZQUFBQSxPQVBLO0FBQUE7QUFBQSxtQkFXSGIsQ0FBQyxDQUFDYyxPQUFGLENBQVUsV0FBVixFQUF1QjtBQUFFSCxjQUFBQSxJQUFJLEVBQUU7QUFBUixhQUF2QixDQVhHOztBQUFBO0FBQUE7QUFBQSxtQkFhSFgsQ0FBQyxDQUFDZSxRQUFGLENBQVcsV0FBWCxFQUF3QkYsT0FBTyxDQUFDRyxFQUFoQyxDQWJHOztBQUFBO0FBQUE7QUFBQSxtQkFlSGhCLENBQUMsQ0FBQ2lCLE1BQUYsQ0FBUyxXQUFULEVBQXNCSixPQUFPLENBQUNHLEVBQTlCLENBZkc7O0FBQUE7QUFpQlQ7QUFFQTtBQUVBYixZQUFBQSxPQUFPLENBQUNDLEdBQVIsK0JBQW1DLElBQUlFLElBQUosR0FBV0MsT0FBWCxLQUF1QkYsS0FBMUQ7O0FBckJTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUpILElBQUk7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUF3QkFBLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVBJIGZyb20gXCIuL0FQSVwiO1xyXG5cclxubGV0IHggPSBuZXcgQVBJKFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCIpO1xyXG5cclxuY29uc3QgdGVzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiW1RFU1RdIFN0YXJ0ZWRcIik7XHJcbiAgICBsZXQgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIHguZGVidWdfbGV2ZWwgPSAzO1xyXG5cclxuICAgIGF3YWl0IHgubG9naW4oXCJNYXhpbWVcIiwgXCJ0ZXN0XCIpO1xyXG5cclxuICAgIGxldCBjb21wYW55ID0gYXdhaXQgeC5zYXZlKFwiY3VzdG9tZXJzXCIsIHsgbmFtZTogXCJNYXhpbWUncyBDb21wYW55XCIsIHZhdDogXCJCRTA1ODkuNjI1LjM2NlwiIH0pO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kKFwiY3VzdG9tZXJzXCIpO1xyXG5cclxuICAgIGF3YWl0IHguZmluZE9uZShcImN1c3RvbWVyc1wiLCB7IG5hbWU6IFwiTWF4aW1lJ3MgQ29tcGFueVwiIH0pO1xyXG5cclxuICAgIGF3YWl0IHguZmluZEJ5SWQoXCJjdXN0b21lcnNcIiwgY29tcGFueS5pZCk7XHJcblxyXG4gICAgYXdhaXQgeC5yZW1vdmUoXCJjdXN0b21lcnNcIiwgY29tcGFueS5pZCk7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZyhcImN1c3RvbWVyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguY29uZmlnKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFtURVNUU10gRW5kZWQgYWZ0ZXIgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0fW1zYCk7XHJcbn07XHJcblxyXG50ZXN0KCk7XHJcbiJdfQ==