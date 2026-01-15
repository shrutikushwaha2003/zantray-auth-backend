import mongoose from "mongoose";

const milestoneSectionSchema = new mongoose.Schema({
  label: { type: String },
  heading: { type: String },
  subheading: { type: String },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date }
});

export default mongoose.model("MilestoneSection", milestoneSectionSchema);
