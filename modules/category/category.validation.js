import pkg from 'joi';
const Joi = pkg;
const createCateogry = {

    body: Joi.object().required().keys({
        nameEn: Joi.string().required(),
        nameAr: Joi.string().required()
    })
}


export  {
    createCateogry
}