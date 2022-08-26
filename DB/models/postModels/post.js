import pkg from 'mongoose';
const { Schema, model } = pkg;


const postSchema = new Schema({
    title: String,
    media: Array,
    likes: [{ type: Schema.Types.ObjectId, ref: "PostLike" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "PostLike" }],
    createdBy:  {type: Schema.Types.ObjectId, ref: 'User',required:true} ,

    }, 
     {
    timestamps: true
})



const postModel = model('Post', postSchema)
export default postModel