import './App.css';
import Card from './component/Card';

function App() {
  const student = {
    id: 1,
    name: 'Trần Phú Long',
    avatar: 'logo192.png',
    grade: '21',
    age: 20
  };

  return (
    <div className="App">
      <h1>Student Card</h1>
      <Card student={student} />
    </div>
  );
}

export default App;
