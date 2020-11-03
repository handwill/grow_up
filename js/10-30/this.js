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

const a = {
  b: 42,
  c: function () {
    console.log(this.b);
    return this.b;
  },
};

(a.c || [])(); // 
(a.c)();       // 
(1, a.c)();    // 
