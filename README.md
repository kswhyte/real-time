#Real Time

###Approach

In this project, the chief aim was to explore client-side security with JSON Web Tokens (JWTs) and build a real-time application with communications to WebSockets. When the server gets new information, it pushes it out to all of the connected clients. A user will come to the web app to create a polling service, then a user’s Github image will indicate when they have selected a poll option.

###On the Server

This is a Node/Express application that starts off keeping all of the data in memory using local variables.
WebSockets are used to broadcast poll results to the client.

###On the Client

jQuery is used for all updating and DOM manipulations.
WebSockets are used to broadcast a user's vote to the server

[Original Assignment](http://frontend.turing.io/projects/real-time.html)

[Live Version](xyz)
