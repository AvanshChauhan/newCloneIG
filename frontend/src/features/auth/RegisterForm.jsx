import { useState } from "react";
import "./styles/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth.context";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, handleRegister } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await handleRegister(username, email, password);
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
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email"
                required
              />

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your Username"
                required
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your Password"
                required
              />

              {error && <p>{error}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>

              <h5>
                Already a user? <Link to="/login">Login here</Link>
              </h5>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;