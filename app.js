// instantiate Lock
// var lock = new Auth0Lock('ye0F16vzCTBX5yTejqEfc18wEWIOwJWI',
// 'speyrott.auth0.com', {
//   auth: {
//     redirectUrl: 'http://app1.com:3000/',
//     responseType: 'token',
//     sso: true,
//     params: {
//       // Learn about scopes: https://auth0.com/docs/scopes
//       scope: 'openid name email'
//     }
//   }
// });
//
// // Listening for the authenticated event
// lock.on("authenticated", function (authResult) {
//   localStorage.setItem('idToken', authResult.idToken);
//   goToHomepage(getQueryParameter('targetUrl'), authResult.idToken);
// });
//
// // Get the user token if we've saved it in localStorage before
// var idToken = localStorage.getItem('idToken');
// if (idToken) {
//   // This would go to a different route like
//   // window.location.href = '#home';
//   // But in this case, we just hide and show things
//   goToHomepage(getQueryParameter('targetUrl'), idToken);
//   return;
// } else {
//   client.getSSOData(function (err, data) {
//     if (!err && data.sso) {
//   // there is! redirect to Auth0 for SSO
//       client.signin({
//         responseType: 'token',
//         scope: 'openid name email'
//       }, function (err, profile, idToken) {
//     if (!err) {
//       localStorage.setItem('idToken', idToken);
//         goToHomepage('', idToken);
//         }
//       });
//     }
//   });
// }
//
//   // const lock = new Auth0Lock(clientId, domain, {
// //   auth: {
// //     redirectUrl: `${window.location.origin}/login`,
// //     responseType: 'token'
// //   }
// // })
// //
// // lock.on('authenticated', this._doAuthentication.bind(this))
// //   this.login = this.login.bind(this)
// // }
//
// const goToHomepage = (authResult) => {
// // const _doAuthentication = (authResult) => {
//     this.setToken(authResult.idToken)
//     browserHistory.replace('/home')
//     lock.getProfile(authResult.idToken, (error, profile) => {
//       if (error) {
//         console.log('Error loading the Profile', error)
//       } else {
//         this.setProfile(profile)
//       }
//     })
//   }
//
// const login = () => {
//   lock.show()
// }
//
// const logout = () => {
//   localStorage.removeItem('id_token');
//   localStorage.removeItem('profile');
// }
//
// const loggedIn = () => {
//   const token = this.getToken()
//   return !!token && !isTokenExpired(token)
// }
//
// const setProfile = (profile) => {
//   localStorage.setItem('profile', JSON.stringify(profile))
//   this.emit('profile_updated', profile)
// }
//
// const getProfile = () => {
//     const profile = localStorage.getItem('profile')
//     return profile ? JSON.parse(localStorage.profile) : {}
//   }
//
// const setToken = (idToken) => {
//   localStorage.setItem('id_token', idToken)
// }
//
// const getToken = () => {
//   return localStorage.getItem('id_token')
// }
//
// const checkStatus = (response) => {
//   if (response.status >= 200 && response.status < 300) {
//     return response
//   } else {
//     var error = new Error(response.statusText)
//     error.response = response
//     throw error
//   }
// }
//
// // -----------
//
// const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);
//
// // onEnter callback to validate authentication in private routes
// // const requireAuth = (nextState, replace) => {
// //   if (!auth.loggedIn()) {
// //     replace({ pathname: '/login' })
// //   }
// // }
//
// // var token = localStorage.getItem('id_token');
// // if(token) {
// // var decoded = jwt_decode(token);
// // var body = $('#items');
// // decoded.items.forEach(function(item) {
// // body.append('<li>' + item + '</li>');
// // });
// // }
