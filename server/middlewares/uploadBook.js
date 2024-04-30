import fs from "fs";
import bookModel from "../models/bookModel.js";

const uploadBook=async (req,res,next)=>{
    const filePath="./public/books/";
    
    fs.readFile(filePath+"temp.pdf",async (err,pdfData)=>{
        if(err){
            console.log('Error reading PDF File : ',err);
            return;
        }
        
        fs.readFile(filePath+req.files.coverPhoto[0].originalname,async (err,coverPhoto)=>{
            if(err){
                console.log('Error reading Cover Photo File : ',err);
                return;
            }

            let isError=false;

            try {
                const {
                    title,
                    author,
                    rating,
                    count,
                    description,
                    character1Name,
                    character1Description,
                    character2Name,
                    character2Description,
                    character3Name,  
                    character3Description
                }=req.body;
        
                let ratingF=parseFloat(rating);
                let countI=parseInt(count);
        
                const newBook=new bookModel({
                    title,
                    author,
                    coverPhoto,
                    rating:ratingF,
                    count:countI,
                    description,
                    mainCharacters:[{
                        name:character1Name,
                        description:character1Description
                    },
                    {
                        name:character2Name,
                        description:character2Description
                    },
                    {
                        name:character3Name,
                        description:character3Description
                    }],
                    pdfData
                });
            
                await newBook.save(); 
                console.log("book saved");
            
            } catch (error) {
                console.log("Error occured while uploading book to MongoDB : ",error);
                isError=true;
            }finally{
                fs.unlink(filePath+"temp.pdf",(err)=>{
                    if(err)throw err;
                    console.log("pdf deleted");
                });
                fs.unlink(filePath+req.files.coverPhoto[0].originalname,(err)=>{
                    if(err)throw err;
                    console.log("coverPhoto deleted");
                });
            }
        
            if(isError){
                return res.status(500).json({
                    msg:"Couldnt upload file due to either server or database issue."
                });
            }else{
                return res.status(200).json({
                    msg:"Book data uploaded succesfully"
                });
            }

        });
    });    

    next();
};

export default uploadBook;