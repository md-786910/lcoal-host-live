const socketServer = "http://localhost:3000";
const hostToLive = "http://localhost";
const socket = require("socket.io-client")(socketServer);
const { SSL_OP_NO_TICKET } = require("constants");
const superagent = require("superagent");

console.log("Superagent");

socket.on("connect", () => {
  console.log("connected");
});

console.log("Superagent12");
socket.on("disconnect", () => {
  console.log("connection lost");
});
console.log("Superagent123");

socket.on("page-request", (data) => {
  const path = data.pathname;
  const method = data.method;
  const params = data.params;

  const localhostUrl = hostToLive + path;

  if (method === "get") {
    excuteGet(localhostUrl, params);
  } else if (method === "post") {
    excutePost(localhostUrl, params);
  }
});

function excuteGet(url, params) {
  superagent
    .get(url)
    .query(params)
    .end((err, response) => {
      if (err) {
        return console.log(err);
      }

      socket.emit("page-response", response.text); // fixed 'text' variable
    });
}

function excutePost(url, params) {
  superagent
    .post(url)
    .send(params) // fixed sending params in the request body
    .end((err, response) => {
      if (err) {
        return console.log(err);
      }

      socket.emit("page-response", response.text); // fixed 'text' variable
    });
}

// const socketServer = "http://localhost:3000";

// const hostToLive = "http://localhost";

// const socket = require("socket.io-client")(socketServer);

// const { SSL_OP_NO_TICKET } = require("constants");

// const superagent = require("superagent");
// console.log("Superagent");

// socket.on("connect", () => {
//   console.log("connected");
// });

// socket.on("disconnect", () => {
//   console.log("connection lost");
// });

// socket.on("page-request", (data) => {
//   const path = data.pathname;
//   const method = data.method;
//   const params = data.params;

//   const localhostUrl = hostToLive + path;

//   if (method === "get") excureGet(localhostUrl, params);
//   else if (method === "post") excurePost(localhostUrl, params);
// });

// function excureGet(url, params) {
//   superagent
//     .get(url, params)
//     .query(params)
//     .end((err, response) => {
//       if (err) {
//         return console.log(err);
//       }

//       socket.emit("page-response", response, text);
//     });
// }
// function excurePost(url, params) {
//   superagent
//     .post(url, params)
//     .query(params)
//     .end((err, response) => {
//       if (err) {
//         return console.log(err);
//       }

//       socket.emit("page-response", response, text);
//     });
// }
