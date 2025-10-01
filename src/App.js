import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/Navbar';
import Home from "./components/pages/Home";

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
import RouteLogger from "./components/routeLogger";
import NotFound from "./components/pages/NotFound";
import Store from "./components/pages/Store";

function App() {
 
  return (
    <>
     <AuthProvider>
    <Router>
      <RouteLogger/>
    <NavBar />
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/category/:categoryId" element={<Store />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/wishlist" element={<WishList/>}/>
      
      <Route path="/cart" element={<Cart/>} />
      <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
   
      <Route path="/forgotpass" element={<ForgotPass/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer/>
  </Router>
  </AuthProvider>

  </>
   
  );
}

export default App;
