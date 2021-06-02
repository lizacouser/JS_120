/*
P:
Write the classes and methods that will be necessary to make
this code run, and log the following output:
P Hanson has adopted the following pets:
a cat named Butterscotch
a cat named Pudding
a bearded dragon named Darwin

B Holmes has adopted the following pets:
a dog named Molly
a parakeet named Sweetie Pie
a dog named Kennedy
a fish named Chester

P Hanson has 3 adopted pets.
B Holmes has 4 adopted pets.

-requirements:
  -Pet takes 2 arguments species and name
  -Owner takes one arg, name
    -one method numberofpets()
  -Shelter takes no args, one method "adopt"
    -adopt takes 2 args, owner name, pet name
    -printAdoptions prints string describing adoptions

A:
-create pet class
-create owner class
  -property pets, list of adopted pets?
  -numberOfPets()
    -length of pet list?
-create shelter class
  -adopter list property
  -adopt(owner, pet)
    -adds pet to owner's pet property
    -adds owner to list of adopters
  -printAdoptions()
    -prints owner has adopted the following pets
    -a species named name, etc.
*/

class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }

  info() {
    return `a ${this.species} named ${this.name}`;
  }
}


let petTrackerMixin = {
  addPet(pet) {
    this.pets.push(pet);
  },

  addPets(petList) {
    petList.forEach(pet => this.addPet(pet));
  },

  removePet(pet) {
    let petIndex = this.pets.indexOf(pet);
    if (petIndex !== -1) {
      this.pets.splice(petIndex, 1);
    }
  },

  printPetList() {
    this.pets.forEach(pet => {
      console.log(pet.info());
    });
    console.log('');
  },

  numberOfPets() {
    return this.pets.length;
  }
};

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  // addPet(pet) {
  //   this.pets.push(pet);
  // }

  // printPetList() {
  //   this.pets.forEach(pet => {
  //     console.log(pet.info());
  //   });
  //   console.log('');
  // }

  // numberOfPets() {
  //   return this.pets.length;
  // }
}

Object.assign(Owner.prototype, petTrackerMixin);

class Shelter {
  // constructor(pets) {
  //   this.pets = pets;
  //   this.owners = [];
  // }

  constructor() {
    this.pets = [];
    this.owners = [];
  }

  adopt(owner, pet) {
    if (!this.owners.includes(owner)) {
      this.owners.push(owner);
    }
    owner.addPet(pet);
    this.removePet(pet);
  }

  printAdoptions() {
    this.owners.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.printPetList();
    });

    console.log("The Animal Shelter has the following unadopted pets:");
    this.printPetList();
  }
}

Object.assign(Shelter.prototype, petTrackerMixin);

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');
let cypress      = new Pet('dog', 'Cypress');
let trout      = new Pet('dog', 'Trout');
let lottie      = new Pet('dog', 'Lottie');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

// let shelter = new Shelter([butterscotch, pudding,
//   darwin, kennedy, sweetie,
//   molly, chester, cypress,
//   trout, lottie]);
let shelter = new Shelter();
shelter.addPets([butterscotch, pudding,
  darwin, kennedy, sweetie,
  molly, chester, cypress,
  trout, lottie]);
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
console.log(`The Animal Shelter has ${shelter.numberOfPets()} unadopted pets.`);