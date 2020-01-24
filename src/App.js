import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    // Read res from service via Socket IO
    var res = window.q;
    var resArray = [
      { gtbl_id: res.gtbl_id },
      { gtbl_id_enc: res.gtbl_id_enc },
      { plyr_id_enc: res.plyr_id_enc },
      { ws_host: res.ws_host },
      { gtbl_name: res.gtbl_name },
      { currency: res.currency },
      { sessionID: res.sessionID },
      { currency: res.currency },
      { gtbl_isessionIDd: res.sessionID }
    ];
    this.setState({
      data: [...this.state.data, resArray]
    });
  }

  render() {
    const { data } = this.state;
    console.log(data.gtbl_id);
    let render;
    if (data == null) {
      render = <div>No data</div>;
    } else {
      render = (
        <div>
          <div>test: {data.gtbl_id}</div>
          <div></div>
          <div></div>
        </div>
      );
    }
    return (
      <div className="App">
        <div>test</div>
      </div>
    );
  }
}

export default App;
