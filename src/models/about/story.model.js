import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    badge: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },

    paragraphs: {
      type: [String],
      required: true,
    },

    images: {
      topLeft: { type: String, default: null },
      topRight: { type: String, default: null },
      bottom: { type: String, default: null },
    },

    quoteText: { type: String, default: null },
    quoteAuthor: { type: String, default: null },

    isActive: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: null },
  }
);

// update modified date only on update
storySchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedOn: new Date() });
  next();
});

export default mongoose.model("AboutStory", storySchema);
