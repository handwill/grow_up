/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) return false;
    let div = 1;
    while (x / div >= 10) div *= 10; // 获取到
    while (x > 0) {
        let left =  Math.floor(x / div);
        let right = x % 10;
        if (left != right) return false;
        x =Math.floor( (x % div) / 10);
        div /= 100;
    }
    return true;
};
// @lc code=end

var isPalindrome1 = function(x) {
    if (x < 0) return false;
    if (x < 10) return true;
    let n = 10 ** Math.floor(Math.log10(x));
    while (n > 1 && x > 0) {
        if (Math.floor(x / n) !== x % 10) return false;
        x = Math.floor((x % n) / 10);
        n /= 100;
    }
    return true;
};