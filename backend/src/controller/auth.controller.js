const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

async function userRegister(req,res){

    const {fullName:{firstName,lastName}, email, password} = req.body;

    const isUserExist = await userModel.findOne({email})
    
    if(isUserExist){
        return res.status(400).json({
             message:"User Already Exist"
        })
    }
      
    const hashPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        fullName:{firstName,lastName},
        email,
        password:hashPassword
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        email:user.email,
        id:user._id,
        fullName:user.fullName
    })
}


async function userLogin(req,res){
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"user not found!"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid Password, try again"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"User Login Successfully",
        user:{
            email:user.email,
            id:user._id,
            fullName:user.fullName
        }
    })
}


module.exports = {userRegister,userLogin}