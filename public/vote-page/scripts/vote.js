const socket = io();

const connectedUsers = $('#connected-users-count')
const statusMessage = $('#status-message')
const voteResults = $('#vote-count')
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

}

const renderCurrentPoll = (poll) => {
  $('#poll-container').append(`
    <h1 class='poll-question'>
      ${poll.question}
    </h1>
    <div class='options'>
      <button class='poll-option-button ${poll.pollOptions[0].id}' id='option1'>${poll.pollOptions[0].pollData}</button>
      <button class='poll-option-button ${poll.pollOptions[1].id}' id='option2'>${poll.pollOptions[1].pollData}</button>
      <button class='poll-option-button ${poll.pollOptions[2].id}' id='option3'>${poll.pollOptions[2].pollData}</button>
      <button class='poll-option-button ${poll.pollOptions[3].id}' id='option4'>${poll.pollOptions[3].pollData}</button>
    </div>
    <h3 class='deadline'>This poll ends on <span id='ending-date'>${poll.deadlines[1].endingDate}</span> at <span id='ending-time'>${poll.deadlines[0].endingTime}</span></h3>
  `)
  if (!profileActive) {
    $('#poll-container').hide()
  }
  const voteResults = []

  $('#poll-container').on('click', '#option1', (e) => {
    let optionID = e.target.classList[1]
    let profileImg = localStorage.getItem('profileImg')
    console.log("PROFIMG", profileImg)
    socket.emit('voteCast', optionID, profileImg)
  })
  $('#poll-container').on('click', '#option2', (e) => {
    let optionID = e.target.classList[1]
    let profileImg = localStorage.getItem('profileImg')
    console.log("PROFIMG", profileImg)
    socket.emit('voteCast', optionID, profileImg)
  })
  $('#poll-container').on('click', '#option3', (e) => {
    let optionID = e.target.classList[1]
    let profileImg = localStorage.getItem('profileImg')
    console.log("PROFIMG", profileImg)
    socket.emit('voteCast', optionID, profileImg)
  })
  $('#poll-container').on('click', '#option4', (e) => {
    let optionID = e.target.classList[1]
    let profileImg = localStorage.getItem('profileImg')
    console.log("PROFIMG", profileImg)
    socket.emit('voteCast', optionID, profileImg)
  })
  //button event listeners, socket.emit(id, img)
}

$('.btn-home').on('click', () => {
  window.location = '/'
})

$('.btn-logout').on('click', () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
  window.location.reload()
})

// $('#poll-container').on('click', '#option1', () => {
//   console.log('text', $('#option1').text())
// })

socket.on('usersConnected', (count) => {
  connectedUsers.text('Connected Users: ' + count)
})

socket.on('statusMessage', (message) => {
  statusMessage.text(message)
})

// socket.emit('voteCast', (profImg) => {
//   const profImg = localStorage.getItem(profileImg)
//   // statusMessage.text(message)
// })


// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener('click', function() {
//     socket.emit('voteCast', this.innerText);
//   });
// }

// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].on('click', () => {
//     socket.send('voteCast', this.text())
//   })
// }

socket.on('voteCount', (voteResults) => {
  $('.user-profile-img').remove()
  voteResults.forEach((userSelection) => {
    $(`#option${userSelection.optionID}`).after(
      `<img class='user-profile-img' src='${userSelection.profileImg}'>`
    )
  })
})
  // getProfileImgs(voteResults)
  // console.log('voteResults', voteResults)

  // voteResults.text = (`Votes Counted:
  //   ${pollButton1.text()}: ${votes.option1}
  //   ${pollButton2.text()}: ${votes.option2}
  //   ${pollButton3.text()}: ${votes.option3}
  //   ${pollButton4.text()}: ${votes.option4}
  // `)

// const getProfileImgs = (voteResults) => {
// }
