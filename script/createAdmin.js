import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../src/models/admin.model.js";


dotenv.config({ path: "./.env" });

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not found in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const adminExists = await Admin.findOne({ email: "admin@zantray.com" });
  if (adminExists) {
    console.log(" Admin already exists");
    process.exit();
  }

  await Admin.create({
    name: "Super Admin",
    email: "admin@zantray.com",
    password: await bcrypt.hash("Admin@123", 10),
  });

  console.log("✅ Admin created successfully");
  process.exit();
};

run();
