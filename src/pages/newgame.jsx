import * as React from "react";
import { useState } from "react";

import io from "socket.io-client";
import "../styles/game.css";
import Modal from "../components/endmodal.jsx";
import Host from "../components/Host/host.jsx";
import Player from "../components/Player/player.jsx";


import "../styles/chat.css"

import { signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase-config';

let socket = io.connect('https://brainbox-server-new-remix.glitch.me/');


export default function NewGame() {
  const [gameHost, setGameHost] = useState(true); //default is ur a host?
  const [showOpenPage, setShowOpenPage] = useState(true);
  const [beginDemo, setBeginDemo] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  //const [beginDnd, setDnd] = useState(true);

  const setToHost = () => {
    setGameHost(true);
    setShowOpenPage(false);
    setBeginDemo(false);
  };
  const setToPlayer = () => {
    setGameHost(false);
    setShowOpenPage(false);
    setBeginDemo(false);
  };
  const demo = () => {
    setShowOpenPage(false);
    setGameHost(false);
    setBeginDemo(true);
    //setModalOpen(true);
  };
  /*const Dnd = () =>{
    setShowOpenPage(false);
    setGameHost(false);
    setBeginDemo(false);
    setDnd(true);  
  }*/

  function endDemo() {
    setShowOpenPage(true);
    setBeginDemo(false);
    //return <OpeningPage />;
  }

  
  function GameHost() {
    if (gameHost) {
      return (
        <Host/>
      );
    } else {
      return (
        <Player/>
      );
    }
  }
  

  function OpeningPage() {
    if (showOpenPage) {
      return (
        <div>
          <h1 className="title">choose an option 💏</h1>
          <button onClick={setToHost}>Host a game</button>
          <p></p>
          <button onClick={setToPlayer}>Join a game</button>
          <p></p>
          <button onClick={demo}>Start Demo</button>
        </div>
      );
    } else if (beginDemo) {
      return (
        <div>
          <GameStart/>
        </div>
      );
    }
     else {
      return <GameHost />;
    }
  }

  function GameStart() {
    const questions = [
      {
        questionText: "What is the capital of France?",
        questionAnswer: "Paris",
      },
      {
        questionText: "Who is CEO of Tesla?",
        questionAnswer: "Elon Musk",
      },
      {
        questionText: "The iPhone was created by which company?",
        questionAnswer: "Apple",
      },
      {
        questionText: "How many Harry Potter books are there?",
        questionAnswer: "7",
      },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [close, setCloseDemo] = useState(false);
    const [answer, setAnswer] = useState("");

//FIXME: clear state so previous answer isnt still in input box
    const handleAnswerOptionClick = (questionAnswer) => {
      if (answer == questionAnswer) {
        setScore(score + 1);
      }
      setAnswer("");

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    };

    return (
      <div className="page" id="gamepage">
        <main id="main">
          {showScore ? (
            <div className="score-section">
              You scored {score} out of {questions.length}
              <button onClick={() => {setOpenModal(true)}}>
                Close
              </button>
              {openModal && <Modal closedModal={setOpenModal} />}
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {questions[currentQuestion].questionText}
                </div>
              </div>
              <div className="answer-section">
                <form>
                <input
                  type="text"
                  placeholder="Type your answer"
                  onChange={event => {setAnswer(event.target.value)}}
                />
                    <button 
                      onClick={() =>
                        handleAnswerOptionClick(questions[currentQuestion].questionAnswer)
                      } type="submit"
                    >
                      Submit
                    </button>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    );
  }
  
  return (
    <div className="page">
      {/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
      <OpeningPage />
    </div>
  );
}
