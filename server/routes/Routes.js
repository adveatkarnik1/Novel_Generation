import express from "express";  
import getUserData from "../middlewares/getUserData.js";
import getBookData from "../middlewares/getBookData.js";
import getSearchResults from "../middlewares/getSearchResults.js";
import preLogin from "../middlewares/preLogin.js";
import preRegister from "../middlewares/preRegister.js";
import multer from "multer";
import holdBook from "../middlewares/holdBook.js";
import uploadBook from "../middlewares/uploadBook.js";
import updateUserData from "../middlewares/updateUserData.js";
import updateBookRating from "../middlewares/updateBookRating.js";




const router=express.Router();

// GET Requests
router.get('/',(req,res)=>{
    res.send("<h1>Novel Generator Home</h1>");
});

// Verify Token and Get User Data
router.get("/getUserData",getUserData);

// Get Book details
router.post("/getBookData",getBookData);

// Get Search results
router.get("/explore",getSearchResults);



// POST Request

// Register
router.post('/register', preRegister);

// Login
router.post('/login', preLogin);


// Uploading Book data to MongoDB
const upload=multer({storage:holdBook});
router.post("/uploadBook", upload.fields([{name:"pdf"},{name:"coverPhoto"}]) , uploadBook);


// Update User details
router.post("/updateUser",updateUserData);

// Update Book Rating
router.post("/updateBookRating",updateBookRating);


export default router;