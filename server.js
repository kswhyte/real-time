const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const md5 = require('md5')
// const expressJWT = require('express-jwt')
// const jwt = require('jsonwebtoken')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(expressJWT({ secret: 'i am a banana'}).unless({ path: ['/login', '/api/cats']}))

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

const port = process.env.PORT || 3000;
app.locals.title = 'Real Time'

const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
})

// Setting Up Socket.io
const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

// //Header for JWT
// {
//   'typ': 'JWT', //set to jwt
//   'alg': 'HS246' //whatever algorithm sender used to encrypt that JWT
// }
//
// //payload JSON object
// {
//   'iss': 'http://myapi.com', //issuer: reserved claim
//   'user': 'nodebotanist', //username: public claim
// }
//
// //signature
// HMACHA235(
//   base64UrlEncode(header) + "." + //ensures message hasn't changed
//   base64UrlEncode(payload),
//   secret
// )



module.exports = server;
