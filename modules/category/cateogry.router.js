import * as express from 'express';
const router = express.Router();
import  {auth} from "../../middleware/auth.js";

import  {myMulter,fileValdation,HME} from "../../service/uploadFile.js";
import { userAuthorization } from "../../general/authorization/authorize.endpoint.js";
import { createCateogry,getAllCateogries} from "./controller/category.js";
import validation from "../../middleware/validation.js";
import * as validators from "./category.validation.js";

router.post('/addCategory',   
 myMulter('/category', fileValdation.image).single('image'),HME,   validation(validators.createCateogry),createCateogry)

//router.get("/getAllCateogries",getAllCateogries)

router.get("/getAllCategories",auth(userAuthorization.endPoint),getAllCateogries)





export default router