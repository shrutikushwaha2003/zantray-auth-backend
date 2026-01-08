import HowItWorksSection from "../../../models/home/howItWorksSection.model.js";
import HowItWorksStep from "../../../models/home/howItWorksStep.model.js";

/* SECTION */
export const upsertSection = async (data, adminId) => {
  try {
    const section = await HowItWorksSection.findOneAndUpdate(
      {},
      { ...data, updatedBy: adminId, updatedOn: new Date() },
      { new: true, upsert: true }
    );

    return section;
  } catch (err) {
    console.error("upsertSection error:", err);
    throw err;
  }
};

export const getSection = async () => {
  try {
    return await HowItWorksSection.findOne({ isActive: true });
  } catch (err) {
    console.error("getSection error:", err);
    throw err;
  }
};

/* BULK STEPS */
export const createSteps = async (items, adminId) => {
  try {
    const payload = items.map(item => ({
      ...item,
      createdBy: adminId
    }));

    return await HowItWorksStep.insertMany(payload);

  } catch (err) {
    console.error("createSteps error:", err);
    throw err;
  }
};

export const getSteps = async () => {
  try {
    return await HowItWorksStep.find({ isActive: true }).sort({ order: 1 });
  } catch (err) {
    console.error("getSteps error:", err);
    throw err;
  }
};

export const updateStep = async (id, data, adminId) => {
  try {
    const updated = await HowItWorksStep.findByIdAndUpdate(
      id,
      { ...data, updatedBy: adminId, updatedOn: new Date() },
      { new: true }
    );

    return updated;

  } catch (err) {
    console.error("updateStep error:", err);
    throw err;
  }
};

export const deleteStep = async (id) => {
  try {
    return await HowItWorksStep.findByIdAndDelete(id);
  } catch (err) {
    console.error("deleteStep error:", err);
    throw err;
  }
};
