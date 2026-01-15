import MilestoneSection from "../../../models/about/milestoneSection.model.js";
import MilestoneItem from "../../../models/about/milestoneItems.model.js";
import CustomError from "../../../utils/CustomError.js";

// SECTION UPSERT
export const upsertSection = async (data, adminId) => {
  try {
    return await MilestoneSection.findOneAndUpdate(
      {},
      { ...data, updatedBy: adminId, updatedOn: new Date() },
      { new: true, upsert: true }
    );
  } catch (err) {
    console.error("Milestone upsert error:", err);
    throw err;
  }
};

// GET SECTION
export const getSection = async () => {
  try {
    return await MilestoneSection.findOne({ isActive: true });
  } catch (err) {
    throw err;
  }
};

// CREATE ITEMS
export const createItems = async (items, adminId) => {
  try {
    return await MilestoneItem.insertMany(
      items.map(i => ({ ...i, createdBy: adminId }))
    );
  } catch (err) {
    throw err;
  }
};

// GET ITEMS
export const getItems = async () => {
  try {
    return await MilestoneItem.find({ isActive: true }).sort({ order: 1 });
  } catch (err) {
    throw err;
  }
};

// UPDATE ITEM
export const updateItem = async (id, data, adminId) => {
  const item = await MilestoneItem.findByIdAndUpdate(
    id,
    { ...data, updatedBy: adminId, updatedOn: new Date() },
    { new: true }
  );
  if (!item) throw new CustomError("Milestone not found", 404);
  return item;
};

// DELETE ITEM
export const deleteItem = async (id) => {
  const item = await MilestoneItem.findByIdAndDelete(id);
  if (!item) throw new CustomError("Milestone not found", 404);
  return true;
};
