import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      gtbl_id: "",
      gtbl_id_enc: "",
      plyr_id_enc: "",
      ws_host: "",
      ws_port: "",
      gtbl_name: "",
      currency: "",
      sessionID: ""
    };
  }

  componentDidMount() {
    // Read res from service via Socket IO
    var res = window.q;
    this.setState({
      gtbl_id: res.gtbl_id,
      gtbl_id_enc: res.gtbl_id_enc,
      plyr_id_enc: res.plyr_id_enc,
      ws_host: res.ws_host,
      ws_port: res.ws_port,
      gtbl_name: res.gtbl_name,
      currency: res.currency,
      sessionID: res.sessionID
    });
    console.log(res.sessionID);
    // window.sendMsg("setSession", [res.gtbl_id]);
    window.socket.on("connect", function(msg) {
      //TODO take care not to create duplicate listeners - use socket.hasListeners to check
      window.socket.on("message", window.receiveMsg);
      //	socket.on('disconnect', ...
      //	socket.on('connect_failed', ...
      //	socket.on('error', ...

      // set up the session - this will trigger the server to send all the table details:
      window.sendMsg("setSession", [window.q.gtbl_id_enc]);
    });
  }

  render() {
    const {
      gtbl_id,
      gtbl_id_enc,
      plyr_id_enc,
      ws_host,
      ws_port,
      gtbl_name,
      currency,
      sessionID
    } = this.state;
    return (
      <div className="App">
        <div>
          <h1>Read socket IO react js app</h1>
        </div>
        <div>gtbl_id:{gtbl_id}</div>
        <div>gtbl_id_enc:{gtbl_id_enc}</div>
        <div>plyr_id_enc:{plyr_id_enc}</div>
        <div>ws_host:{ws_host}</div>
        <div>ws_port:{ws_port}</div>
        <div>gtbl_name:{gtbl_name}</div>
        <div>currency:{currency}</div>
        <div>
          sessionID:<span className="special">{sessionID}</span>
        </div>
      </div>
    );
  }
}

export default App;
