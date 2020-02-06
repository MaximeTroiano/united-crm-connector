"use strict";

var _API = _interopRequireDefault(require("./API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var x = new _API["default"]("https://localhost:4000");

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
            return x.login("admin", "admin");

          case 5:
            x.onError = function (error) {
              console.log("Custom error handling is working !!", error);
            };

            x.onSave = function (entity, data) {
              console.log("Custom save function", entity, data);
            };

            x.api_timeout = 100000; //let file = await x.downloadFile(361);

            _context.next = 10;
            return x.find("users");

          case 10:
            _context.next = 12;
            return x.save("customers", {
              name: "gaëtan's Company",
              vat: "BE0589.625.366"
            });

          case 12:
            company = _context.sent;
            //await x.find("customers");
            //await x.findOne("customers", { name: "Maxime's Company" });
            //await x.findById("customers", company.data.id);
            //await x.search("customers", "Maxime");
            //await x.remove("customers", company.data.id);
            //await x.config("customers");
            //await x.config();
            console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

          case 14:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsIm9uRXJyb3IiLCJlcnJvciIsIm9uU2F2ZSIsImVudGl0eSIsImRhdGEiLCJhcGlfdGltZW91dCIsImZpbmQiLCJzYXZlIiwibmFtZSIsInZhdCIsImNvbXBhbnkiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBSUEsQ0FBQyxHQUFHLElBQUlDLGVBQUosQ0FBUSx3QkFBUixDQUFSOztBQUVBLElBQU1DLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNUQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQUNJQyxZQUFBQSxLQUZLLEdBRUcsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBRkg7QUFHVFAsWUFBQUEsQ0FBQyxDQUFDUSxXQUFGLEdBQWdCLENBQWhCO0FBSFM7QUFBQSxtQkFLSFIsQ0FBQyxDQUFDUyxLQUFGLENBQVEsT0FBUixFQUFpQixPQUFqQixDQUxHOztBQUFBO0FBT1RULFlBQUFBLENBQUMsQ0FBQ1UsT0FBRixHQUFZLFVBQUNDLEtBQUQsRUFBZ0I7QUFDeEJSLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFDQUFaLEVBQW1ETyxLQUFuRDtBQUNILGFBRkQ7O0FBSUFYLFlBQUFBLENBQUMsQ0FBQ1ksTUFBRixHQUFXLFVBQUNDLE1BQUQsRUFBaUJDLElBQWpCLEVBQWtDO0FBQ3pDWCxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ1MsTUFBcEMsRUFBNENDLElBQTVDO0FBQ0gsYUFGRDs7QUFJQWQsWUFBQUEsQ0FBQyxDQUFDZSxXQUFGLEdBQWdCLE1BQWhCLENBZlMsQ0FnQlQ7O0FBaEJTO0FBQUEsbUJBa0JIZixDQUFDLENBQUNnQixJQUFGLENBQU8sT0FBUCxDQWxCRzs7QUFBQTtBQUFBO0FBQUEsbUJBMEJXaEIsQ0FBQyxDQUFDaUIsSUFBRixDQUFPLFdBQVAsRUFBb0I7QUFBRUMsY0FBQUEsSUFBSSxFQUFFLGtCQUFSO0FBQTRCQyxjQUFBQSxHQUFHLEVBQUU7QUFBakMsYUFBcEIsQ0ExQlg7O0FBQUE7QUEwQkxDLFlBQUFBLE9BMUJLO0FBMkJUO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUFqQixZQUFBQSxPQUFPLENBQUNDLEdBQVIsK0JBQW1DLElBQUlFLElBQUosR0FBV0MsT0FBWCxLQUF1QkYsS0FBMUQ7O0FBekNTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUpILElBQUk7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUE0Q0FBLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVBJIGZyb20gXCIuL0FQSVwiO1xyXG5cclxubGV0IHggPSBuZXcgQVBJKFwiaHR0cHM6Ly9sb2NhbGhvc3Q6NDAwMFwiKTtcclxuXHJcbmNvbnN0IHRlc3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIltURVNUXSBTdGFydGVkXCIpO1xyXG4gICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB4LmRlYnVnX2xldmVsID0gMztcclxuXHJcbiAgICBhd2FpdCB4LmxvZ2luKFwiYWRtaW5cIiwgXCJhZG1pblwiKTtcclxuXHJcbiAgICB4Lm9uRXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VzdG9tIGVycm9yIGhhbmRsaW5nIGlzIHdvcmtpbmcgISFcIiwgZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4Lm9uU2F2ZSA9IChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXN0b20gc2F2ZSBmdW5jdGlvblwiLCBlbnRpdHksIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4LmFwaV90aW1lb3V0ID0gMTAwMDAwO1xyXG4gICAgLy9sZXQgZmlsZSA9IGF3YWl0IHguZG93bmxvYWRGaWxlKDM2MSk7XHJcblxyXG4gICAgYXdhaXQgeC5maW5kKFwidXNlcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LnNhdmVSZWxhdGVkKFwiY3VzdG9tZXJzXCIsIDEsIFwiZW1wbG95ZWVzXCIsIDIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiLCB7fSwgXCJmaXJzdG5hbWUgZGVzY1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguaW1wZXJzb25hdGUoMyk7XHJcblxyXG4gICAgbGV0IGNvbXBhbnkgPSBhd2FpdCB4LnNhdmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcImdhw6t0YW4ncyBDb21wYW55XCIsIHZhdDogXCJCRTA1ODkuNjI1LjM2NlwiIH0pO1xyXG4gICAgLy9hd2FpdCB4LmZpbmQoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmRPbmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcIk1heGltZSdzIENvbXBhbnlcIiB9KTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZEJ5SWQoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICAvL2F3YWl0IHguc2VhcmNoKFwiY3VzdG9tZXJzXCIsIFwiTWF4aW1lXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5yZW1vdmUoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICAvL2F3YWl0IHguY29uZmlnKFwiY3VzdG9tZXJzXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5jb25maWcoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgW1RFU1RTXSBFbmRlZCBhZnRlciAke25ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnR9bXNgKTtcclxufTtcclxuXHJcbnRlc3QoKTtcclxuIl19