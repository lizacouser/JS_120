/*
P:
-created class rectangle
-constructor takes two arguments, length & width
-get Width, Length, & area instance methods

Write a class called Square that
inherits from Rectangle.
-constructor only takes one arg
-otherwise same
*/

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
}

// let rect = new Rectangle(4, 5);

// console.log(rect.getWidth()); // 4
// console.log(rect.getLength()); // 5
// console.log(rect.getArea()); // 20

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25