import * as React from "react";
import { useEffect, useState } from "react";
import "../../styles/chat.css";
import "../../styles/game.css";

export default function Response({ socket, username, gameID }) {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  
  const sendAnswer = async () => {
    if (currentAnswer !== "") {
      const answerData = {
        room: gameID,
        author: username,
        answer: currentAnswer,
      };  
      // need to write this in server
      await socket.emit("send_answer", answerData);
      setCurrentAnswer("");
      console.log("SENT ANSWER");
      // pull up page that just has the prompt on it, with a button that says done maybe
    }
  };  
  
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
        
        <input
          type="text"
          value={currentAnswer}
          placeholder="Answer..."
          onChange={(event) => {
            setCurrentAnswer(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendAnswer();
          }}
          />
      
      </h2>
    </div>
  );
}