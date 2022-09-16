const Login = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userSchema,imageSchema } = require('../userSchema/valid');
const { payload } = require('@hapi/hapi/lib/validation');
const express = require('express');
const multer = require('multer');
const Model = require('../model');
const axios = require('axios');
const { result } = require('@hapi/joi/lib/base');


exports.signup = async(payload) => {
    console.log(payload)

    try{
        const result = await userSchema.validateAsync(payload)
        console.log(result);

        try{
            const validate = await Login.query().findOne({email:payload.email})

            if(!validate){
                const name = payload.userName
                const email = payload.email
                const DOB = payload.DOB
                const hash_password = await bcrypt.hash(payload.userPassword, 10);
                console.log(hash_password);
                
                const user = await Login.query().insert({
                    userName : name,
                    email : email,
                    DOB : DOB,
                    userPassword : hash_password
                })
                console.log(user)

                const mail = await sendMail(payload);
                console.log(mail)
                return user
            }
            else{
                return 'User already in Use '
            }
        }
        catch(err){
            console.log(err)
            throw err
        }
    }
    catch(err){
        console.log(err)
        return err('Validation error');
    }
}

exports.signin = async(payload) => {

    try {
        const user = await Login.query().findOne({email:payload.email})
        console.log(user);

        try {
            const compare = await bcrypt.compare(payload.userPassword,user.userPassword)
            console.log(compare);

            if (compare) 
                return jwt.sign(JSON.stringify(user), 'RESTFULAPIs',{
                    expiresIn : '24h'
                }
                )
            else {
                return console.log(error);
            }
        } catch (error) {
            return error
        }
    } 
    catch (error) {
        return error
    }
} 
/*
exports.updateprofile = async(payload) =>{
    const storage = multer.diskStorage({
        destination: function (payload, cb) {
          cb(null, '/uploads')
        },
        filename: function (payload, cb) {
          cb(null, payload.fieldname + '-' + Date.now());
        }
    })
       
    const uploads = multer({ 
        storage: storage,
        fileFilter: Filter
    })
}
*/
exports.getUsers=async()=> {

    try {
     let response = await axios({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
    })
    
     const users = response.data
     let array = []
     for(let user of users){    
        try{
            const validate = await Login.query().findOne({email:user.email})

            console.log(validate)
                        
            if(!validate){
                const name = user.username
                const email = user.email
                const name1 = user.name
                const gusers = await Login.query().insert([
                {
                    userName : name,
                    email : email,
                    name : name1
                }
                ]);
                array.push(gusers)
            }
        }

        catch (error) {
            console.log(error)
            throw error 
        }  
    }
    return array
    }

     catch (error) {
      return error
    }
}

// exports.filterUsers = async(payload)=> {
//     const url = 'https://jsonplaceholder.typicode.com/todos'

//     let response = axios({
//         method: 'get',
//         url: url,
//         responseType: 'stream',
//         data : 'json'
//     })
//     .then((result) =>{
//         const guser = response.body
//         let data = guser.filter(x => x.userId === 1)
//         console.log(data)
//     })
//     .catch((err) =>{
//         console.log(err)
//     })
// }


exports.filterUsers=async()=> {
    try {
     let response = await axios({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/todos",
        headers: {
            contentType: "application/json",
        }
        })
        const user = response.data

        let users = user.filter(x => x.userId === 1)
        console.log(users)
        return users
    }
    catch (error) {
      return error
    }
}

exports.mapUsers = async() =>{

    try {
        let response1 = await axios({
            method: "GET",
            url: 'https://jsonplaceholder.typicode.com/photos',
        })

        let response2 = await axios({
            method: "GET",
            url: 'https://jsonplaceholder.typicode.com/albums',
        })
        
        let user = {}
        let users = response1.data.map(item => response2.data.map(item1 =>{
            if (item.id == item1.id && item.id ==1 && item1.id ==1){
               user.id = item.id,
               user.albumId = item.albumId,
               user.title = item.title,
               user.url = item.url,
               user.thumbnailUrl = item.thumbnailUrl,
               user.userId = item1.userId
            }
        }))
        
        return user
    }
    catch (error) {
        console.log(error)
    }

}