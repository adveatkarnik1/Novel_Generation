import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:[true,'Please Provide Username.'],
        unique:[true,'Username already exists.']
    },
    email:{
        type:String,
        require:[true,'Please provide Email'],
        unique:true
    },
    password:{
        type:String,
        require:[true,"Please provide a password"],
        unique:true
    },
    photo:[
        {}
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    generated:[
        {}
    ],
    favourites:[
        {}
    ],
    isAdmin:{
        type:Boolean
    }
});

UserSchema.methods.generateJWT=async function(){
    try {
        let token=jwt.sign({
            _id:this._id,
            username:this.username,
            email:this.email
        },process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

export default mongoose.model.user || mongoose.model("user",UserSchema);