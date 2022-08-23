import * as express from 'express';
const router = express.Router();
import  {auth} from "../../middleware/auth.js";

import  {myMulter,fileValdation,HME} from "../../service/uploadFile.js";
import { endPoint } from "./post.endPoint.js";
import { createPost,getAllPosts } from "./controller/post.js";
import { reactOnPost } from "./controller/postLike.js";
import validation from "../../middleware/validation.js";
import * as validators from "./post.validation.js";

router.post('/addPost',  auth(endPoint.createPost), 
myMulter('/post', fileValdation.image).array('media', 5),HME,   validation(validators.createPost),createPost)


router.post("/reactOnPost",auth(endPoint.createPost),validation(validators.reactPost) ,reactOnPost)
router.get("/getAllPosts",auth(endPoint.createPost),getAllPosts)
//router.get("/getAllPosts",auth(endPoint.createPost),getAllPosts)





export default router