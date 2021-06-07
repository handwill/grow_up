/**
 
给定两个数组，编写一个函数来计算它们的交集。

输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2]

输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [9,4]

 */

// /*找并集*/
function getIntersection1(nums1, nums2) {
  return [...new Set(nums1.concat(nums2))];
}

// /*找交集*/
function getIntersection2(nums1, nums2) {
  let map = new Map(),
    result = [];
  let set1 = new Set(nums1);
  let set2 = new Set(nums2);
  set1.forEach((element) => {
    map.set(element, true);
  });
  set2.forEach((element) => {
    if (map.has(element)) {
      result.push(element);
    }
  });
  return result;
}

/*找差集*/
function difference(arr1, arr2) {
  var set1 = new Set(arr1);
  var set2 = new Set(arr2);
  for (let ele of set1) {
    if (set2.has(ele)) {
      set2.delete(ele);
    }
  }
  return Array.from(set2);
}

let nums1 = [4, 9, 5],
  nums2 = [9, 4, 9, 8, 4];
console.log(getIntersection2(nums1, nums2));
