import pkg from 'jsonwebtoken';
const { sign } = pkg;

import { compare } from 'bcrypt'
import userModel from "../../../DB/models/user.js"
import ResponseModel  from "../../../general/dto/responseModel.js";

const signup = async (req, res) => {
    try {

        const { firstName, lastName, deviceToken, email, gender, password, birthDate, phone,
            jobTitle, specialty, businessType, city, country, personalImage, coverImage, address } = req.body
        const newUser = new userModel({
            firstName, lastName, deviceToken, email, gender, password, birthDate, phone,
            jobTitle, specialty, businessType, city, country, personalImage, coverImage, address
        })

        const savedUser = await newUser.save()
        const deepCloneUser = JSON.parse(JSON.stringify(savedUser));
            delete deepCloneUser.password
            delete deepCloneUser.follower
            delete deepCloneUser.following
            deepCloneUser.followersNumber = savedUser.follower.length
            deepCloneUser.followingsNumber = savedUser.following.length

            let response=new ResponseModel(deepCloneUser,true,"");
            res.status(201).json({ response})
    } catch (error) {
        let response=new ResponseModel(null,false,error);
        res.json({ response})
    }
}

const login = async (req, res) => {
    const { email, password, deviceToken } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        let response=new ResponseModel(null,false,"in-valid account email");
        res.status(404).json({response})
    } else {

        const match = await compare(password, user.password)
        if (!match) {
            let response=new ResponseModel(null,false,"email password misMatch");
            res.status(400).json({response})
        } else {
            const token = sign({ id: user._id},process.env.loginToken)
            const deepCloneUser = JSON.parse(JSON.stringify(user));
             delete deepCloneUser.password
             delete deepCloneUser.follower
             delete deepCloneUser.following
             deepCloneUser.followersNumber = user.follower.length
             deepCloneUser.followingsNumber = user.following.length
            let result = {"token" :token,"user":deepCloneUser}
             let response=new ResponseModel(result,true,"");
             res.status(200).json({response} )
        }
    }



}
export  { signup,login }
