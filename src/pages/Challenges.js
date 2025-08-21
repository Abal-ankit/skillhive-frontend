import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../styles/Challenges.css";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor"; // ✅ import editor
import api from "../api";

let playerId;

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  auth: { token: localStorage.getItem("token") },
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  playerId = socket.id;
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});

export default function Challenges() {
  const [challenge, setChallenge] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [partnerId, setPartnerId] = useState(null);
  const [message, setMessage] = useState("Click 'Find Match' to start.");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({yourScore : 0, opponentScore : 0});
  const [partnerName, setPartnerName] = useState(null);

  useEffect(() => {
    socket.on(
      "match_found",
      ({ partnerId, challenges, currentIndex, partnerName }) => {
        setPartnerId(partnerId);
        setChallenge(challenges);
        setCurrentIndex(currentIndex);
        setPartnerName(partnerName);
        setMessage("Match found! Challenge started 🎯");
      }
    );

    socket.on("next_challenge", ({ nextChallenge, currentIndex }) => {
      setChallenge(nextChallenge);
      setCurrentIndex(currentIndex);
      setMessage(`Next challenge (#${currentIndex + 1})`);
    });

    socket.on("challenge_over", ({ message }) => {
      setChallenge(null);
      setMessage(message);
    });

    return () => {
      socket.off("match_found");
      socket.off("next_challenge");
      socket.off("challenge_over");
    };
  }, []);

  useEffect(() => {
    if (challenge?.starterCode) {
      setCode(challenge.starterCode);
    }
  }, [challenge]);

  const handleFindMatch = () => {
    socket.emit("find_match");
    setMessage("Looking for a match…");
  };

  const handleSubmit = async () => {
    if (!partnerId) return;
    // console.log("Submitted code:", code); // ✅ send code

    const res = await api.post(
      "/challenges/run",
      {
        code,
        testCases: challenge.testCases,
        playerId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const body = res.data;

    if (body.status === "error" || body.status === "failed") {
      // console.log("Wrong answer");
      setResult(body);
      return;
    } else {
      setResult(body);
    }

    socket.emit("successful_submit", {
      questionIndex: currentIndex,
      opponentId: partnerId,
      code: code, // ✅ include code
    });
    // console.log(body);
  };

  socket.on("update_score", ({yourScore, opponentScore}) => {
    console.log(yourScore, opponentScore);
    setScore({yourScore, opponentScore});
  });

  return (
    <>
      <Navbar />
      <div className="ch-container">
        <div className="ch-header">
          <h2 className="ch-title">Challenges</h2>
          {!partnerId && (
            <button className="ch-btn ch-btn-primary" onClick={handleFindMatch}>
              Find Match
            </button>
          )}
        </div>

        <p className="ch-status">{message}</p>

        {partnerId && (
          <div className="ch-opponent">
            <div>
            <span className="ch-opponent-label">Opponent:</span>
            <span className="ch-opponent-id">{partnerName}</span>
            </div>
            <div>
            <span className="ch-opponent-label">Score:</span>
            <span className="ch-opponent-id">{score.yourScore} : {score.opponentScore}</span>
            </div>
          </div>
        )}

        {challenge ? (
          <div className="ch-card">
            <div className="ch-card-header">
              <span className="ch-badge">Q{currentIndex + 1}</span>
              <h3 className="ch-question">
                {challenge.title || challenge.question}
              </h3>
              {/* <p>{JSON.stringify(challenge.starterCode)}</p> */}
            </div>

            {challenge.description && (
              <p className="ch-description">{challenge.description}</p>
            )}

            {Array.isArray(challenge.options) && (
              <ul className="ch-options">
                {challenge.options.map((opt, idx) => (
                  <li key={idx} className="ch-option">
                    {opt}
                  </li>
                ))}
              </ul>
            )}

            {/* ✅ Code Editor Integration */}
            <CodeEditor
              onCodeChange={setCode}
              description={challenge.starterCode}
            />

            <div className="ch-actions">
              <button className="ch-btn ch-btn-primary" onClick={handleSubmit}>
                Submit Answer
              </button>
            </div>
          </div>
        ) : (
          <div className="ch-empty">Waiting for challenge…</div>
        )}
        <div>
          {result  && (
            <p>{JSON.stringify(result)}</p>
          )}
          {/* {score && (
            <p>{JSON.stringify(score)}</p>
          )} */}
        </div>
      </div>
    </>
  );
}
