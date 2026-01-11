// khai báo 1 đối tượng student gồm id, name, avatar, age, grade
//in thông tin của h1, p và img
function About(){
    const student = {
        id: 1,
        name: "Long",
        avatar: "logo192.png",
        age: 21,
        grade: "Đại học"
    };
    console.log(student);
    return (
        <>
            <h1>Đây là trang About của tôi</h1>
            <h3>Avatar: <img src="logo192.png" alt="My avatar" /></h3>
            <p>Thông tin liên hệ:</p>
            <p>ID: {student.id}</p>
            <p>Tên: {student.name}</p>
            <p>Tuổi: {student.age}</p>
            <p>Lớp: {student.grade}</p>
        </>
    );
}
export default About;