const router = require('express').Router()

const registrationController = require("./controller/registration");
const validation = require("../../middleware/validation");
const validators = require("./auth.validation")

router.post('/register', validation(validators.signup),registrationController.signup)


router.post("/login",validation(validators.login) ,registrationController.login)




module.exports = router