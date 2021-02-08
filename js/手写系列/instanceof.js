class Person {
  constructor(age) {
    this.age = age;
  }
}

class Student extends Person {
  constructor(age, school) {
    super(age);
    this.school = school;
  }
}

let zhangsan = new Student(14, "中学");
console.log(Object.getPrototypeOf(zhangsan));

// 能不能手动实现一下instanceof的功能
function myInstanceOf(left, right) {
  //基本数据类型直接返回false
  if (typeof left !== "object" || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto == null) return false;
    //找到相同的原型对象
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

console.log(zhangsan instanceof Student);
console.log(myInstanceOf(zhangsan, Student));

function myInstanceOf2(left, right) {
  if (typeof left !== "object" || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto == null) return false;
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
