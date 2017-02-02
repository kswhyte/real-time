// // $('.datepicker').datepicker();
//
// // $('.datepicker').datepicker({
// //     format: 'mm/dd/yyyy',
// //     startDate: '-3d'
// // });
//
// // var input = document.getElementById('poll-question');
// //
// // input.oninvalid = function(event) {
// //     event.target.setCustomValidity('Username should only contain lowercase letters. e.g. john');
// // }
//
// // // Render the login template
// // router.get('/login',
// //   function(req, res){
// //     res.render('login', { env: process.env });
// //   });
// //
// // // Perform session logout and redirect to homepage
// // router.get('/logout', function(req, res){
// //   req.logout();
// //   res.redirect('/');
// // });
// //
// // // Perform the final stage of authentication and redirect to '/user'
// // router.get('/callback',
// //   passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
// //   function(req, res) {
// //     res.redirect(req.session.returnTo || '/user');
// //   });
//
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var socketioJwt = require('socketio-jwt');
//
// io
//   .on('connection', socketioJwt.authorize({
//     secret: 'MuactzPFOSG3QXtYQXcLjchhJJa7XyPGJdUu5vQWCliK1AmQlDI4hUKXIINTvNZ5',
//     timeout: 15000 // 15 seconds to send the authentication message
//   })).on('authenticated', function(socket) {
//     //this socket is authenticated, we are good to handle more events from it.
//     console.log('hello! ' + JSON.stringify(socket.decoded_token));
//   });
