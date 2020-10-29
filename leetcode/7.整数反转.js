/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const value =  parseInt(Array.from(Math.abs(x)+'').reverse().join(''));
    if (value < - (2 ** 31) || value > 2 ** 31 -1) {
        return 0;
    }
    return x < 0 ? - value : value;
};
// @lc code=end

var reverse1 = function(x) {
    let isfu = x.indexOf('-') === 0
    let strArr = Array.from(x);
    strArr.reverse();
    return (isfu ? '-' : '') + String(parseInt(strArr.join('')))
};