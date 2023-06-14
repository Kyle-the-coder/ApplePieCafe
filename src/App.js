import { Routes, Route } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/landingPage';
import APNavbar from './components/APNavbar';
import MenuPage from './pages/menuPage';
import AdminPage from './pages/adminPage';

function App() {
  return (
    <div className="App">

    <APNavbar/>
    
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/menu" element={<MenuPage/>}/>
      <Route path="/admin" element={<AdminPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
