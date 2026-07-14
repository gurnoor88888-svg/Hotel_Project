import './login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/Owners/login`, { email, password });
      if (response.data === 'Success') {
        toast.success(`User with email "${email}" has been Login successfully.`);
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/add-hotel"), 2000);
      } else {
        toast.error('Incorrect Email or Password');
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error('Server error. Please try again later.');
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <center className="container">
        <form className="form" onSubmit={formSubmit}>
        <div className="sign-up"><h1>Log-In</h1></div>
          <input type="email" name="email" placeholder="Enter UserName or Email" value={email} className="box" onChange={(e) => setEmail(e.target.value)} required autoComplete="off" />
          <input type="password" name="password" placeholder="Enter Your Password" value={password} className="box" onChange={(e) => setPassword(e.target.value)} required autoComplete="off" />
          <input type="submit" className="btn-1" value={isSubmitting ? 'Logging in...' : 'Log-In'} disabled={isSubmitting} />
          <h3 className="spn">Doesn&apos;t have an account?</h3>
          <Link to="/signup" className="btn-1 l-btn">Sign-Up</Link>
        </form>
      </center>
    </>
  );
}

export default Login;
