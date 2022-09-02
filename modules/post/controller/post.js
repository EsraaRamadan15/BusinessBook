

import postModel from "../../../DB/models/postModels/post.js";
import userModel from "../../../DB/models/user.js";
import paginate from "../../../service/paginate.js";

import ResponseModel  from "../../../general/dto/responseModel.js";
import Post  from "../dto/post.js";
import UserDataModel from "../../../general/dto/userDataModel.js";
const createPost = async (req, res) => {
    const { title } = req.body
    if (req.fileErr) {
        res.status(400).json(new ResponseModel(req,false, req.t('InvalidFormat')  ))
    } else {
        const imageURL = [];
        req.files.forEach(file => {
            imageURL.push(`${req.finalDestination}/${file.filename}`)
        });

        const newPost = new postModel({ title, media: imageURL, createdBy: req.userId })
        const savedPost = await newPost.save()
        res.status(201).json(new ResponseModel(true,true,""))
    }
}

const getAllPosts = async (req, res) => {
   const { page, size } = req.query
   const { skip, limit } = paginate(page,size)
     let userFollowing= await userModel.findById( req.userId ).select('following')
     userFollowing=userFollowing.following.map(x => x.toString())
     userFollowing.push(req.userId)
     const postsDb = await postModel.find({ "createdBy": { "$in": userFollowing } } ).sort([['createdAt', -1]]).limit(limit).skip(skip).select('_id title media createdAt likes comments').populate([      
        {
            path: 'createdBy',
            select: "_id  firstName lastName personalImage"
         },{
            path: 'likes',
            match: {
                userId: req.userId
            },
            select: "react"
         }
        
    ])
    var Posts=[];
    postsDb.forEach(function(obj){
        let selfReact=null;
        if (obj.likes.length >0)
        {
            selfReact=obj.likes[0].react;
        }
        Posts.push(
        new Post(obj._id,obj.title,obj.media,obj.createdAt,obj.likes.length,obj.comments.length,selfReact,
            new UserDataModel(obj.createdBy._id,obj.createdBy.firstName +" "+ obj.createdBy.lastName,obj.createdBy.personalImage))
       )
    });

    res.status(200).json(new ResponseModel(Posts,true,""))
}


export { createPost ,getAllPosts}
