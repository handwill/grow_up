// https://juejin.cn/post/6946022649768181774

// 测试
function testExtends(Dog) {
  const dog1 = new Dog();
  const dog2 = new Dog();

  dog1.colors.push("red");
  console.log(dog1.getColors());
  console.log(dog2.getColors()); // dog1 的变化影响到了dog1
}

/**
 * 原型链继承
 * 问题:
 * 1、原型中包含的引用类型属性将被所有实例共享；
 * 2、子类在实例化的时候不能给父类构造函数传参；
 */
function Animal1() {
  this.colors = ["yellow", "blue"];
}
Animal1.prototype.getColors = function () {
  return this.colors;
};
function Dog1() {}
Dog1.prototype = new Animal1(); // prototype 直接指向 Animal 实例

// testExtends(Dog1);

/**
 * 借用构造函数实现继承
 * 优点：
 *  解决了 原型链继承 引用类型共享问题以及传参问题
 * 问题：
 * 2、无法访问原型方法
 */

function Animal2(name) {
  this.colors = ["yellow", "blue"];
  this.name = name;

  this.getName = function () {
    return this.name;
  };
}
Animal2.prototype.getColors = function () {
  return this.colors;
};
function Dog2(name) {
  Animal2.call(this, name);
}

// testExtends(Dog2);

/**
 * 组合继承
 * 缺点：
 * 调用了 2 次父类构造函数
 */
function Animal3(name) {
  this.colors = ["yellow", "blue"];
  this.name = name;

  this.getName = function () {
    return this.name;
  };
}
Animal3.prototype.getColors = function () {
  return this.colors;
};
function Dog3(name) {
  Animal3.call(this, name);
}
Dog3.prototype = new Animal3();
Dog3.prototype.constructor = Dog3;

// testExtends(Dog3);

/**
 * 寄生组合式继承
 * 这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
 */

function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

// 关键的三步
var F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();

var child1 = new Child("kevin", "18");

console.log(child1);
