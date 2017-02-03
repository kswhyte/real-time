const http = require('http')
const express = require('express')
const app = express()
const md5 = require('md5')
const bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000
const server = http.createServer(app)

const socketIO = require('socket.io')
const io = socketIO(server)

const votes = {}

server.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})

app.locals.title = 'Real Time'
app.locals.pollForms = []
app.locals.voteResults = []

app.get('/', (req, res) => {
  res.redirect('/polls')
})

app.get('/polls', (req, res) => {
  res.sendFile(__dirname + '/public/create-poll.html')
})

app.post('/polls', (req, res) => {
  const poll = req.body
  poll['id'] = md5(poll)

  app.locals.pollForms.push(poll)
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
  let poll = app.locals.pollForms.find(poll => {
    return poll.id === req.params.id
  })
  res.send(poll)
})


io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount)
  io.sockets.emit('usersConnected', io.engine.clientsCount)

  socket.emit('statusMessage', 'You have connected.')

  socket.on('voteCast', (optionID, profileImg) => {
    updateVoteResults(profileImg)
    app.locals.voteResults.push({
      optionID,
      profileImg
    })
    socket.emit('voteCount', app.locals.voteResults)
  })

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount)
    delete votes[socket.id]
    io.sockets.emit('usersConnected', io.engine.clientsCount)
  })
})

const updateVoteResults = (profileImg) => {
  app.locals.voteResults = app.locals.voteResults.filter(option => {
    return profileImg !== option.profileImg
  })
}

module.exports = server
