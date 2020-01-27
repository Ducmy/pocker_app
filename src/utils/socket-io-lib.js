import io from "socket.io-client";
export const sendMsg = (action, params) => {
  // params is an array
  params.unshift(action);
  var text = params.map(p => p.toString()).join("|"); // we are not using base64 now, just convert them to string
  console.log("Sending " + params.join(", ") + " encoded as " + text);
  socket.send(text);
};

export const socket = io.connect(
  "https://" + window.q.ws_host + ":" + window.q.ws_port
);
