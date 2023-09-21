import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../components/firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/loginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const auth = getAuth(app);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email === "") {
        setEmailError("Email required ");
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Gallery");
    } catch (error) {
      console.error("Login error:", error);

      if (password === "") {
        setPasswordError("Password required");
      } else if (password !== "" && email !== "") {
        toast.error("Invalid email or password!!");
      }
      setLoading(false);
    }
  };

  return (
    <div className="form-box">
      <h2 className="login">Login to view my gallery</h2>
      <form className="login-forms">
        <div className="info">
          <label>Email:</label>
          <input
            className="idea"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError ? <div className="error">{emailError}</div> : ""}
        </div>
        <div className="info">
          <label>Password:</label>
          <input
            className="idea"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError ? <div className="error">{passwordError}</div> : ""}
        </div>

        <div onClick={handleLogin} className="next" type="submit">
          {loading ? <div className="loading"></div> : "Login"}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
