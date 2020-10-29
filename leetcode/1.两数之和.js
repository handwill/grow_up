/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  //   console.log(nums);
  const map = new Map();
  for (let index = 0; index < nums.length; index++) {
    let otherIndex = map.get(target - nums[index]);
    if (otherIndex !== undefined) return [otherIndex, index];
    map.set(nums[index], index);
  }
};
// @lc code=end

var twoSum2 = function (nums, target) {
  //   console.log(nums);
  const map = new Map();
  for (let index = 0; index < nums.length; index++) {
    let otherIndex = map.get(target - nums[index]);
    if (otherIndex) return [otherIndex, index];
    map.set(nums[index], index);
  }
};

var twoSum3 = function (nums, target) {
  //   console.log(nums);
  for (let index = 0; index < nums.length; index++) {
    const diff = target - nums[index];
    for (let j = index + 1; j < nums.length; j++) {
      if (nums[j] == diff) {
        return [index, j];
      }
    }
  }
};
