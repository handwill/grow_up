setTimeout(() => {
  console.log("sertimeout1");
  Promise.resolve().then((res) => {
    console.log("sertimeout1 Promise");
  });
}, 0);

setTimeout(() => {
  console.log("sertimeout2");
  Promise.resolve().then((res) => {
    console.log("sertimeout2 Promise");
  });
}, 0);
