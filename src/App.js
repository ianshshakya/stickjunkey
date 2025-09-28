import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/Navbar';
import Home from "./components/pages/Home";
import Categories from "./components/Categories";
import './App.css';
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import WishList from "./components/pages/Wishlist";
import Cart from "./components/pages/Cart";
import ForgotPass from "./components/pages/Forgotpass";
import User from "./components/pages/User";
import { AuthProvider } from './Contexts/authContext';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  let login= false;
  return (
    <>
     <AuthProvider>
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/categories" element={<Categories/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/wishlist" element={<WishList/>}/>
      
      <Route path="/cart" element={login ? <Cart /> : <Login />} />
      <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
   
      <Route path="/forgotpass" element={<ForgotPass/>}/>
    </Routes>
    <Footer/>
  </Router>
  </AuthProvider>

  </>
   
  );
}

export default App;
