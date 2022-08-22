import pkg from 'mongoose';
const { Schema, model } = pkg;


const postLikeSchema = new Schema({
    react : { type: String,enum : ['Like','Love'],required:true},
  //  isSelfReact:{ type: Boolean, default: false },
    postId:  {type: Schema.Types.ObjectId, ref: 'Post',required:true} ,
    createdBy:  {type: Schema.Types.ObjectId, ref: 'User',required:true} ,
}, {
    timestamps: true
})


const postLikeModel = model('PostLike', postLikeSchema)
export default postLikeModel