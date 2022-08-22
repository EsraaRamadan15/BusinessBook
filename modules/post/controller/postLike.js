
import postModel from "../../../DB/models/postModels/post.js";
import postLikeModel from "../../../DB/models/postModels/postLike.js";
const reactOnPost = async (req, res) => {
    const { id, postId, react } = req.body;
    //var post = await postModel.findById(postId).select('_id createdBy')

    // if (!post) {
    //     res.status(404).json({ Issuccessd: false, message: "in-valid post id" })
    // } else {
        
    // }
    if (id) {
        if (react) {
            await updateReact(id, react)
        }else{
            await removeReact(id, postId)
        }

    } else {
       // let IsSelfReact = (req.userId === post.createdBy._id.toString()) ? true : false;
        await likePost(postId, react,  req.userId);          
    }
    const postLikes = await postModel.findOne({ _id: postId}).select('likes')
    res.status(200).json({postLikesCount:postLikes.likes.length, Issuccessd: true })

}

async function likePost(postId, react, createdBy) {
    const newReact = new postLikeModel({ react, postId, createdBy })
    const savedreact = await newReact.save()
    await postModel.findByIdAndUpdate(postId, { $push: { likes: savedreact._id } })

}

async function removeReact(id,postId) {
    const reactObj =   await postLikeModel.findByIdAndDelete(id).select('_id');
    await postModel.findByIdAndUpdate(postId, { $pull: { likes: reactObj._id } })
}

async function updateReact(id, react) {
    await postLikeModel.findByIdAndUpdate(id, { react })

}

export {reactOnPost }