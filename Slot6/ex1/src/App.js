import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import BookingForm from './DemoForm/BookingForm';
import LoginForm from './DemoForm/LoginForm';
import ManageUsers from './DemoForm/ManageUsers';
import Navbar from './DemoForm/Navbar';

function App() {
  const [currentView, setCurrentView] = useState('booking');
  const views = ['booking', 'login', 'manage'];

  useEffect(() => {
    // Auto switch to next page after 15 seconds
    const timer = setTimeout(() => {
      const currentIndex = views.indexOf(currentView);
      const nextIndex = (currentIndex + 1) % views.length;
      setCurrentView(views[nextIndex]);
    }, 15000); // 15 seconds

    // Cleanup timer when component unmounts or currentView changes
    return () => clearTimeout(timer);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'booking':
        return <BookingForm />;
      case 'login':
        return <LoginForm onLoginSuccess={() => setCurrentView('manage')} />;
      case 'manage':
        return <ManageUsers />;
      default:
        return <BookingForm />;
    }
  };

  return (
    <div className="App">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      {renderView()}
    </div>
  );
}

export default App;
