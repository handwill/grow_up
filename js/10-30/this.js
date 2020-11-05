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


function Person() {

}

var person = new Person();
console.log(person.__proto__ == Person.prototype);
console.log(Object.getPrototypeOf(person.__proto__));