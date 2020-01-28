import React from "react";
import "./player-control-area.css";
import { connect } from "react-redux";
import { FilterSeatPlayerByUser } from "../../utils/filter";

const PlayerControlArea = ({ receiveMsg, curSeat, dispatch }) => {
  let fold_btn = "";
  let call_btn = "";
  let call_any_btn = "";
  let bet_btn = "";
  let show_player_control = false;
  let seat_user_id = FilterSeatPlayerByUser(receiveMsg);
  if (typeof seat_user_id !== "undefined" || seat_user_id != null) {
    dispatch({
      type: "SET_CUR_SEAT_ID",
      payload: seat_user_id.params[0]
    });
  }

  const sitOutPlayerID = receiveMsg
    .filter(receive => {
      return receive.message === "playerSitout";
    })
    .filter(seat => {
      return seat.params[0] === curSeat;
    });

  if (Object.keys(sitOutPlayerID).length < 1) {
    show_player_control = true;
  }

  if (show_player_control) {
    fold_btn = <button className="control-button">Fold</button>;
    call_btn = <button className="control-button">Call</button>;
    call_any_btn = <button className="control-button">Call any</button>;
    bet_btn = <button className="control-button">Bet</button>;
  }

  if (curSeat === 0) {
    return <div id="control-area"></div>;
  }

  return (
    <div id="control-area">
      {fold_btn}
      {call_btn}
      {call_any_btn}
      {bet_btn}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    receiveMsg: state.receiveMsg,
    curSeat: state.curSeatID
  };
}

export default connect(mapStateToProps)(PlayerControlArea);
