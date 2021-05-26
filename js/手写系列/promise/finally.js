// finally 没有参数
// finally 会将结果和 error 传递

Promise.prototype._finally = function (cb) {
  return this.then(
    (value) => Promise.resolve(cb()).then(() => value),
    (error) =>
      Promise.resolve(cb()).then(() => {
        throw error;
      })
  );
};

Promise.resolve(1)
  .then((res) => {
    console.log("then", res);
  })
  .catch((err) => {
    console.log("catch", err);
  })
  ._finally(() => {
    console.log("_finally", res);
  });
