import React from "react";
import "./seat.css";

import { SeatPlayer } from "../SeatPlayer";
import EmptySeat from "../EmptySeat";

export const Seat = ({ seatid, emptySeat, seatPlayer }) => {
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
      return <EmptySeat seatid={seatid} />;
    }
  }

  // If the seat are not empty, here you are player
  if (Object.keys(seatPlayerID).length === 1) {
    if (seatPlayerID[0].params[0] === seatid) {
      // console.log(seatPlayerID[0].params);

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
    <SeatPlayer
      playerName={playerName}
      avartarSource={avartarSource}
      chips={chips}
    />
  );
};
