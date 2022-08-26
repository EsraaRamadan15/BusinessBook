
import postModel from "../../../DB/models/postModels/post.js";
import postLikeModel from "../../../DB/models/postModels/postLike.js";
import PostReact from "../dto/postReact.js";
import UserDataModel from "../../../general/dto/userDataModel.js";
import paginate from "../../../service/paginate.js";
import ResponseModel from "../../../general/dto/responseModel.js";

const reactOnPost = async (req, res) => {
    const { id, postId, react } = req.body;

    if (id) {
        if (react) {
            await updateReact(id, react)
        }else{
            await removeReact(id, postId)
        }

    } else {
        await likePost(postId, react,  req.userId);          
    }
    const postLikes = await postModel.findOne({ _id: postId}).select('likes')
    res.status(200).json(new ResponseModel(postLikes.likes.length,true,""))
}
const GetAllReactsPerPosts = async (req, res) => {
    const { page, size ,postId} = req.query
    const { skip, limit } = paginate(page,size)
      const reactsDb = await postLikeModel.find({ postId: postId} ).sort([['createdAt', -1]]).limit(limit).skip(skip).select('_id  react createdAt ').populate([      
         {
             path: 'createdBy',
             select: "_id  firstName lastName personalImage"
          }
         
     ])
     var reacts=[];
     reactsDb.forEach(function(obj){
         reacts.push(
         new PostReact(obj._id,obj.react,obj.createdAt,
             (obj.createdBy._id== req.userId? true:false),
             new UserDataModel(obj.createdBy._id,obj.createdBy.firstName +" "+ obj.createdBy.lastName,obj.createdBy.personalImage))
        )
     });
 
     res.status(200).json(new ResponseModel(reacts,true,""))
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

export {reactOnPost,GetAllReactsPerPosts }