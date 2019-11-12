"use strict";

var _API = _interopRequireDefault(require("./API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var x = new _API["default"]("http://localhost:4000");

var test = function test() {
  var start, company;
  return regeneratorRuntime.async(function test$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("[TEST] Started");
          start = new Date().getTime();
          x.debug_level = 3;
          _context.next = 5;
          return regeneratorRuntime.awrap(x.login("Maxime", "test"));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(x.save("customers", {
            name: "Maxime's Company",
            vat: "BE0589.625.366"
          }));

        case 7:
          company = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(x.findOne("customers", {
            name: "Maxime's Company"
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(x.findById("customers", company.id));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(x.remove("customers", company.id));

        case 14:
          //await x.config("customers");
          //await x.config();
          console.log("[TESTS] Ended after ".concat(new Date().getTime() - start, "ms"));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

test();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ4IiwiQVBJIiwidGVzdCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiZGVidWdfbGV2ZWwiLCJsb2dpbiIsInNhdmUiLCJuYW1lIiwidmF0IiwiY29tcGFueSIsImZpbmRPbmUiLCJmaW5kQnlJZCIsImlkIiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBRUEsSUFBSUEsQ0FBQyxHQUFHLElBQUlDLGVBQUosQ0FBUSx1QkFBUixDQUFSOztBQUVBLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNUQyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQUNJQyxVQUFBQSxLQUZLLEdBRUcsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBRkg7QUFHVFAsVUFBQUEsQ0FBQyxDQUFDUSxXQUFGLEdBQWdCLENBQWhCO0FBSFM7QUFBQSwwQ0FLSFIsQ0FBQyxDQUFDUyxLQUFGLENBQVEsUUFBUixFQUFrQixNQUFsQixDQUxHOztBQUFBO0FBQUE7QUFBQSwwQ0FPV1QsQ0FBQyxDQUFDVSxJQUFGLENBQU8sV0FBUCxFQUFvQjtBQUFFQyxZQUFBQSxJQUFJLEVBQUUsa0JBQVI7QUFBNEJDLFlBQUFBLEdBQUcsRUFBRTtBQUFqQyxXQUFwQixDQVBYOztBQUFBO0FBT0xDLFVBQUFBLE9BUEs7QUFBQTtBQUFBLDBDQVdIYixDQUFDLENBQUNjLE9BQUYsQ0FBVSxXQUFWLEVBQXVCO0FBQUVILFlBQUFBLElBQUksRUFBRTtBQUFSLFdBQXZCLENBWEc7O0FBQUE7QUFBQTtBQUFBLDBDQWFIWCxDQUFDLENBQUNlLFFBQUYsQ0FBVyxXQUFYLEVBQXdCRixPQUFPLENBQUNHLEVBQWhDLENBYkc7O0FBQUE7QUFBQTtBQUFBLDBDQWVIaEIsQ0FBQyxDQUFDaUIsTUFBRixDQUFTLFdBQVQsRUFBc0JKLE9BQU8sQ0FBQ0csRUFBOUIsQ0FmRzs7QUFBQTtBQWlCVDtBQUVBO0FBRUFiLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUiwrQkFBbUMsSUFBSUUsSUFBSixHQUFXQyxPQUFYLEtBQXVCRixLQUExRDs7QUFyQlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBYjs7QUF3QkFILElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVBJIGZyb20gXCIuL0FQSVwiO1xyXG5cclxubGV0IHggPSBuZXcgQVBJKFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCIpO1xyXG5cclxuY29uc3QgdGVzdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiW1RFU1RdIFN0YXJ0ZWRcIik7XHJcbiAgICBsZXQgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIHguZGVidWdfbGV2ZWwgPSAzO1xyXG5cclxuICAgIGF3YWl0IHgubG9naW4oXCJNYXhpbWVcIiwgXCJ0ZXN0XCIpO1xyXG5cclxuICAgIGxldCBjb21wYW55ID0gYXdhaXQgeC5zYXZlKFwiY3VzdG9tZXJzXCIsIHsgbmFtZTogXCJNYXhpbWUncyBDb21wYW55XCIsIHZhdDogXCJCRTA1ODkuNjI1LjM2NlwiIH0pO1xyXG5cclxuICAgIC8vYXdhaXQgeC5maW5kKFwiY3VzdG9tZXJzXCIpO1xyXG5cclxuICAgIGF3YWl0IHguZmluZE9uZShcImN1c3RvbWVyc1wiLCB7IG5hbWU6IFwiTWF4aW1lJ3MgQ29tcGFueVwiIH0pO1xyXG5cclxuICAgIGF3YWl0IHguZmluZEJ5SWQoXCJjdXN0b21lcnNcIiwgY29tcGFueS5pZCk7XHJcblxyXG4gICAgYXdhaXQgeC5yZW1vdmUoXCJjdXN0b21lcnNcIiwgY29tcGFueS5pZCk7XHJcblxyXG4gICAgLy9hd2FpdCB4LmNvbmZpZyhcImN1c3RvbWVyc1wiKTtcclxuXHJcbiAgICAvL2F3YWl0IHguY29uZmlnKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFtURVNUU10gRW5kZWQgYWZ0ZXIgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0fW1zYCk7XHJcbn07XHJcblxyXG50ZXN0KCk7XHJcbiJdfQ==