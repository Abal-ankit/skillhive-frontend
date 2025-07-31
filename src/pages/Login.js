import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {email, password};
        try {
            const response = await fetch(
              "http://localhost:5000/api/auth/login",
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );
            const user = await response.json();

            if(response.status !== 200) {
                console.log(user);
                return;
            }
            
            localStorage.setItem("token", user.token);
            navigate('/profile');

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label>Password:</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login;
