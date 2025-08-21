import React, { useState, useContext } from "react";
import "../styles/Pages.css";
import api from "../api";
import { GlobalContext } from "../GlobalContextProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUserName } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("Login Success:", res.data.user.name);
      setUserName(res.data.user.name);

      // You can save token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);

      // Redirect to dashboard or home
      navigate('/');
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
