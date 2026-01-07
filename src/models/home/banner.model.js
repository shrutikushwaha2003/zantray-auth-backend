import mongoose from "mongoose";

const homePageSchema = new mongoose.Schema(
  {
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
      required: true,
      default: "Start Free Trial",
    },

    primaryButtonUrl: {
      type: String,
      required: true,
    },

    secondaryButtonText: {
      type: String,
      default: "Watch Demo",
    },

    secondaryButtonUrl: {
      type: String,
    },

    noCreditCardText: {
      type: String,
      default: "No credit card required",
    },

    setupTimeText: {
      type: String,
      default: "Setup in 5 minutes",
    },

    supportText: {
      type: String,
      default: "24/7 Support",
    },

    trustedByText: {
      type: String,
      default: "Trusted by 10,000+ creators worldwide",
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

export default mongoose.model("HomePage", homePageSchema);
