import SocialLink from "../../../models/home/socialLink.model.js";

/* CREATE */
export const createLinks = async (items, adminId) => {
  try {
    const payload = items.map(item => ({
      ...item,
      createdBy: adminId
    }));

    return await SocialLink.insertMany(payload);
  } catch (err) {
    console.error("createLinks error:", err);
    throw err;
  }
};


/* GET ALL (ADMIN) */
export const getLinks = async () => {
  try {
    return await SocialLink.find().sort({ order: 1 });
  } catch (err) {
    console.error("getLinks error:", err);
    throw err;
  }
};

/* UPDATE */
export const updateLink = async (id, data, adminId) => {
  try {
    return await SocialLink.findByIdAndUpdate(
      id,
      { ...data, updatedBy: adminId },
      { new: true }
    );
  } catch (err) {
    console.error("updateLink error:", err);
    throw err;
  }
};

/* DELETE */
export const deleteLink = async (id) => {
  try {
    return await SocialLink.findByIdAndDelete(id);
  } catch (err) {
    console.error("deleteLink error:", err);
    throw err;
  }
};

/* PUBLIC */
export const getPublicLinks = async () => {
  try {
    return await SocialLink.find({ isActive: true }).sort({ order: 1 });
  } catch (err) {
    console.error("getPublicLinks error:", err);
    throw err;
  }
};
