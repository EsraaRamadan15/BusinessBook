import postCommentModel from "../../../DB/models/postModels/postComment.js";
import postModel from "../../../DB/models/postModels/post.js";
import PostComment from "../dto/postComment.js";
import ResponseModel from "../../../general/dto/responseModel.js";
import UserDataModel from "../../../general/dto/userDataModel.js";

import paginate from "../../../service/paginate.js";


const AddCommentOnPost = async (req, res) => {
    const { postId, comment } = req.body;

    const newComment = new postCommentModel({ comment, postId, createdBy:req.userId })
    const savedComment = await newComment.save()
    await postModel.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } })
    res.status(201).json(new ResponseModel(null, true, ""))

}
const EditComment = async (req, res) => {
    const { id,  comment } = req.body;

    const filter = { _id: id, createdBy: req.userId };
    const update = { comment };

    let updated = await postCommentModel.findOneAndUpdate(filter, update, {
        new: true
    });
    if (updated) {
        res.status(200).json( new ResponseModel(updated, true, ""))
    } else {
        res.status(400).json( new ResponseModel(null, false, req.t("un_Authorized_edit")))
    }

}

const DeleteComment = async (req, res) => {
    const { id } = req.query;
    const filter = { _id: id, createdBy: req.userId };
    let deleted = await postCommentModel.findOneAndDelete(filter);
    if (deleted) {
        res.status(200).json(new ResponseModel(null, true, ""))
    } else {
        res.status(400).json(new ResponseModel(null, false, req.t("un_Authorized_delete")))
    }

}

const GetAllCommentsPerPosts = async (req, res) => {
    const { postId,page, size } = req.query;
    const { skip, limit } = paginate(page,size)
      const commentsDb = await postCommentModel.find({ postId: postId} ).sort([['createdAt', -1]]).limit(limit).skip(skip).select('_id  comment createdAt ').populate([      
         {
             path: 'createdBy',
             select: "_id  firstName lastName personalImage"
          }
         
     ])
     var comments=[];
     commentsDb.forEach(function(obj){
        console.log(obj)
         comments.push(
         new PostComment(obj._id,obj.comment,obj.createdAt,
             (obj.createdBy._id== req.userId? true:false),
             new UserDataModel(obj.createdBy._id,obj.createdBy.firstName +" "+ obj.createdBy.lastName,obj.createdBy.personalImage))
        )
     });
 
     res.status(200).json(new ResponseModel(comments,true,""))
 }
export {AddCommentOnPost,EditComment,DeleteComment,GetAllCommentsPerPosts}

