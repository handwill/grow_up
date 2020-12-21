// const myObject = {
//   value: 66,
//   getAnswer() {
//     return this.value;
//   },
// };

// const newObject = {
//   value: 8888,
// };
// newObject.getAnswer = myObject.getAnswer;

// const answer = newObject.getAnswer();
// console.log(answer); // 8888

// const a = {
//   value: 42,
//   b: {
//     value: 3301,
//     getContext: function () {
//       console.log(this.value);
//       return this;
//     },
//   },
// };

// console.log(a.b.getContext() === a.b); //  3301 true

// const a = {
//   b: 42,
//   c: function () {
//     console.log(this.b);
//     return this.b;
//   },
// };

// (a.c || [])(); //
// (a.c)();       //
// (1, a.c)();    //

// const a = {
//   b: 66,
//   c: function (cb) {
//     setTimeout(() => {
//       return cb(this.b);
//     }, 500);
//   },
// };
// a.c(function (value) {
//   console.log(value); // 66
// });

// var foo = { n: 1 };

// (function(foo) {
//   console.log(foo.n);
//   foo.n = 3;
//   foo = { n: 2 };
//   console.log(foo.n);
// })(foo)

// console.log(foo.n);

// console.log(Object.prototype.toString.call(1));

// function Person() {

// }

// var person = new Person();
// console.log(person.__proto__ == Person.prototype);
// console.log(Object.getPrototypeOf(person.__proto__));

// var foo = {
//     bar: function () {
//         return this;
//     }
// };

// foo.bar(); // foo

// // bar对应的Reference是：
// var BarReference = {
//     base: foo,
//     propertyName: 'bar',
//     strict: false
// };
// GetValue(fooReference) // 1;

// function Foo(){
//     // this.getName = function(){
//     //   console.log(1);
//     // };
//     return this;
//   }
//   Foo.prototype.getName = function(){
//     console.log(3);
//   };
//   function getName(){
//     console.log(5);
//   };
//   new Foo().getName()

//   let foo = new Foo()
//   foo.getName()

// console.log(1);
// setTimeout(()=>{
//   console.log(2);
// })
// console.log(3);
// new Promise((resolve,reject)=>{
//   console.log(4);
//   resolve()
// }).then(res=>{
//   console.log(5);
// },()=>{
//   console.log(6);
// })
// console.log(7);

// const a = [1,2,1,1,1,1]

// a.reverse();

// for (let index = 0; index < 5; index++) {

//   for (let j = 0; j < index ;j++) {
//     a[index] = a[j] + a[index]

//   }

// }
// console.log(a);

function output(arr, max) {
  let map = new Map();
  let newArr = []
  arr.forEach((element) => {
    if (map.has(element)) {
      map.set(element, map.get(element) + 1);
    }else{
      map.set(element, 1);
    }
    if(map.get(element) <= max){
      newArr.push(element);
    }
  });
  console.log(newArr);
}

output([20, 37, 20, 20, 21], 2);
