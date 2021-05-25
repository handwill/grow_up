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
  //   .then((res) => {
  //     console.log("then", res);
  //   })
  //   .catch((err) => {
  //     console.log("catch", err);
  //   })
  ._finally((res) => {
    console.log("_finally", res);
  });
