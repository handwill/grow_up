
let array = [1, 1, '2', '1', 4, '2'];

function unique1(array) {
    let uniArr = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (uniArr.indexOf(element) === -1) {
            uniArr.push(element);
        }
    }
    return uniArr;
}

function unique2(array) {
    return array.filter((item, index, oArr) => {
        return oArr.indexOf(item) === index;
    })
}

function unique3(array) {
    return [...new Set(array)]
}

function unique4(array) {
    let map = new Map()
    return array.filter((item, index) => {
        return !map.has(item) && map.set(item, 1)
    })
}

// console.log(unique1(array));
// console.log(unique2(array));
// console.log(unique3(array));
// console.log(unique4(array));


// 腾讯：不产生新数组，删除数组里的重复元素
const removeDuplicates1 = (nums) => {
    // 原地排序
    nums.sort()
    // 去重
    let len = 1
    for (let i = 1; i < nums.length; i++)
        if (nums[i] != nums[i-1]) nums[len++] = nums[i];
    // 删除重复项
    nums.splice(len)
    return nums
}

const removeDuplicates2 = (nums) => {
    let len = nums.length - 1
    for (let i = len; i >= 0; i--) {
        if (nums.indexOf(nums[i]) != i) {
            nums[i] = nums[len--] // 不断的往后放
            console.log(nums, i);
        }
    }
    // 删除重复项
    nums.splice(len + 1)
    return nums
}
// 测试
console.log(removeDuplicates([1, 3, 3, 2, 3, 1, 2, 1, 4, 2]));
// [1, 2, 3]
