import jwt from "jsonwebtoken"; 
import userModel from "../models/userModel.js";

const getUserData= async (req,res)=>{
    console.log(req);
    const token=req.header("Authorization");

    if(!token){
        return res.status(401).json({msg:"Unauthorized HTTP. No Token"});
    }

    const jwtToken=token.replace("Bearer","").trim();

    try {
        const isVerified=jwt.verify(jwtToken,process.env.SECRET_KEY);

        const userData=await userModel.findOne({email:isVerified.email}).select({password:0});
        
        req.user=userData;

        return res.status(200).json({userData:userData});
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg:"Unauthorized. Invalid Token"});
    }
};

export default getUserData;