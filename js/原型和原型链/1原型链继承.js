// 原型链的继承

function Parent(){
    this.name = "dabing";
    this.names= ['kevin','dasisy']
}
Parent.prototype.getName = function (){
    console.log(this.name);
}
function Child (){

}
// Child 原型指向 Parent实例
Child.prototype = new Parent();
Child.prototype.constructor = Child();
const child1 = new Child();
console.log(child1.names); //[ 'kevin', 'dasisy' ]

child1.names.push('jack');

const child2 = new Child();
console.log(child2.names); // [ 'kevin', 'dasisy', 'jack' ]

// 问题
//  1.引用类型的属性被所有实例共享
//  2.在创建 Child 的实例时，不能向Parent传参