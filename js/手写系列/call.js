Function.prototype.call2 = function (context, ...args) {
  context = context || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

// 测试一下
var value = 2;

var obj = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}

console.log(bar.call(obj, "kevin", 18)); // 2

console.log(bar.call2(obj, "kevin", 18));
