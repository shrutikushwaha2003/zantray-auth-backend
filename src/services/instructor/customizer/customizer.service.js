import Customizer from "../../../models/instructor/customizer.model.js";
import CustomError from "../../../utils/CustomError.js";

export const getCustomizerService = async (instructorId) => {
  try {
    let data = await Customizer.findOne({ instructorId });

    if (!data) {
      data = await Customizer.create({ instructorId });
    }

    return data;
  } catch (error) {
    throw new CustomError("Failed to fetch customizer", 500);
  }
};

export const updateCustomizerService = async (
  instructorId,
  updateData
) => {
  try {
    const updated = await Customizer.findOneAndUpdate(
      { instructorId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    return updated;
  } catch (error) {
    throw new CustomError("Failed to update customizer", 500);
  }
};
