import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

//create Token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//login user

const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({success:false,message:'User does not exists'})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.status(401).json({success:false,message:"Wrong credentials"}) 
        }

        const token = createToken(user._id);

        res.status(200).json({
            success:true,
            token        
        })

    } catch (error) {
        console.log("Error in login controlle",error);
        res.status(500).json({success:false,
            message:"Internal server error"
        })
    }

}


//signup user

const signup = async(req,res) =>{
    try {
        const {name,password,email} = req.body;

        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({success:false,message:'User already exists'});
        }

        if(!validator.isEmail(email)){
            return res.status(403).json({success:false,message:'Please enter valid email'});
        }

        if(password.length <8 ){
            return res.status(403).json({success:false,message:'Please enter strong password'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        });

       const user =  await newUser.save();
       const token = createToken(user._id);
       res.status(201).json({success:true,token})
    } catch (error) {
        console.log("Error in signup controller",error);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}


export{login,signup}