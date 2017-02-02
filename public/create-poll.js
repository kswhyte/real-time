const socket = io()

const connectedUsers = $('#connected-users-count')
const statusMessage = $('#status-message')
const buttons = document.querySelectorAll('#choices button')
const voteResults = $('#vote-count')

$(document).ready(() => {
  $.get('/api/v1/polls')
    .then(polls => {
      console.log('Doc ready POLLS', polls)
      if (polls.length > 0) {
        polls.forEach(poll => {
          console.log('Doc ready POLL 2', poll)
          $('#poll-list').append(`
            <li>
              <a class="poll-link" href="/vote/?pollID=${poll.id}">
                ${poll.question}
              </a>
            </li>
          `)
        })
      }
    })
})

$('#poll-form').on('submit', (e) => {
  e.preventDefault()
  $('#poll-list').text('')

  const pollData = {
    id: Date.now(),
    question: $('#poll-question').val(),
    pollOptions: [
      { id: 1, pollData: $('.poll-option1').val() },
      { id: 2, pollData: $('.poll-option2').val() },
      { id: 3, pollData: $('.poll-option3').val() },
      { id: 4, pollData: $('.poll-option4').val() },
    ],
    deadlines: [
      { endingTime: $('#time-picker').val() },
      { endingDate: $('#date-picker').val() },
    ]
  }

  postPollData(pollData)
  resetInputFields()
})

const postPollData = (pollData) => {
  $.post('/polls', pollData)
  .then(pollData => {
    pollData.forEach(poll => {
      // $('#poll-list').text('Choose an Available Poll:')
      $('#poll-list').append(`
        <li>
          <a class="poll-link" href="/vote/?pollID=${poll.id}">
          ${poll.question}
        </a>
      </li>
      `)
    })
  })
}

const resetInputFields = () => {
  $('#poll-question').val('')
  $('.poll-option1').val('')
  $('.poll-option2').val('')
  $('.poll-option3').val('')
  $('.poll-option4').val('')
  $('#time-picker').val('')
  $('#date-picker').val('')
}

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
