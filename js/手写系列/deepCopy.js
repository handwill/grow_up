function deepCopy(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  let result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      result[key] = deepCopy(obj[key]);
    }
  }
  return result;
}

let obj = {
  a: 100,
  b: [1, 2, 3],
  c: {
    d: "sss",
  },
};

console.log(deepCopy(obj));
