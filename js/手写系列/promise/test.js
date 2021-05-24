const myPromise = require("./myPromise.js");

new myPromise((resolve, reject) => {
  //   setTimeout(() => {

  //   }, 1000);
  resolve("resolve");
}).then((res) => {
  console.log(res);
});
