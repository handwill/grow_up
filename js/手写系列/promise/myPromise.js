class myPromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError(`${executor} 不是一个方法`);
      return;
    }
    this.initData();
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  initData() {
    // 初始化state 的值
    this.state = "pending";
    // 成功值
    this.value = null;
    // 失败原因
    this.reson = null;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放的数组
    this.onRejectedCallbacks = [];
  }
  resolve(value) {
    if (this.state === "pending") {
      console.log(value);
      this.state = "fulfilled";
      this.value = value;
      // 只有异步这个数组里面才会有值
      this.onResolvedCallbacks.forEach((fn) => fn());
    }
  }
  reject(reason) {
    if (this.state === "pending") {
      console.log(reason);
      this.state = "rejected";
      this.reason = reason;
      // 只有异步这个数组里面才会有值
      this.onRejectedCallbacks.forEach((fn) => fn());
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    }
    if (this.state === "rejected") {
      onRejected(this.reason);
    }

    if (this.state === "pending") {
      // 存下来等后续 resolve 或者 rejected 执行的时候，再执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.value);
      });
    }
  }
}

module.exports = myPromise;

