/*
P:
-complete class so test cases work
-requirements:
  -constructor takes a message
  -properties: this.message
  -methods:
    -displayBanner prints top , empty , message , empty , bottom
    -horizRule returns string "+------+"
    -emptyline returns "|      |"
    -messageLine returns "| this.message |"

E:
-see below

D:
-most banner methods return strings
-something should store the number of dashes/spaces? (line length)
-display takes and array and joins with "/n"

A:
-create constructor with message
-maybe add bannerLength property?
-horizontal rule return `+${"-".repeat(bannerLength)}+`
-empty return `|${" ".repeat(bannerLength)}|`
*/

class Banner {
  constructor(message, bannerLength = (message.length + 2)) {
    this.message = message;
    this.bannerLength = (bannerLength >= message.length + 2 ?
      bannerLength : message.length + 2);
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+${"-".repeat(this.bannerLength)}+`;
  }

  emptyLine() {
    return `|${" ".repeat(this.bannerLength)}|`;
  }

  messageLine() {
    return `|${this.center(this.message)}|`;
  }

  center(message) {
    let startPadding = (this.bannerLength - message.length) / 2;
    message = " ".repeat(startPadding) + message;
    return message.padEnd(this.bannerLength, " ");
  }

}

let banner1 = new Banner('To boldly go where no one has gone before.', 10);
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('hi', 30);
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+


/*
Part 2:
Modify this class so that constructor will optionally
let you specify a fixed banner width at the time the
Banner object is created. The message in the banner
should be centered within the banner of that width.
Decide for yourself how you want to handle widths
that are either too narrow or too wide.

-add param with default value of message.length+2
-fix message line
  -instead of just adding a space, you want to pad start & end
  -pad with bannerLength - 2 / 2?
*/