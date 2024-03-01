const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:[true, 'Enter name'],
        minlength: 3
    },
    email:{
        type:String,
        required:[true, 'Enter email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide a valid email'
        ],
        unique: true,

    },
    password:{
        type:String,
        required:[true, 'Enter password'],
        minlength: 3
    },

})
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})
UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name:this.name}, 'jwtSecret',{expiresIn:'30d'})
}
UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
module.exports = mongoose.model('User', UserSchema)