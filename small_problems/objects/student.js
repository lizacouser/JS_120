/* eslint-disable max-lines-per-function */
/*
p:
-create object factory for student
-reqs:
  -info: Logs the name and year
  -addCourse: Enrolls student in a course.
    -course is object literal with name & code props
  -listCourses: Returns list of the courses student has enrolled in.
  -addNote: Adds a note property to a course.
    -Takes a code and a note as an argument.
    -If a note already exists, the note is appended to existing one.
  -updateNote: Updates a note for a course.
    -replaces the existing note with the new note.
  -viewNotes: Logs the notes for all the courses.
  Courses without notes are not displayed.

e:
-see test case
-what about empty notes?

d:
-input: two strings
-course: object literal with name & code
-list: array
-note: string

a:
-define factory function
-define name & year properties
-define courses property
-info method: log name and year "foo is a first year student"
-addCourse: take obj, push new object onto list
-listCourses: log courses property
-addNote: take code & string
  -search for course by code
  -if note property on course exists, append note
  -if not, add note property with note
-updateNote: take note and code
  -search for course by code
  -add note property with note
-viewnotes:
  -iterate through course list
  -if course has own notes property, print course name + note
*/

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code) {
          if (!Object.prototype.hasOwnProperty.call(course, 'note')) {
            course['note'] = note;
          } else {
            course['note'] += `; ${note}`;
          }
        }
      });
    },

    updateNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code) {
          course['note'] = note;
        }
      });
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (Object.prototype.hasOwnProperty.call(course, 'note')) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },
  };
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"