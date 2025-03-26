const err = require('../Middleware/errorMW')
const generateToken = require('../jwt/tokengenerate')
const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')


const registration = async (req, res) => {
    const {username,email,password} = req.body
    if (!username || !email|| ! password) {
      return res.satus(404).json({message: ' All input field must be entered'})  
    }
    try {
        const user = await userModel.findOne({username, email})
        if (user) {
            return res.status(409).json('User exist') 
        }
        const salt = bcrypt.genSaltSync(10)
        const hashpassword = bcrypt.hashSync(password, salt);
        const newUser = new userModel({...req.body, password: hashpassword})
        await newUser.save()
        res.status(200).json({message:'User registered', newUser})
    } catch (error) {
        res.status(500).json({ message: "Somethin went wrong", err})
    }
}

const login = async (req,res) => {
    const { email, password} =req.body
    try {
        const user= await userModel.findOne({email})
        if (!user) {
            return res.json({message: ' username or password incorrect'}).status(400)
            
        }
        const comparison = await bcrypt.compare(password, user.password)
            if (!comparison) {
                return res.status(400).json("Username or password incorrect")
                
            }
            const {password: _ , ...userData} = user.toObject();
            const token =  await generateToken (user._id);
            res 
                .cookie('token', token, {
                   httpOnly: true,
                   secure: process.env.NODE_Env ==='production',
                   sameSite: 'strict',
                   maxAge: 3600000 
                })
        res.status(200).json({message: 'Login successfully', user: userData})
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {registration, login}