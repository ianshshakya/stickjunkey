import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const color = {
        color: "#f55bad"
    };

 

    const buttonStyle = {
        color: "#f55bad",
        borderColor: "#f55bad"
    };
    useEffect(() => {
        document.title = "Login";
      }, []);

      const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
            //setLoading(true);

            const response = await axios.post(
                'http://localhost:5000/auth/login',
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

            setFormData({ email: '', password: '' });

        } catch (error) {
            const msg = error?.response?.data?.message || "Something went wrong during registration.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className='container my-5 pt-5 d-flex flex-column align-items-center'>
                <div className="h2 fw-bold">LOGIN TO YOUR ACCOUNT</div>
                <div className="h6 fw-lighter">
                    DON'T HAVE AN ACCOUNT? <Link to="/register" style={color}>CLICK HERE TO REGISTER</Link>
                </div>
                <br />
                <div className='h6 fw-lighter mb-4'>Sign in using your email</div>
                <form className='w-50 text-center' onSubmit={handleSubmit}>

                    <input 
                        className="form-control border-0 border-bottom border-dark mb-4" 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='Email' value={formData.email} onChange={handleChange} required
                    />

                    <input 
                        className='form-control border-0 border-bottom border-dark mb-4' 
                        type='password' 
                        id='password' 
                        name='password' 
                        placeholder='Password' value={formData.password} onChange={handleChange} required
                    />
                    <Link to="/forgotpass" className='h6 fw-lighter d-block mb-3'>Forgot your password?</Link>
                    
                    <button className='btn btn-outline-dark bt-style' style={buttonStyle} disabled={loading} type='submit'>
                    {loading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
