import './App.css';
import StudentCard from './component/StudentCard';

function App() {
  // Sample student data
  const student = {
    id: 'S001',
    name: 'Nguyen Van A',
    avatar: '/image/Jerry thần tài.jpg',
    grade: 'A',
    age: 20
  };

  return (
    <div className="App">
      <h1>Student Information</h1>
      <StudentCard student={student} />
    </div>
  );
}

export default App;
