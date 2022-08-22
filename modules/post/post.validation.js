import pkg from 'joi';
const Joi = pkg;
const createPost = {

    body: Joi.object().required().keys({
        title: Joi.string().allow(null),
        media:Joi.array().allow(null)
    })
}

const reactPost = {

    body: Joi.object().required().keys({
        react: Joi.string().allow(null),
        id: Joi.string().allow(null),
        postId:Joi.string().required(),
    })
}


export  {
    createPost,reactPost 
}