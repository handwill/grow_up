/**
 * 快速排序
 *
 * Author: nameczz
 */

const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

// 获取 pivot 交换完后的index
const partition = (arr, pivot, left, right) => {
    const pivotVal = arr[pivot]
    let startIndex = left
    for (let i = left; i < right; i++) {
        if (arr[i] < pivotVal) {
            // swap(arr, i, startIndex)
            [arr[i], arr[startIndex]] = [arr[startIndex], arr[i]]
            startIndex++
        }
    }
    swap(arr, startIndex, pivot)
    return startIndex
}

const quickSort = (arr, left, right) => {
    if (left < right) {
        let pivot = right
        let partitionIndex = partition(arr, pivot, left, right)
        quickSort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1)
        quickSort(arr, partitionIndex + 1 > right ? right : partitionIndex + 1, right)
    }

}


const testArr = [9, 1, 6, 2, 1, 2, 3, 6, 6, 4]
// let i = 0
// while (i < 10) {
//     testArr.push(Math.floor(Math.random() * 10))
//     i++
// }
console.log('unsort', testArr)
quickSort2(testArr, 0, testArr.length - 1);
console.log('sort', testArr)

/**
 * 
    1．i =left; j = right; 将基准数挖出形成第一个坑a[i]。
    2．j--由后向前找比它小的数，找到后挖出此数填前一个坑a[i]中。
    3．i++由前向后找比它大的数，找到后也挖出此数填到前一个坑a[j]中。
    4．再重复执行2，3二步，直到i==j，将基准数填入a[i]中。 

    返回调整后基准数的位置
 */
function adjustArray(arr, left, right) {
    // 取出基准值
    let pointValue = arr[left],
        i = left,
        j = right
    while (i < j) {  // 当 i==j 的时候就到头了
        // // 从右向左找小于pointValue的数来填arr[i]
        while (i < j && arr[j] >= pointValue) j--
        if (i < j) {
            //将s[j]填到s[i]中，s[j]就形成了一个新的坑
            arr[i] = arr[j]
            i++
        }
        // 从左向右找大于或等于x的数来填s[j]
        while (i < j && arr[i] <= pointValue) i++
        if (i < j) {
            //将s[i]填到s[j]中，s[i]就形成了一个新的坑
            arr[j] = arr[i]

        }
    }
    arr[i] = pointValue
    return i
}

function quickSort1(arr, left, right) {
    if (left < right) { // 递归退出条件
        let adjustIndex = adjustArray(arr, left, right)
        quickSort1(arr, left, adjustIndex - 1)
        quickSort1(arr, adjustIndex + 1, right)
    }
}


function quickSort2(arr, left, right) {
    if (left < right) {
        let pointValue = arr[left],
            i = left,
            j = right
        while (i < j) {
            while (i < j && arr[j] >= pointValue) j--
            if (i < j) {
                arr[i] = arr[j]
                i++
            }

            while (i < j && arr[i] <= pointValue) i++
            if (i < j) {
                arr[j] = arr[i]
            }
        }
        arr[i] = pointValue

        quickSort2(arr, left, i - 1)
        quickSort2(arr, i + 1, right)
    }
}