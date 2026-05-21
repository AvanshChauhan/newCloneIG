import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/form.scss";
import { useAuth } from "./auth.context";

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setpassword] = useState("");
  const { loginUser, loading, error } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await loginUser(usernameOrEmail, password);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
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
              {error && <p>{error}</p>}
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
