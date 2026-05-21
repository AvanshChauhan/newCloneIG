import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./styles/form.scss"
import { useAuth } from './auth.context';
const LoginForm = () => {
  const { loading, handleLogin } = useAuth()
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
     try {
      await handleLogin(usernameOrEmail, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <main>
      <div className="form-container">
        <div className="background">
          <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input 
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              type="text" placeholder='Enter your username or email' />
              <input
              onChange={(e) => setpassword(e.target.value)}
              type="password" placeholder='Enter your password' />
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <h5>New user <Link to="/register">Register here</Link></h5>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginForm
