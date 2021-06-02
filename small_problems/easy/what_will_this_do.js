class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something(); // creates new Something instance with data "hello"
console.log(Something.dupData()); // "ByeBye"
console.log(thing.dupData()); //"HelloHello"