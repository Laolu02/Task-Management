const jwt = require('jsonwebtoken')

const userModel = require('../model/userModel')

const authMW = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({message: "Login in to continue"})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decodedToken.id).select('-password')
        if (!user) {
            return res.status(401).json({message: "User not found"})
        }
        req.user = user
        next()
    } catch (error) {
        console.log("server error");
        
    }
}
module.exports = authMW

