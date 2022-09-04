

import categoryModel from "../../../DB/models/categoryModel/category.js";
import paginate from "../../../service/paginate.js";
import ResponseModel  from "../../../general/dto/responseModel.js";
import Category from "../dto/cateogryDto.js";


const createCateogry= async (req, res) => {
    const { nameEn,nameAr } = req.body
    if (req.fileErr) {
        res.status(400).json(new ResponseModel(req.file,false, req.t('InvalidFormat')  ))
    } else {
        //console.log(req.file)
        const imageURL = `${req.finalDestination}/${req.file.filename}`;
        const newCategory= new categoryModel({ nameEn,nameAr, image: imageURL})
        const savedCategory = await newCategory.save()
        res.status(201).json(new ResponseModel(true,true,""))
    }
}


const getAllCateogries = async (req, res) => {
    const { page, size } = req.query
    const { skip, limit } = paginate(1,100)
      let cateogriesDb = [],name='';

      if (req.get('Accept-Language') =='ar')
      {
        name ='nameAr';
      }else{
        name ='nameEn';
      }
      cateogriesDb = await categoryModel.find({  } ).sort([[''+name+'', -1]]).limit(limit).skip(skip).select('_id '+name+' image')

       var categories=[];
       cateogriesDb.forEach(function(obj){
         categories.push(new Category(obj._id,obj[""+name+""],obj.image))
     });
 
     res.status(200).json(new ResponseModel(categories,true,""))
 }
 


export { createCateogry,getAllCateogries }
