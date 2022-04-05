import * as React from "react";
import { useState } from "react";

import io from "socket.io-client";
import "../../styles/game.css";

import Prompt from "./prompt";

import "../../styles/chat.css"

import { signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase-config';

let socket = io.connect('https://megan-server.glitch.me/');

export default function Host() {
  const [gameID, setGameID] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [hostLoggedIn, setHostLoggedIn] = useState(false);
  
    //host log in with email and password through firebase
  const loginHost = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      if(user && (gameID !== "")) {
        const userData = {
          room: gameID,
          username: loginEmail,
        };
        socket.emit("join_room", userData);
        setHostLoggedIn(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
        <div className="page">
          {!hostLoggedIn ? (
          <div className="joinChatContainer">
              <h3>Start a Game</h3>
              <input
                type="text"
                placeholder="Email..."
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Password..."
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Game ID..."
                onChange={(event) => {
                  setGameID(event.target.value);
                }}
              />
              <button onClick={loginHost}>Start</button>
          </div>
          ) : (
            <Prompt socket={socket} username={loginEmail} gameID={gameID} />
          ) }
        </div>
      );
}