// const socket = io();
//
// const connectionCount = $('connection-count').val()
// const statusMessage = $('status-message').val()
// const buttons = $('#choices button').val()
// const voteResults = $('vote-count').val()
//
// socket.on('usersConnected', (count) => {
//   connectedUsers.innerText = 'Connected Users: ' + count
// })
//
// socket.on('statusMessage', (message) => {
//   statusMessage.innerText = message
// })
//
// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener('click', function() {
//     socket.send('voteCast', this.innerText)
//   })
// }
//
// socket.on('voteCount', (votes) => {
//   console.log('votes', votes)
//   voteResults.innerText = (`Votes Counted:
//     A: ${votes.A}
//     B: ${votes.B}
//     C: ${votes.C}
//     D: ${votes.D}
//     `)
// })
