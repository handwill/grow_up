
let array = [1, 1, '2', '1', 4, '2'];

function unique1(array) {
    let uniArr = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (uniArr.indexOf(element) === -1) {
            uniArr.push(element);
        }
    }
    return uniArr;
}

function unique2(array) {
    return array.filter((item, index, oArr) => {
        return oArr.indexOf(item) === index;
    })
}

function unique3(array) {
    return [...new Set(array)]
}

function unique4(array) {
    let map = new Map()
    return array.filter((item, index) => {
        return !map.has(item) && map.set(item, 1)
    })
}

console.log(unique1(array));
console.log(unique2(array));
console.log(unique3(array));
console.log(unique4(array));