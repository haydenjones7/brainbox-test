import * as React from "react";
import { useEffect, useState } from "react";
import "../../styles/chat.css";
import "../../styles/game.css";

export default function Response({ socket, username, gameID }) {
  const [currentPrompt, setCurrentPrompt] = useState("");
  
  
  useEffect(() => {
    socket.on("receive_prompt", (data) => {
      console.log("RECEIVE PROMPT");
      setCurrentPrompt(data.prompt);
    });
  }, [socket]);
  
  return (
    <div className = "response">
      <h1>You have joined a game</h1>
      <h2>
        <div>Username: {username}</div>
        <div>Prompt: {currentPrompt}</div>
      </h2>
    </div>
  );
}