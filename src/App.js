import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/landingPage';
import APNavbar from './components/APNavbar';
import MenuPage from './pages/menuPage';
import AdminPage from './pages/adminPage';
import AdminLandingView from './views/adminLandingView';
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

function App() {


  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/admin" />
  }

  console.log(currentUser)

  return (
    <div className="App">

      <APNavbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Private Routes */}
        <Route path="/adminLp" element={<RequireAuth><AdminLandingView /></RequireAuth>} />


      </Routes>
    </div>
  );
}

export default App;
