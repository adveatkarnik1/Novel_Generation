import bookModel from "../models/bookModel.js";

const getBookData= async (req,res)=>{
    // console.log(req.body.body);
    const reqFields=req.body.body.reqFields;
    try {
        let filter={};
        let f=0;
        if(!reqFields.includes('*')){
            f=1;
            filter={
                coverPhoto:1,
                title:1,
                rating:1,
                description:1   
            }
        }
        console.log("f",f);

        const bookData=await bookModel.findOne({_id:req.query._id}).select(filter);
        setTimeout(()=>{
            if(!bookData)return res.status(200).json({msg:"No results"});
            return res.status(200).json(bookData);
        },2000);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error"});
    }
};

export default getBookData;