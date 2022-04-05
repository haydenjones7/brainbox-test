import * as React from "react";
import { useState } from "react";

import io from "socket.io-client";
import "../../styles/game.css";

import Response from "./response.jsx";

import "../../styles/chat.css"

let socket = io.connect('https://megan-server.glitch.me/');

export default function Player() {
  const [gameID, setGameID] = useState("");
  const [playerUsername, setPlayerUsername] = useState("");
  const [playerJoined, setPlayerJoined] = useState(false);
  
  //set up player username to join game
  const loginPlayer = () => {
      console.log(playerUsername);
    console.log(gameID);
      if(playerUsername !== "" && (gameID !== "")) {
        const userData = {
          room: gameID,
          username: playerUsername,
        };
        
        socket.emit("join_room", userData);
        setPlayerJoined(true);
      }
  };
  
  return (
        <div className="page">
          {!playerJoined ? (
            <div className="joinChatContainer">
              <h3>Join Game</h3>
              <input
                type="text"
                placeholder="Username..."
                value={playerUsername}
                onChange={(event) => {
                  setPlayerUsername(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Game ID..."
                value={gameID}
                onChange={(event) => {
                  setGameID(event.target.value);
                }}
              />
              <button onClick={loginPlayer}>Join a Game</button>
            </div>
          ) : (
            <Response socket={socket} username={playerUsername} gameID={gameID} />
          )}
        </div>
      );
}