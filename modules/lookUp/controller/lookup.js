import  cityModel  from "../../../DB/models/city.js";
import  countryModel from "../../../DB/models/country.js";
import ResponseModel from "../../../general/dto/responseModel.js";

const getAllCountries = async (req, res) => {
    const countries =await  countryModel({});
    res.status(200).json({countries})
    res.json(new ResponseModel(countries, true, ""))
}


const getAllCities = async (req, res) => {
    var id = req.query.id;
    const cities =await  cityModel({ countryId :req.query.id});
    res.json(new ResponseModel(cities, true, ""))
}
export  {getAllCountries,getAllCities}