import  cityModel  from "../../../DB/models/city.js";
import  countryModel from "../../../DB/models/country.js";
import ResponseModel from "../../../general/dto/responseModel.js";
import BaseModel from "../dto/modelData.js";

const getAllCountries = async (req, res) => {
    let countriesDb = [],name='';

    if (req.get('Accept-Language') =='ar')
    {
      name ='nameAr';
    }else{
      name ='nameEn';
    }
    countriesDb = await countryModel.find({  } ).sort([[''+name+'', 1]]).select('_id '+name)

     var countries=[];
     countriesDb.forEach(function(obj){
       countries.push(new BaseModel(obj._id,obj[""+name+""],obj.image))
   });
    res.json(new ResponseModel(countries, true, ""))
}


const getAllCities = async (req, res) => {
    var id = req.query.id;
    let citiesDb = [],name='';

    if (req.get('Accept-Language') =='ar')
    {
      name ='nameAr';
    }else{
      name ='nameEn';
    }
    citiesDb = await cityModel.find({countryId :id  } ).sort([[''+name+'', 1]]).select('_id '+name)

     var cities=[];
     citiesDb.forEach(function(obj){
       cities.push(new BaseModel(obj._id,obj[""+name+""]))
   });
    res.json(new ResponseModel(cities, true, ""))
}
export  {getAllCountries,getAllCities}