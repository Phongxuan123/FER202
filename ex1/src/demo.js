const x = 5;
console.log(`The value of x is: ${x}`);
// Kiểm tra X là dương hay âm
if (x >= 0) {
    console.log(`${x} là số dương`);
} else {
    console.log(`${x} là số âm`);
}   
// dùng toán tử 3 ngôi
const result = (x >= 0) ? `${x} là số dương` : `${x} là số âm`;
console.log(result);

const greet = (name, age) => {
    return `Xin chào ${name}, bạn ${age} tuổi.`;
};
// gọi hàm greet
console.log(greet("An", 20));
console.log(greet("Bình", 25));

// viết hàm tính bình phương của 1 số x
const square = (x) => {
    return x * x;
};
console.log(`Bình phương của x là: ${square(x)}`);

// // Tạo một đối tượng student mẫu
// const student = {
//     name: "An",
//     age: 20,
//     grade: "A"
// };

// // Gọi hàm printStudent để in thông tin
// printStudent(student);

// // viết hàm in thông tin của 1 đối tương student gồm các thuộc tính : id, name, age, grade
// const printStudent = (student) => {
//     console.log(`Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
// };
// // khai báo 1 list of students và gọi hàm printStudent cho từng student trong list
// const students = [
//     { name: "An", age: 20, grade: "A" },
//     { name: "Bình", age: 25, grade: "B" },
//     { name: "Cường", age: 22, grade: "B" }
// ];

// students.forEach(student => printStudent(student));

// Update printStudent to include id
const printStudent = (student) => {
    console.log(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
};

// Update students array with id and add 10 more
const students = [
    { id: 1, name: "An", age: 20, grade: "A" },
    { id: 2, name: "Bình", age: 25, grade: "B" },
    { id: 3, name: "Cường", age: 22, grade: "B" },
    { id: 4, name: "Dũng", age: 21, grade: "A" },
    { id: 5, name: "Hoa", age: 19, grade: "B" },
    { id: 6, name: "Lan", age: 23, grade: "A" },
    { id: 7, name: "Minh", age: 24, grade: "B" },
    { id: 8, name: "Nam", age: 22, grade: "A" },
    { id: 9, name: "Oanh", age: 20, grade: "B" },
    { id: 10, name: "Phuong", age: 21, grade: "A" },
    { id: 11, name: "Quang", age: 25, grade: "B" },
    { id: 12, name: "Son", age: 22, grade: "A" },
    { id: 13, name: "Tuan", age: 23, grade: "B" }
];

students.forEach(student => printStudent(student));

// // thực hiện tương tự như trên nhưng sử dụng hàm map mà không dùng hàm printStudent
// students.map(({id, name, age, grade}) => {
//     console.log(`ID: ${id}, Name: ${name}, Age: ${age}, Grade: ${grade}`);
// });

// // sử dụng destructuring để lấy các thuộc tính của student
// // (đã sử dụng trong map ở trên)

// // dùng rest operator để lấy phần còn lại của mảng students
// const [firstStudent, ...otherStudents] = students;
// console.log("First student:", firstStudent);
// console.log("Number of other students:", otherStudents.length); 

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
// thêm 1 student mới vào restStudents
const newStudent = {id: 11, name: "Quỳnh", age: 22, grade: "Cao đẳng"};
const updatedStudents = [...restStudents, newStudent];
console.log("Updated Students:");
updatedStudents.map (s=> console.log(`ID: ${s.id}`, `Tên: ${s.name}, Tuổi: ${s.age}, Lớp: ${s.grade}`));
