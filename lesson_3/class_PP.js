// Practice Problems - Classes
// What do we mean when we say that classes are first-class values?

// solution: you can pass them into functions as arguments,
// return them from functions, or assign them to variables
// ex:
let ElementaryKid = class ElementaryStudent {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  printInfo() {
    console.log(`My name is ${this.name}, and I'm ${this.age} years old`);
  }
};

let students = ['Charlie 12', 'Liza 14', 'Cindy 59'];

function makeClassroom(typeOfStudent, studentArray, teacherName) {
  let teacherClass = [];
  studentArray.forEach(student => {
    let [studentName, studentAge] = student.split(' ');
    teacherClass.push(new typeOfStudent(studentName, studentAge));
  });

  return teacherClass;
}

let lizaClass = makeClassroom(ElementaryKid, students, 'Liza');

lizaClass.forEach(student => student.printInfo());

// Consider the following class declaration:
class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}
// What does the static modifier do? How would we call the method manufacturer?

// SOLUTION:
// this makes manufacturer a static method, meaning that it is stored
// directly within the constructor, rather than its prototype object.
// we would invoke manufacturer using the method invocation
// Television.manufacturer() rather than Television.prototype.model()
