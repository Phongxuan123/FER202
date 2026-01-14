import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Student from './components/Student';
import studentData from './data/studentData';


function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="mb-4">Student List</h1>
        <div className="row">
          {studentData.map((student) => (
            <div key={student.id} className="col-md-6 col-lg-4 mb-4">
              <Student student={student} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
