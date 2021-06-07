// 输入: ["flower","flow","flight"]
// 输出: "fl"

// 输入: ["dog","racecar","car"]
// 输出: ""
// 解释: 输入不存在公共前缀。

let arr = ["flower", "flow", "flight"];

function findLongestPrefix1(array) {
  if (!Array.isArray(array) || array.length === 0) return;
  let prev = array[0];
  for (let index = 1; index < array.length; index++) {
    const element = array[index];
    let j = 0;
    for (; j < prev.length && j < element.length; j++) {
      if (prev[j] !== element[j]) break;
    }
    prev = element.substring(0, j);
    if (!prev) break;
  }
  return prev;
}

console.log(findLongestPrefix1(arr));
