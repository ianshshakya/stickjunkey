import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
    const bgcolor = {
        bgcolor1: {
            backgroundColor: "#f55bad",
            "border": "none"
        },
        color1: {
            color: "#fb55bad"
        }
    }
    return (
        <>
            <footer className="" style={{ backgroundColor: "black" }}>
                <div className="container row px-5 py-5">
                    <div className="col-6 col-md-2 mb-3">
                        <h6 className="text-white">Information</h6>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="" className=" p-0 text-secondary">About Us</Link></li>
                            <li className="nav-item mb-2"><Link to="" className="p-0 text-secondary">Return Policy</Link></li>
                            <li className="nav-item mb-2"><Link to="" className=" p-0 text-secondary">FAQ</Link></li>
                            <li className="nav-item mb-2"><Link to="" className=" p-0 text-secondary">Terms & Conditions</Link></li>
                            <li className="nav-item mb-2"><Link to="" className=" p-0 text-secondary">Orders</Link></li>
                            <li className="nav-item mb-2"><Link to="" className=" p-0 text-secondary">Delivery Information</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h6 className="text-white">Customer Service</h6>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="" className=" p-0 text-secondary">Contact Us</Link></li>
                            <li className="nav-item mb-2"><Link to="" className="p-0 text-secondary">Request a Return</Link></li>

                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h6 className="text-white">My Account</h6>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="" className=" p-0 text-secondary">My Account</Link></li>
                            <li className="nav-item mb-2"><Link to="" className="p-0 text-secondary">Order History</Link></li>

                        </ul>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                        <h6 className="text-white">Extras</h6>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="" className=" p-0 text-secondary">Affiliates</Link></li>
                            <li className="nav-item mb-2"><Link to="" className="p-0 text-secondary">Fan Wall</Link></li>
                            <li className="nav-item mb-2"><Link to="" className="p-0 text-secondary">Site Map</Link></li>

                        </ul>
                    </div>


                    <div className="col-md-3 offset-md-1 mb-3">

                        <Logo width={150} dark={true} />
                        <ul className="list-unstyled d-flex mt-3">
                            <li className="ms-3"><a className="link-body-emphasis" href="https://www.instagram.com/stickjunkey/" target="_blank"><i className="fa-brands fa-instagram" style={{ color: "white" }}></i></a></li>
                            <li className="ms-3"><a className="link-body-emphasis" href="https://x.com/stickjunkey" target="_blank"><i className="fa-brands fa-x-twitter" style={{ color: "white" }}></i></a></li>
                            <li className="ms-3"><a className="link-body-emphasis" href="https://www.facebook.com/profile.php?id=61574590543897" target="_blank"><i className="fa-brands fa-facebook" style={{ color: "white" }}></i></a></li>
                        </ul>

                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-3 text-secondary text-center border-top w-100">
                    <p className="text-center w-100">&copy; 2025 StickJunkey, All rights reserved.</p>

                </div>
            </footer>
        </>
    );

}
export default Footer;