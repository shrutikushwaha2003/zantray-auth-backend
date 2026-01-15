import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory for S3 upload
const upload = multer({ storage });

export default upload;
