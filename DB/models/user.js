import pkg from 'mongoose';
const { Schema, model } = pkg;
import { hash } from 'bcrypt'

  
const userSchema = new Schema({
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
        required: [true,'Please enter your user type']
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
    country:  {type: Schema.Types.ObjectId, ref: 'Country'} ,
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
    follower: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    this.password = await hash(this.password, parseInt(process.env.saltRound))
    next()
})

const userModel = model('User', userSchema)
export default userModel