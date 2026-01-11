const x = 5;
console.log (`The value of x is: ${x}`);
if (x >= 0) {
    console.log("${x} là số dương");
} else {
    console.log(`${x} là số âm`);
}
// dùng toán tử 3 ngôi
x >= 0 ? console.log(`${x} là số dương`) : console.log(`${x} là số âm`);
console.log(result);

const greet = ( name ,age ) => {
    return `xin chào ${name}, bạn ${age} tuổi`;
}
// gọi hàm greet
console.log(greet("Long", 21));
console.log(greet("An", 22));

// viết hàm tính bình phương của 1 số x
const square = (x) => x*x;
console.log(`Bình phương của ${x} là ${square(x)}`);
// tạo một đối tượng student mẫu 
const student = {
    name: "Long",
    age: 21,
    grade: "Đại học"
}
printStudent(student);
// viết hàm in đối tượng student gồm các thuộc tính name, age, grade
const printStudent = (student) => {
    console.log(`ID: ${student.id}`, `Tên: ${student.name}, Tuổi: ${student.age}, Lớp: ${student.grade}`);
}
// khai báo 1 list of studnets và gọi hàm printStudent cho từng student trong list
const students = [
    {id: 1, name: "Long", age: 21, grade: "Đại học"},
    {id: 2, name: "An", age: 22, grade: "Cao đẳng"},
    {id: 3, name: "Bình", age: 20, grade: "Trung cấp"},
    {id: 4, name: "Hà", age: 23, grade: "Đại học"},
    {id: 5, name: "Minh", age: 21, grade: "Cao đẳng"},
    {id: 6, name: "Lan", age: 22, grade: "Trung cấp"},
    {id: 7, name: "Hùng", age: 24, grade: "Đại học"},
    {id: 8, name: "Phương", age: 20, grade: "Cao đẳng"},
    {id: 9, name: "Tuấn", age: 23, grade: "Trung cấp"},
    {id: 10, name: "Vy", age: 21, grade: "Đại học"}
];
students.forEach(student => printStudent(student));
// Cách khác sử dụng map
students.map(student => printStudent(student));
// không dùng hàm printStudent
students.forEach(student => {
    console.log(`ID: ${student.id}`, `Tên: ${student.name}, Tuổi: ${student.age}, Lớp: ${student.grade}`);
});
//hàm map không dùng hàm printStudent
students.map(student => {
    console.log(`ID: ${student.id}`, `Tên: ${student.name}, Tuổi: ${student.age}, Lớp: ${student.grade}`);
}); 
// sử dụng destructuring để lấy các thuộc tính của student
students.forEach(({id, name, age, grade}) => {
    console.log(`ID: ${id}`, `Tên: ${name}, Tuổi: ${age}, Lớp: ${grade}`);
});
students.map(({id, name, age, grade}) => {
    console.log(`ID: ${id}`, `Tên: ${name}, Tuổi: ${age}, Lớp: ${grade}`);
});
// dùng rest operator để lấy phần còn lại của mảng students
const [student1, student2, ...restStudents] = students;
console.log("Student 1:", student1);
console.log("Student 2:", student2);
console.log("Rest of students:", restStudents);

restStudents.map (s=> console.log(`ID: ${s.id}`, `Tên: ${s.name}, Tuổi: ${s.age}, Lớp: ${s.grade}`));