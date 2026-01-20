import mongoose from "mongoose";

const valuesSectionSchema = new mongoose.Schema({
  badge: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },

  isActive: { type: Boolean, default: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date }
});

export default mongoose.model("ValuesSection", valuesSectionSchema);
