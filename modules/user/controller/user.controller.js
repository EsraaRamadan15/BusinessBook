import serviceModel from "../../../DB/models/categoryModel/service.js";
import postModel from "../../../DB/models/postModels/post.js";
import userModel from "../../../DB/models/user.js";
import ResponseModel from "../../../general/dto/responseModel.js";
import UserDataModel from "../../../general/dto/userDataModel.js";
import paginate from "../../../service/paginate.js";
import {Service} from "../../category/dto/serviceDto.js";
import Post from "../../post/dto/post.js";
import User from "../../auth/dto/user.js";


const getAllUserPosts = async (req, res) => {
    const { page, size } = req.query
    const { skip, limit } = paginate(1,100)
      const postsDb = await postModel.find({ "createdBy": req.userId } ).sort([['createdAt', -1]]).limit(limit).skip(skip).select('_id title media createdAt likes comments').populate([      
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
         let selfReact=null,reactId=null;;
         if (obj.likes.length >0)
         {
             selfReact=obj.likes[0].react;
             reactId=obj.likes[0]._id;
         }
         Posts.push(
         new Post(obj._id,obj.title,obj.media,obj.createdAt,obj.likes.length,obj.comments.length,selfReact,reactId,
             new UserDataModel(obj.createdBy._id,obj.createdBy.firstName +" "+ obj.createdBy.lastName,obj.createdBy.personalImage))
        )
     });
 
     res.status(200).json(new ResponseModel(Posts,true,""))
 }

 const getAllUserServices = async (req, res) => {
    const { page, size } = req.query;
    const { skip, limit } = paginate(1, 100)
    var  servicesDb = await serviceModel.find({ publisherId: req.userId }).sort([['title', 1]]).limit(limit).skip(skip).select('_id title description price images')

    var Services = [];
    servicesDb.forEach(function (obj) {
        Services.push(
            new Service(obj._id, obj.title, obj.images[0], obj.description, obj.price)
        )
    });

    res.status(200).json(new ResponseModel(Services, true, ""))
}

const getUserProfileData = async (req, res) => {
    const savedUser = await userModel.findById( req.userId );
    if (!savedUser) {
        res.status(404).json(new ResponseModel(null, false, "in-valid account email"))
    } else {

        let user= new User(savedUser._id,savedUser.firstName, savedUser.lastName, savedUser.email, savedUser.deviceToken, savedUser.birthDate,
            savedUser.phone, savedUser.jobTitle, savedUser.specialty, savedUser.businessType, savedUser.country,
            savedUser.city, savedUser.gender, savedUser.address, savedUser.personalImage, savedUser.coverImage);
            user.followersNumber = savedUser.follower.length
            user.followingsNumber = savedUser.following.length
        res.status(200).json( new ResponseModel(user, true, ""))
    }
}

const isCurrentUserFollowThisUser = async function(id,currentUserId) {
    let fowllowedUsers = await userModel.findById( id).select("follower");
    return fowllowedUsers.follower.includes(currentUserId)
}

 export {getAllUserPosts,getAllUserServices,getUserProfileData,isCurrentUserFollowThisUser}
 