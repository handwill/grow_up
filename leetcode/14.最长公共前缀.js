/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length == 0) {
    return "";
  }
  let minLength = strs.reduce((minLength, item) => {
    return (minLength = item.length > minLength ? minLength : item.length);
  }, strs[0].length);
  let newStrs = strs.map((item) => {
    return item.slice(0, minLength);
  });
  let sameCode = "";
  for (let index = 0; index < minLength; index++) {
    let singer = newStrs.reduce((str, item) => {
      return str == item.charAt(index) ? str : "";
    }, newStrs[0].charAt(index));
    if (singer) {
      sameCode += singer;
    } else { 
      break;
    }
  }
  return sameCode;
};
// @lc code=end

longestCommonPrefix(["flower", "flow", "flight"]);
