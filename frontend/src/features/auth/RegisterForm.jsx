import React, { useState } from "react";
import "./styles/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const RegisterForm = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="Enter your Email"
              />
              <input
                onChange={(e) => setusername(e.target.value)}
                type="text"
                placeholder="Enter your Username"
              />
              <input
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              />
              <button type="submit">Register</button>
              <h5>
                Already a user <Link to="/login">Login here</Link>
              </h5>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
