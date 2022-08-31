import ResponseModel  from "../general/dto/responseModel.js";

const dataMethod = ['body', 'params', 'query', 'file', 'headers']
const validation = (schema) => {
    return (req, res, next) => {
        try {
            const validationArr = []
            dataMethod.forEach(key => {
                if (schema[key]) {
                    const validationRsult = schema[key].validate(req[key],
                        { abortEarly: false })
                    if (validationRsult.error) {
                        validationArr.push(validationRsult.error.details)
                    }
                }
            })
            if (validationArr.length) {
                res.status(400).json(new ResponseModel(validationArr,false, "validation error"))
            } else {
                next()
            }
        } catch (error) {
            res.status(500).json(new ResponseModel(null,false,error.toString()))
        }
    }
}


export default validation