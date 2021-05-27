let arr = [1, 2, 3, 4];
/**
 * map
 */
Array.prototype.myMap = function (fn) {
  const result = [];
  for (let index = 0; index < this.length; index++) {
    if (!this.hasOwnProperty(i)) continue;
    result.push(fn(this[index], index, this));
  }
  return result;
};

// let arr2 = arr.map((item, index) => {
//   return item + index;
// });
// let arr3 = arr.myMap((item, index) => {
//   return item + index;
// });
// console.log(arr2, arr3);

/**
 * filer
 */
Array.prototype.myFilter = function (fn) {
  const result = [];
  for (let index = 0; index < this.length; index++) {
    if (!Object.hasOwnProperty.call(this, index)) continue;
    fn(this[index], index, this) && result.push(this[index]);
  }
  return result;
};

// let arr2 = arr.filter((item, index) => {
//   return item * index == 2;
// });
// let arr3 = arr.myFilter((item, index) => {
//   return item * index == 2;
// });
// console.log(arr2, arr3);

/**
 * reduce
 */

Array.prototype.myReduce = function (fn, initValue) {
  if (!initValue && this.length === 0) {
    throw new Error("myReduce of empty array with no initial value");
  }
  let result = initValue ? initValue : this[0];
  for (let index = 0; index < this.length; index++) {
    if (!Object.hasOwnProperty.call(this, index)) continue;
    result = fn(result, this[index], index, this);
  }
  return result;
};

// let arr2 = arr.reduce((pre, next, index) => {
//   return pre + next + index;
// }, 2);
// let arr3 = arr.myReduce((pre, next, index) => {
//   return pre + next + index;
// }, 2);
// console.log(arr2, arr3);

/**
 * flat
 */

function flatten(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i])); // 递归
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
arr = [1, [2, [3, [4, 5]]], 6];
console.log(flatten(arr));
// arr.flat(2);
// console.log(arr.flat());
