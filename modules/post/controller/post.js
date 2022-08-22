import { query } from "express";
import pkg from 'mongoose';
const { Model } = pkg;

import postModel from "../../../DB/models/postModels/post.js";
import postLikeModel from "../../../DB/models/postModels/postLike.js";

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
 //   const { page, size } = req.query
   // const { skip, limit } = paginate(page, size)
    const post = await postModel.find({}).select('_id title media createdAt likes').populate([
        
        {
            path: 'createdBy',
            select: "_id  firstName lastName personalImage"
         }
        
    ])

    res.status(200).json({  post })
}


export { createPost ,getAllPosts}
