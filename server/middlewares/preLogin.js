import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const preLogin= async (req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        return res.status(401).json({msg:'Please fill out all the fields.'});
    }

    try {
        const usernameExists=await userModel.findOne({username:username});
        if(!usernameExists){
            return res.status(402).json({msg:'Invalid Credentials 0'});
        }

        const isMatch=await bcrypt.compare(password,usernameExists.password); 

        if(!isMatch){
            return res.status(402).json({msg:'Invalid Credentials 1'});
        }
        
        if(usernameExists.tokens.length===0){
            const token=await usernameExists.generateJWT();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+12946000000),
                httpOnly:true
            });
        } 

        res.status(201).json({msg:"User Login Successful",userToken:usernameExists.tokens[0].token});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"});
    }
};

export default preLogin;