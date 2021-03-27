Function.prototype.apply2 = function (context, arr) {
  context = context || window;
  arr = arr || [];
  context.fn = this;
  let result = context.fn(...arr);
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

console.log(bar.apply2(obj, ["nihao", 23]));
