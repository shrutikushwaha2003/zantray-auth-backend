import AboutHero from "../../../models/about/aboutHero.model.js";
import CustomError from "../../../utils/CustomError.js";

/* CREATE */
export const createHero = async (data, adminId) => {
  try {
    const hero = await AboutHero.create({
      ...data,
      createdBy: adminId
    });
    return hero;
  } catch (err) {
    console.error("createHero error:", err);
    throw err;
  }
};

/* READ ALL (if needed) */
export const getAllHeroes = async () => {
  try {
    return await AboutHero.find().sort({ createdAt: -1 });
  } catch (err) {
    console.error("getAllHeroes error:", err);
    throw err;
  }
};

/* READ ONE */
export const getHeroById = async (id) => {
  try {
    const hero = await AboutHero.findById(id);
    if (!hero) throw new CustomError("Hero section not found", 404);
    return hero;
  } catch (err) {
    console.error("getHeroById error:", err);
    throw err;
  }
};

/* UPDATE */
export const updateHero = async (id, data, adminId) => {
  try {
    const hero = await AboutHero.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedBy: adminId,
        updatedOn: new Date()
      },
      { new: true }
    );

    if (!hero) throw new CustomError("Hero section not found", 404);

    return hero;
  } catch (err) {
    console.error("updateHero error:", err);
    throw err;
  }
};

/* DELETE */
export const deleteHero = async (id) => {
  try {
    const hero = await AboutHero.findByIdAndDelete(id);
    if (!hero) throw new CustomError("Hero section not found", 404);
    return true;
  } catch (err) {
    console.error("deleteHero error:", err);
    throw err;
  }
};
