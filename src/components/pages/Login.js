import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Contexts/authContext";
import GoogleSignIn from "../GoogleSignIn";

const Login = () => {
  const color = { color: "#f55bad" };
  const buttonStyle = { color: "#f55bad", borderColor: "#f55bad" };

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request
      await axios.post(
        "http://localhost:5000/api/auth/signin",
        { email: formData.email, password: formData.password },
        { withCredentials: true } // 👈 sends/receives cookies
      );

      // No need to save token manually — it’s in the cookie
      setIsAuthenticated(true); // update context

      alert("Login Successful!");
      navigate("/user");
      setFormData({ email: "", password: "" });
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Something went wrong during login.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 pt-5 d-flex flex-column align-items-center">
      <div className="h2 fw-bold">LOGIN TO YOUR ACCOUNT</div>
      <div className="h6 fw-lighter">
        DON'T HAVE AN ACCOUNT?{" "}
        <Link to="/register" style={color}>
          CLICK HERE TO REGISTER
        </Link>
      </div>
      <br />
      <div className="h6 fw-lighter mb-4">Sign in using your email</div>
      <form className="w-50 text-center" onSubmit={handleSubmit}>
        <input
          className="form-control border-0 border-bottom border-dark mb-4"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control border-0 border-bottom border-dark mb-4"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Link to="/forgotpass" className="h6 fw-lighter d-block mb-3">
          Forgot your password?
        </Link>
        <button
          className="btn btn-outline-dark bt-style"
          style={buttonStyle}
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <GoogleSignIn/>
    </div>
  );
};

export default Login;
