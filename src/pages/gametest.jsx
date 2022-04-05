import * as React from "react";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import io from "socket.io-client";
import "../styles/game.css";
import "../styles/dnd.css";
import Modal from "../components/endmodal.jsx";
import DragDrop from "../components/DragDrop.jsx";

//let socket = io.connect("https://brainbox-server-new-remix.glitch.me/");

// need some kind of way to differentiate if the user is the host
// or just a player (use state?)

export default function GameTest() {
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
        <div>
          <h1>ur the host 😎</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>ur not the host 🎮</h1>
        </div>
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
          <GameStart />
        </div>
      );
    }
     /* else if (beginDnd){
        return(
          <DragDrop/>
        );
      }*/
     else {
      return <GameHost />;
    }
  }

  function GameStart() {
    const questions = [
      {
        questionText: "What is the capital of France?",
        answerOptions: [
          { answerText: "New York", isCorrect: false },
          { answerText: "London", isCorrect: false },
          { answerText: "Paris", isCorrect: true },
          { answerText: "Dublin", isCorrect: false },
        ],
      },
      {
        questionText: "Who is CEO of Tesla?",
        answerOptions: [
          { answerText: "Jeff Bezos", isCorrect: false },
          { answerText: "Elon Musk", isCorrect: true },
          { answerText: "Bill Gates", isCorrect: false },
          { answerText: "Tony Stark", isCorrect: false },
        ],
      },
      {
        questionText: "The iPhone was created by which company?",
        answerOptions: [
          { answerText: "Apple", isCorrect: true },
          { answerText: "Intel", isCorrect: false },
          { answerText: "Amazon", isCorrect: false },
          { answerText: "Microsoft", isCorrect: false },
        ],
      },
      {
        questionText: "How many Harry Potter books are there?",
        answerOptions: [
          { answerText: "1", isCorrect: false },
          { answerText: "4", isCorrect: false },
          { answerText: "6", isCorrect: false },
          { answerText: "7", isCorrect: true },
        ],
      },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [close, setCloseDemo] = useState(false);

    const handleAnswerOptionClick = (isCorrect) => {
      if (isCorrect) {
        setScore(score + 1);
      }

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
                X
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
                {questions[currentQuestion].answerOptions.map(
                  (answerOption) => (
                    <button
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                    >
                      {answerOption.answerText}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </main>
      </div>
    );
  }
  
  function DragDrop(){
      return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <DragDrop />
      </div>
    </DndProvider>
  );
  }

  // maybe it starts with button that says "host a game" or "join a game"

  // if ur a gamehost, make a prompt to send out to everyone?
  // receive and display responses
  // probably need some kind of component for prompt, component for response in diff files

  // this file needs to manage:
  // are you the game host?
  // if yes: enter prompt, then wait for responses
  // maybe you can keep entering prompts and it just gets rid of the old ones for now?

  // not the host:
  // see a wait message til host sends prompt
  // edit your response, send it in
  // for now, maybe all responses immediately visible

  return (
    <div className="page">
      {/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
      <OpeningPage />
    </div>
  );
}
