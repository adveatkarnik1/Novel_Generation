import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";


const preRegister= async (req,res)=>{
    const {username,email,password}=req.body;

    if(!username || !email || !password){
        return res.status(401).json({msg:"Please fill out all th fields."});
    } 

    try {
        const usernameExists=await userModel.findOne({username:username});
        const emailExists=await userModel.findOne({email:email});

        if(usernameExists){
            return res.status(403).json({msg:'Username already exists. Use another Username.'});
        }
        if(emailExists){
            return res.status(403).json({msg:'Email already exists. Please use another Email.'});
        }    
        
        // Create new user then 
        // hash password
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);

        const newUser=new userModel({username,email,password:hashedPassword,date:Date.now(),generated:[],favourites:[],photo:["https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"],isAdmin:false});
        await newUser.save();

        res.status(201).json({msg:'User registered succesfully novel'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"});
    }
};

export default preRegister;