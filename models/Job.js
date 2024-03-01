const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, "provide company name"],
    },
    position:{
        type:String,
        required:[true, "provide position"],
    },
    status:{
        type:String,
        enum:['interview','declined','pending']
    },
    createdBy:{
        type:mongoose.Types.ObjectId, //assign it to user
        ref: 'User',
        required: [true,'provide user']
       }
},{timestamps:true})

module.exports = mongoose.model('job', JobSchema)