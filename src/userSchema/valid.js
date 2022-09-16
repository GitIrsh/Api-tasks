const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    userName:  Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    DOB: Joi.date().required(),
    userPassword: Joi.string().min(5).max(15).required(),
})

const imageSchema = Joi.object({
   profile_picture :{
        image : {
        data : Buffer,
        contentType : String
        }
    }
})

module.exports={
    userSchema, imageSchema
}