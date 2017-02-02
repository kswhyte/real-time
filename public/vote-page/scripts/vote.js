$(document).ready(() => {
  let pollID = getParameterByName('pollID')
  getCurrentPoll(pollID)
})

const getParameterByName = (name, url) => {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

const getCurrentPoll = (pollID) => {
  $.get(`/api/v1/polls/${pollID}`)
    .then(poll => {
      const pollID = poll.id
      console.log(poll.id)
      console.log('vote page POLL', poll)

      $('#poll-container').append(`
        <h1>
          ${poll.question}
        </h1>
        <h3 id="deadline">
          This poll ends on <span id="ending-date">poll.deadlines[1]endingDate</span> at <span id="ending-time">poll.deadlines[0].endingTime</span>
        </h3>
        <div id="options">
          <button class="poll-option-button>${poll.pollOptions[0].pollData}</button>
          <button class="poll-option-button>${poll.pollOptions[1].pollData}</button>
          <button class="poll-option-button>${poll.pollOptions[2].pollData}</button>
          <button class="poll-option-button>${poll.pollOptions[3].pollData}</button>
        </div>
      `)
    })
}

$('.btn-logout').on('click', () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
  window.location.reload()
})
