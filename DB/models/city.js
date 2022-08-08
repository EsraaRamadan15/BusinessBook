const mongoose = require('mongoose')

const citychema = new mongoose.Schema({
    nameEn: {
        type: String,
        required: true
    },
    nameAr: {
        type: String,
        required: true
    },
    countryId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Country',required:true} ,
}, {
    timestamps: true
})


const cityModel = mongoose.model('City', citychema)
module.exports = cityModel