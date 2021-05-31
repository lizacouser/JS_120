/* eslint-disable no-unused-vars */
/*
OO Classes Basics
-Create an empty class named Cat.
-Create an instance of Cat and assign it to a variable named kitty.
-Add a constructor method that logs to the console
I'm a cat! when a new Cat object is initialized.
-Add a parameter to constructor that provides a name
for the Cat object. Assign this parameter to a property
called name and use it to log a greeting with the
provided name. (You can remove the code that displays I'm a cat!.)
-Move the greeting from the constructor method to an instance method
named greet that logs a greeting to the console when invoked.
*/

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log('Hi, my name is ' + this.name + '!');
  }
}

let sophie = new Cat("Sophie");

sophie.greet();
