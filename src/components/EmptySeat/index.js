import React from "react";
import "./empty-seat.css";
import { sendMsg } from "../../utils/socket-io-lib";
import { connect } from "react-redux";

const EmptySeat = ({ seatid, dispatch }) => {
  const SendMessageToServer = () => {
    sendMsg("reserveSeat", [seatid]);
    dispatch({
      type: "UPDATE_MSG",
      payload: "reserveSeat"
    });
  };

  return (
    <div className="seat-player">
      <button onClick={SendMessageToServer} className="empty-seat-btn">
        Empty Seat
      </button>
    </div>
  );
};

export default connect()(EmptySeat);
