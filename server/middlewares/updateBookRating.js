import bookModel from "../models/bookModel.js";
import userModel from "../models/userModel.js";

const updateBookRating=async (req,res)=>{
    const {book_id,user_id,rating}=req.body.body;

    const bookExists=await bookModel.findOne({_id:book_id});
    const userExists=await userModel.findOne({_id:user_id});

    if(!(bookExists && userExists)){
        return res.status(401).json({msg:"Invalid Request either by unauthorized User or unavailable book"});
    }

    let updatedRating=((parseFloat(bookExists.rating)*parseFloat(bookExists.count))+parseFloat(rating))/(parseFloat(bookExists.count)+1);
    updatedRating=updatedRating.toPrecision(2);


    try {
        await bookModel.updateOne({_id:book_id},{
            $set:{
                rating:updatedRating,
                count:bookExists.count+1
            }
        });

        console.log("Book rating Updated");
        return res.status(200).json({msg:"Book rating Updated"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:error.message});
    }

};

export default updateBookRating;