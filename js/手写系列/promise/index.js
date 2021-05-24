var p1 = new Promise(function (resolve, reject) {
  resolve();
  setTimeout(() => {
    console.log(1);
  });
  console.log(2);
}).then((res) => {
  console.log(3);
});
console.log(4);
