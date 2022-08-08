const mongoose = require('mongoose')
const bycrpt = require('bcrypt')

  
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    deviceToken: {
        type: String,
        required: false
    },
    birthDate: {
        type:Date,
        required: false
    },
    phone: String,
    jobTitle:String ,
    specialty: String,
    businessType: String,
    country:  {type: mongoose.Schema.Types.ObjectId, ref: 'Country'} ,
    city: Number,
    gender: {
        type: String,
        enum : ['Male','Female'],
        //default: 'user'
        required:false
    },
    address: String,
    personalImage: String,
    coverImage: String,
    role: { type: String, default: 'User' },
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    this.password = await bycrpt.hash(this.password, parseInt(process.env.saltRound))
    next()
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel