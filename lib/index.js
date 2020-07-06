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
    var start;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("[TEST] Started");
            start = new Date().getTime();
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            x.debug_level = 3;
            _context.next = 6;
            return x.login("admin", "A6EBfJm6Vh");

          case 6:
            x.onError = function (error) {
              console.log("Custom error handling is working !!", error);
            };

            x.onSave = function (entity, data) {
              console.log("Custom save function", entity, data);
            };

            x.api_timeout = 100000; //let file = await x.downloadFile(361);

            _context.next = 11;
            return x.find("users");

          case 11:
            //await x.saveRelated("customers", 1, "employees", 2);
            //await x.findRelated("customers", 1, "employees", {}, "firstname desc");
            //await x.impersonate(3);
            // let company = await x.save("customers", { name: "gaëtan's Company", vat: "BE0589.625.366" });
            //await x.find("customers");
            //await x.findOne("customers", { name: "Maxime's Company" });
            //await x.findById("customers", company.data.id);
            //await x.search("customers", "Maxime");
            //await x.remove("customers", company.data.id);
            //await x.config("customers");
            //await x.config();
            console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

          case 12:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwicHJvY2VzcyIsImVudiIsIk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQiLCJkZWJ1Z19sZXZlbCIsImxvZ2luIiwib25FcnJvciIsImVycm9yIiwib25TYXZlIiwiZW50aXR5IiwiZGF0YSIsImFwaV90aW1lb3V0IiwiZmluZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFJQSxDQUFDLEdBQUcsSUFBSUMsZUFBSixDQUFRLHdCQUFSLENBQVI7O0FBRUEsSUFBTUMsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1RDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0lDLFlBQUFBLEtBRkssR0FFRyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFGSDtBQUdUQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsNEJBQVosR0FBMkMsR0FBM0M7QUFDQVYsWUFBQUEsQ0FBQyxDQUFDVyxXQUFGLEdBQWdCLENBQWhCO0FBSlM7QUFBQSxtQkFNSFgsQ0FBQyxDQUFDWSxLQUFGLENBQVEsT0FBUixFQUFpQixZQUFqQixDQU5HOztBQUFBO0FBUVRaLFlBQUFBLENBQUMsQ0FBQ2EsT0FBRixHQUFZLFVBQUNDLEtBQUQsRUFBZ0I7QUFDeEJYLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFDQUFaLEVBQW1EVSxLQUFuRDtBQUNILGFBRkQ7O0FBSUFkLFlBQUFBLENBQUMsQ0FBQ2UsTUFBRixHQUFXLFVBQUNDLE1BQUQsRUFBaUJDLElBQWpCLEVBQWtDO0FBQ3pDZCxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ1ksTUFBcEMsRUFBNENDLElBQTVDO0FBQ0gsYUFGRDs7QUFJQWpCLFlBQUFBLENBQUMsQ0FBQ2tCLFdBQUYsR0FBZ0IsTUFBaEIsQ0FoQlMsQ0FpQlQ7O0FBakJTO0FBQUEsbUJBbUJIbEIsQ0FBQyxDQUFDbUIsSUFBRixDQUFPLE9BQVAsQ0FuQkc7O0FBQUE7QUFxQlQ7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBaEIsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLCtCQUFtQyxJQUFJRSxJQUFKLEdBQVdDLE9BQVgsS0FBdUJGLEtBQTFEOztBQTFDUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKSCxJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBNkNBQSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFQSSBmcm9tIFwiLi9BUElcIjtcclxuXHJcbmxldCB4ID0gbmV3IEFQSShcImh0dHBzOi8vbG9jYWxob3N0OjQwMDBcIik7XHJcblxyXG5jb25zdCB0ZXN0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJbVEVTVF0gU3RhcnRlZFwiKTtcclxuICAgIGxldCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9UTFNfUkVKRUNUX1VOQVVUSE9SSVpFRCA9IFwiMFwiO1xyXG4gICAgeC5kZWJ1Z19sZXZlbCA9IDM7XHJcblxyXG4gICAgYXdhaXQgeC5sb2dpbihcImFkbWluXCIsIFwiQTZFQmZKbTZWaFwiKTtcclxuXHJcbiAgICB4Lm9uRXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VzdG9tIGVycm9yIGhhbmRsaW5nIGlzIHdvcmtpbmcgISFcIiwgZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4Lm9uU2F2ZSA9IChlbnRpdHk6IHN0cmluZywgZGF0YTogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXN0b20gc2F2ZSBmdW5jdGlvblwiLCBlbnRpdHksIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4LmFwaV90aW1lb3V0ID0gMTAwMDAwO1xyXG4gICAgLy9sZXQgZmlsZSA9IGF3YWl0IHguZG93bmxvYWRGaWxlKDM2MSk7XHJcblxyXG4gICAgYXdhaXQgeC5maW5kKFwidXNlcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LnNhdmVSZWxhdGVkKFwiY3VzdG9tZXJzXCIsIDEsIFwiZW1wbG95ZWVzXCIsIDIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiLCB7fSwgXCJmaXJzdG5hbWUgZGVzY1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguaW1wZXJzb25hdGUoMyk7XHJcblxyXG4gICAgLy8gbGV0IGNvbXBhbnkgPSBhd2FpdCB4LnNhdmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcImdhw6t0YW4ncyBDb21wYW55XCIsIHZhdDogXCJCRTA1ODkuNjI1LjM2NlwiIH0pO1xyXG4gICAgLy9hd2FpdCB4LmZpbmQoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmZpbmRPbmUoXCJjdXN0b21lcnNcIiwgeyBuYW1lOiBcIk1heGltZSdzIENvbXBhbnlcIiB9KTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZEJ5SWQoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICAvL2F3YWl0IHguc2VhcmNoKFwiY3VzdG9tZXJzXCIsIFwiTWF4aW1lXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5yZW1vdmUoXCJjdXN0b21lcnNcIiwgY29tcGFueS5kYXRhLmlkKTtcclxuXHJcbiAgICAvL2F3YWl0IHguY29uZmlnKFwiY3VzdG9tZXJzXCIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5jb25maWcoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgW1RFU1RTXSBFbmRlZCBhZnRlciAke25ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnR9bXNgKTtcclxufTtcclxuXHJcbnRlc3QoKTtcclxuIl19