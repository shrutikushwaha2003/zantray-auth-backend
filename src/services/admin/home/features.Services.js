import FeaturesSection from "../../../models/home/feauresSection.model.js";
import FeaturesItem from "../../../models/home/featuresItem.model.js";

/* SECTION */
export const upsertSection = async (data, adminId) => {
  try {
    const section = await FeaturesSection.findOneAndUpdate(
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
    return await FeaturesSection.findOne({ isActive: true });
  } catch (err) {
    console.error("getSection error:", err);
    throw err;
  }
};

/* ITEMS */
export const createItems = async (items, adminId) => {
  try {
    const payload = items.map(item => ({
      ...item,
      createdBy: adminId
    }));

    return await FeaturesItem.insertMany(payload);
  } catch (err) {
    console.error("createItems error:", err);
    throw err;
  }
};

export const getItems = async () => {
  try {
    return await FeaturesItem.find({ isActive: true }).sort({ order: 1 });
  } catch (err) {
    console.error("getItems error:", err);
    throw err;
  }
};

export const updateItem = async (id, data, adminId) => {
  try {
    return await FeaturesItem.findByIdAndUpdate(
      id,
      { ...data, updatedBy: adminId, updatedOn: new Date() },
      { new: true }
    );
  } catch (err) {
    console.error("updateItem error:", err);
    throw err;
  }
};

export const deleteItem = async (id) => {
  try {
    return await FeaturesItem.findByIdAndDelete(id);
  } catch (err) {
    console.error("deleteItem error:", err);
    throw err;
  }
};
