(function () {
    var a = 3;
    console.log(a);
    function test() {
        if (true) {
            var b = 111;
        }
    }
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var c = "nihao ts";
    // console.log(c.length); // 类型“unknown”上不存在属性“length”
    console.log(c.length);
    var person = /** @class */ (function () {
        function person() {
            this.name = "123";
        }
        person.prototype.saySomething = function () {
            console.log("hi");
        };
        return person;
    }());
    var p = new person();
    p.saySomething();
    function fn(a) { }
    var Direction;
    (function (Direction) {
        Direction[Direction["NORTH"] = 0] = "NORTH";
        Direction[Direction["SOUTH"] = 1] = "SOUTH";
        Direction[Direction["EAST"] = 2] = "EAST";
        Direction[Direction["WEST"] = 3] = "WEST";
    })(Direction || (Direction = {}));
    var dir = Direction.NORTH;
});
