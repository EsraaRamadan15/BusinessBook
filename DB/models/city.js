
import pkg from 'mongoose';
const { Schema, model } = pkg;

const citychema = new Schema({
    nameEn: {
        type: String,
        required: true
    },
    nameAr: {
        type: String,
        required: true
    },
    countryId:  {type: Schema.Types.ObjectId, ref: 'City',required:true} ,
}, {
    timestamps: true
})


const cityModel = model('City', citychema)
export default cityModel