import * as React from "react";
import { useEffect, useState } from "react";
import "../../styles/chat.css";
import "../../styles/game.css";

export default function Prompt({ socket, username, gameID }) {
  
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [answerList, setAnswerList] = useState([]);
  
  const sendPrompt = async () => {
    if (currentPrompt !== "") {
      const promptData = {
        room: gameID,
        author: username,
        prompt: currentPrompt,
      };  
      // need to write this in server
      await socket.emit("send_prompt", promptData);
      setCurrentPrompt("");
      console.log("SENT PROMPT");
      // pull up page that just has the prompt on it, with a button that says done maybe
    }
  };  
  
  
  useEffect(() => {
    
    socket.on("receive_answer", (data) => {
      // i think we can update same way as message list, 
      // put player responses in an array as we receive them
      // to be displayed after you hit done
      
      // this is the exact same as receive message so pls work
      console.log("RECEIVED AN ANSWER");
      console.log(data);
      setAnswerList((list) => [...list, data]);
      console.log(answerList);
    });
    
  }, [socket]);
  
  return (
    <div className = "prompt">
      <h1>You have started a game</h1>
      <h2>
        <div>Host: {username}</div>
        <div>GameID: {gameID}</div>
        
        <input
          type="text"
          value={currentPrompt}
          placeholder="Prompt..."
          onChange={(event) => {
            setCurrentPrompt(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendPrompt();
          }}
          />
        
        <button onClick={sendPrompt}>&#9658;</button>
      </h2>
      
      {answerList.map((answerContent) => {
            return (
              <div
                className="message"
              >
                <div>
                  <div className="message-content">
                      <p>{answerContent.answer}</p>
                      <p>{answerContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}