/**
 输入: "the sky is blue"
 输出: "blue is sky the"

 输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

输入: "a good   example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

 */
// 1
function reverseStr(str) {
  let arr = str.split(" ").filter((item) => item && item.trim());
  console.log(arr);
  return arr.reverse().join(" ");
}

// 2正则
var reverseWords2 = function (s) {
  return s.trim().replace(/\s+/g, " ").split(" ").reverse().join(" ");
};

/**
 * 
首先去除字符串左右空格
逐个读取字符串中的每个单词，依次放入双端队列的对头
再将队列转换成字符串输出（已空格为分隔符）
 */
var reverseWords3 = function (s) {
  let left = 0;
  let right = s.length - 1;
  let queue = [];
  let word = "";
  while (s.charAt(left) === " ") left++;
  while (s.charAt(right) === " ") right--;
  while (left <= right) {
    let char = s.charAt(left);
    if (char === " " && word) {
      queue.unshift(word);
      word = "";
    } else if (char !== " ") {
      word += char;
    }
    left++;
  }
  queue.unshift(word);
  return queue.join(" ");
};
let str = "a good   example";
console.log(reverseStr(str));
