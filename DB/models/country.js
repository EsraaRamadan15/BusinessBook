import pkg from 'mongoose';
const { Schema, model } = pkg;

  
const countrySchema = new Schema({
    nameEn: {
        type: String,
        required: true
    },
    nameAr: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const countryModel = model('Country', countrySchema)
export default countryModel