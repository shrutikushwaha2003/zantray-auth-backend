import AboutHero from "../../../models/about/aboutHero.model.js";
import CustomError from "../../../utils/CustomError.js";

/* CREATE */
export const createHero = async (data, adminId) => {
  const existing = await AboutHero.findOne({ isActive: true });
  if (existing) throw new CustomError("Hero already exists", 400);

  return await AboutHero.create({ ...data, createdBy: adminId });
};

/* GET */
export const getHero = async () => {
  return await AboutHero.findOne({ isActive: true }) || null;
};

/* UPDATE */
export const updateHero = async (data, adminId) => {
  const existing = await AboutHero.findOne({ isActive: true });
  if (!existing) throw new CustomError("Hero not found", 404);

  data.image = data.image || existing.image;

  return await AboutHero.findByIdAndUpdate(
    existing._id,
    { ...data, updatedBy: adminId },
    { new: true }
  );
};

/* DELETE */
export const deleteHero = async (adminId) => {
  const existing = await AboutHero.findOne({ isActive: true });
  if (!existing) throw new CustomError("Hero not found", 404);

  await AboutHero.findByIdAndUpdate(existing._id, {
    isActive: false,
    updatedBy: adminId
  });

  return { success: true };
};
