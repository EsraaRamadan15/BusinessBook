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
                let response=new ResponseModel(null,false, "validation error",validationArr);
                res.status(400).json({ response})

               // res.status(400).json({ message: "validation error", validationArr })
            } else {
                next()
            }
        } catch (error) {
            let response=new ResponseModel(null,false,error);
            res.status(500).json({response})
           // res.status(500).json({ message: "catch error", error })
        }
    }
}


export default validation