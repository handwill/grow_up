/**
 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

 输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */

function findMaxLength(str) {
  let max = 0;
  for (i = 0; i < str.length && str.length - i > max; i++) {
    let s = str.charAt(i);
    for (j = i + 1; j < str.length; j++) {
      if (s.includes(str.charAt(j))) {
        break;
      } else {
        s += str.charAt(j);
      }
    }
    console.log(s);
    max = max > s.length ? max : s.length;
  }
  return max;
}

console.log(findMaxLength("abcabcbb"));

// 优化 暂时还不懂

/**
 * 
使用 map 来存储当前已经遍历过的字符，key 为字符，value 为下标

使用 i 来标记无重复子串开始下标，j 为当前遍历字符下标

遍历字符串，判断当前字符是否已经在 map 中存在，存在则更新无重复子串开始下标 i 为相同字符的下一位置，此时从 i 到 j 为最新的无重复子串，更新 max ，将当前字符与下标放入 map 中

最后，返回 max 即可
 */
var lengthOfLongestSubstring = function (s) {
  let map = new Map(),
    max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i);
    }
    max = Math.max(max, j - i + 1);
    map.set(s[j], j);
  }
  return max;
};
