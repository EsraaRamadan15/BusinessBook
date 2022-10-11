
import pkg from 'mongoose';
const { Schema } = pkg;
import postModel from "../../../DB/models/postModels/post.js";
import userModel from "../../../DB/models/user.js";
import paginate from "../../../service/paginate.js";

import ResponseModel from "../../../general/dto/responseModel.js";
import Post from "../dto/post.js";
import UserDataModel from "../../../general/dto/userDataModel.js";
const createPost = async (req, res) => {
    const { title } = req.body
    if (req.fileErr) {
        res.status(400).json(new ResponseModel(req.files, false, req.t('InvalidFormat')))
    } else {
        //console.log(req.file)
        const imageURL = [];
        req.files.forEach(file => {
            imageURL.push(`${req.finalDestination}/${file.filename}`)
        });
        const newPost = new postModel({ title, media: imageURL, createdBy: req.userId })
        const savedPost = await newPost.save()
        res.status(201).json(new ResponseModel(true, true, ""))
    }
}

const UploadFile = async (req, res) => {
    //const { title } = req.body
    if (req.fileErr) {
        res.status(400).json(new ResponseModel(req.file, false, req.t('InvalidFormat')))
    } else {
        console.log(req.file)
        const imageURL = [];
        // req.files.forEach(file => {
        //     imageURL.push(`${req.finalDestination}/${file.filename}`)
        // });
        imageURL.push(`${req.file.finalDestination}/${req.file.filename}`)
        res.status(201).json(new ResponseModel(req.file, true, ""))
    }
}

const getAllPosts = async (req, res) => {
    const { page, size } = req.query
    const { skip, limit } = paginate(1, 100)
    var follwedByPosts = await GetPostsForOtherUsers(req.userId);
    var rearrangedPosts = await ReArrangePostsSort(follwedByPosts, req.userId);
    res.status(200).json(new ResponseModel(rearrangedPosts, true, ""))
}


async function GetPostsForOtherUsers(userId) {

    let followerPostsDb = await postModel.find({ "createdBy": { "$ne": userId } }).sort([['createdAt', -1]]).select('_id title media createdAt likes comments').populate([
        {
            path: 'createdBy',
            select: "_id  firstName lastName personalImage"
        }, {
            path: 'likes',
            match: {
                userId: userId
            },
            select: "react"
        }

    ])

    return followerPostsDb;
}

async function ReArrangePostsSort(posts, userId) {
    let userFollowing = await userModel.findById(userId).select('following')
    userFollowing = userFollowing.following.map(x => x.toString())
    var followedUsers = posts.filter(x => userFollowing.includes(x.createdBy._id.toString()));
    var notFollowedUsers = posts.filter(x => !userFollowing.includes(x.createdBy._id.toString()));

    var posts = followedUsers.concat(notFollowedUsers);

    return posts;
}

export { createPost, getAllPosts, UploadFile }
