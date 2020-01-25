import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

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
      sessionID: "",
      params: [],
      messages: []
    };
  }

  componentDidMount() {
    var varOnReact = "Value On ReactJS";
    var receiveMsg = text => {
      var params = text.split("|"); //.map(p => Base64.Decode(p)); // we are not using b64 now
      var message = params.shift(); // message, eg. playerSitOut, clearTable
      // console.log("Recevied " + message + ", with params " + params.join("; "));
      varOnReact = message;
      //window.store.dispatch({ type: "UPDATE_USER", payload: "mynguyen" });
    };
    console.log(receiveMsg);
    window.socket.on("connect", function(msg) {
      //TODO take care not to create duplicate listeners - use socket.hasListeners to check
      window.socket.on("message", receiveMsg);
      console.log(receiveMsg);
      //	socket.on('disconnect', ...
      //	socket.on('connect_failed', ...
      //	socket.on('error', ...

      // set up the session - this will trigger the server to send all the table details:
      window.sendMsg("setSession", [window.q.gtbl_id_enc]);
    });

    // Read res from service via Socket IO
    var res = window.q;
    this.setState({
      gtbl_id: res.gtbl_id,
      gtbl_id_enc: res.gtbl_id_enc
    });
    console.log(varOnReact);
  }

  handleData = () => {
    this.props.dispatch({ type: "UPDATE_USER", payload: "mynguyen" }); // Update user state on store
  };

  render() {
    const { gtbl_id, sessionID } = this.state;
    const { user } = this.props;

    return (
      <div className="App">
        <div>
          <h1>Read socket IO react js app</h1>
        </div>
        <div>Data from Redux store {user}</div>
        <div>gtbl_id:{gtbl_id}</div>
        <div>
          sessionID:<span className="special">{sessionID}</span>
        </div>
        <button onClick={this.handleData.bind(this)}>Click to change</button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(App);
