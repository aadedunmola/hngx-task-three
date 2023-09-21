import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from '../components/firebase';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/loginForm.css";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(app); // Initialize the auth instance

  const navigate = useNavigate() 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Gallery") // Use signInWithEmailAndPassword from getAuth
      // User is logged in successfully
    } catch (error) {
      // Handle authentication error (e.g., display an error message)
      console.error('Login error:', error);
      toast.error("Invalid email or password!!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;