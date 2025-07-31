import React, { useEffect, useState } from 'react'

function ChallengeList() {
    const [challenges, setChallenges] = useState({});
    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchChallenges = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/challenges", {
                    headers : {
                        "authorization" : `Bearer ${token}`,
                    }
                });
                
                const challenges = await response.json();
                setChallenges(challenges);
            } catch (error) {
                console.log(error);
            }
        }

        fetchChallenges();
    }, []);
  return (
    <div>{JSON.stringify(challenges)}</div>
  )
}

export default ChallengeList
