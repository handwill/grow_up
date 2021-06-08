function shallowCopy(obj) {
    if (typeof obj !== 'object' || obj == null) return obj;
    let newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

let a = ['1', { a: 2 }, 3]
let b = shallowCopy(a)
a[1].a = 's'
console.log(b);