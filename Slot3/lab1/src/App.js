import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentList from './components/StudentList';


function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="mb-4">Student List</h1>
        <StudentList />
      </div>
    </div>
  );
}

export default App;
