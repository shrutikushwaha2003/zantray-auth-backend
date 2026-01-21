import mongoose from "mongoose";

const milestoneItemSchema = new mongoose.Schema({
 
  year: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date }
});

export default mongoose.model("MilestoneItem", milestoneItemSchema);
