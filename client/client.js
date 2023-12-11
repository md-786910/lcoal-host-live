const socketServer = "";

const hostToLive = "http://localhost";

const socket = require("socket.io-client")(socketServer);

const { SSL_OP_NO_TICKET } = require("constants");

const superagent = require("superagent");

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("connection lost");
});

socket.on("page-request", (data) => {
  const path = data.pathname;
  const method = data.method;
  const params = data.params;

  const localhostUrl = hostToLive + path;

  if (method === "get") excureGet(localhostUrl, params);
  else if (method === "post") excurePost(localhostUrl, params);
});

function excureGet(url, params) {
  superagent
    .get(url, params)
    .query(params)
    .end((err, response) => {
      if (err) {
        return console.log(err);
      }

      socket.emit("page-response", response, text);
    });
}
function excurePost(url, params) {
  superagent
    .post(url, params)
    .query(params)
    .end((err, response) => {
      if (err) {
        return console.log(err);
      }

      socket.emit("page-response", response, text);
    });
}
