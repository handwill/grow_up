// let {name , age} = {
//     name:'dabing',
//     age:'18',
//     sex:'nan'
// };
// console.log(name,age); //dabing 18


// const s1 = Symbol();
// const s2 = Symbol();
// console.log(s1===s2); // false


class Person {
    // 构造函数
    constructor(){
        // 添加到this的所有内容都会存在于不通的实例上
       this.locate= ()=> console.log('实例 instance',this);
    }
    // 定义在原型身上
    locate(){
        console.log('定义在原型prototype身上',this);
    }
    // 定义在类本身
    static locate(){
       console.log('定义在类本身',this);
    }
}
let p = new Person();
p.locate(); // 实例 instance Person { locate: [Function] }
Person.prototype.locate(); // 定义在原型prototype身上  Person {}
Person.locate(); //定义在类本身 class Person {}

// for (const key in p) {
//     console.log(key);  
// }