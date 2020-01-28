import React from "react";
import { Modal } from "react-bootstrap";
import { sendMsg } from "../../utils/socket-io-lib";
import "./buy-in-modal.css";

const BuyInModal = props => {
  let minChip = 0;
  let maxChip = 0;
  let curChip = 0;

  if (props.buyin[0] === undefined) {
    return null;
  } else {
    minChip = props.buyin[0].params[0];
    maxChip = props.buyin[0].params[1];
    curChip = props.buyin[0].params[2];
  }

  const SendMessageToServer = () => {
    sendMsg("buyin", [2.0]);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="modal-title">Lets play! </div>
        <div className="modal-question">How many chips would you like?</div>
        <div className="modal-introduce-table">
          <div className="modal-introduce-table-row01">
            <div>Minimum buy in:</div>
            <div> Maximum buy in:</div>
            <div className="modal-chips-text">Your total chips: </div>
          </div>
          <div className="modal-introduce-table-row02">
            <div>{minChip}</div>
            <div>{maxChip}</div>
            <div className="modal-chips-text">{curChip}</div>
          </div>
        </div>
        <div className="modal-chips-table">
          <button className="modal-chips-mir">-</button>
          <div className="modal-chips-chips">{minChip}</div>
          <button className="modal-chips-plus">+</button>
        </div>
        <div className="modal-chips-menu-select">
          <button className="modal-chips-menu-select-btn">
            Wait for Big Blind
          </button>
          <button
            onClick={SendMessageToServer}
            className="modal-chips-menu-select-btn"
          >
            Buy
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BuyInModal;
