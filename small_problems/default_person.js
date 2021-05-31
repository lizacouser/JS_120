/*
P:
-Create a class Person.
-Person should accept one argument for "name" when instantiated.
If no arguments are given, person object should instantiate with
a "name" of "John Doe".

E:
see below

D:
-class Person

A:
-declare class Person
-create constructor with argument name, and default set to John Doe

*/

class Person {
  constructor(name = "John Doe") {
    this.name = name;
  }
}

let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name); // John Doe
console.log(person2.name); // Pepe