import HowItWorksSection from "../../../models/home/howItWorksSection.model.js";
import HowItWorksStep from "../../../models/home/howItWorksStep.model.js";

/* SECTION */
export const upsertSection = async (data, adminId) => {
  const section = await HowItWorksSection.findOneAndUpdate(
    {},
    {
      ...data,
      updatedBy: adminId,
      updatedOn: new Date(),
    },
    {
      new: true,
      upsert: true, // create if not exists
    }
  );

  return section;
};

export const getSection = async () => {
  return await HowItWorksSection.findOne({ isActive: true });
};

/* STEPS */
export const createStep = async (data, adminId) => {
  return await HowItWorksStep.create({
    ...data,
    createdBy: adminId,
  });
};

export const getSteps = async () => {
  return await HowItWorksStep.find({ isActive: true }).sort({ order: 1 });
};

export const updateStep = async (id, data, adminId) => {
  return await HowItWorksStep.findByIdAndUpdate(
    id,
    {
      ...data,
      updatedBy: adminId,
      updatedOn: new Date(),
    },
    { new: true }
  );
};

export const deleteStep = async (id) => {
  return await HowItWorksStep.findByIdAndDelete(id);
};
