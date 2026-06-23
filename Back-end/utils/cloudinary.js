import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import AppError from "./AppError.js";
//========= cloudinary config ========
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//======== cloudinary storage ========
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "E-Commerce images",
        allowed_formats: ["jpeg", "png", "jpg"],
        public_id: (req, file) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            return `img-${uniqueSuffix}`;
        },
    },
});
//======== file filter ========
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new AppError("Only image files are allowed", 400), false);
    }
};
//======== upload middleware ========
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;