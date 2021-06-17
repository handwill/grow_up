"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// call
// Function.prototype.call = function (context, ...args) {
//   let context = context || window;
//   context.fn = this;
//   let result = context.fn(...args);
//   delete context.fn;
//   return result;
// };
// bind
Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function fNOP() {};

  var fBound = function fBound() {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}; // let foo = function () {
//   this.content = "hello";
// };
// let boo = foo.bind2({ content: "bye" });
// let res = new boo();
// console.log(res); // {content:"hello"}
// deepCopy


function deepCopy(obj) {
  if (_typeof(obj) !== "object" || obj === null) {
    return obj;
  }

  var result = Array.isArray(obj) ? [] : {};

  for (var key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      var element = obj[key];
      result[key] = deepCopy(element);
    }
  }

  return result;
}

var obj = {
  a: 2,
  c: "sa",
  s: [1, 3, 5],
  d: {
    f: 45
  }
};
var objNew = deepCopy(obj);
console.log(objNew); // 防抖
// 节流
// promise.all
// 数组扁平化
// 数组去重
// instanceof
// new
// 发布订阅模式
// 继承
// 截取url
// let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
// 查找字符串中出现最多的字符和个数