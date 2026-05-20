import React ,{ useState }from 'react'
import { Link } from 'react-router-dom'
import "./styles/form.scss"
import axios from "axios";
const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const isEmail = usernameOrEmail.includes("@");

    try {
      // Login kaam kar raha hai: username/email aur password backend ko bhej rahe hain.
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username: isEmail ? "" : usernameOrEmail,
          email: isEmail ? usernameOrEmail : "",
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res.data);
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
              <button type="submit">Login</button>
              <h5>New user <Link to="/register">Register here</Link></h5>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginForm
