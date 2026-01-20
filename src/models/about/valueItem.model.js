import mongoose from "mongoose";

const valuesItemSchema = new mongoose.Schema({
  icon: { type: String }, // can use s3 url
  title: { type: String, required: true },
  description: { type: String, required: true },

  order: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date }
});

export default mongoose.model("ValuesItem", valuesItemSchema);
