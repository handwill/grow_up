// call
Function.prototype.call = function (context, ...args) {
    context = context || window
    context.fn = this
    let res = context.fn(...args)
    delete context.fn
    return res
}
Function.prototype.apply = function (context, args) {
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}
// bind
Function.prototype.bind = function (context, ...args1) {
    const self = this;
    const fn = function (...args2) {
        self.apply(this instanceof fn ? this : context, [...args1, ...args2])
    }
    const F = function () { }
    F.prototype = this.prototype
    fn.prototype = new F()
    return fn
}

// deepCopy

function deepCopy(obj) {
    if (typeof obj !== 'object' || obj == null) return obj
    let result = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepCopy(obj[key])
        }
    }

    return result
}

// 防抖
function debounce(fn, wait, immediate) {
    let timeout
    return function () {
        if (timeout) {
            clearTimeout(timeout)
        }
        if (immediate) {
            const callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait);
            callNow && fn.apply(this, arguments)
        } else {
            timeout = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait);
        }
    }
}

// 节流
function throttle(fn, wait) {
    let prev = 0
    return function () {
        let now = Date.now()
        if (now - prev >= wait) {
            fn.apply(this, arguments)
            prev = Date.now
        }
    }
}

// promise.all
Promise.prototype.all = function (promiseList) {
    const total = promiseList.length
    let count = 0
    let result = []
    return new Promise((resolve, reject) => {
        for (let i = 0; i < total; i++) {
            promiseList[i].then(res => {
                count++
                result[i] = res
                if (count == total) {
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}

// promise
class MyPromise {
    constructor(excutor) {
        this.initData()
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
        try {
            excutor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    initData() {
        this.state = 'pending'
        this.value = null
        this.reason = null
        this.onResolvedCallback = []
        this.onRejectedCallback = []
    }
    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'fulfilled'
            this.value = value;
            this.onResolvedCallback.forEach(fn => fn())
        }
    }

    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected'
            this.reason = reason;
            this.onRejectedCallback.forEach(fn => fn())
        }
    }

    then(onFulfiled, onRejected) {
        if (this.state === 'fulfilled') {
            setTimeout(() => {
                onFulfiled(this.value)
            }, 0);
        }
        if (this.state === 'rejected') {
            setTimeout(() => {
                onRejected(this.reason)
            }, 0);
        }
        if (this.state = 'pending') {

        }
    }
}

// 数组扁平化
function flatten(arr) {
    // if (!Array.isArray(arr)) {
    //     throw new Error('错误')
    // }
    return arr.reduce((pre, item,) => {
        return pre.concat(Array.isArray(item) ? flatten(item) : item)
    }, [])
}
// arr = [1, [2, [3, [4, 5]]], 6];
// console.log(flatten(arr));

// 数组去重
let array = [1, 1, '2', '1', 4, '2'];
function unique(arr) {
    return arr.filter((item, index, oArr) => {
        return oArr.indexOf(item) == index
    })
}
console.log(unique(array));

// instanceof
function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) return false
    let proto = Object.getPrototypeOf(left);
    while (proto) {
        if (proto == right.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}

// new
function myNew(constructor, ...args) {
    let obj = Object.create(constructor.prototype)
    let ret = constructor.apply(obj, args)
    return typeof ret === 'object' ? ret || obj : obj
}

// 发布订阅模式
class pubSub {
    constructor() {
        this.events = {}
    }
    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = []
        }
        this.events[type].push(callback)
    }
    off(type, callback) {
        if (this.events[type]) {
            this.events[type] = this.events[type].filter(item => item !== callback)
        }
    }

    publish(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach(cb => {
                cb(...args)
            })
        }
    }
}

// 继承


// 截取url
// let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
function getUrlParam(url) {
    let result = {}
    if (url.indexOf('?' !== -1)) {
        str = url.split('?')[1]
        const strs = str.split('&')
        strs.forEach((item) => {
            const kv = item.split('=')
            return result[kv[0]] = kv[1]
        })
    }
    console.log(result);
}
getUrlParam(url)
// 查找字符串中出现最多的字符和个数

