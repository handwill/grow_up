// 第四版
function debounce(func, wait, immediate = true) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

// function debounce(func, wait, immediate = true) {
//   var timeout;
//   return function (...args) {
//     var context = this;
//     if (timeout) clearTimeout(timeout);
//     if (immediate) {
//       let callNow = !timeout;
//       timeout = setTimeout(() => {
//         timeout = null;
//       }, wait);
//       callNow && func.apply(context, args);
//     } else {
//       timeout = setTimeout(() => {
//         func.apply(context, args);
//       }, wait);
//     }
//   };
// }
