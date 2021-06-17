Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof self ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

Function.prototype.myBind1 = function (context, ...argsOut) {
  let self = this;
  let fn = function (...argsIn) {
    self.apply(this instanceof self ? this : context, [...argsOut, ...argsIn]);
  };
  fn.prototype = Object.create(self.prototype);
  return fn;
};

// let foo = function () {
//   this.content = "hello";
// };
// let boo = foo.myBind1({ content: "bye" });
// let res = new boo();
// console.log(res); // {content:"hello"}

let foo = function () {
  // console.log(arguments);
  console.log(this);
};
let boo = foo.bind({ content: "bye" });
foo(); //  global / window
boo(); //  {content: "bye"}

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  args = args ? args : [];
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs);
    }
    return fn.apply(context, [...args, ...newFnArgs]);
  };
};
