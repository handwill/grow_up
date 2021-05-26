"use strict";

var arr = [1, 2, 3, 4];
/**
 * map
 */

Array.prototype.myMap = function () {};

var arr2 = arr.map(function (item, index) {
  return item + index;
});
console.log(arr2);