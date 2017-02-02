const http = require('http')
const express = require('express')
const app = express()
const md5 = require('md5')
const bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})

app.locals.title = 'Real Time'
app.locals.pollForms = []

// const expressJWT = require('express-jwt')
// const jwt = require('jsonwebtoken')
// let jwt = require('express-jwt');
// app.use(expressJWT({ secret: 'i am a banana'}).unless({ path: ['/login', '/cats']}))

//alternative use to app.get...
// app.use('/polls', express.static(path.join(__dirname, '/public/create-poll.html')));
// app.use('/polls/:id', express.static(path.join(__dirname, '/public/vote-page.html')));

app.get('/', (req, res) => {
  res.redirect('/polls')
})

app.get('/polls', (req, res) => {
  res.sendFile(__dirname + '/public/create-poll.html')
})

app.post('/polls', (req, res) => {
  // console.log('req1', req)
  const poll = req.body
  poll['id'] = md5(poll)

  // const id = md5(poll)
  // const currentPoll = { id, poll }

  app.locals.pollForms.push(poll)
  // app.locals.pollForms.push(currentPoll)
  res.send(app.locals.pollForms)
})

app.get('/vote/*', (req, res) => {
  res.sendFile(__dirname + '/public/vote-page/vote-page.html')
})

app.get('/api/v1/polls', (req, res) => {
  let polls = app.locals.pollForms
  res.send(polls)
})

app.get('/api/v1/polls/:id', (req, res) => {
  console.log('POLLFORMS', app.locals.pollForms)
  let poll = app.locals.pollForms.find(poll => {
    return poll.id === req.params.id
  })
  res.send(poll)
})

// ____________

const socketIO = require('socket.io')
const io = socketIO(server)

const votes = {}

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);
  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', (channel, message) => {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
    }
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);

    delete votes[socket.id];

    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

const countVotes = (votes) => {
  const voteCount = {
      A: 0,
      B: 0,
      C: 0,
      D: 0
  };

  for (let vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
}

module.exports = server;



// let authenticate = jwt({
//   secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
//   audience: process.env.AUTH0_CLIENT_ID
// });

// var socket = io();
// socket.on('connect', function () {
// socket.on('authenticated', function () {
// //Do
//
// })
// .emit('authenticate', {token: userToken}); // send the jwt
// });




// -----------------------------
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
