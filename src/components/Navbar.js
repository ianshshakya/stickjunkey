import React,{useState} from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import Logo from './Logo';
import { ColorContext } from '../Contexts/ColorContext';
import { AuthContext } from '../Contexts/authContext';


const NavBar = () => {
    const { color } = useContext(ColorContext);
    const { isAuthenticated  }= useContext(AuthContext);
    const [showInput] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    
  // Function to handle icon click
  const handleIconClick = (icon) => {
    setActiveIcon(icon); // Set the clicked icon as active
  };

//   const styles={
//     fontfamily:{
//         fontFamily:'"Dancing Script", cursive',
//     fontOpticalSizing: 'auto',
//     fontWeight: '<weight>', // Replace <weight> with a valid value like 'bold' or 400
//     fontStyle: 'normal',
//     fontSize:"140%",
//     fontVariationSettings: '"wdth" 100'}
//     }

   

    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light position-absolute top-0 left-0 z-3 w-100">
                <button className="navbar-toggler border-0 ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa-solid fa-bars" style={{color}}></i>
                </button>
                <Link onClick={() => handleIconClick(null)} className="navbar-brand mx-5" to="/"><Logo width={150} /></Link>
                <span className="d-lg-none me-4"><i className="fa-solid fa-magnifying-glass fa-lg" style={{color}}></i></span>
                
                {/* <div className={`dropdown  ${showInput ? "" : "d-none d-lg-flex"}`}>
                    <button className="btn dropdown-toggle text-white" style={{ ...styles.fontfamily, outline: "none", boxShadow: "none" }} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categories
                    </button>  

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <Link className="dropdown-item" to="/">Cricket Bat</Link>
                        <Link className="dropdown-item" to="/">Laptops</Link>
                        <Link className="dropdown-item" to="/">Banners</Link>
                    </div>
                </div> */}
                <div className={`input-group ${showInput ? "d-flex" : "d-none d-lg-flex"} w-75 ms-5`}>
                    <input type="text" id="search-bar" name="search-bar" className="form-control bg-transparent" aria-label="Dollar amount (with dot and two decimal places)"/>
                    <span className="input-group-text bg-transparent"><i className="fa-solid fa-magnifying-glass fa-lg" style={{color}}></i></span>
                </div>
                <div className="collapse navbar-collapse flex-row-reverse mx-5" id="navbarNavDropdown">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className="nav-link mx-1" to={isAuthenticated ? "/wishlist": "/login"} onClick={() => handleIconClick("heart")}><i className={`${activeIcon === "heart" ? "fa-solid" : "fa-regular"} fa-heart fa-lg`} style={{color}}></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-1" to={isAuthenticated ? "/user": "/login"} onClick={() => handleIconClick("user")}><i className={`${activeIcon === "user" ? "fa-solid" : "fa-regular"} fa-user fa-lg`} style={{color}}></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-1" to={isAuthenticated ? "/cart": "/login"} onClick={() => handleIconClick("cart")}><i className={`${activeIcon ==="cart" ? "bi-cart-fill" : "bi-cart"} bi h5`} style={{color}}></i></Link>
                        </li>


                    </ul>
                </div>
                <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="sidebar">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Sidebar Menu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="list-group">
                            <li className="list-group-item"><a href="#">Home</a></li>
                            <li className="list-group-item"><a href="#">About</a></li>
                            <li className="list-group-item"><a href="#">Services</a></li>
                            <li className="list-group-item"><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default NavBar; 