const User = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')



const resgister  = async (req, res) =>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})
}
const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('please provide email and password ')
    }
    const user = await User.findOne({email})
    // compare password
    if (!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid password')
    }
    //compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

module.exports = {
    resgister,
    login
}