import React from "react";

export const SeatPlayer = ({ avartarSource, playerName, chips }) => {
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
