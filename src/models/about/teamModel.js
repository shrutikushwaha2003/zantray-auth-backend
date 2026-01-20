import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    order: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      createdOn: { type: Date, default: Date.now },
      updatedOn: { type: Date }
  },
  
);

/* Auto-set updatedOn before save/update */
teamSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedOn: new Date() });
  next();
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
