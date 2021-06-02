/*
Without calling the Cat constructor,
create an object that looks and acts
like a Cat instance that doesn't have
a defined name.

P:
-it should be considered an instanceof Cat
-inherit's cat's properties
-undefined name
*/

class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

// one option
// let fakeCat = {};
// Object.setPrototypeOf(fakeCat, Cat.prototype);

// second option
let fakeCat = Object.create(Cat.prototype);

console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.