const sum = (a, b, c, d) => {
  return a + b + c + d;
};

const curry = (fn) => {
  let params = []; // 接受参数
  console.log(fn.length);
  const next = (...args) => {
    params = [...params, ...args];
    if (params.length < fn.length) {
      // 判断参数是否都接收完毕
      return next;
    } else {
      return fn(...params);
    }
  };
  return next;
};

const c_fn = curry(sum);
const res = c_fn(1, 3)(2)(1);
console.log(res);
