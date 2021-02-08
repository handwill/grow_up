// function sum(a, b) {
//   console.log(arguments);
//   const args = Array.prototype.concat.apply([], arguments);
//   console.log(args);
// }
// sum(2, 3);

let ary = ["1", [{ a: 1 }, [3, [4, 5]]], 6]; // -> [1, 2, 3, 4, 5, 6]
// // ary = ary.flat(Infinity);
// let str = JSON.stringify(ary);
// str = str.replace(/(\[|\])/g, "");
// str = "[" + str + "]";
// ary = JSON.parse(str);
// // ary = str.replace(/(\[|\])/g, "").split(",");
// console.log(ary);

ary.some((item) => {
  if (Array.isArray(item)) {
    ary = [].concat(...ary);
  }
});

console.log(ary);

// while (ary.some(Array.isArray)) {
//   ary = [].concat(...ary);
// }

// console.log(ary);
