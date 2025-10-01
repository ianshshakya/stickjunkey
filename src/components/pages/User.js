import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/authContext";
import axios from "axios";

const User = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Call backend logout API (which clears the cookie)
      await axios.post(
        "http://localhost:5000/api/auth/signout",
        {},
        { withCredentials: true } // send cookies
      );

      setIsAuthenticated(false); // update context
      navigate("/login"); // redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="mt-5 pt-5">
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
      <p>Hello, I have signed in haha</p>
    </div>
  );
};

export default User;
