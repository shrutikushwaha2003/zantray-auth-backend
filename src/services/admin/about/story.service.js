import AboutStory from "../../../models/about/story.model.js";
import CustomError from "../../../utils/CustomError.js";

export const createStory = async (data, adminId) => {
  try {
    const story = await AboutStory.create({
      ...data,
      createdBy: adminId,
    });

    return story;
  } catch (err) {
    console.error("createStory error:", err);
    throw err;
  }
};

export const getStories = async () => {
  try {
    return await AboutStory.find({ isActive: true });
  } catch (err) {
    console.error("getStories error:", err);
    throw err;
  }
};

export const getStoryById = async (id) => {
  try {
    const story = await AboutStory.findById(id);
    if (!story) throw new CustomError("Story not found", 404);
    return story;
  } catch (err) {
    console.error("getStoryById error:", err);
    throw err;
  }
};

export const updateStory = async (id, data, adminId) => {
  try {
    const story = await AboutStory.findByIdAndUpdate(
      id,
      { ...data, updatedBy: adminId, updatedOn: new Date() },
      { new: true }
    );

    if (!story) throw new CustomError("Story not found", 404);
    return story;
  } catch (err) {
    console.error("updateStory error:", err);
    throw err;
  }
};

export const deleteStory = async (id) => {
  try {
    const story = await AboutStory.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!story) throw new CustomError("Story not found", 404);
    return true;
  } catch (err) {
    console.error("deleteStory error:", err);
    throw err;
  }
};
