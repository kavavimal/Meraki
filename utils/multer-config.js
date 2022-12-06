const multer = require("multer");

//file storage path and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req?.baseUrl){
            const dirName = req.baseUrl.split("/")[2];
            cb(null, `uploads/${dirName}`)
        } else {
            cb(null, "uploads")
        }

    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

// Multer Filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
};


exports.uploadHandler = multer({storage, fileFilter});