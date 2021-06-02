/*
P:
-create class Cat and Dog inheriting from animal
-cat:
  -3 args, name, age, status
  -always have leg count 4, species cat
  -introduce method returns
  "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!"
-dog:
  -4 args, name age status master
  -leg count 4, species dog
  -introduce method from Animal
  -greetMaster method, no args, returns "Hello (master's name)! Woof, woof!"

E:
let cypress = new Dog("Cypress", 1, "happy");
let ginger = new Cat("Ginger", 3, "angry");
cypress.introduce()
ginger.introduce()
cypress.greetMaster()

Alg:
-Cat extends animal
-constructor calls super with default arguments
-introduce adds a meow meow

-Dog extends animal
-constructor calls super with default arguments
-adds master param
-introduce method inherited directly
-adds greetMaster
*/

function getYearsOld(age) {
  return age === 1 ? `1 year old` : `${age} years old`;
}

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${getYearsOld(this.age)} and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }

  introduce() {
    return super.introduce() + " Meow meow!";
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}

let cypress = new Dog("Cypress", 1, "happy", "Liza");
let ginger = new Cat("Ginger", 3, "angry");
console.log(cypress.introduce());
console.log(ginger.introduce());
console.log(cypress.greetMaster());
console.log(cypress.legs);
console.log(ginger.species);