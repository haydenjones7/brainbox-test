import React from "react";


import '../styles/modal.css';

import GameTest from '../pages/gametest.jsx';
import OpeningPage from '../pages/gametest.jsx';

function Modal({closedModal}) {
    //const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={()=>closedModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Leaving so Soon?</h1>
        </div>
        <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>
        <div className="footer">
          <button onClick={()=>closedModal(false)}>
            No
          </button>
          <button onClick={()=>{closedModal(false);GameTest.endDemo()}}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;