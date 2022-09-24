import * as express from 'express';
const router = express.Router();
import  {auth} from "../../middleware/auth.js";

import  {myMulter,fileValdation,HME} from "../../service/uploadFile.js";
import { userAuthorization } from "../../general/authorization/authorize.endpoint.js";
import { createCateogry,getAllCateogries} from "./controller/category.js";
import validation from "../../middleware/validation.js";
import * as validators from "./category.validation.js";
import { createService ,getAllServices,getServiceDetails} from './controller/service.js';

router.post('/addCategory',   
 myMulter('/category', fileValdation.image).single('image'),HME,   validation(validators.createCateogry),createCateogry)

//router.get("/getAllCateogries",getAllCateogries)

router.get("/getAllCategories",auth(userAuthorization.endPoint),getAllCateogries)



router.post('/addService',   auth(userAuthorization.endPoint),
 myMulter('/service', fileValdation.image).array('images',5),HME,   validation(validators.createService),createService)
 
 router.post("/getAllServices",auth(userAuthorization.endPoint),getAllServices)

 router.get("/getServiceDetails",auth(userAuthorization.endPoint),getServiceDetails)





export default router