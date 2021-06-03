/* eslint-disable max-lines-per-function */
/*
P:
-create school object
-uses student object
-properties:
  -name?
-methods:
  -addStudent: creates new student and adds to list
    -should also test that year is only 1st through 5th
    -return student object or invalid year
  -enrollStudent: enrolls student in a course
  -addGrade: adds grade of student for a course (grade: 90)
  -getReportCard: logs grades of student for all courses
    -if not grade for a course "in progress"
  -courseReport: logs grades of all students for a given course name
    -only logs students with grades
    -also logs --- \n course average:
  -getAverageGrade?
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

    updateGrade(code, grade) {
      this.courses.forEach(course => {
        if (course.code === code) {
          course['grade'] = grade;
        }
      });
    },

    getGrade(courseName) {
      let course = this.courses.find(course => course.name === courseName);
      return course.grade;
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (Object.prototype.hasOwnProperty.call(course, 'note')) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    viewGrades() {
      this.courses.forEach(course => {
        if (Object.prototype.hasOwnProperty.call(course, 'grade')) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progess`);
        }
      });
    },
  };
}

function createSchool(name, students = {}) {
  return {
    name,
    students,
    enrolled: {},

    addStudent(name, year/*, courses*/) {
      if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
        console.log("Invalid Year");
        return undefined;
      }

      let student = createStudent(name, year);
      // courses.forEach(course => {
      //   student.addCourse(course);
      // });
      students[name] = student;
      return student;
    },

    enrollStudent(studentName, course) {
      let student = this.students[studentName];
      student.addCourse(course);

      if (this.enrolled[course.name]) {
        this.enrolled[course.name].push(student);
      } else {
        this.enrolled[course.name] = [student];
      }
    },

    addGrade(studentName, code, grade) {
      let student = this.students[studentName];
      student.updateGrade(code, grade);
    },

    getReportCard(studentName) {
      let student = this.students[studentName];
      student.viewGrades();
    },

    courseReport(courseName) {
      let report = [];

      let enrolledStudents = this.enrolled[courseName];
      enrolledStudents.forEach(student => {
        if (student.getGrade(courseName) !== undefined) {
          report.push([student.name, student.getGrade(courseName)]);
        }
      });

      if (report.length !== 0) {
        console.log(`=${courseName} Grades=`);
        report.forEach(gradedStudent => {
          console.log(gradedStudent[0] + ": " + gradedStudent[1]);
        });

        console.log("---");

        let sumOfGrades = report.reduce((sum, grade) => {
          return grade[1] + sum;
        }, 0);

        console.log(`Course Average: ${sumOfGrades / report.length}\n`);
      }
    },
  };
}

// Examples of created student objects with grades;
// methods on the objects are not shown here for brevity.
// The following are only showing the properties that
// aren't methods for the three objects

let school = createSchool("Elm Lawn");

school.addStudent("foo", "3rd");
school.enrollStudent("foo", { name: 'Math', code: 101, grade: 95});
school.enrollStudent("foo", { name: 'Advanced Math', code: 102, grade: 90});
school.enrollStudent("foo", { name: 'Physics', code: 202});

school.getReportCard("foo");

school.addStudent("bar", "1st");
school.enrollStudent("bar", { name: 'Math', code: 101});
school.addGrade("bar", 101, 91);

school.getReportCard("bar");

school.addStudent("qux", "2nd");
school.enrollStudent("qux", { name: 'Math', code: 101});
school.enrollStudent("qux", { name: 'Advanced Math', code: 102});
school.addGrade("qux", 101, 93);
school.addGrade("qux", 102, 90);

school.getReportCard("qux");

school.addStudent("beep", "6th");


school.courseReport("Math");
school.courseReport("Advanced Math");
school.courseReport("Physics");

