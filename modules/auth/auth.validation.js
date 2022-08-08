const Joi = require('joi')


const signup = {
    body: Joi.object().required().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        gender: Joi.valid('Male', 'Female').required(),
        password: Joi.string().required(),
        deviceToken: Joi.string(),
        birthDate: Joi.date(),
        phone: Joi.string(),
        jobTitle: Joi.string(),
        specialty: Joi.string(),
        businessType: Joi.string(),
        city: Joi.number(),
        country: Joi.string().allow(null),
        address: Joi.string().allow(null),
        personalImage: Joi.string().allow(null),
        coverImage: Joi.string().allow(null)
    })
}


const login = {

    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        deviceToken: Joi.string().allow(null),

    })
}





module.exports =
    { signup, login }