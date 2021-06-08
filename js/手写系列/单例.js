// function getInstance(fn) {
//   let result;
//   return function () {
//     return result ? result : (result = fn.apply(this, arguments));
//   };
// }

// let createAlertMessage = function (html) {
//   var div = document.createElement("div");
//   div.innerHTML = html;
//   div.style.display = "none";
//   document.body.appendChild(div);
//   return div;
// };

// let createSingleAlertMessage = getSingleton(createAlertMessage);
// document.body.addEventListener("click", function () {
//   // 多次点击只会产生一个弹窗
//   let alertMessage = createSingleAlertMessage("您的知识需要付费充值！");
//   alertMessage.style.display = "block";
// });

// 单例构造函数
function CreateSingleton(name) {
  this.name = name;
  this.getName();
};

// 获取实例的名字
CreateSingleton.prototype.getName = function () {
  console.log(this.name)
};
// 单例对象
var Singleton = (function () {
  var instance;
  return function (name) {
    if (!instance) {
      instance = new CreateSingleton(name);
    }
    return instance;
  }
})();

// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

console.log(a === b);
