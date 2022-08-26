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
                let response=new ResponseModel(null,false,"In-valid header Token");
                res.status(400).json({ response})
            } else {
                const token = headerToken.split(" ")[1];

                const decoded = verify(token, process.env.loginToken);
                if (!decoded ) {
                    let response=new ResponseModel(null,false,"In-valid  Token");
                    res.status(400).json({ response})
                } else {
                    const findUser = await userModel.findOne({ _id: decoded.id }).select('role')
                    if (!findUser) {
                        let response=new ResponseModel(null,false,"In-valid  account id");
                        res.status(404).json({ response})
                    } else {
                        if (!accessRoles.includes(findUser.role)) {

                            let response=new ResponseModel(null,false," Not auth  account");
                            res.status(401).json({ response})

                        } else {
                            req.userId = decoded.id
                            next()
                        }

                    }
                }
            }
        } catch (error) {

            let response=new ResponseModel(null,false,error);
            res.status(500).json({response})
          //  res.status(500).json({ message: "catch error", error })
            
        }

    }
}


export  {
    auth,
    roles
}