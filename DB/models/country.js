const mongoose = require('mongoose')

  
const countrySchema = new mongoose.Schema({
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

const countryModel = mongoose.model('Country', countrySchema)
module.exports = countryModel