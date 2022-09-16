const jwt = require('jsonwebtoken');

exports.check = async (token) => {
    console.log('Checking token', token)

    if(!token){
        return 'Enter a token'
    }

    const decoded = jwt.decode(token)
    console.log(token);

    const userName = decoded.userName
    console.log(userName);

    return decoded;
}