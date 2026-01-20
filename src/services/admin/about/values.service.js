import ValuesSection from "../../../models/about/valueSection.model.js";
import ValuesItem from "../../../models/about/valueItem.model.js";
import CustomError from "../../../utils/CustomError.js";

/* SECTION UPSERT */
export const upsertSection = async (data, adminId) => {
  try {
    const section = await ValuesSection.findOneAndUpdate(
      {},
      { ...data, updatedBy: adminId, updatedOn: new Date() },
      { new: true, upsert: true }
    );
    return section;
  } catch (err) {
    throw err;
  }
};

/* GET SECTION */
export const getSection = async () => {
  try {
    const section = await ValuesSection.findOne({ isActive: true });
    if (!section) throw new CustomError("Values section not found", 404);
    return section;
  } catch (err) {
    throw err;
  }
};

/* ITEMS CREATE MULTIPLE */
export const createItems = async (items, adminId) => {
  try {
    if (!Array.isArray(items) || items.length === 0) {
      throw new CustomError("Values list required", 400);
    }

    const payload = items.map(i => ({
      ...i,
      createdBy: adminId
    }));

    return await ValuesItem.insertMany(payload);
  } catch (err) {
    throw err;
  }
};

/* ITEMS GET */
export const getItems = async () => {
  try {
    return await ValuesItem.find({ isActive: true }).sort({ order: 1 });
  } catch (err) {
    throw err;
  }
};

/* ITEM UPDATE */
export const updateItem = async (id, data, adminId) => {
  try {
    const item = await ValuesItem.findByIdAndUpdate(
      id,
      { ...data, updatedBy: adminId, updatedOn: new Date() },
      { new: true }
    );
    if (!item) throw new CustomError("Value not found", 404);
    return item;
  } catch (err) {
    throw err;
  }
};

/* ITEM DELETE */
export const deleteItem = async (id) => {
  try {
    const item = await ValuesItem.findByIdAndDelete(id);
    if (!item) throw new CustomError("Value not found", 404);
    return true;
  } catch (err) {
    throw err;
  }
};
