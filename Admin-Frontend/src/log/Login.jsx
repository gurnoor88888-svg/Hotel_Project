import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ADMIN_EMAIL = 'admin@hotelhub.com';
const ADMIN_PASSWORD = 'Admin@123';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const attemptLogin = (loginEmail, loginPassword) => {
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      toast.success('Login successful.');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/bookroom'), 1200);
    } else {
      toast.error('Incorrect Email or Password');
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    attemptLogin(email, password);
  };

  const handleDemoLogin = () => {
    attemptLogin(ADMIN_EMAIL, ADMIN_PASSWORD);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <center className="container">
        <form className="form" onSubmit={formSubmit}>
          <div className="brand-badge">🏨</div>
          <div className="sign-up"><h1>Admin Log-In</h1></div>
          <input type="email" name="email" placeholder="Enter Admin Email" value={email} className="box" onChange={(e) => setEmail(e.target.value)} required autoComplete="off" />
          <input type="password" name="password" placeholder="Enter Password" value={password} className="box" onChange={(e) => setPassword(e.target.value)} required autoComplete="off" />
          <input type="submit" className="btn-1" value="Log-In" />
          <button type="button" className="btn-demo" onClick={handleDemoLogin}>
            ⚡ Demo Login
          </button>
        </form>
      </center>
    </>
  );
}

export default Login;
