import React, { Component } from "react";
import { sendMsg, socket } from "./utils/socket-io-lib";
import { FilterPlayerDealerID } from "./utils/filter";
import "./App.css";
import { connect } from "react-redux";
import Seat from "./components/Seat";
import { TableImage } from "./components/TableImage";
import CardArea from "./containers/CardArea";
import BuyInModal from "./containers/BuyInModal/buyin-modal";
import PlayerControlArea from "./containers/PlayerControlArea/player-control-area";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      mgs: window.q.gtbl_id_enc, // Get the gtbl_id_enc from window output
      receiveMsg: [], // This varibale to store received messages from Socket IO response.
      msgInput: [], // Send message
      paraInput: []
    };
  }

  componentWillMount() {
    sendMsg("setSession", [window.q.gtbl_id_enc]);
  }

  componentDidMount() {
    // Read res from service via Socket IO
    // socket.on("message", receiveMsg);
    socket.on("message", text => {
      var params = text.split("|"); //.map(p => Base64.Decode(p)); // we are not using b64 now
      var message = params.shift(); // message, eg. playerSitOut, clearTable
      //console.log("Recevied " + message + ", with params " + params.join("; "));
      this.setState({
        receiveMsg: [...this.state.receiveMsg, { message, params }]
      });
      this.props.dispatch({
        type: "UPDATE_RECEIVE",
        payload: this.state.receiveMsg
      });
    });
  }

  onMessageSubmitInput = () => {
    sendMsg(this.state.msgInput, [this.state.paraInput]);
  };

  handleMessageChange = e => {
    this.setState({ msgInput: e.target.value }, () =>
      console.log(this.state.msgInput)
    );
  };

  handleParasChange = e => {
    this.setState({ paraInput: e.target.value }, () =>
      console.log(this.state.paraInput)
    );
  };

  render() {
    const { receiveMsg, modalShow, curSeatID } = this.props;
    console.log(receiveMsg);
    console.log(curSeatID);
    const popupBuyin_mes = receiveMsg.filter(receive => {
      return receive.message === "popupBuyin";
    });

    return (
      <div className="App">
        <div className="header-area"></div>
        <div id="main-area">
          <Seat seatid="1" />
          <Seat seatid="2" />
          <Seat seatid="3" />
          <Seat seatid="4" />
          <Seat seatid="5" />
          <Seat seatid="6" />
          <Seat seatid="7" />
          <Seat seatid="8" />
          <Seat seatid="9" />
          <Seat seatid="10" />
          <TableImage />
          <CardArea />
        </div>
        <PlayerControlArea />

        <div className="container">
          <div style={{ marginRight: 20 }}>Mesages</div>
          <input
            style={{ marginRight: 20 }}
            className="search"
            type="search"
            placeholder="Input message"
            onChange={this.handleMessageChange}
          />
          <div style={{ marginRight: 20 }}>Parameter</div>
          <input
            style={{ marginRight: 20 }}
            className="search"
            type="search"
            placeholder="Input params"
            onChange={this.handleParasChange}
          />
          <button onClick={this.onMessageSubmitInput}>Send message</button>
        </div>
        <BuyInModal
          buyin={popupBuyin_mes}
          show={modalShow}
          onHide={() =>
            this.props.dispatch({
              type: "SET_MODAL_SHOW",
              payload: false
            })
          }
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    receiveMsg: state.receiveMsg,
    modalShow: state.modalShow,
    curSeatID: state.curSeatID
  };
}

export default connect(mapStateToProps)(App);
