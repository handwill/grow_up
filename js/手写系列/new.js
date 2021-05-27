function objectFactory(constructor, ...args) {
  const obj = new Object(); //从Object.prototype上克隆一个对象
  obj.__proto__ = constructor.prototype;
  const ret = constructor.apply(obj, args);
  return typeof ret === "object" ? ret || obj : obj;
}

function objectFactory2(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const ret = constructor.apply(obj, args);
  return typeof ret === "object" ? ret || obj : obj;
}

/**
 * 步骤
 * 1、[].shift.call(arguments) 获取 Constructor
 * 2、根据Constructor.prototype 创建对象
 * 3、对象调用 Constructor Constructor.apply(obj, arguments)
 * 3、判断Constructor 函数有没有返回新对象，有返回对象就用返回值，否则就用前面创建的对象
 */
function objectFactory3() {
  var Constructor = [].shift.call(arguments);
  var obj = Object.create(Constructor.prototype);
  var temp = Constructor.apply(obj, arguments);
  return typeof temp === "object" ? temp || obj : obj;
}

function Otaku(name, age) {
  this.name = name;
  this.age = age;
}
Otaku.prototype.sayHello = function () {
  console.log("hello");
};

let p = new Otaku("Kevin", "18");
let person = objectFactory3(Otaku, "Kevin", "18");
console.log(person);
