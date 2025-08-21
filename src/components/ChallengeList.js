import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Editor } from "@monaco-editor/react";

function ChallengeList() {
  const [challenges, setChallenges] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setChallenges({});
    const setupWebSocket = async () => {
      const socket = io("http://localhost:5000");

      socket.on("connect", () => {
        console.log("Connected to server:", socket.id);
      });

      socket.on("match_found", ({ partnerId, challenges }) => {
        setChallenges(challenges);
        console.log("Matched with opponent:", partnerId);
      });

      setSocket(socket);
    };

    setupWebSocket();
    // fetchChallenges();

    return () => {
      socket?.disconnect(); // clean up socket
    };
  }, []);

  const handleMatch = () => {
    if (socket) {
      socket.emit("find_match");
    }
  };

  return (
    <div>
      <button onClick={handleMatch}>Find match</button>
      {challenges.length && JSON.stringify(challenges)}
      <div>
        <Editor
          height="50vh"
          defaultLanguage="javascript"
          defaultValue="// Your Code goes here"
        />
        <button>Run</button>
      </div>
    </div>
  );
}

export default ChallengeList;
