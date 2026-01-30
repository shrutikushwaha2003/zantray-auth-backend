import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: ["Development", "Design", "Business", "Marketing", "AI"],
      required: true
    },
    difficultyLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    },
    price: {
      type: Number,
      default: 0,
      min: 0
    },
    thumbnail: {
      type: String,
    },
    introVideo:{
      type:String,

    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

courseSchema.index({ instructorId: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ difficultyLevel: 1 });

export default mongoose.model("Course", courseSchema);
