import mongoose from "mongoose";

const aboutHeroSchema = new mongoose.Schema({
  label: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },

  primaryButtonText: { type: String },
  primaryButtonUrl: { type: String },
  secondaryButtonText: { type: String },
  secondaryButtonUrl: { type: String },

  sinceYear: { type: Number },

  isActive: { type: Boolean, default: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date }
}, { timestamps: true });

export default mongoose.model("AboutHero", aboutHeroSchema);
