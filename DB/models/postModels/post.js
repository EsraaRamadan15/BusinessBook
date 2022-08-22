import pkg from 'mongoose';
const { Schema, model } = pkg;


const postSchema = new Schema({
    title: String,
    media: Array,
    likes: [{ type: Schema.Types.ObjectId, ref: "PostLike" }],
    createdBy:  {type: Schema.Types.ObjectId, ref: 'User',required:true} ,
}, {
    timestamps: true
})

// postSchema.virtual('numLikes', {
//     ref: 'PostLike', // The model to use
//     localField: '_id', // Find people where `localField`
//     foreignField: 'likes', // is equal to `foreignField`
//     count: true // And only get the number of docs
//   });

const postModel = model('Post', postSchema)
export default postModel