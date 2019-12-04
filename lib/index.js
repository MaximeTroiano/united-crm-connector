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
            return x.saveListValue("lov_employees_contract", {
              en: "Test"
            }, {
              description: "This means a test contract"
            });

          case 9:
            _context.next = 11;
            return x.saveListValue("lov_employees_contract", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsIm9uRXJyb3IiLCJlcnJvciIsIm9uU2F2ZSIsImVudGl0eSIsImRhdGEiLCJzYXZlTGlzdFZhbHVlIiwiZW4iLCJkZXNjcmlwdGlvbiIsImdldExpc3RWYWx1ZXMiLCJmaW5kUmVsYXRlZCIsInNhdmUiLCJuYW1lIiwidmF0IiwiY29tcGFueSIsInNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFJQSxDQUFDLEdBQUcsSUFBSUMsZUFBSixDQUFRLHVCQUFSLENBQVI7O0FBRUEsSUFBTUMsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1RDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0lDLFlBQUFBLEtBRkssR0FFRyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFGSDtBQUdUUCxZQUFBQSxDQUFDLENBQUNRLFdBQUYsR0FBZ0IsQ0FBaEI7QUFIUztBQUFBLG1CQUtIUixDQUFDLENBQUNTLEtBQUYsQ0FBUSxRQUFSLEVBQWtCLE1BQWxCLENBTEc7O0FBQUE7QUFPVFQsWUFBQUEsQ0FBQyxDQUFDVSxPQUFGLEdBQVksVUFBQ0MsS0FBRCxFQUFnQjtBQUN4QlIsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUNBQVosRUFBbURPLEtBQW5EO0FBQ0gsYUFGRDs7QUFJQVgsWUFBQUEsQ0FBQyxDQUFDWSxNQUFGLEdBQVcsVUFBQ0MsTUFBRCxFQUFpQkMsSUFBakIsRUFBa0M7QUFDekNYLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaLEVBQW9DUyxNQUFwQyxFQUE0Q0MsSUFBNUM7QUFDSCxhQUZEOztBQVhTO0FBQUEsbUJBZUhkLENBQUMsQ0FBQ2UsYUFBRixDQUNGLHdCQURFLEVBRUY7QUFBRUMsY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFGRSxFQUdGO0FBQUVDLGNBQUFBLFdBQVcsRUFBRTtBQUFmLGFBSEUsQ0FmRzs7QUFBQTtBQUFBO0FBQUEsbUJBb0JIakIsQ0FBQyxDQUFDZSxhQUFGLENBQWdCLHdCQUFoQixFQUEwQztBQUFFQyxjQUFBQSxFQUFFLEVBQUU7QUFBTixhQUExQyxDQXBCRzs7QUFBQTtBQUFBO0FBQUEsbUJBc0JIaEIsQ0FBQyxDQUFDa0IsYUFBRixDQUFnQix3QkFBaEIsQ0F0Qkc7O0FBQUE7QUFBQTtBQUFBLG1CQXdCSGxCLENBQUMsQ0FBQ1MsS0FBRixDQUFRLE9BQVIsRUFBaUIsUUFBakIsQ0F4Qkc7O0FBQUE7QUFBQTtBQUFBLG1CQThCSFQsQ0FBQyxDQUFDbUIsV0FBRixDQUFjLFdBQWQsRUFBMkIsQ0FBM0IsRUFBOEIsV0FBOUIsRUFBMkMsRUFBM0MsRUFBK0MsZ0JBQS9DLENBOUJHOztBQUFBO0FBQUE7QUFBQSxtQkFrQ1duQixDQUFDLENBQUNvQixJQUFGLENBQU8sV0FBUCxFQUFvQjtBQUFFQyxjQUFBQSxJQUFJLEVBQUUsa0JBQVI7QUFBNEJDLGNBQUFBLEdBQUcsRUFBRTtBQUFqQyxhQUFwQixDQWxDWDs7QUFBQTtBQWtDTEMsWUFBQUEsT0FsQ0s7QUFBQTtBQUFBLG1CQXlDSHZCLENBQUMsQ0FBQ3dCLE1BQUYsQ0FBUyxXQUFULEVBQXNCLFFBQXRCLENBekNHOztBQUFBO0FBMkNUO0FBRUE7QUFFQTtBQUVBckIsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLCtCQUFtQyxJQUFJRSxJQUFKLEdBQVdDLE9BQVgsS0FBdUJGLEtBQTFEOztBQWpEUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKSCxJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBb0RBQSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFQSSBmcm9tIFwiLi9BUElcIjtcclxuXHJcbmxldCB4ID0gbmV3IEFQSShcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMFwiKTtcclxuXHJcbmNvbnN0IHRlc3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIltURVNUXSBTdGFydGVkXCIpO1xyXG4gICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB4LmRlYnVnX2xldmVsID0gMztcclxuXHJcbiAgICBhd2FpdCB4LmxvZ2luKFwiTWF4aW1lXCIsIFwidGVzdFwiKTtcclxuXHJcbiAgICB4Lm9uRXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VzdG9tIGVycm9yIGhhbmRsaW5nIGlzIHdvcmtpbmcgISFcIiwgZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4Lm9uU2F2ZSA9IChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXN0b20gc2F2ZSBmdW5jdGlvblwiLCBlbnRpdHksIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhd2FpdCB4LnNhdmVMaXN0VmFsdWUoXHJcbiAgICAgICAgXCJsb3ZfZW1wbG95ZWVzX2NvbnRyYWN0XCIsXHJcbiAgICAgICAgeyBlbjogXCJUZXN0XCIgfSxcclxuICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIlRoaXMgbWVhbnMgYSB0ZXN0IGNvbnRyYWN0XCIgfVxyXG4gICAgKTtcclxuICAgIGF3YWl0IHguc2F2ZUxpc3RWYWx1ZShcImxvdl9lbXBsb3llZXNfY29udHJhY3RcIiwgeyBlbjogXCJOb25lXCIgfSk7XHJcblxyXG4gICAgYXdhaXQgeC5nZXRMaXN0VmFsdWVzKFwibG92X2VtcGxveWVlc19jb250cmFjdFwiKTtcclxuXHJcbiAgICBhd2FpdCB4LmxvZ2luKFwic2RqZmhcIiwgXCJzamRmaGtcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmQoXCJ1c2Vyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguc2F2ZVJlbGF0ZWQoXCJjdXN0b21lcnNcIiwgMSwgXCJlbXBsb3llZXNcIiwgMik7XHJcblxyXG4gICAgYXdhaXQgeC5maW5kUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiLCB7fSwgXCJmaXJzdG5hbWUgZGVzY1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguaW1wZXJzb25hdGUoMyk7XHJcblxyXG4gICAgbGV0IGNvbXBhbnkgPSBhd2FpdCB4LnNhdmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcImdhw6t0YW4ncyBDb21wYW55XCIsIHZhdDogXCJCRTA1ODkuNjI1LjM2NlwiIH0pO1xyXG4gICAgLy9hd2FpdCB4LmZpbmQoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmRPbmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcIk1heGltZSdzIENvbXBhbnlcIiB9KTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZEJ5SWQoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICBhd2FpdCB4LnNlYXJjaChcImN1c3RvbWVyc1wiLCBcIk1heGltZVwiKTtcclxuXHJcbiAgICAvL2F3YWl0IHgucmVtb3ZlKFwiY3VzdG9tZXJzXCIsIGNvbXBhbnkuZGF0YS5pZCk7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZyhcImN1c3RvbWVyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguY29uZmlnKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFtURVNUU10gRW5kZWQgYWZ0ZXIgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0fW1zYCk7XHJcbn07XHJcblxyXG50ZXN0KCk7XHJcbiJdfQ==