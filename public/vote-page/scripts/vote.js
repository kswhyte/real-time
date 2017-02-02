$(document).ready(() => {
  let pollID = getParameterByName('pollID')
  getCurrentPoll(pollID)
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

const renderCurrentPoll = (poll) => {
  $('#poll-container').append(`
    <h1 class='poll-question'>
      ${poll.question}
    </h1>
    <div class='options'>
      <button class='poll-option-button'>${poll.pollOptions[0].pollData}</button>
      <button class='poll-option-button'>${poll.pollOptions[1].pollData}</button>
      <button class='poll-option-button'>${poll.pollOptions[2].pollData}</button>
      <button class='poll-option-button'>${poll.pollOptions[3].pollData}</button>
    </div>
    <h3 class='deadline'>This poll ends on <span id='ending-date'>${poll.deadlines[1].endingDate}</span> at <span id='ending-time'>${poll.deadlines[0].endingTime}</span></h3>
  `)
  if (!profileActive) {
    $('#poll-container').hide()
  }
}

$('.btn-home').on('click', () => {
  window.location = '/'
})

$('.btn-logout').on('click', () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
  window.location.reload()
})
