const cityModel = require("../../../DB/models/city");
const countryModel = require("../../../DB/models/country");

const getAllCountries = async (req, res) => {
    const countries =await  countryModel.find({});
    res.status(200).json({countries})
}


const getAllCities = async (req, res) => {
    var id = req.query.id;
     console.log(id)
    const cities =await  cityModel.find({ countryId :req.query.id});
    res.status(200).json({cities})
}
module.exports= {getAllCountries,getAllCities}