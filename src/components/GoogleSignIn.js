import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleSignIn = () => {
  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("No credential received from Google");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        { token: credentialResponse.credential },
        { withCredentials: true } // send cookies
      );
      console.log("Google login success:", res.data);

      // redirect after login
      window.location.href = "/user";
    } catch (err) {
      console.error("Google login error:", err.response?.data || err);
    }
  };

  return (
    <div className='my-4'>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
};

export default GoogleSignIn;
