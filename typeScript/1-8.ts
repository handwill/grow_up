() => {
  const a: number = 3;
  console.log(a);

  function test() {
    if (true) {
      let b = 111;
    }
  }

  class Parent {}

  let c: unknown = "nihao ts";
  // console.log(c.length); // 类型“unknown”上不存在属性“length”
  console.log((c as string).length);

  interface myInterface {
    name: string;
    saySomething(): void;
  }
  class person implements myInterface {
    name: string;
    constructor() {
      this.name = "123";
    }
    saySomething() {
      console.log("hi");
    }
  }

  let p = new person();
  p.saySomething();

  function fn<TH>(a: TH): void {}

  enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST,
  }
  let dir: Direction = Direction.NORTH;
};
