const User =require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = (req,res,next) => {
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startWith('Bearer ')){
        throw new UnauthenticatedError('Authentacation invalid')
    }
    const token = authHeader.split('')(1)
    try {
       const payload = jwt.verify(token, 'jwtSecret') 
       // attach the user to the job routes
       const user = User.findById(payload.id).select('-password')
       req.user = user
       next()
    } catch (error) {
        throw new UnauthenticatedError('Authentacation invalid')
    }
}
module.exports = auth