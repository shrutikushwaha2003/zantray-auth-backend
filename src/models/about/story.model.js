import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    badge: { type: String, required: true },
    title: { type: String, required: true },

    paragraphs: {
      type: [String],
      required: true,
    },

    images: {
      topLeft: { type: String },
      topRight: { type: String },
      bottom: { type: String },
    },

    quoteText: { type: String },
    quoteAuthor: { type: String },

    isActive: { type: Boolean, default: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

export default mongoose.model("AboutStory", storySchema);
