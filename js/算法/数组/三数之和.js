/**
 
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意： 答案中不可以包含重复的三元组。

示例：
给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]


 */

//这道题经典的是细节，需要考虑蛮多细节的
//解法：
//1.暴力破解，三层枚举，O（n^3）效率太低不考虑
//2.a+b+c = 0，转换思路，a+b = -c，这不就是两数之和嘛？
//3.利用双指针夹逼，但是怎么避免重复呢？
//3.1 排序即可，利用排序好的数组，固定一个指针i，夹逼选举left和right
//3.2 这道题难度在于要考虑的细节太多，多想想即可。
//3.3 扩展一下，如果是4数之和，五数之和，N数之和呢？怎么解决？
const threeSum = (nums) => {
  const len = nums.length;
  const result = [];
  // 因为是三数之和，小于三个不用考虑了
  if (len < 3) {
    return result;
  }
  nums.sort((a, b) => a - b);
  // len - 2 同样道理，小于三个不用考虑
  for (let i = 0; i < len - 2; i++) {
    // 如果第一个就大于0了，三个加起来肯定大于0
    if (nums[i] > 0) {
      break;
    }
    // 避免掉重复的情况
    if (i && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = len - 1;
    // 双指针夹逼
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left++], nums[right--]]);
        // push 加了之后防止还存在重复
        while (nums[left] === nums[left - 1]) {
          left++;
        }
        while (nums[right] === nums[right + 1]) {
          right--;
        }
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return result;
};

let nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));
