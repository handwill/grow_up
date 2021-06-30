function test1() {
  console.log("start");
  setTimeout(() => {
    console.log("timer1");
    Promise.resolve().then(function () {
      console.log("promise1");
    });
  }, 0);
  setTimeout(() => {
    console.log("timer2");
    Promise.resolve().then(function () {
      console.log("promise2");
    });
  }, 0);
  Promise.resolve().then(function () {
    console.log("promise3");
  });
  console.log("end");

  // start
  // end
  // promise3
  // timer1
  // promise1
  // timer2
  // promise2
}

// Process.nextTick()
// 当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。
