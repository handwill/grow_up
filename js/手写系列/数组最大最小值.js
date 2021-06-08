let arr = [6, 4, 1, 8, 2, 11, 23];

function max(prev, next) {
    console.log(prev);
    return Math.max(prev, next);
}

console.log(arr.reduce(max));

console.log(Math.max.apply(null, arr))

console.log(Math.max(...arr))
