import React, { Component } from "react";
import io from "socket.io-client";
import "./App.css";
import { connect } from "react-redux";

const receiveMsg = text => {
  var params = text.split("|"); //.map(p => Base64.Decode(p)); // we are not using b64 now
  var message = params.shift(); // message, eg. playerSitOut, clearTable
  console.log("Recevied " + message + ", with params " + params.join("; "));
};

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
    this.state = { msg: "", chat: [] };
  }

  componentDidMount() {
    // Read res from service via Socket IO
    // socket.on("message", receiveMsg);
    socket.on("message", text => {
      var params = text.split("|"); //.map(p => Base64.Decode(p)); // we are not using b64 now
      var message = params.shift(); // message, eg. playerSitOut, clearTable
      console.log("Recevied " + message + ", with params " + params.join("; "));
      this.setState({
        chat: [...this.state.chat, params]
      });
    });
  }

  onMessageSubmit = () => {
    // set up the session - this will trigger the server to send all the table details:
    sendMsg("setSession", [window.q.gtbl_id_enc]);
  };

  // handleData = () => {
  //   this.props.dispatch({ type: "UPDATE_USER", payload: "mynguyen" }); // Update user state on store
  // };

  render() {
    // const { user } = this.props;
    console.log(this.state.chat);
    return (
      <div className="App">
        <div>
          <h1>Reasocke tessreact js app</h1>
        </div>
        <button onClick={this.onMessageSubmit}>Send Message</button>
        {/* <div>Data from Redux store {user}</div>
        <button onClick={this.handleData.bind(this)}>Click to change</button> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(App);
