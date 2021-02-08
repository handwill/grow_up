// es5 创建一个迭代器
function createIterator(items){
   var i = 0;
   return {
       next(){
           var done = i >= items.length;
           var value = !done ? items[i++] : undefined;
           return {
               done:done,
               value:value
           }
       }
   }
}


// iterator 就是一个迭代器对象
var iterator = createIterator([1, 2, 3]);

const obj = {
    value:1
}
obj[Symbol.iterator] = function (){
    return createIterator([1, 2, 3]);
}

for (let value of obj) {
    console.log(value);
}

// console.log(iterator.next()); // { done: false, value: 1 }
// console.log(iterator.next()); // { done: false, value: 2 }
// console.log(iterator.next()); // { done: false, value: 3 }
// console.log(iterator.next()); // { done: true, value: undefined }