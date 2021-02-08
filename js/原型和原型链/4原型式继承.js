function createObj(o){
   function F(){};
   F.prototype = o;
   return new F()
}

var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}
var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.friends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]

// 原型是继承非常适合不需要单独创建构造函数，但仍需要在对象之间共享信息的场合。
// 缺点： 包含引用类型的属性值始终会在相关对象之间共享，和原型链模式一样。
