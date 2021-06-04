/*
P:
-circular queue is like fifo, with a limited capacity and organizaed spatially
-when it reaches capacity, any added items replace the oldest items in the cue
-otherwise, the items just go to the next open spot

1
12
123
423
4 3
453
456
756
7 6
7

-write a class for this
-constructor: buffer argument
-methods:
  -enqueue add something to cue
  -dequeue removes and returns oldest object in queue (or null if empty)

E:
-see below
-try with strings, and other values
-missing arguments?

D:
-input number
-output any value
-internal:
  -queue is an array with length bufferSize

A:
-create class
-create constructor with buffer size
  -properties queue (array filled with null)
  -and order
-encue takes value for queue
  -pushes into order array
  -look through array from index 0 to n
  -if slot === null, add our value
  -if there's a value in every slot,
  -find index of orderArray[0].pop() in queue and replace at that index
-dequeue takes no args
  -find index of orderArray[0].pop() in queue and replace that index with null
  -return replaced value

*/

class CircularQueue {
  constructor(bufferSize) {
    this.buffer = Array(bufferSize).fill(null);
    this.order = [];
  }

  enqueue(value) {
    this.order.push(value);

    let replaceIndex = this.buffer.findIndex(elem => elem === null);

    if (replaceIndex < 0) {
      replaceIndex = this.buffer.indexOf(this.order.shift());
    }

    this.buffer[replaceIndex] = value;
  }

  dequeue() {
    if (this.buffer.every(element => element === null)) return null;

    let dequeuedElement = this.order.shift();
    let replaceIndex = this.buffer.indexOf(dequeuedElement);
    this.buffer[replaceIndex] = null;

    return dequeuedElement;
  }
}


let queue = new CircularQueue(3);

console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);


/*
Suggested version using pointers

class CircularQueue {
  constructor(size) {
    this.buffer = new Array(size).fill(null);
    this.nextPosition = 0;
    this.oldestPosition = 0;
  }

  enqueue(object) {
    if (this.buffer[this.nextPosition] !== null) {
      this.oldestPosition = this.increment(this.nextPosition);
    }
    this.buffer[this.nextPosition] = object;
    this.nextPosition = this.increment(this.nextPosition);
  }

  dequeue() {
    let value = this.buffer[this.oldestPosition];
    this.buffer[this.oldestPosition] = null;
    if (value !== null) {
      this.oldestPosition = this.increment(this.oldestPosition);
    }
    return value;
  }

  increment(position) {
    return (position + 1) % this.buffer.length;
  }
}
*/