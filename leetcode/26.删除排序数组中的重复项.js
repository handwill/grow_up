/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let length = nums.length;
    for (let index = 0; index < length - 1; index++) {
      if (nums[index + 1] == undefined) {
        break;
      }
      if (nums[index] == nums[index + 1]) {
        nums.splice(index, 1);
        index--;
      }
    }
    return nums.length

//   var len = 1;
//   for (var i = 1; i < nums.length; i++)
//     if (nums[i] != nums[i - 1]) nums[len++] = nums[i];
//   return len;
};
// @lc code=end
