import serviceModel from "../../../DB/models/categoryModel/service.js";
import ResponseModel from "../../../general/dto/responseModel.js";
import UserDataModel from "../../../general/dto/userDataModel.js";
import paginate from "../../../service/paginate.js";
import BaseModel from "../../lookUp/dto/modelData.js";
import { isCurrentUserFollowThisUser } from "../../user/controller/user.controller.js";
import { Service,ServiceDetails } from "../dto/serviceDto.js";

const createService = async (req, res) => {
    const { title, description, price, cityId, categoryId } = req.body
    if (req.fileErr) {
        res.status(400).json(new ResponseModel(req.files, false, req.t('InvalidFormat')))
    } else {
        const imagesURL = [];
        req.files.forEach(file => {
            imagesURL.push(`${req.finalDestination}/${file.filename}`)
        });
        const newService = new serviceModel({ title, images: imagesURL, description, price, cityId:cityId?.trim(),
             categoryId :categoryId?.trim(),publisherId:req.userId })
        const savedService = await newService.save()
        res.status(201).json(new ResponseModel(true, true, ""))
    }
}


const getAllServices = async (req, res) => {
    const { page, size, categoryId, cityId } = req.body;
    const { skip, limit } = paginate(1, 100)
    var servicesDb = []
    if (categoryId != null && cityId != null) {
        servicesDb = await serviceModel.find({
            $and: [{ categoryId: categoryId}, { cityId: cityId }
            ]
        }).sort([['title', -1]]).limit(limit).skip(skip).select('_id title description price images')
    } else if (categoryId != null ) {
        servicesDb = await serviceModel.find({ categoryId: categoryId }).sort([['title', 1]]).limit(limit).skip(skip).select('_id title description price images')
    } else if (cityId != null) {
        servicesDb = await serviceModel.find({ cityId: cityId }).sort([['title', 1]]).limit(limit).skip(skip).select('_id title description price images')
    } else {
        servicesDb = await serviceModel.find({}).sort([['title', 1]]).limit(limit).skip(skip).select('_id title description price images')
    }
    var Services = [];
    servicesDb.forEach(function (obj) {
        Services.push(
            new Service(obj._id, obj.title, obj.images[0], obj.description, obj.price)
        )
    });

    res.status(200).json(new ResponseModel(Services, true, ""))
}

const getServiceDetails = async (req, res) => {
    const { serviceId } = req.query;

    var serviceDb =   
     await serviceModel.findById(serviceId).sort([['title', -1]]).populate([      
        {
            path: 'publisherId',
            select: "_id  firstName lastName personalImage"
         },{
            path: 'cityId',
            select: "_id  nameEn nameAr"
         }])

        let isSelfPublished =  serviceDb.publisherId._id == req.userId ? true:false;
        let isFollow = false;
        let name ="";
        if (!isSelfPublished)
        {
            isFollow =await isCurrentUserFollowThisUser(serviceDb.publisherId._id ,req.userId) 
        }

        var serviceDetails=  new ServiceDetails(serviceDb._id,serviceDb.title,serviceDb.description,serviceDb.price,serviceDb.images,
            new UserDataModel(serviceDb.publisherId._id,serviceDb.publisherId.firstName +" "+ serviceDb.publisherId.lastName,serviceDb.publisherId.personalImage)
            ,null, isFollow,isSelfPublished)
        if (serviceDb.cityId)
        {
            if (req.get('Accept-Language') =='ar')
            {
              name ='nameAr';
            }else{
              name ='nameEn';
            }
          serviceDetails.city= new BaseModel(serviceDb.cityId._id,serviceDb.cityId[""+name+""])    
        }




    res.status(200).json(new ResponseModel(serviceDetails, true, ""))
}

export { createService,getAllServices ,getServiceDetails}