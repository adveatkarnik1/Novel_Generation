import bookModel from "../models/bookModel.js";

const getSearchResults= async (req,res)=>{
    console.log(req.query.search);
    if(!req.query.search)return null;
    try {
        const results=await bookModel.aggregate([
            {
                $search:{
                    index:"search_books",
                    text:{
                        query:req.query.search,
                        path:["title","author","description","mainCharacters.name","mainCharacters.description"]
                    }
                },
            },
            {
                $project: {
                  title: 1,
                  coverPhoto: 1,
                  description: 1
                }
            },
            {
                $sort:{
                    rating:-1
                }
            }
        ])

        setTimeout(()=>{
            console.log(results.length);
            return res.status(200).json(results);
        },2000);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error"});
    }
}

export default getSearchResults;