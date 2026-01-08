import FeaturesSection from "../../../models/home/feauresSection.model.js";
import FeaturesItem from "../../../models/home/featuresItem.model.js";

/* SECTION */
export const upsertSection = async (data, adminId) => {
  return await FeaturesSection.findOneAndUpdate(
    {},
    { ...data, updatedBy: adminId, updatedOn: new Date() },
    { new: true, upsert: true }
  );
};

export const getSection = async () => {
  return await FeaturesSection.findOne({ isActive: true });
};

/* ITEMS */
export const createItems = async (items, adminId) => {
  const data = items.map(item => ({
    ...item,
    createdBy: adminId
  }));

  return await FeaturesItem.insertMany(data);
};


export const getItems = async () => {
  return await FeaturesItem.find({ isActive: true }).sort({ order: 1 });
};

export const updateItem = async (id, data, adminId) => {
  return await FeaturesItem.findByIdAndUpdate(
    id,
    { ...data, updatedBy: adminId, updatedOn: new Date() },
    { new: true }
  );
};

export const deleteItem = async (id) => {
  return await FeaturesItem.findByIdAndDelete(id);
};
