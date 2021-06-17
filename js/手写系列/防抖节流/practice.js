// 练习
function debounce(func, wait, immediate) {
  let timer;
  return function () {
    const context = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      callNow && func.apply(context, arguments);
    } else {
      timer = setTimeout(() => {
        func.apply(context, arguments);
      }, wait);
    }
  };
}

function throttle(func, wait, immediate) {
  let pre = immediate ? 0 : Date.now();
  return function () {
    let now = Date.now();
    if (now - pre > wait) {
      func.apply(this, arguments);
      pre = now;
    }
  };
}
