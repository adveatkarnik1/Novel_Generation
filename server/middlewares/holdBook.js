import multer from "multer";

const holdBook = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/books");
    },
    filename: function (req, file, cb) {
      if(file.fieldname==="pdf"){
        cb(null, "temp.pdf");
      }else{
        cb(null, file.originalname);
      }
      
    }
});

export default holdBook;
  