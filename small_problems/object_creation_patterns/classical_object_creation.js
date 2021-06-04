/*
P:
-pseudoclassical approach (classes/prototype objects)
-subclasses inherit superclass methods
-constructors of superclass reused when implementing subclass
-Super: Person
  -firstName, lastName, age, gender
  -fullName(), communicate(), eat(), sleep()
-Sub Level 1: Doctor
  -specialization
  -diagnose()
-Sub level 1: Prof
  -subject
  -teach()
-Sub level 1: student
  -degree
  -study()
-Sub level two (inherits from student)
  -graduateDegree
  -research()
*/

// with classes
class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return this.firstName + " " + this.lastName;
  }

  communicate() {
    console.log(`${this.fullName()} is communicating`);
  }

  eat() {
    console.log(`${this.fullName()} is eating`);
  }

  sleep() {
    console.log(`${this.fullName()} is sleeping`);
  }
}

// let person = new Person('foo', 'bar', 21, 'gender');
// console.log(person instanceof Person);     // logs true
// person.eat();                              // logs 'Eating'
// person.communicate();                      // logs 'Communicating'
// person.sleep();                            // logs 'Sleeping'
// console.log(person.fullName());            // logs 'foo bar'

class Doctor extends Person {
  constructor(firstName, lastName, age, gender, specialization) {
    super(firstName, lastName, age, gender);
    this.specialization = specialization;
  }

  diagnose() {
    console.log(`Dr. ${this.fullName()} is diagnosing`);
  }
}

// let doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
// console.log(doctor instanceof Person);     // logs true
// console.log(doctor instanceof Doctor);     // logs true
// doctor.eat();                              // logs 'Eating'
// doctor.communicate();                      // logs 'Communicating'
// doctor.sleep();                            // logs 'Sleeping'
// console.log(doctor.fullName());            // logs 'foo bar'
// doctor.diagnose();                         // logs 'Diagnosing'

class Professor extends Person {
  constructor(firstName, lastName, age, gender, subject) {
    super(firstName, lastName, age, gender);
    this.subject = subject;
  }

  teach() {
    console.log(`Prof. ${this.fullName()} is teaching`);
  }
}

class Student extends Person {
  constructor(firstName, lastName, age, gender, degree) {
    super(firstName, lastName, age, gender);
    this.degree = degree;
  }

  study() {
    console.log(`${this.fullName()} is studying`);
  }
}

class GraduateStudent extends Student {
  constructor(firstName, lastName, age, gender, graduateDegree) {
    super(firstName, lastName, age, gender);
    this.graduateDegree = graduateDegree;
  }

  research() {
    console.log(`${this.fullName()} is researching`);
  }
}


let graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'