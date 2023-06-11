import { Routes, Route } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/landingPage';
import APNavbar from './components/APNavbar';

function App() {
  return (
    <div className="App">

    <APNavbar/>
    
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
