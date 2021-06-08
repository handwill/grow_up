class MinStack {
  constructor() {
    this.items = [];
    this.min = null;
  }
  push(item) {
    if (!this.items.length) this.min = item;
    this.items.push(item);
    this.min = Math.min(item, this.min);
  }
  pop() {
    let num = this.items.pop();
    this.min = Math.min(...this.items);
    return num;
  }
  top() {
    if (this.items.length === 0) return null;
    return this.items[this.items.length - 1];
  }
  getMin() {
    return this.min;
  }
}

let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // --> 返回 -3.
minStack.pop();
console.log(minStack.top()); //--> 返回 0.
console.log(minStack.getMin()); //--> 返回 -2.
