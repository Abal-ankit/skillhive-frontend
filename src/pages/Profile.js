import React, { useEffect, useState } from 'react'

function Profile() {
    const [profile, setProfile] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            const res = await fetch("http://localhost:5000/api/user/profile", {
                headers : {
                    "authorization" : `bearer ${token}`,
                }
            });
            const profile = await res.json();
            setProfile(profile);
        }
        fetchData();
    }, []);
  return (
    <div>{JSON.stringify(profile)}</div>
  )
}

export default Profile
