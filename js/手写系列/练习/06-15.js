// call
// Function.prototype.call = function (context, ...args) {
//   let context = context || window;
//   context.fn = this;
//   let result = context.fn(...args);
//   delete context.fn;
//   return result;
// };

// bind
Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

// let foo = function () {
//   this.content = "hello";
// };
// let boo = foo.bind2({ content: "bye" });
// let res = new boo();
// console.log(res); // {content:"hello"}
// deepCopy

function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      result[key] = deepCopy(element);
    }
  }
  return result;
}

let obj = {
  a: 2,
  c: "sa",
  s: [1, 3, 5],
  d: {
    f: 45,
  },
};

let objNew = deepCopy(obj);
console.log(objNew);

// 防抖
function debounce(func, wait, immediate) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      callNow && func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

// 节流
function throttle(func, wait) {
  let prev = 0;
  return function () {
    let now = Date.now();
    if (now - prev >= wait) {
      func.apply(this, arguments);
      prev = Date.now();
    }
  };
}

// promise.all
Promise.all = function (promiseList) {
  let count = promiseList.length
  let result = []
  return new Promise((resolve,reject)=>{
    promiseList.forEach((element,index) => {
      element.then(res=>{
        result[index] = res
        count ++
        if (count === promiseList.length) {
          resolve(result)
        }
      }).catch(err=>{
        reject(err)
        break
      })
    });
  })
};
// 数组扁平化
function flatArr(arr){
   return arr.reduce((prev,item)=>{
      return prev.concat(Array.isArray(item)? flatArr(item):item)
   },[])
}

var arr2 = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
console.log(flatArr(arr2));
// 数组去重
function uniqueArr(arr){
  return arr.filter((item,index)=> arr.indexOf(item) == index)
}
let arr3 = [1,2,3,1,2,4,2]
console.log(uniqueArr(arr3));
// instanceof
function myInstanceOf(left,constructor){
  if (typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while(proto){
    if (proto === constructor.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
// new
function myNew(constructor,...args){
   
}

// 发布订阅模式
class pubSub{
  constructor(){
    this.events = {}
  }
  subscribe(type,cb){
    if(!this.events[type]){
      this.events[type] = []
    }
    this.events[type].push(cb)
  }
  unSubscribe(type,cb){
    if (this.events[type]) {
    let targetIndex =    this.events[type].findIndex((item)=>cb === item)
    if(targetIndex !== -1){
      this.events[type].splice(targetIndex,1)
    }
    if (this.events[type].length === 0) {
      delete this.events[type]
    }
    }
  }
  publish(type,...args){
     if(this.events[type]){
      this.events[type].forEach((cb)=>cb(...args))
     }
  }
}

// 继承


function Parent(){

}
function child(...args){
  Parent.call(this,...args)
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// 截取url
// let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

// 查找字符串中出现最多的字符和个数

