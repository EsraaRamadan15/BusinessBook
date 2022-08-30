import pkg from 'jsonwebtoken';
const { sign } = pkg;

import { compare ,hash} from 'bcrypt'
import userModel from "../../../DB/models/user.js"
import handleDBError from "../../../service/handleError.js";
import ResponseModel from "../../../general/dto/responseModel.js";
import User from "../dto/user.js";
import sendEmail from '../../../service/email.js';


const signup = async (req, res) => {
    try {

        const { firstName, lastName, deviceToken, email, gender, password, birthDate, phone,
            jobTitle, specialty, businessType, city, country, personalImage, coverImage, address } = req.body
        const newUser = new userModel({
            firstName, lastName, deviceToken, email, gender, password, birthDate, phone,
            jobTitle, specialty, businessType, city, country, personalImage, coverImage, address
        })

        const savedUser = await newUser.save();
        let user = new User(savedUser._id,savedUser.firstName, savedUser.lastName, savedUser.email, savedUser.deviceToken, savedUser.birthDate,
            savedUser.phone, savedUser.jobTitle, savedUser.specialty, savedUser.businessType, savedUser.country,
            savedUser.city, savedUser.gender, savedUser.address, savedUser.personalImage, savedUser.coverImage);

        res.json(new ResponseModel(user, true, ""))
    } catch (error) {
        let message = handleDBError(req, error);
        res.json(new ResponseModel(null, false, message))
    }
}

const login = async (req, res) => {
    const { email, password, deviceToken } = req.body;
    const savedUser = await userModel.findOne({ email });
    if (!savedUser) {
        res.status(404).json(new ResponseModel(null, false, "in-valid account email"))
    } else {

        const match = await compare(password, savedUser.password)
        if (!match) {
            res.status(400).json(new ResponseModel(null, false, "email password misMatch"))
        } else {
            const token = sign({ id: savedUser._id }, process.env.loginToken)
            let LogedInuser = new User(savedUser._id,savedUser.firstName, savedUser.lastName, savedUser.email, savedUser.deviceToken, savedUser.birthDate,
                savedUser.phone, savedUser.jobTitle, savedUser.specialty, savedUser.businessType, savedUser.country,
                savedUser.city, savedUser.gender, savedUser.address, savedUser.personalImage, savedUser.coverImage);
                LogedInuser.followersNumber = savedUser.follower.length
                LogedInuser.followingsNumber = savedUser.following.length
            let result = { "token": token, "user": LogedInuser }
            res.status(200).json( new ResponseModel(result, true, ""))
        }
    }



}


const sendCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json(new ResponseModel(null, fasle, "in-valid email"))
        } else {
            const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000) //4589
            console.log(code)
            await userModel.findByIdAndUpdate(user._id, { code })
            sendEmail("Password Verification",user.email, `<p>use this code to update u password : ${code}</p>`)
            res.json(new ResponseModel(code, true, ""))
        }
    } catch (error) {
        console.log(error)
        let message = handleDBError(req, error);
        res.json(new ResponseModel(null, false, message))
    }

}

const forgetPassword = async (req, res) => {
    try {
        const { code, email, newPassword } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json(new ResponseModel(null, false, "in-valid email"))
        } else {
            if (user.code != code) {
                res.json(new ResponseModel(null, false, "In-valid auth code"))

            } else {
                const hashedPassword = await hash(newPassword, parseInt(process.env.saltRound))
                await userModel.findOneAndUpdate({ _id: user._id }, { password: hashedPassword, code: "" })
                res.json(new ResponseModel(null, true, ""))
            }
        }
    } catch (error) {
        res.status(500).json(new ResponseModel(null, false, error.toString()))
    }
}
export { signup, login,sendCode,forgetPassword }
