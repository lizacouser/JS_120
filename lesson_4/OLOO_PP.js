// Practice Problems: Object Creation with Prototypes
// Use a factory function to create pet objects.
// The factory should let us create and use pets like this:

function createPet(animal, name) {
  return {
    animal,
    name,

    sleep() {
      console.log('I am sleeping');
    },

    wake() {
      console.log('I am awake');
    }
  };
}

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake


// Use the OLOO pattern to create an object prototype that we can
// use to create pet objects. The prototype should let us create
// and use pets like this:

let PetPrototype = {
  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  },

  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  }
};

pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

// Consider the objects created by the programs in problems 1 and 2.
// How do objects for the same animal differ from each other?

// solution:
// they are similar, except the OLOO objects inherit from the same prototype,
// so they are using shared methods. the factory function objects
// each store individual methods
// so they use more memory, and you can't change
// the methods in the prototype, i.e:

PetPrototype.sleep = function() {
  console.log('Actually I am only half asleep');
};

neptune.sleep();