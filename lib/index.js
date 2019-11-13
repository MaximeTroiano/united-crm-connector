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
            _context.next = 16;
            return x.findOne("customers", {
              name: "Maxime's Company"
            });

          case 16:
            _context.next = 18;
            return x.findById("customers", company.data.id);

          case 18:
            _context.next = 20;
            return x.remove("customers", company.data.id);

          case 20:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsImZpbmQiLCJzYXZlUmVsYXRlZCIsImZpbmRSZWxhdGVkIiwic2F2ZSIsIm5hbWUiLCJ2YXQiLCJjb21wYW55IiwiZmluZE9uZSIsImZpbmRCeUlkIiwiZGF0YSIsImlkIiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQUVBLElBQUlBLENBQUMsR0FBRyxJQUFJQyxlQUFKLENBQVEsdUJBQVIsQ0FBUjs7QUFFQSxJQUFNQyxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVEMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7QUFDSUMsWUFBQUEsS0FGSyxHQUVHLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUZIO0FBR1RQLFlBQUFBLENBQUMsQ0FBQ1EsV0FBRixHQUFnQixDQUFoQjtBQUhTO0FBQUEsbUJBS0hSLENBQUMsQ0FBQ1MsS0FBRixDQUFRLFFBQVIsRUFBa0IsTUFBbEIsQ0FMRzs7QUFBQTtBQUFBO0FBQUEsbUJBT0hULENBQUMsQ0FBQ1UsSUFBRixDQUFPLE9BQVAsQ0FQRzs7QUFBQTtBQUFBO0FBQUEsbUJBU0hWLENBQUMsQ0FBQ1csV0FBRixDQUFjLFdBQWQsRUFBMkIsQ0FBM0IsRUFBOEIsV0FBOUIsRUFBMkMsQ0FBM0MsQ0FURzs7QUFBQTtBQUFBO0FBQUEsbUJBV0hYLENBQUMsQ0FBQ1ksV0FBRixDQUFjLFdBQWQsRUFBMkIsQ0FBM0IsRUFBOEIsV0FBOUIsQ0FYRzs7QUFBQTtBQUFBO0FBQUEsbUJBZVdaLENBQUMsQ0FBQ2EsSUFBRixDQUFPLFdBQVAsRUFBb0I7QUFBRUMsY0FBQUEsSUFBSSxFQUFFLGtCQUFSO0FBQTRCQyxjQUFBQSxHQUFHLEVBQUU7QUFBakMsYUFBcEIsQ0FmWDs7QUFBQTtBQWVMQyxZQUFBQSxPQWZLO0FBQUE7QUFBQSxtQkFrQkhoQixDQUFDLENBQUNpQixPQUFGLENBQVUsV0FBVixFQUF1QjtBQUFFSCxjQUFBQSxJQUFJLEVBQUU7QUFBUixhQUF2QixDQWxCRzs7QUFBQTtBQUFBO0FBQUEsbUJBb0JIZCxDQUFDLENBQUNrQixRQUFGLENBQVcsV0FBWCxFQUF3QkYsT0FBTyxDQUFDRyxJQUFSLENBQWFDLEVBQXJDLENBcEJHOztBQUFBO0FBQUE7QUFBQSxtQkFzQkhwQixDQUFDLENBQUNxQixNQUFGLENBQVMsV0FBVCxFQUFzQkwsT0FBTyxDQUFDRyxJQUFSLENBQWFDLEVBQW5DLENBdEJHOztBQUFBO0FBd0JUO0FBRUE7QUFFQWpCLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUiwrQkFBbUMsSUFBSUUsSUFBSixHQUFXQyxPQUFYLEtBQXVCRixLQUExRDs7QUE1QlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBSkgsSUFBSTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQStCQUEsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBUEkgZnJvbSBcIi4vQVBJXCI7XHJcblxyXG5sZXQgeCA9IG5ldyBBUEkoXCJodHRwOi8vbG9jYWxob3N0OjQwMDBcIik7XHJcblxyXG5jb25zdCB0ZXN0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJbVEVTVF0gU3RhcnRlZFwiKTtcclxuICAgIGxldCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgeC5kZWJ1Z19sZXZlbCA9IDM7XHJcblxyXG4gICAgYXdhaXQgeC5sb2dpbihcIk1heGltZVwiLCBcInRlc3RcIik7XHJcblxyXG4gICAgYXdhaXQgeC5maW5kKFwidXNlcnNcIik7XHJcblxyXG4gICAgYXdhaXQgeC5zYXZlUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiLCAyKTtcclxuXHJcbiAgICBhd2FpdCB4LmZpbmRSZWxhdGVkKFwiY3VzdG9tZXJzXCIsIDEsIFwiZW1wbG95ZWVzXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5pbXBlcnNvbmF0ZSgzKTtcclxuXHJcbiAgICBsZXQgY29tcGFueSA9IGF3YWl0IHguc2F2ZShcImN1c3RvbWVyc1wiLCB7IG5hbWU6IFwiTWF4aW1lJ3MgQ29tcGFueVwiLCB2YXQ6IFwiQkUwNTg5LjYyNS4zNjZcIiB9KTtcclxuICAgIC8vYXdhaXQgeC5maW5kKFwiY3VzdG9tZXJzXCIpO1xyXG5cclxuICAgIGF3YWl0IHguZmluZE9uZShcImN1c3RvbWVyc1wiLCB7IG5hbWU6IFwiTWF4aW1lJ3MgQ29tcGFueVwiIH0pO1xyXG5cclxuICAgIGF3YWl0IHguZmluZEJ5SWQoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICBhd2FpdCB4LnJlbW92ZShcImN1c3RvbWVyc1wiLCBjb21wYW55LmRhdGEuaWQpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5jb25maWcoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZygpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBbVEVTVFNdIEVuZGVkIGFmdGVyICR7bmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydH1tc2ApO1xyXG59O1xyXG5cclxudGVzdCgpO1xyXG4iXX0=