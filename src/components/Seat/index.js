import React from "react";
import "./seat.css";
import { connect } from "react-redux";
import { SeatPlayer } from "../SeatPlayer";
import EmptySeat from "../EmptySeat";
// import { fillterMessage, fillterParas } from "../../utils/filter-message";

const Seat = ({ seatid, receiveMsg }) => {
  let playerName = "";
  let avartarSource = "";
  let chips = "";
  let render_seat;

  // ************** Test *************
  // const messagef = fillterMessage(receiveMsg, "playerSitout");
  // const messagebf = fillterMessage(receiveMsg, "emptySeat");

  // console.log(messagef);
  // console.log(messagebf);
  // ********************************************************

  // get all empty seat
  const emptySeatID = receiveMsg
    .filter(receive => {
      return receive.message === "emptySeat";
    })
    .filter(seat => {
      return seat.params[0] === seatid;
    });

  // Get seat all seatplayer id
  const seatPlayerID = receiveMsg
    .filter(receive => {
      return receive.message === "seatPlayer";
    })
    .filter(seat => {
      return seat.params[0] === seatid;
    });

  // Get sitting out seatplayerid

  const sitOutPlayerID = receiveMsg
    .filter(receive => {
      return receive.message === "playerSitout";
    })
    .filter(seat => {
      return seat.params[0] === seatid;
    });

  // Check the seat empty or not
  if (Object.keys(emptySeatID).length >= 1) {
    if (emptySeatID[0].params[0] === seatid) {
      render_seat = "empty";
    }
  }

  // If the seat are not empty, here you are player
  if (
    Object.keys(seatPlayerID).length >= 1 &&
    seatPlayerID[0].params[0] === seatid
  ) {
    // Render name of player
    playerName = seatPlayerID[0].params[1];

    // Render Chips
    chips = seatPlayerID[0].params[2];

    // Render Avartar of player
    if (seatPlayerID[0].params[3] === "") {
      avartarSource =
        "https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png.png";
    } else {
      avartarSource =
        "https://www.dev-b.bflush.com/" + seatPlayerID[0].params[3];
    }

    render_seat = "player";
  }

  if (
    Object.keys(sitOutPlayerID).length >= 1 &&
    sitOutPlayerID[0].params[0] === seatid
  ) {
    chips = "SITTING OUT";
  }

  if (render_seat === "empty") {
    return <EmptySeat seatid={seatid} />;
  } else if (render_seat === "player") {
    return (
      <SeatPlayer
        playerName={playerName}
        avartarSource={avartarSource}
        chips={chips}
      />
    );
  } else {
    return <div></div>;
  }
};

function mapStateToProps(state) {
  return { receiveMsg: state.receiveMsg };
}

export default connect(mapStateToProps)(Seat);
