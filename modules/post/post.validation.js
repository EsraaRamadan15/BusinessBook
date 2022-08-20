import pkg from 'joi';
const Joi = pkg;
const createPost = {

    body: Joi.object().required().keys({
        title: Joi.string().allow(null),
        images:Joi.array().allow(null)
    })
}



export  {
    createPost
}