// fix this code
// using only one method

// option one
// make a bigger class of walker
// contains method walk which
// logs ${name} ${gait} forward

// class Being {
//   constructor(name) {
//     this.name = name;
//   }

//   walk() {
//     return `${this.name} ${this.gait()} forward.`;
//   }
// }

// class Person extends Being {
//   gait() {
//     return "strolls";
//   }
// }

// class Cat extends Being {
//   gait() {
//     return "saunters";
//   }
// }

// class Cheetah extends Being {
//   gait() {
//     return "runs";
//   }
// }

// let mike = new Person("Mike");
// console.log(mike.walk());
// // "Mike strolls forward"

// let kitty = new Cat("Kitty");
// console.log(kitty.walk());
// // "Kitty saunters forward"

// let flash = new Cheetah("Flash");
// console.log(flash.walk());
// // "Flash runs forward"

// option 2
// mixins

let walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward.`;
  }
};

class Person {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "strolls";
  }
}

Object.assign(Person.prototype, walkMixin);

class Cat {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "saunters";
  }
}

Object.assign(Cat.prototype, walkMixin);


class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

Object.assign(Cheetah.prototype, walkMixin);


let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"

/*
Mixins are more appropriate in a has-a relationship.
While it is sometimes tricky to choose one or the other,
a great guideline is to decide if you want some additional
functionality, or if you want to extend the abilities of
the class. In this case, it is pretty clear that we need
the functionality of walking; we don't need to extend the
abilities of class Person(extending the abilities of a
class coincides with an is-a relationship, not has-a).
*/