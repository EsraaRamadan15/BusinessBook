
import * as express from 'express';
const router = express.Router();

import { signup, login } from "./controller/registration.js";
import validation from "../../middleware/validation.js";
import {  signupValidation , loginValidation  } from "./auth.validation.js";

router.post('/register', validation(signupValidation),signup)


router.post("/login",validation(loginValidation) ,login)




export default router