import * as express from 'express';
const router = express.Router();
import  {auth} from "../../middleware/auth.js";

import  {myMulter,fileValdation,HME} from "../../service/uploadFile.js";
import { endPoint } from "./post.endPoint.js";
import { createPost } from "./controller/post.js";
import validation from "../../middleware/validation.js";
import * as validators from "./post.validation.js";

router.post('/addPost',  auth(endPoint.createPost), 
myMulter('/post', fileValdation.image).array('images', 5),HME,   validation(validators.createPost),createPost)


//router.post("/login",validation(validators.login) ,registrationController.login)




export default router