const socket = io();

const connectedUsers = $('#connected-users-count')
const statusMessage = $('#status-message')
const buttons = document.querySelectorAll('.options button');

let pollButton1 = $('#option1')
let pollButton2 = $('#option2')
let pollButton3 = $('#option3')
let pollButton4 = $('#option4')

$(document).ready(() => {
  let pollID = getParameterByName('pollID')
  getCurrentPoll(pollID)
  renderProfileImgs()
})

const getParameterByName = (name, url) => {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const getCurrentPoll = (pollID) => {
  $.get(`/api/v1/polls/${pollID}`)
    .then(poll => {
      renderCurrentPoll(poll)
    })
}

const renderProfileImgs = () => {
  $.get('/api/v1/vote_results')
    .then(results => {
      console.log('results', results)
      results.forEach((userSelection) => {
        $(`#option${userSelection.optionID}`).append(
          `<img class='user-profile-img' src='${userSelection.profileImg}'>`
        )
      })
    })
}

const renderCurrentPoll = (poll) => {
  $('#poll-question').append(`<h1 class='poll-question'>${poll.question}</h1>`)

  $('#option1').append(`<button class='poll-option-button ${poll.pollOptions[0].id}'>${poll.pollOptions[0].pollData}</button>`)
  $('#option2').append(`<button class='poll-option-button ${poll.pollOptions[1].id}'>${poll.pollOptions[1].pollData}</button>`)
  $('#option3').append(`<button class='poll-option-button ${poll.pollOptions[2].id}'>${poll.pollOptions[2].pollData}</button>`)
  $('#option4').append(`<button class='poll-option-button ${poll.pollOptions[3].id}'>${poll.pollOptions[3].pollData}</button>`)

  $('.deadline-container').append(`
    <h3 class='deadline'>This poll ends on
    <span id='ending-date'>${poll.deadlines[1].endingDate}</span>
    at <span id='ending-time'>${poll.deadlines[0].endingTime}</span></h3>
  `)

  if (!profileActive) {
    $('#poll-container').hide()
  }
  const voteResults = []
}

$('.btn-home').on('click', () => {
  window.location = '/'
})

$('.btn-logout').on('click', () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
  window.location.reload()
})

$('#option1').on('click', (e) => {
  let optionID = e.target.classList[1]
  let profileImg = localStorage.getItem('profileImg')
  socket.emit('voteCast', optionID, profileImg)
})

$('#option2').on('click', (e) => {
  let optionID = e.target.classList[1]
  let profileImg = localStorage.getItem('profileImg')
  socket.emit('voteCast', optionID, profileImg)
})

$('#option3').on('click', (e) => {
  let optionID = e.target.classList[1]
  let profileImg = localStorage.getItem('profileImg')
  socket.emit('voteCast', optionID, profileImg)
})

$('#option4').on('click', (e) => {
  let optionID = e.target.classList[1]
  let profileImg = localStorage.getItem('profileImg')
  socket.emit('voteCast', optionID, profileImg)
})

socket.on('usersConnected', (count) => {
  connectedUsers.text('Connected Users: ' + count)
})

socket.on('statusMessage', (message) => {
  statusMessage.text(message)
})

socket.on('voteCount', (voteResults) => {
  $('.user-profile-img').remove()
  voteResults.forEach((userSelection) => {
    $(`#option${userSelection.optionID}`).append(
      `<img class='user-profile-img' src='${userSelection.profileImg}'>`
    )
  })
})
