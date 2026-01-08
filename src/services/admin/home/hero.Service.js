import HeroSection from "../../../models/home/hero.model.js";

export const upsertHero = async (data, adminId) => {
  try {
    const result = await HeroSection.findOneAndUpdate(
      {},
      {
        ...data,
        updatedBy: adminId,
      },
      { new: true, upsert: true }
    );

    return result;
  } catch (err) {
    console.error("upsertHero error:", err);
    throw err;
  }
};


export const getHeroAdmin = async () => {
  try {
    return await HeroSection.findOne({});
  } catch (err) {
    console.error("getHeroAdmin error:", err);
    throw err;
  }
};


export const getHeroPublic = async () => {
  try {
    return await HeroSection.findOne({ isActive: true });
  } catch (err) {
    console.error("getHeroPublic error:", err);
    throw err;
  }
};
