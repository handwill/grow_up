Promise._race = function (promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new Error("promiseList 必须是数组");
  }
  return new Promise((resolve, reject) => {
    for (let index = 0; index < promiseList.length; index++) {
      promiseList[index]
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 200);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 100);
});

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 300);
});

Promise.race([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

Promise._race([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
