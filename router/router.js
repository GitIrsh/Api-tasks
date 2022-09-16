const loginRoute = require('../src/controller/controller')

module.exports = [

{
    method: 'POST',
    path: '/api/auth/signup',
    handler: loginRoute.signup
},

{
    method: 'POST',
    path: '/api/auth/signin',
    handler: loginRoute.signin
},
/*
{
    method: 'POST',
    path: '/api/updateProfilePicture',
    handler : loginRoute.updateprofile
},

{
    method: 'GET',
    path : '/api/getProfilePicture',
    handler: loginRoute.getprofile
},
*/
{
    method: 'GET',
    path: '/getUsers',
    handler: loginRoute.getUsers
},

{
    method: 'GET',
    path: '/filterUsers',
    handler: loginRoute.filterUsers
},

{
    method: 'GET',
    path: '/mapUsers',
    handler: loginRoute.mapUsers
}
]