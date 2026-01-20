import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

// Validate essential env variables
if (!process.env.REGION || !process.env.BUCKET_NAME || !process.env.ACCESS_KEY_ID || !process.env.SECRET_ACCESS_KEY) {
  throw new Error("Missing S3 environment configuration");
}

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.BUCKET_NAME;

logger.info("S3 configuration loaded", {
  region: process.env.REGION,
  bucket: bucketName,
});

/**
 * Upload file to AWS S3 (SDK v3)
 * @param {Object} file multer file
 * @returns file URL
 */
const uploadFileToS3 = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided for upload");
    }

    // Generate unique filename
    const fileKey = `zantray/${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    logger.info("Uploading file to S3", { fileKey });

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const fileUrl = `https://${bucketName}.s3.${process.env.REGION}.amazonaws.com/${fileKey}`;

    logger.info("File uploaded successfully", { fileUrl });

    return fileUrl;
  } catch (err) {
    logger.error("S3 upload error", { error: err.message });
    throw new Error("Failed to upload file to S3");
  }
};
 export default uploadFileToS3;