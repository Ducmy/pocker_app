import React from "react";
import "./seat-player.css";

export const SeatPlayer = ({ seatid, emptySeat, seatPlayer }) => {
  const emptySeatID = emptySeat.filter(seat => {
    return seat.params[0] === seatid;
  });

  const seatPlayerID = seatPlayer.filter(seat => {
    return seat.params[0] === seatid;
  });

  let playerName = "";
  let avartarSource = "";
  let chips = "";

  // Check the seat empty or not
  if (Object.keys(emptySeatID).length === 1) {
    if (emptySeatID[0].params[0] === seatid) {
      return <div className="seat-player empty-seat"></div>;
    }
  }

  // If the seat are not empty, here you are player
  if (Object.keys(seatPlayerID).length === 1) {
    if (seatPlayerID[0].params[0] === seatid) {
      console.log(seatPlayerID[0].params);

      // Assign name of player
      playerName = seatPlayerID[0].params[1];

      // Assign Chips
      chips = seatPlayerID[0].params[2];

      // Assign Avartar of player
      if (seatPlayerID[0].params[3] === "") {
        avartarSource =
          "https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png.png";
      } else {
        avartarSource =
          "https://www.dev-b.bflush.com/" + seatPlayerID[0].params[3];
      }
    }
  }

  return (
    <div className="seat-player">
      <div className="seat-player-img">
        <img
          alt="seat_player_img"
          className="seat-player-img-img"
          src={avartarSource}
        />
      </div>
      <div className="seat-player-content">
        <div className="seat-player-content-title">{playerName}</div>
        <div className="seat-player-content-line" />
        <div className="seat-player-content-money">{chips}</div>
      </div>
    </div>
  );
};
