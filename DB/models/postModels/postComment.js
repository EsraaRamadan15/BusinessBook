import pkg from 'mongoose';
const { Schema, model } = pkg;


const postCommentSchema = new Schema({
    comment : { type: String,required:true},
    postId:  {type: Schema.Types.ObjectId, ref: 'Post',required:true} ,
    createdBy:  {type: Schema.Types.ObjectId, ref: 'User',required:true} ,
}, {
    timestamps: true
})


const postCommentModel = model('PostComment', postCommentSchema)
export default postCommentModel