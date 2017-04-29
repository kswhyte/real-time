# Real-Time | Pollr

### Customize your poll data with unique questions in mind and send a link to users to cast their vote on the [Live Version](https://poll-bui1der.herokuapp.com/polls)

---

   <img align=center width="719" alt="screen shot 2017-02-03 at 2 59 49 am" src="https://cloud.githubusercontent.com/assets/13802107/22587142/a90112d6-e9bd-11e6-9811-68d4449f3c6f.png">

### Approach

In this project, the chief aim was to explore client-side security with Auth0 and build a real-time application with communications to WebSockets. When the server gets new information, it pushes it out to all of the connected clients, who each authorize with a github account. A user will come to the web app to create a poll/question for whatever audience of choice using 4 options/answers to go with it. Then a user’s Github image will act as a marker to indicate when they have selected a poll option. All poll option selections update in real-time, and the poll 'admin' is able to specify an ending date and time.

### On the Server

This is a Node/Express application that starts off keeping all of the data in memory using local variables.
WebSockets are used to broadcast poll results to the client.

### On the Client

jQuery is used for all updating and DOM manipulations.
WebSockets are used to broadcast a user's vote to the server.
Auth0 is used to authorize the client with a Github account.

   <img align=center width="718" alt="screen shot 2017-02-03 at 2 59 31 am" src="https://cloud.githubusercontent.com/assets/13802107/22587115/83337454-e9bd-11e6-8938-71214e31df44.png">

---

[Original Assignment](http://frontend.turing.io/projects/real-time.html)

---

### DEVELOPMENT:

1. Pull this repository down with ```git clone```.
2. ```npm install```
3. ```node server.js```
4. visit http://localhost:3000
