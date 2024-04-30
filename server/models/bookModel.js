import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,"Please provide a title for the book"],
    },
    author:{
        type:String,
        default:"Unknown"
    },
    coverPhoto:{
        type:Buffer,
        require:true,
        contentType:String
    },
    rating:{
        type:Number,
        min:0
    },
    count:{
        type:Number,
        min:0
    },
    description:{
        type:String,
        require:[true,"Please provide description"]
    },
    mainCharacters:[
        {
            name:{
                type:String,
                require:true
            },
            description:{
                type:String,
                require:true
            }
        }
    ],
    pdfData:{
        type:Buffer,
        require:true
    }
});

export default mongoose.model.books || mongoose.model("books",bookSchema);