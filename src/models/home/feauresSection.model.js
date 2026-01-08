import mongoose from "mongoose";

const featuresSectionSchema = new mongoose.Schema({
  smallTitle: { type: String, required: true },
  mainTitle: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date }
});

export default mongoose.model("FeaturesSection", featuresSectionSchema);
