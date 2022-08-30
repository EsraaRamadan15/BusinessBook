
import * as express from 'express';
const router = express.Router();

import { signup, login ,sendCode,forgetPassword} from "./controller/registration.js";
import validation from "../../middleware/validation.js";
import {  signupValidation , loginValidation  } from "./auth.validation.js";

router.post('/register', validation(signupValidation),signup)

router.post("/login",validation(loginValidation) ,login)
router.post("/sendCode",sendCode)
router.patch("/forgetPassword",forgetPassword)



export default router