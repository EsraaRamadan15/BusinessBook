import * as express from 'express';
const router = express.Router();
import  {auth} from "../../middleware/auth.js";

import { userAuthorization } from "../../general/authorization/authorize.endpoint.js";
import { getAllUserPosts,getAllUserServices,getUserProfileData} from "./controller/user.controller.js";



router.get("/getUserPosts",auth(userAuthorization.endPoint),getAllUserPosts)
router.get("/getUserServices",auth(userAuthorization.endPoint),getAllUserServices)
router.get("/getUserProfileData",auth(userAuthorization.endPoint),getUserProfileData)





export default router