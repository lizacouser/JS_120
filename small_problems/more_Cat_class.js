/*
P:
-add instance method rename
-method should rename kitty
-takes one string argument

E:
-see below
-empty string? no arg?

D:
-input string
-ressign this.name

A:
-declare new method within class
-reassign this.name within method
*/

class Cat {
  constructor(name) {
    this.name = name;
  }

  rename(newName) {
    this.name = newName;
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }

  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
}

let kitty = new Cat('Sophie');
console.log(kitty.name); // Sophie
kitty.rename('Chloe');
console.log(kitty.name); // Chloe

Cat.genericGreeting();
kitty.personalGreeting();