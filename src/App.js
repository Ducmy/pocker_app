import React, { Component } from "react";
import { sendMsg, socket } from "./utils/socket-io-lib";
import "./App.css";
import { connect } from "react-redux";
import { Seat } from "./components/Seat";
import { TableImage } from "./components/TableImage";
import CardArea from "./containers/CardArea";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      mgs: window.q.gtbl_id_enc, // Get the gtbl_id_enc from window output
      receiveMsg: [], // This varibale to store received messages from Socket IO response.
      msgInput: "" // Send message
    };
  }

  componentWillMount() {
    sendMsg("setSession", [this.state.mgs]);
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

  // onMessageSubmit = () => {
  //   // set up the session - this will trigger the server to send all the table details:
  //   sendMsg("setSession", [this.state.mgs]);
  // };

  onMessageSubmitInput = () => {
    this.setState({ mgs: this.state.msgInput }, () =>
      sendMsg("setSession", [this.state.mgs])
    );
  };

  handleChange = e => {
    this.setState({ msgInput: e.target.value }, () =>
      console.log(this.state.msgInput)
    );
  };

  render() {
    const { receiveMsg } = this.props;
    console.log(receiveMsg);
    const emptySeat_mes = receiveMsg.filter(receive => {
      return receive.message === "emptySeat";
    });

    const seatPlayer_mes = receiveMsg.filter(receive => {
      return receive.message === "seatPlayer";
    });
    // let table_details;

    // const data = { messageA: "test", messageB: "test2" };
    // console.log(data.messageA);
    // if (receiveMsg[2] === undefined) {
    //   console.log("Not show");
    //   table_details = <div>No Detail</div>;
    // } else {
    //   // console.log(receiveMsg[2].message);
    //   // console.log(receiveMsg[2].params);
    //   table_details = <TableDetails datalist={receiveMsg[2].params} />;
    // }

    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Test App</h1>
        {/* <div className="container">
          <button onClick={this.onMessageSubmit}>Start Sesstion</button>
        </div> */}
        <h3
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "blue"
          }}
        >
          Table Detail
        </h3>
        <div className="container">
          <div style={{ marginRight: 20 }}>Mesages</div>
          <input
            style={{ marginRight: 20 }}
            className="search"
            type="search"
            placeholder="Please input here"
            onChange={this.handleChange}
          />
          <button onClick={this.onMessageSubmitInput}>Send Message</button>
        </div>
        {/* <div className="container">{table_details}</div> */}
        <div className="header-area"></div>
        <div id="main-area">
          <Seat
            seatid="1"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="2"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="3"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="4"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="5"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="6"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="7"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="8"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="9"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <Seat
            seatid="10"
            emptySeat={emptySeat_mes}
            seatPlayer={seatPlayer_mes}
          />
          <TableImage />
          <CardArea />
        </div>
        <div id="control-area">
          <button className="control-button">Fold</button>
          <button className="control-button">Call</button>
          <button className="control-button">Call any</button>
          <button className="control-button">Bet</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { receiveMsg: state.receiveMsg };
}

export default connect(mapStateToProps)(App);
