import mongoose from "mongoose";

const heroSectionSchema = new mongoose.Schema(
  {
    badgeText: {
      type: String,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    primaryButtonText: {
      type: String,
      trim: true,
    },
    primaryButtonUrl: {
      type: String,
      trim: true,
    },

    secondaryButtonText: {
      type: String,
      trim: true,
    },
    secondaryButtonUrl: {
      type: String,
      trim: true,
    },

    highlights: [
      {
        text: { type: String, trim: true },
        icon: { type: String, trim: true },
      },
    ],

    stats: {
      growth: { type: String }, 
      members: { type: String }, 
      revenue: { type: String }, 
      courses: { type: Number }, 
    },

    testimonial: {
      name: { type: String },
      rating: { type: Number },
      message: { type: String },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HeroSection", heroSectionSchema);
