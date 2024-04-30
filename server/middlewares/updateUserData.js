import userModel from "../models/userModel.js";

const updateUserData= async (req,res)=>{
    const {_id,generated,favourites}= req.body.body;
    const userExists=await userModel.findOne({_id});

    if(!userExists){
        return res.status(401).json({msg:"Unauthorized Access"});
    }

    console.log(generated);

    try {
        await userModel.updateOne({_id},
            {$set:{
            generated,
            favourites
        }});
        console.log("User Updated");
        return res.status(200).json({msg:"User Updated"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:error.message});
    }
}

export default updateUserData;