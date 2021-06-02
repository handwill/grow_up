// 输入: "the sky is blue"
// 输出: "blue is sky the"

// 输入: "  hello world!  "
// 输出: "world! hello"
// 解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

function reverseStr(str) {
  return s.trim().split(/\s+/).reverse().join(" ");
}

let str = "example   good a";
console.log(reverseStr(str));
