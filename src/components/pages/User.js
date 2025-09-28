import { useNavigate } from "react-router-dom";


const User=()=>{
    const naviate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        naviate("/login");
    };
    return(
        <div className="mt-5 pt-5">
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            Hello I have signed In haha
        </div>
    );
}
export default User;