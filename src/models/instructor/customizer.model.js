import mongoose from "mongoose";

const customizerSchema = new mongoose.Schema(
  {
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    branding: {
      platformName: String,
      tagline: String,
      description: String,
      logoUrl: String,
      bannerUrl: String
    },

    colors: {
      primaryColor: { type: String, default: "" },
      secondaryColor: { type: String, default: "" },
      fontFamily: { type: String, default: "" }
    },

    layout: {
      featuredCourses: {
        type: Boolean,
        default: true
      },
      communitySection: {
        type: Boolean,
        default: true
      },
      testimonials: {
        type: Boolean,
        default: true
      }
    }

  },
  { timestamps: true }
);

export default mongoose.model("Customizer", customizerSchema);
