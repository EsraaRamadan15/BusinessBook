import serviceModel from "../../../DB/models/categoryModel/service.js";
import ResponseModel from "../../../general/dto/responseModel.js";
import paginate from "../../../service/paginate.js";
import Service from "../dto/serviceDto.js";

const createService = async (req, res) => {
    const { title, description, price, cityId, categoryId } = req.body
    if (req.fileErr) {
        res.status(400).json(new ResponseModel(req.files, false, req.t('InvalidFormat')))
    } else {
        const imagesURL = [];
        req.files.forEach(file => {
            imagesURL.push(`${req.finalDestination}/${file.filename}`)
        });
        const newService = new serviceModel({ title, images: imagesURL, description, price, cityId:cityId?.trim(), categoryId :categoryId?.trim()})
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

export { createService,getAllServices }