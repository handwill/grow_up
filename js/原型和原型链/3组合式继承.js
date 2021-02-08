function Parent(age){
   this.names = ['jack','daisy'];
   this.age = age;
}
function Child(age) {
    Parent.call(this,age);
}

Child.prototype = new Parent();
Child.prototype.constructor = Child();

const child1 = new Child(18);
child1.names.push('tony'); 
console.log(child1.names);// [ 'jack', 'daisy', 'tony' ]
console.log(child1.age); 18

const child2 = new Child(9);
console.log(child2.names); //[ 'jack', 'daisy' ]
console.log(child2.age);//9


// 优点: 融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
// 缺点： 无论什么情况下，都会调用两次超类型构造函数:一次是在创建子类型原型的时 候，另一次是在子类型构造函数内部。