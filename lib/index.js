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
            return x.findRelated("customers", 1, "employees", {}, "firstname desc");

          case 17:
            _context.next = 19;
            return x.save("customers", {
              name: "gaëtan's Company",
              vat: "BE0589.625.366"
            });

          case 19:
            company = _context.sent;
            _context.next = 22;
            return x.search("customers", "Maxime");

          case 22:
            //await x.remove("customers", company.data.id);
            //await x.config("customers");
            //await x.config();
            console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

          case 23:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsIm9uRXJyb3IiLCJlcnJvciIsIm9uU2F2ZSIsImVudGl0eSIsImRhdGEiLCJjcmVhdGVMaXN0VmFsdWUiLCJlbiIsImRlc2NyaXB0aW9uIiwiZ2V0TGlzdFZhbHVlcyIsImZpbmRSZWxhdGVkIiwic2F2ZSIsIm5hbWUiLCJ2YXQiLCJjb21wYW55Iiwic2VhcmNoIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQUVBLElBQUlBLENBQUMsR0FBRyxJQUFJQyxlQUFKLENBQVEsdUJBQVIsQ0FBUjs7QUFFQSxJQUFNQyxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVEMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7QUFDSUMsWUFBQUEsS0FGSyxHQUVHLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUZIO0FBR1RQLFlBQUFBLENBQUMsQ0FBQ1EsV0FBRixHQUFnQixDQUFoQjtBQUhTO0FBQUEsbUJBS0hSLENBQUMsQ0FBQ1MsS0FBRixDQUFRLFFBQVIsRUFBa0IsTUFBbEIsQ0FMRzs7QUFBQTtBQU9UVCxZQUFBQSxDQUFDLENBQUNVLE9BQUYsR0FBWSxVQUFDQyxLQUFELEVBQWdCO0FBQ3hCUixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQ0FBWixFQUFtRE8sS0FBbkQ7QUFDSCxhQUZEOztBQUlBWCxZQUFBQSxDQUFDLENBQUNZLE1BQUYsR0FBVyxVQUFDQyxNQUFELEVBQWlCQyxJQUFqQixFQUFrQztBQUN6Q1gsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVosRUFBb0NTLE1BQXBDLEVBQTRDQyxJQUE1QztBQUNILGFBRkQ7O0FBWFM7QUFBQSxtQkFlSGQsQ0FBQyxDQUFDZSxlQUFGLENBQ0Ysd0JBREUsRUFFRjtBQUFFQyxjQUFBQSxFQUFFLEVBQUU7QUFBTixhQUZFLEVBR0Y7QUFBRUMsY0FBQUEsV0FBVyxFQUFFO0FBQWYsYUFIRSxDQWZHOztBQUFBO0FBQUE7QUFBQSxtQkFvQkhqQixDQUFDLENBQUNlLGVBQUYsQ0FBa0Isd0JBQWxCLEVBQTRDO0FBQUVDLGNBQUFBLEVBQUUsRUFBRTtBQUFOLGFBQTVDLENBcEJHOztBQUFBO0FBQUE7QUFBQSxtQkFzQkhoQixDQUFDLENBQUNrQixhQUFGLENBQWdCLHdCQUFoQixDQXRCRzs7QUFBQTtBQUFBO0FBQUEsbUJBd0JIbEIsQ0FBQyxDQUFDUyxLQUFGLENBQVEsT0FBUixFQUFpQixRQUFqQixDQXhCRzs7QUFBQTtBQUFBO0FBQUEsbUJBOEJIVCxDQUFDLENBQUNtQixXQUFGLENBQWMsV0FBZCxFQUEyQixDQUEzQixFQUE4QixXQUE5QixFQUEyQyxFQUEzQyxFQUErQyxnQkFBL0MsQ0E5Qkc7O0FBQUE7QUFBQTtBQUFBLG1CQWtDV25CLENBQUMsQ0FBQ29CLElBQUYsQ0FBTyxXQUFQLEVBQW9CO0FBQUVDLGNBQUFBLElBQUksRUFBRSxrQkFBUjtBQUE0QkMsY0FBQUEsR0FBRyxFQUFFO0FBQWpDLGFBQXBCLENBbENYOztBQUFBO0FBa0NMQyxZQUFBQSxPQWxDSztBQUFBO0FBQUEsbUJBeUNIdkIsQ0FBQyxDQUFDd0IsTUFBRixDQUFTLFdBQVQsRUFBc0IsUUFBdEIsQ0F6Q0c7O0FBQUE7QUEyQ1Q7QUFFQTtBQUVBO0FBRUFyQixZQUFBQSxPQUFPLENBQUNDLEdBQVIsK0JBQW1DLElBQUlFLElBQUosR0FBV0MsT0FBWCxLQUF1QkYsS0FBMUQ7O0FBakRTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUpILElBQUk7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUFvREFBLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVBJIGZyb20gXCIuL0FQSVwiO1xyXG5cclxubGV0IHggPSBuZXcgQVBJKFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCIpO1xyXG5cclxuY29uc3QgdGVzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiW1RFU1RdIFN0YXJ0ZWRcIik7XHJcbiAgICBsZXQgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIHguZGVidWdfbGV2ZWwgPSAzO1xyXG5cclxuICAgIGF3YWl0IHgubG9naW4oXCJNYXhpbWVcIiwgXCJ0ZXN0XCIpO1xyXG5cclxuICAgIHgub25FcnJvciA9IChlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXN0b20gZXJyb3IgaGFuZGxpbmcgaXMgd29ya2luZyAhIVwiLCBlcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIHgub25TYXZlID0gKGVudGl0eTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1c3RvbSBzYXZlIGZ1bmN0aW9uXCIsIGVudGl0eSwgZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGF3YWl0IHguY3JlYXRlTGlzdFZhbHVlKFxyXG4gICAgICAgIFwibG92X2VtcGxveWVlc19jb250cmFjdFwiLFxyXG4gICAgICAgIHsgZW46IFwiVGVzdFwiIH0sXHJcbiAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJUaGlzIG1lYW5zIGEgdGVzdCBjb250cmFjdFwiIH1cclxuICAgICk7XHJcbiAgICBhd2FpdCB4LmNyZWF0ZUxpc3RWYWx1ZShcImxvdl9lbXBsb3llZXNfY29udHJhY3RcIiwgeyBlbjogXCJOb25lXCIgfSk7XHJcblxyXG4gICAgYXdhaXQgeC5nZXRMaXN0VmFsdWVzKFwibG92X2VtcGxveWVlc19jb250cmFjdFwiKTtcclxuXHJcbiAgICBhd2FpdCB4LmxvZ2luKFwic2RqZmhcIiwgXCJzamRmaGtcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmQoXCJ1c2Vyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguc2F2ZVJlbGF0ZWQoXCJjdXN0b21lcnNcIiwgMSwgXCJlbXBsb3llZXNcIiwgMik7XHJcblxyXG4gICAgYXdhaXQgeC5maW5kUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiLCB7fSwgXCJmaXJzdG5hbWUgZGVzY1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguaW1wZXJzb25hdGUoMyk7XHJcblxyXG4gICAgbGV0IGNvbXBhbnkgPSBhd2FpdCB4LnNhdmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcImdhw6t0YW4ncyBDb21wYW55XCIsIHZhdDogXCJCRTA1ODkuNjI1LjM2NlwiIH0pO1xyXG4gICAgLy9hd2FpdCB4LmZpbmQoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmRPbmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcIk1heGltZSdzIENvbXBhbnlcIiB9KTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZEJ5SWQoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICBhd2FpdCB4LnNlYXJjaChcImN1c3RvbWVyc1wiLCBcIk1heGltZVwiKTtcclxuXHJcbiAgICAvL2F3YWl0IHgucmVtb3ZlKFwiY3VzdG9tZXJzXCIsIGNvbXBhbnkuZGF0YS5pZCk7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZyhcImN1c3RvbWVyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguY29uZmlnKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFtURVNUU10gRW5kZWQgYWZ0ZXIgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0fW1zYCk7XHJcbn07XHJcblxyXG50ZXN0KCk7XHJcbiJdfQ==