const router = require('express').Router()

const lookupController = require("./controller/lookup");

router.get('/GetAllCountries',lookupController.getAllCountries)
router.get('/GetAllCitiesByCountry',lookupController.getAllCities)


module.exports = router