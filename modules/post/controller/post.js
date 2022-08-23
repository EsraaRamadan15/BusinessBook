

import postModel from "../../../DB/models/postModels/post.js";
import userModel from "../../../DB/models/user.js";
import paginate from "../../../service/paginate.js";

const createPost = async (req, res) => {
    const { title } = req.body
    console.log(title)
    if (req.fileErr) {
        res.status(400).json({ Issuccessd: false, message: "in-valid format" })
    } else {
        const imageURL = [];
        req.files.forEach(file => {
            imageURL.push(`${req.finalDestination}/${file.filename}`)
        });

        const newPost = new postModel({ title, media: imageURL, createdBy: req.userId })
        const savedPost = await newPost.save()
        res.status(201).json({ Issuccessd: true })
    }
}

const getAllPosts = async (req, res) => {
   const { page, size } = req.query
   const { skip, limit } = paginate(page,size)
     let userFollowing= await userModel.findById( req.userId ).select('following')
     userFollowing=userFollowing.following.map(x => x.toString())
     userFollowing.push(req.userId)
     const posts = await postModel.find({ "createdBy": { "$in": userFollowing } } ).sort([['createdAt', -1]]).limit(limit).skip(skip).select('_id title media createdAt likes').populate([      
        {
            path: 'createdBy',
            select: "_id  firstName lastName personalImage"
         }
        
    ])
    var mappedPosts=[];
    posts.forEach(function(obj){
        mappedPosts.push({UserModel :{ "Id": obj.createdBy._id ,"Name" :obj.createdBy.firstName +" "+ obj.createdBy.lastName,"PersonalImage":obj.createdBy.personalImage}, 
         "Id":obj._id,
         "Title":obj.title,
         "Media":obj.media,
         "Date":obj.createdAt,
        "likesCount":obj.likes.length})
    });
    res.status(200).json({ "Posts": mappedPosts })
}


export { createPost ,getAllPosts}
