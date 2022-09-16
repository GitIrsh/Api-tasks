const userService = require('../service/login');
const imageModel = require('../userSchema/valid');


exports.signup = async(req,res, next) => {
    console.log(req.payload)
    const user = await userService.signup(req.payload)
    console.log(user)
    return res.response(user).code(200)
}

exports.signin = async(req,res,next) => {
    const user = await userService.signin(req.payload)
    console.log(user)
    return res.response(user).code(200)
}

/*
exports.updateprofile = async(req, res, next)=> {
    const user = await userService.updateprofile(req.file)
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
        
}

exports.getprofile = async(req,res) =>{
    const user = await userService.getprofile(req.file)
    console.log(user)
    return res.response(user).code(200)
}
*/

exports.getUsers = async(req,res, next) => {
    const user = await userService.getUsers()
    console.log(user)
    return res.response(user).code(200)
}

exports.filterUsers = async(req,res, next) => {
    const user = await userService.filterUsers()
    console.log(user)
    return res.response(user).code(200)
}

exports.mapUsers = async(req,res, next) => {
    const user = await userService.mapUsers()
    console.log(user)
    return res.response(user).code(200)
}