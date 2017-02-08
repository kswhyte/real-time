#Real Time

###Approach

In this project, the chief aim was to explore client-side security with JSON Web Tokens (JWTs) and build a real-time application with communications to WebSockets. When the server gets new information, it pushes it out to all of the connected clients. A user will come to the web app to create a polling service, then a user’s Github image will indicate when they have selected a poll option.

###On the Server

This is a Node/Express application that starts off keeping all of the data in memory using local variables.
WebSockets are used to broadcast poll results to the client.

###On the Client

jQuery is used for all updating and DOM manipulations.
WebSockets are used to broadcast a user's vote to the server

<img align="center" width="719" alt="screen shot 2017-02-03 at 2 59 49 am" src="https://cloud.githubusercontent.com/assets/13802107/22587142/a90112d6-e9bd-11e6-9811-68d4449f3c6f.png">

<img align="center" width="718" alt="screen shot 2017-02-03 at 2 59 31 am" src="https://cloud.githubusercontent.com/assets/13802107/22587115/83337454-e9bd-11e6-8938-71214e31df44.png">

[Original Assignment](http://frontend.turing.io/projects/real-time.html)

[Live Version](https://poll-bui1der.herokuapp.com/polls)
