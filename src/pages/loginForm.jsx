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
      
      console.error('Login error:', error);
      toast.error("Invalid email or password!!");
    }
  };

  return (
    <div className='form-box'>
      <h2 className='login'>Login to view my gallery</h2>
      <form className='login-forms' onSubmit={handleLogin}>
        <div className="info">
          <label>Email:</label>
          <input className='idea'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>
        <div className="info">
          <label>Password:</label>
          <input className='idea'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
          <div className='next' type="submit">Log In</div>
       
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;