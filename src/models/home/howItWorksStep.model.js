import mongoose from "mongoose";

const howItWorksStepSchema = new mongoose.Schema(
  {
    stepNumber: {
      type: Number,
      required: true, // 1,2,3
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    icon: {
      type: String, // icon name or url
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    createdOn: {
      type: Date,
      default: Date.now,
    },

    updatedOn: {
      type: Date,
    },
  }
);

export default mongoose.model("HowItWorksStep", howItWorksStepSchema);
