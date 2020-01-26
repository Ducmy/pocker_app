import React, { Component } from "react";
import io from "socket.io-client";
import "./App.css";
import { connect } from "react-redux";
import { TableDetails } from "./containers/TableDetails";

const sendMsg = (action, params) => {
  // params is an array
  params.unshift(action);
  var text = params.map(p => p.toString()).join("|"); // we are not using base64 now, just convert them to string
  console.log("Sending " + params.join(", ") + " encoded as " + text);
  socket.send(text);
};

const socket = io.connect(
  "https://" + window.q.ws_host + ":" + window.q.ws_port
);

class App extends Component {
  constructor(props) {
    super();
    this.state = { mgs: window.q.gtbl_id_enc, receiveMsg: [] };
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

  onMessageSubmit = () => {
    // set up the session - this will trigger the server to send all the table details:
    sendMsg("setSession", [this.state.mgs]);
  };

  render() {
    const { receiveMsg } = this.props;
    let table_details;

    // const data = { messageA: "test", messageB: "test2" };
    // console.log(data.messageA);
    if (receiveMsg[2] === undefined) {
      console.log("Not show");
      table_details = <div>No Detail</div>;
    } else {
      // console.log(receiveMsg[2].message);
      // console.log(receiveMsg[2].params);
      table_details = <TableDetails datalist={receiveMsg[2].params} />;
    }

    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Test App</h1>
        <div className="container">
          <button onClick={this.onMessageSubmit}>Start Sesstion</button>
        </div>
        <h3
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "blue"
          }}
        >
          Table Detail
        </h3>
        <div className="container">{table_details}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { receiveMsg: state.receiveMsg };
}

export default connect(mapStateToProps)(App);
