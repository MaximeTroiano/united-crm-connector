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
    var start, file;
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

            x.api_timeout = 100000;
            _context.next = 10;
            return x.downloadFile(361);

          case 10:
            file = _context.sent;
            console.log("file", file); //await x.find("users");
            //await x.saveRelated("customers", 1, "employees", 2);
            //await x.findRelated("customers", 1, "employees", {}, "firstname desc");
            //await x.impersonate(3);
            //let company = await x.save("customers", { name: "gaëtan's Company", vat: "BE0589.625.366" });
            //await x.find("customers");
            //await x.findOne("customers", { name: "Maxime's Company" });
            //await x.findById("customers", company.data.id);
            //await x.search("customers", "Maxime");
            //await x.remove("customers", company.data.id);
            //await x.config("customers");
            //await x.config();

            console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

          case 13:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsIm9uRXJyb3IiLCJlcnJvciIsIm9uU2F2ZSIsImVudGl0eSIsImRhdGEiLCJhcGlfdGltZW91dCIsImRvd25sb2FkRmlsZSIsImZpbGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBSUEsQ0FBQyxHQUFHLElBQUlDLGVBQUosQ0FBUSx1QkFBUixDQUFSOztBQUVBLElBQU1DLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNUQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQUNJQyxZQUFBQSxLQUZLLEdBRUcsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBRkg7QUFHVFAsWUFBQUEsQ0FBQyxDQUFDUSxXQUFGLEdBQWdCLENBQWhCO0FBSFM7QUFBQSxtQkFLSFIsQ0FBQyxDQUFDUyxLQUFGLENBQVEsUUFBUixFQUFrQixNQUFsQixDQUxHOztBQUFBO0FBT1RULFlBQUFBLENBQUMsQ0FBQ1UsT0FBRixHQUFZLFVBQUNDLEtBQUQsRUFBZ0I7QUFDeEJSLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFDQUFaLEVBQW1ETyxLQUFuRDtBQUNILGFBRkQ7O0FBSUFYLFlBQUFBLENBQUMsQ0FBQ1ksTUFBRixHQUFXLFVBQUNDLE1BQUQsRUFBaUJDLElBQWpCLEVBQWtDO0FBQ3pDWCxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ1MsTUFBcEMsRUFBNENDLElBQTVDO0FBQ0gsYUFGRDs7QUFJQWQsWUFBQUEsQ0FBQyxDQUFDZSxXQUFGLEdBQWdCLE1BQWhCO0FBZlM7QUFBQSxtQkFnQlFmLENBQUMsQ0FBQ2dCLFlBQUYsQ0FBZSxHQUFmLENBaEJSOztBQUFBO0FBZ0JMQyxZQUFBQSxJQWhCSztBQWtCVGQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQUFvQmEsSUFBcEIsRUFsQlMsQ0FvQlQ7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBOztBQUVBZCxZQUFBQSxPQUFPLENBQUNDLEdBQVIsK0JBQW1DLElBQUlFLElBQUosR0FBV0MsT0FBWCxLQUF1QkYsS0FBMUQ7O0FBM0NTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUpILElBQUk7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUE4Q0FBLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVBJIGZyb20gXCIuL0FQSVwiO1xyXG5cclxubGV0IHggPSBuZXcgQVBJKFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCIpO1xyXG5cclxuY29uc3QgdGVzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiW1RFU1RdIFN0YXJ0ZWRcIik7XHJcbiAgICBsZXQgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIHguZGVidWdfbGV2ZWwgPSAzO1xyXG5cclxuICAgIGF3YWl0IHgubG9naW4oXCJNYXhpbWVcIiwgXCJ0ZXN0XCIpO1xyXG5cclxuICAgIHgub25FcnJvciA9IChlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXN0b20gZXJyb3IgaGFuZGxpbmcgaXMgd29ya2luZyAhIVwiLCBlcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIHgub25TYXZlID0gKGVudGl0eTogc3RyaW5nLCBkYXRhOiBvYmplY3QpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1c3RvbSBzYXZlIGZ1bmN0aW9uXCIsIGVudGl0eSwgZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHguYXBpX3RpbWVvdXQgPSAxMDAwMDA7XHJcbiAgICBsZXQgZmlsZSA9IGF3YWl0IHguZG93bmxvYWRGaWxlKDM2MSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJmaWxlXCIsIGZpbGUpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kKFwidXNlcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LnNhdmVSZWxhdGVkKFwiY3VzdG9tZXJzXCIsIDEsIFwiZW1wbG95ZWVzXCIsIDIpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kUmVsYXRlZChcImN1c3RvbWVyc1wiLCAxLCBcImVtcGxveWVlc1wiLCB7fSwgXCJmaXJzdG5hbWUgZGVzY1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguaW1wZXJzb25hdGUoMyk7XHJcblxyXG4gICAgLy9sZXQgY29tcGFueSA9IGF3YWl0IHguc2F2ZShcImN1c3RvbWVyc1wiLCB7IG5hbWU6IFwiZ2HDq3RhbidzIENvbXBhbnlcIiwgdmF0OiBcIkJFMDU4OS42MjUuMzY2XCIgfSk7XHJcbiAgICAvL2F3YWl0IHguZmluZChcImN1c3RvbWVyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguZmluZE9uZShcImN1c3RvbWVyc1wiLCB7IG5hbWU6IFwiTWF4aW1lJ3MgQ29tcGFueVwiIH0pO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kQnlJZChcImN1c3RvbWVyc1wiLCBjb21wYW55LmRhdGEuaWQpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5zZWFyY2goXCJjdXN0b21lcnNcIiwgXCJNYXhpbWVcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LnJlbW92ZShcImN1c3RvbWVyc1wiLCBjb21wYW55LmRhdGEuaWQpO1xyXG5cclxuICAgIC8vYXdhaXQgeC5jb25maWcoXCJjdXN0b21lcnNcIik7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZygpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBbVEVTVFNdIEVuZGVkIGFmdGVyICR7bmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydH1tc2ApO1xyXG59O1xyXG5cclxudGVzdCgpO1xyXG4iXX0=