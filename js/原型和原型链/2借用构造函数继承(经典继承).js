function Parent(age){
    this.names = ['jack','daisy'];
    this.age = age;
}
function Child(age){
    Parent.call(this,age);
}

const child1 = new Child();
child1.age = 18;
console.log(child1.names); // [ 'jack', 'daisy' ]
console.log(child1.age); // 18
child1.names.push('tony');

const child2 = new Child();
child2.age = 9;
console.log(child2.names); // [ 'jack', 'daisy' ]
console.log(child2.age); // 9

// 优点
// 1、 避免了引用类型的属性被共享
// 2、 可以在child 中向 parent 传参

// 缺点
// 如果方法在构造函数中定义，每次创建实例都会创建一遍方法；
