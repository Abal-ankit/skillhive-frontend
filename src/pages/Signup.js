import React, { useState } from 'react'

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {name, email, password};
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
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input type='text' onChange={(e) => setName(e.target.value)} value={name}/>
            <label>Email: </label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label>Password: </label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Signup
