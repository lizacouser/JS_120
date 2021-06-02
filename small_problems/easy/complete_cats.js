/*
-update code to output:
My cat Pudding is 7 years old and has black and white fur.
My cat Butterscotch is 10 years old and has tan and white fur.

P:
-Cat requirements:
  -name, age, color
  -info method prints string
-missing info logs undefined


E:
-see below

D:
-input string, number, string
-output string
*/

class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat extends Pet {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }

  info() {
    return `My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`;
  }
}

let pudding = new Cat('Pudding', 7, 'black and white');
let butterscotch = new Cat('Butterscotch', 10, 'tan and white');
let missing = new Cat('Jack', "unknown");


console.log(pudding.info());
console.log(butterscotch.info());
console.log(missing.info());

/*
An alternative approach to this problem would be to
modify the Pet class to accept a colors parameter.
If we did this, we wouldn't need to supply an
constructor method for Cat.

Why would we be able to omit the constructor method?
- no constructor method on an extending class calls
constructor automatically and passes all arguments to super
Would it be a good idea to modify Pet in this way?
-if you cared about the color of all pets. but
probably not because it overcomplicates the superclass
and adds more required arguments for all pets
How might you deal with some of the
problems, if any, that might arise from modifying Pet?
-you'd have to always provide the color of pets when
calling the constructor function or all methods used
would have to check to see if the color parameter is
null or undefined
*/