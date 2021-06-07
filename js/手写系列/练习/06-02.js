// call
Function.prototype.myCall = function (context, ...args) {
    let context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}
// bind
Function.prototype.myBind = function (context, ...argsOut) {
    let self = this
    let fn = function (...argsIn) {
        let param = [...argsOut, ...argsIn]
        return (this instanceof fn) ? self.apply(this, param) : self.apply(context, param)
    }
    fn.prototype = Object.create(this.prototype)
    return fn
}
// deepCopy
function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) return obj
    let ret = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            ret[key] = deepCopy(obj[key])
        }
    }
    return ret
}
// 防抖
function debounce(func, wait, immediate) {
    let timer
    return function (...args) {
        let context = this
        if (timer) clearTimeout(timer)
        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait);
            callNow && func.apply(context, args)
        } else {
            timer = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        };
    }
}

// 节流
function throttle(func, wait) {
    let prev = 0
    return function () {
        if (Date.now - prev >= wait) {
            func.apply(this, arguments)
            prev = Date.now
        }
    }
}

// promise.all

// 数组扁平化

// 数组去重

// instanceof

// new

// 发布订阅模式

// 继承

// 截取url
// let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

// 查找字符串中出现最多的字符和个数
