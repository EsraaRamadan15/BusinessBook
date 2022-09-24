import pkg from 'mongoose';
const { Schema, model } = pkg;


const serviceSchema = new Schema({
    title: {type: String,required:true} ,
    description: String,
    price: {type: Number,required:true} ,
    images: Array,
    categoryId:  {type: Schema.Types.ObjectId, ref: 'Category',required:true} ,
    cityId:  {type: Schema.Types.ObjectId, ref: 'City'} ,
    publisherId:  {type: Schema.Types.ObjectId, ref: 'User',required:true} ,

    }, 
     {
    timestamps: true
})



const serviceModel = model('Service', serviceSchema)
export default serviceModel