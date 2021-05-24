class Father {
  constructor() {
    console.log("father");
  }
}

class son extends Father {
  constructor() {
    console.log("son");
    super();
  }
}

const s = new son();

const config = {
  languages: [],
  set languages(lang) {
    return this.languages.push("123");
  },
};
console.log(config.languages);
