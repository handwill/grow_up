let tel = "010-12345678";

// console.log(tel.match(/(010|020)-\d{7,8}/));

const hd = "houdunren";
console.log(/ren$/.test(hd));

// let hd = "houdunren 2010";
// console.log(hd.match(/\d/g)); //["2", "0", "1", "0"]

let s = "sad344fdgsf45556gsdfg54hfh";
console.log(s.match(/\d{1,}/g));
