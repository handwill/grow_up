"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function objectFactory(constructor) {
  var obj = new Object(); //从Object.prototype上克隆一个对象

  obj.__proto__ = constructor.prototype;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var ret = constructor.apply(obj, args);
  return _typeof(ret) === "object" ? ret || obj : obj;
}

function objectFactory2(constructor) {
  var obj = Object.create(constructor.prototype);

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var ret = constructor.apply(obj, args);
  return _typeof(ret) === "object" ? ret || obj : obj;
}
/**
 * 步骤
 * 1、
 *
 */


function objectFactory3() {
  // 使用objectFactory的时候,把arguments,转化为数组
  var args = Array.prototype.slice.call(arguments);
  console.log(args); //提取第1个构建对象

  var Constructor = args.shift(); // 创建constructor实例 instance

  var instance = Object.create(Constructor.prototype); // 使用apply函数运行args, 把 instance 绑定到 this

  var temp = Constructor.apply(instance, args); //返回对象判断 是object 还是 null 还是实例

  return _typeof(temp) === "object" && temp !== null ? temp : instance;
}

function Otaku(name, age) {
  this.name = name;
  this.age = age;
}

Otaku.prototype.sayHello = function () {
  console.log("hello");
};

var p = new Otaku("Kevin", "18");
var person = objectFactory3(Otaku, "Kevin", "18");
console.log(person);