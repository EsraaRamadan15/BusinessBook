import  cityModel  from "../../../DB/models/city.js";
import  countryModel from "../../../DB/models/country.js";

const getAllCountries = async (req, res) => {
    const countries =await  countryModel({});
    res.status(200).json({countries})
}


const getAllCities = async (req, res) => {
    var id = req.query.id;
    const cities =await  cityModel({ countryId :req.query.id});
    res.status(200).json({cities})
}
export  {getAllCountries,getAllCities}