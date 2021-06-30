function quickSort(arr) {
  if (arr.length <= 1) {
    //如果数组长度小于等于1无需判断直接返回即可
    return arr;
  }
  //取基准点:主元元素
  var pivotIndex = Math.floor(arr.length / 2);
  //取基准点的值,splice(index,1)函数可以返回数组中被删除的数组成的数组，
  //arr.splice(pivotIndex, 1)[0]得到被删除的那一个数，即主元元素值
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = []; //存放比基准点小的数组
  var right = []; //存放比基准点大的数组
  for (var i = 0; i < arr.length; i++) {
    //遍历数组，进行判断分配
    if (arr[i] < pivot) {
      left.push(arr[i]); //比基准点小的放在左边数组
    } else {
      right.push(arr[i]); //比基准点大的放在右边数组
    }
  }
  //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；
  //将左右排好序的数组以及主元重新组成一个数组，则这时就组成一个全部排好序的数组
  return quickSort(left).concat([pivot], quickSort(right));
}

var arr1 = [2, 1, 3, 45, 34, 90, 0];
//console.log(quickSort(arr1));//0 1 2 3 34 45 90
function binarySearch(arr, item) {
  //先将数组排好序
  var newArr = quickSort(arr);
  var low = 0,
    high = newArr.length - 1;
  var mid, element;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    element = newArr[mid];
    if (element < item) {
      //如果目标元素大于数组中间那个元素，则需要在数组的后半部分查找
      low = mid + 1;
    } else if (element > item) {
      //如果目标元素小于数组中间那个元素，则需要在数组的前半部分查找
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}
console.log(binarySearch(arr1, 34)); //4
