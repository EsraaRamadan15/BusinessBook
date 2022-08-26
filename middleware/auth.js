import pkg from 'jsonwebtoken';
const { verify } = pkg;
import userModel  from "../DB/models/user.js";
import ResponseModel  from "../general/dto/responseModel.js";

const roles = {
    Admin: "Admin",
    User: 'User',
    HR: 'HR'
}

const auth = (accessRoles) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization'];
            if (!headerToken.startsWith(`Bearer `)) {
                res.status(400).json(new ResponseModel(null,false,req.t('Authorization.InvalidBearer')))
            } else {
                const token = headerToken.split(" ")[1];
                const decoded = verify(token, process.env.loginToken);
                if (!decoded ) {
                    res.status(400).json(new ResponseModel(null,false,req.t('Authorization.InvalidToken')))
                } else {
                    const findUser = await userModel.findOne({ _id: decoded.id }).select('role')
                    if (!findUser) {
                        res.status(404).json(new ResponseModel(null,false,req.t('Authorization.InvalidAccountId')))
                    } else {
                        if (!accessRoles.includes(findUser.role)) {

                            res.status(401).json(new ResponseModel(null,false,req.t('Authorization.NoAccount')))

                        } else {
                            req.userId = decoded.id
                            next()
                        }

                    }
                }
            }
        } catch (error) {
            res.status(500).json(new ResponseModel(null,false,error.toString()))
            
        }

    }
}


export  {
    auth,
    roles
}