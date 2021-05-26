// function throttle(func, wait = 1000, options = {}) {
//   let previous = 0,
//     options = Object.assign(options, {
//       firstTime: true,
//       lastTime: false,
//     }),
//     timeout;

//   let _throttle = function (...args) {
//     let nowTime = new Date().getTime();
//     if (!options.firstTime) {
//       if (timeout) return;
//       timeout = setTimeout(() => {}, wait);
//     }
//   };
//   return _throttle;
// }

var throttle1 = function (func, delay) {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
};

var throttle2 = function (func, delay) {
  var timer = null;
  var startTime = Date.now();
  return function () {
    var curTime = Date.now();
    var remaining = delay - (curTime - startTime);
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
};
