() => {
  const value = { number: 10 };
  const multiply = (x = { ...value }) => {
    console.log((x.number *= 2));
  };
  multiply();
  multiply();
  multiply(value);
  multiply(value);
};

() => {
  const a = [1, 2, 3].map((num) => {
    if (typeof num === "number") {
      return;
    }
    return num * 2;
  });

  console.log(a);
};
() => {
  function* gOne() {
    yield ["a", "b"];
  }
  function* gTwo() {
    yield* ["a", "b"];
  }
  const one = gOne();
  const two = gTwo();
  console.log(one.next().value);
  console.log(two.next().value);
};

() => {
  function sum(n1, n2 = n1) {
    return n1 + n2;
  }
  console.log(sum(10));
};

const person = {
  name: "a",
  age: 10,
  duty: 20,
};
console.log(Object.entries(person));
for (const [x, y] of Object.entries(person)) {
  console.log(x);
}

let a = ["s", "sd", "ss"];
console.log(a);
