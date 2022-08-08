const jwt = require("jsonwebtoken")
const bycrpt = require('bcrypt')
const userModel = require("../../../DB/models/user")
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
        res.status(201).json({ "user": deepCloneUser })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

const login = async (req, res) => {
    const { email, password, deviceToken } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(404).json({ message: "in-valid account email" })
    } else {
        // if (!user.confirmEmail) {
        //     res.status(400).json({ message: "plz confirm u email first" })
        // } else {
        //     if (user.isBlooked) {
        //     res.status(400).json({ message: "sorry this account is blocked" })

        //     } else {
        const match = await bycrpt.compare(password, user.password)
        if (!match) {
            res.status(400).json({ message: "email password misMatch" })
        } else {
            const token = jwt.sign({ id: user._id},process.env.loginToken)
            const deepCloneUser = JSON.parse(JSON.stringify(user));
             delete deepCloneUser.password
             delete deepCloneUser.follower
             delete deepCloneUser.following
            deepCloneUser.followersNumber = user.follower.length
             deepCloneUser.followingsNumber = user.following.length
            res.status(200).json({ token ,
                "user": deepCloneUser} )
        }
    }



}
module.exports = { signup,login }
