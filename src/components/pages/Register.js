import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const color = { color: "#f55bad" };
    const buttonStyle = { color: "#f55bad", borderColor: "#f55bad" };
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        
            //setLoading(true);

            const response = await axios.post(
                'http://localhost:5000/auth/register',
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                },
                {
                    withCredentials: true // enable cookies if needed later
                }
            ); 
            console.log(response);
            try {
            localStorage.setItem("authToken", response.data.authToken);
            alert("Registration successful!");
            navigate('/user');

            setFormData({ name: '', email: '', password: '', confirmPassword: '' });

        } catch (error) {
            const msg = error?.response?.data?.message || "Something went wrong during registration.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mt-5 pt-5 d-flex flex-column align-items-center'>
            <div className="h2 fw-bold">REGISTER YOUR ACCOUNT</div>
            <div className="h6 fw-lighter">
                ALREADY HAVE AN ACCOUNT? <Link to="/login" style={color}>CLICK HERE TO LOGIN</Link>
            </div>
            <br />
            <div className='h6 fw-lighter mb-4'>Sign up using your email</div>
            <form className='w-50 text-center' onSubmit={handleSubmit} method="post">

                <input
                    className="form-control border-0 border-bottom border-dark mb-4"
                    type='text'
                    name='name'
                    placeholder='Your Name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control border-0 border-bottom border-dark mb-4"
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    className='form-control border-0 border-bottom border-dark mb-4'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <input
                    className='form-control border-0 border-bottom border-dark mb-4'
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <div style={{ fontSize: "12px" }}>
                    By creating an account, I state that I have read and understood the
                    <Link style={{ fontSize: "12px" }} to="/termsandconditions" className='h6 fw-lighter d-block'>Terms & Conditions</Link>
                </div>

                <button
                    className='btn btn-outline-dark bt-style'
                    style={buttonStyle}
                    type='submit'
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default Register;
