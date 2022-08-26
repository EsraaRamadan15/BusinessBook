import * as express from 'express';
const router = express.Router();
import  {auth} from "../../middleware/auth.js";

import  {myMulter,fileValdation,HME} from "../../service/uploadFile.js";
import { endPoint } from "./post.endPoint.js";
import { createPost,getAllPosts } from "./controller/post.js";
import {AddCommentOnPost,DeleteComment,EditComment ,GetAllCommentsPerPosts} from "./controller/postComment.js";
import { GetAllReactsPerPosts, reactOnPost } from "./controller/postLike.js";
import validation from "../../middleware/validation.js";
import * as validators from "./post.validation.js";

router.post('/addPost',  auth(endPoint.createPost), 
myMulter('/post', fileValdation.image).array('media', 5),HME,   validation(validators.createPost),createPost)


router.post("/reactOnPost",auth(endPoint.createPost),validation(validators.reactPost) ,reactOnPost)
router.get("/getAllPosts",auth(endPoint.createPost),getAllPosts)
router.get("/getAllReactsPerPost",auth(endPoint.createPost),GetAllReactsPerPosts)


router.post("/addCommentOnPost",auth(endPoint.createPost),AddCommentOnPost)
router.patch("/editComment",auth(endPoint.createPost),EditComment)
router.delete("/deleteComment",auth(endPoint.createPost),DeleteComment)
router.get("/getAllCommentsPerPost",auth(endPoint.createPost),GetAllCommentsPerPosts)




export default router