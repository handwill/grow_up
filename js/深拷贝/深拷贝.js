function deepClone(obj = {}){
  if (typeof obj !== 'object' || obj == null) {
      return obj
  }
  let result;
  if (obj instanceof Array) {
    result = []
  }else{
    result= {}
  }
  for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key];
          result[key] = deepClone(element)
      }
  }
  return result
}

let a = {
    c:{
        d:'hhh',
        e:123
    },
    g:['2','3','5']
}

let b = deepClone(a);

b.g.push('ssss');
b.c.f= "222";

console.log(a);
console.log(b);
