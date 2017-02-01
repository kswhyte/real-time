const socket = io()

const connectedUsers = $('#connected-users-count')
const statusMessage = $('#status-message')
const buttons = document.querySelectorAll('#choices button')
const voteResults = $('#vote-count')

$(document).on('ready', () => {
  $.get('/polls', () => {
    app.locals.pollOptions.forEach(poll => {
      // console.log('yopoll', poll)
      $('#poll-list').append(`<li><a href="/polls/${pollData.id}">${poll.poll.question}</a></li>`)
    })
  })
})

$('#poll-form').on('submit', (e) => {
  e.preventDefault()
  $('#poll-list').text('')

  const pollData = {
    id: Date.now(),
    question: $('#poll-question').val(),
    pollOptions: [
      { id: 1, pollData1: $('.poll-option1').val() },
      { id: 2, pollData2: $('.poll-option2').val() },
      { id: 3, pollData3: $('.poll-option3').val() },
      { id: 4, pollData4: $('.poll-option4').val() },
    ]
  }

  $.post('/polls', pollData)
    .then(pollData => {
      pollData.forEach(poll => {
        console.log('heyeyeyey', poll)
        $('#poll-list').append(`<li><a href="/polls/${pollData.id}">${poll.question}</a></li>`)
      })
    })
})

socket.on('usersConnected', (count) => {
  connectedUsers.innerText = 'Connected Users: ' + count
})

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message
})

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText)
  })
}

socket.on('voteCount', (votes) => {
  console.log('votes', votes)
  voteResults.innerText = (`Votes Counted:
    A: ${votes.A}
    B: ${votes.B}
    C: ${votes.C}
    D: ${votes.D}
    `)
})
