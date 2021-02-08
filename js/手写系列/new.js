function objectFactory(constructor, ...args) {
  const obj = new Object();
  obj.__proto__ = constructor.prototype;
  const ret = constructor.apply(obj, args);
  return typeof ret === "object" ? ret : obj;
}

function Otaku(name, age) {
  this.name = name;
  this.age = age;
}
let p = new Otaku("Kevin", "18");
let person = objectFactory(Otaku, "Kevin", "18");
console.log(person);
