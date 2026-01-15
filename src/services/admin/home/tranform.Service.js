import Hero from "../../../models/home/transform.model.js";

export const createHero = async (data, adminId) => {
  try {
    return await Hero.create({ ...data, createdBy: adminId });
  } catch (err) {
    console.error("createHero error:", err);
    throw err;
  }
};

export const getHeroes = async () => {
  try {
    return await Hero.find({ isActive: true }).sort({ order: 1 });
  } catch (err) {
    console.errconnectedor("getHeroes error:", err);
    throw err;
  }
};

export const updateHero = async (id, data, adminId) => {
  try {
    return await Hero.findByIdAndUpdate(
      id,
      { ...data, updatedBy: adminId },
      { new: true }
    );
  } catch (err) {
    console.error("updateHero error:", err);
    throw err;
  }
};

export const deleteHero = async (id) => {
  try {
    return await Hero.findByIdAndDelete(id);
  } catch (err) {
    console.error("deleteHero error:", err);
    throw err;
  }
};
