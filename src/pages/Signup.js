import React, { useState } from "react";
import "../styles/Signup.css"; // Import CSS file

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, password };
    console.log(payload);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="form-title">Create an Account</h2>

        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
