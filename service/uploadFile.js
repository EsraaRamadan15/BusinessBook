import pkg from 'multer';
const multer = pkg;

import { join,dirname } from "path"
import { fileURLToPath } from 'url';
import { nanoid } from "nanoid"
import { existsSync, mkdirSync } from 'fs'
import ResponseModel  from "../general/dto/responseModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileValdation = {
    image: ['image/jpeg', 'image/jpg',' image/png'],
    pdf: ['apllication/pdf']
}
const HME = (err, req, res, next) => {
    if (err) {
        res.status(400).json(new ResponseModel(err,false,err.toString()))
    } else {
        next()
    }
}

function myMulter(customPath, customValidation) {
    try {
        if (!customPath) {
            customPath = 'general'
        }
       
        const fullPath = join(__dirname, `../uploads/${customPath}`)
        if (!existsSync(fullPath)) {
            mkdirSync(fullPath, { recursive: true })
        }
        const storage = multer.diskStorage({
            
            destination: function (req, file, cb) {
                req.finalDestination = `uploads/${customPath}`
                cb(null, fullPath)
            },
            filename: function (req, file, cb) {
                cb(null, nanoid() + "_" + file.originalname)

            }
        })
      
        const fileFilter = function (req, file, cb) {
    
            if (customValidation.includes(file.mimetype)) {
                cb(null, true)
            } else {
                req.fileErr = true
                cb(null, false)
            }
    
        }
      
        const upload = multer({ dest: fullPath, limits: { fileSize: 625000 }, fileFilter, storage })
        return upload
    } catch (error) {
        res.status(500).json(new ResponseModel(null,false,error.toString()));
    }
   
}

export  {myMulter,fileValdation,HME}