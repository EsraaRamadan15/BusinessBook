import * as express from 'express';
const router = express.Router();
import  {auth} from "../../middleware/auth.js";

import  {myMulter,fileValdation,HME} from "../../service/uploadFile.js";
import { userAuthorization } from "../../general/authorization/authorize.endpoint.js";
import { createPost,getAllPosts ,UploadFile} from "./controller/post.js";
import {AddCommentOnPost,DeleteComment,EditComment ,GetAllCommentsPerPosts} from "./controller/postComment.js";
import { GetAllReactsPerPosts, reactOnPost } from "./controller/postLike.js";
import validation from "../../middleware/validation.js";
import * as validators from "./post.validation.js";

router.post('/addPost',  auth(userAuthorization.endPoint), 
 myMulter('/post', fileValdation.image).array('media', 5),HME,   validation(validators.createPost),createPost)
// router.post('/uploadFile',
// myMulter('/post', fileValdation.image).single('media'),  UploadFile)

router.post("/reactOnPost",auth(userAuthorization.endPoint),validation(validators.reactPost) ,reactOnPost)
router.get("/getAllPosts",auth(userAuthorization.endPoint),getAllPosts)
router.get("/getAllReactsPerPost",auth(userAuthorization.endPoint),GetAllReactsPerPosts)


router.post("/addCommentOnPost",auth(userAuthorization.endPoint),AddCommentOnPost)
router.patch("/editComment",auth(userAuthorization.endPoint),EditComment)
router.delete("/deleteComment",auth(userAuthorization.endPoint),DeleteComment)
router.get("/getAllCommentsPerPost",auth(userAuthorization.endPoint),GetAllCommentsPerPosts)




export default router