import React from "react";
import "./empty-seat.css";
import { sendMsg } from "../../utils/socket-io-lib";

export const EmptySeat = ({ seatid }) => {
  const SendMessageToServer = () => {
    sendMsg("reserveSeat", [seatid]);
  };

  return (
    <div className="seat-player">
      <button onClick={SendMessageToServer} className="empty-seat-btn">
        Empty Seat
      </button>
    </div>
  );
};
