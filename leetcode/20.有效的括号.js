/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length % 2 === 1 || !s) {
        return false;
    }
    let map = new Map();
    map.set("(",")");
    map.set("{","}");
    map.set("[","]");

    let stack = [];
    for (let index = 0; index < s.length; index++) {
        const element = s.charAt(index);
        if (map.has(element)) {
            stack.push(element);
        }else{
            let stackTop = stack[stack.length - 1];
            if (stackTop && map.get(stackTop) == element) {
                stack.pop()
            }else{
                return false
            }
        }
    }
    
    return stack.length === 0
    
};
// @lc code=end


console.log(isValid('{[]}'));
