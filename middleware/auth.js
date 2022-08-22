import pkg from 'jsonwebtoken';
const { verify } = pkg;

import userModel  from "../DB/models/user.js";

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
                res.status(400).json({ message: "In-valid header Token" })
            } else {
               // console.log({ headerToken });
                const token = headerToken.split(" ")[1];

                const decoded = verify(token, process.env.loginToken);
                if (!decoded ) {
                    res.status(400).json({ message: "In-valid  Token" })
                } else {
                    //console.log(decoded);
                    const findUser = await userModel.findOne({ _id: decoded.id }).select('role')
                    //console.log(findUser);
                    if (!findUser) {
                        res.status(404).json({ message: "In-valid  account id" })
                    } else {
                        if (!accessRoles.includes(findUser.role)) {
                            res.status(401).json({ message: " Not auth  account" })

                        } else {
                            req.userId = decoded.id
                            next()
                        }

                    }
                }
            }
        } catch (error) {
            res.status(500).json({ message: "catch error", error })

        }

    }
}


export  {
    auth,
    roles
}